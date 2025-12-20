import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
// Import all models to ensure they're registered with Mongoose
import Client from '@/models/Client';
import Plan from '@/models/Plan';
import User from '@/models/User';
import License from '@/models/License';
import SdrClientAssignment from '@/models/SdrClientAssignment';
import Update from '@/models/Update';
import { requireRole } from '@/lib/auth';
import { rateLimit, rateLimitConfigs } from '@/lib/rate-limit';
import { handleApiError } from '@/lib/error-handler';
import { logger } from '@/lib/logger';

// Ensure models are registered (helps with Next.js hot reloading)
if (typeof window === 'undefined') {
  void Client;
  void Plan;
  void User;
  void License;
  void SdrClientAssignment;
  void Update;
}

export async function GET(req: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = rateLimit(req, rateLimitConfigs.read);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    // Verify SDR role and get user info
    const authUser = await requireRole(['SDR'], req);

    // Connect to database
    await connectToDatabase();

    // Get SDR's user ID from JWT
    const sdrId = authUser.userId;

    // Fetch all client assignments for this SDR
    const assignments = await SdrClientAssignment.find({ sdrId })
      .populate({
        path: 'clientId',
        select: 'businessName businessAddress pointOfContactName pointOfContactTitle pointOfContactEmail pointOfContactPhone websiteAddress country fullRegisteredAddress numberOfLicenses currentPlanId accountManagerId',
        populate: [
          {
            path: 'currentPlanId',
            select: 'name pricePerMonth creditsPerMonth description',
          },
          {
            path: 'accountManagerId',
            select: 'name email',
          },
        ],
      })
      .populate({
        path: 'licenses',
        select: 'productOrServiceName serviceType label status startDate endDate',
      })
      .lean();

    // Get latest update date for each client
    const clientIds = assignments.map((a: any) => a.clientId._id);
    const latestUpdates = await Update.aggregate([
      { $match: { clientId: { $in: clientIds } } },
      { $sort: { date: -1, createdAt: -1 } },
      { $group: { _id: '$clientId', latestUpdate: { $first: '$$ROOT' } } },
    ]);

    const updatesMap = new Map(
      latestUpdates.map((u: any) => [u._id.toString(), u.latestUpdate.date])
    );

    // Calculate total active licenses assigned to this SDR
    // Active licenses = licenses assigned to SDR (in assignment.licenses) with status 'active'
    let totalActiveLicenses = 0;
    const allAssignedLicenseIds: string[] = [];
    
    assignments.forEach((assignment: any) => {
      if (assignment.licenses && Array.isArray(assignment.licenses)) {
        assignment.licenses.forEach((license: any) => {
          if (license && license._id) {
            allAssignedLicenseIds.push(license._id.toString());
            // Count only active licenses
            if (license.status === 'active') {
              totalActiveLicenses++;
            }
          }
        });
      }
    });

    // Format response
    const clients = assignments.map((assignment) => {
      const client = assignment.clientId as any; // Populated client object
      return {
        clientId: client._id,
        businessName: client.businessName,
        businessAddress: client.businessAddress,
        fullRegisteredAddress: client.fullRegisteredAddress,
        pointOfContact: {
          name: client.pointOfContactName,
          title: client.pointOfContactTitle,
          email: client.pointOfContactEmail,
          phone: client.pointOfContactPhone,
        },
        websiteAddress: client.websiteAddress,
        country: client.country,
        plan: client.currentPlanId,
        accountManager: client.accountManagerId,
        numberOfLicenses: client.numberOfLicenses,
        licenses: assignment.licenses || [],
        assignmentId: assignment._id,
        assignedAt: assignment.createdAt,
        lastUpdateDate: updatesMap.get(client._id.toString()) || null,
      };
    });

    // Calculate total licenses assigned (regardless of status)
    const totalLicenses = allAssignedLicenseIds.length;

    return NextResponse.json(
      {
        success: true,
        clients,
        stats: {
          totalLicenses,
          activeLicenses: totalActiveLicenses,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    logger.error('SDR clients error', error);
    return handleApiError(error);
  }
}

