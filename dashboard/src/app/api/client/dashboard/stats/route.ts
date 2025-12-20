import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { requireRole } from '@/lib/auth';
import Invoice from '@/models/Invoice';
import License from '@/models/License';
import Client from '@/models/Client';

export async function GET(req: NextRequest) {
  try {
    // Verify client role and get user info
    const authUser = await requireRole(['CLIENT'], req);

    // Connect to database
    await connectToDatabase();

    // Get client ID from JWT
    const clientId = authUser.clientId;

    if (!clientId) {
      return NextResponse.json(
        { error: 'Client ID not found in authentication token' },
        { status: 400 }
      );
    }

    // Fetch all invoices for this client
    const allInvoices = await Invoice.find({ clientId }).lean();

    // Calculate billing statistics
    const paidInvoices = allInvoices.filter(inv => inv.status === 'PAID');
    const totalPaid = paidInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    
    const outstandingInvoices = allInvoices.filter(inv => 
      inv.status === 'GENERATED' || inv.status === 'OVERDUE'
    );
    const outstanding = outstandingInvoices.reduce((sum, inv) => sum + inv.amount, 0);

    // Get next invoice due date
    const upcomingInvoices = allInvoices
      .filter(inv => inv.status === 'GENERATED' && new Date(inv.dueDate) >= new Date())
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    const nextInvoiceDue = upcomingInvoices.length > 0 ? upcomingInvoices[0].dueDate.toISOString() : null;

    const upcomingCount = upcomingInvoices.length;
    const overdueCount = allInvoices.filter(inv => {
      if (inv.status === 'PAID') return false;
      const dueDate = new Date(inv.dueDate);
      return dueDate < new Date();
    }).length;

    // Fetch licenses for service statistics
    const licenses = await License.find({ clientId }).lean();
    const activeLicenses = licenses.filter(l => l.status === 'active').length;
    const totalLicenses = licenses.length;

    // Get client data for total licenses
    const client = await Client.findById(clientId).lean();
    const clientTotalLicenses = (client as any)?.numberOfLicenses || totalLicenses;
    const utilizationPercent = clientTotalLicenses > 0 
      ? Math.round((activeLicenses / clientTotalLicenses) * 100) 
      : 0;

    // Calculate performance metrics
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const currentMonthTarget = (client as any)?.targetThisMonth || (client as any)?.numberOfLicenses || 0;
    const currentMonthDelivered = (client as any)?.achievedThisMonth || 0;
    const currentMonthProgress = currentMonthTarget > 0 
      ? Math.round((currentMonthDelivered / currentMonthTarget) * 100) 
      : 0;

    // Calculate average monthly progress (last 6 months)
    // This is a simplified calculation - in a real scenario, you'd track historical data
    const averageMonthlyProgress = currentMonthProgress; // Placeholder - would need historical tracking

    return NextResponse.json(
      {
        success: true,
        stats: {
          billing: {
            totalPaid,
            outstanding,
            nextInvoiceDue,
            upcomingCount,
            overdueCount,
          },
          services: {
            total: clientTotalLicenses,
            active: activeLicenses,
            utilizationPercent,
          },
          performance: {
            currentMonthProgress,
            averageMonthlyProgress,
          },
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get client dashboard stats error:', error);

    if (error.message.includes('Unauthorized') || error.message.includes('Forbidden')) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message.includes('Unauthorized') ? 401 : 403 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred while fetching dashboard statistics' },
      { status: 500 }
    );
  }
}

