import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Contact from '@/lib/models/Contact'

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await dbConnect()

    // Parse request body
    const body = await request.json()
    
    // Extract data from request
    const {
      name,
      email,
      company,
      phone,
      service,
      budget,
      timeline,
      message
    } = body

    // Basic validation (Mongoose will handle detailed validation)
    if (!name || !email || !company || !service) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, company, and service are required' },
        { status: 400 }
      )
    }

    // Get client IP and user agent for analytics
    const clientIp = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Create contact submission
    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company.trim(),
      phone: phone?.trim() || '',
      service,
      budget: budget || '',
      timeline: timeline || '',
      message: message?.trim() || '',
      ipAddress: clientIp,
      userAgent,
      processed: false
    }

    // Save to database
    const contact = new Contact(contactData)
    await contact.save()

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        id: contact._id
      },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Contact form submission error:', error)

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationErrors 
        },
        { status: 400 }
      )
    }

    // Handle duplicate email errors (if we add unique constraint later)
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'A submission with this email already exists' },
        { status: 409 }
      )
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Please use POST.' },
    { status: 405 }
  )
} 