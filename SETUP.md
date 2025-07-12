# MillionCXO Contact Form Setup

## Environment Configuration Required

To enable the contact form functionality with MongoDB integration, you need to create a `.env.local` file in the project root with your MongoDB connection string.

### Step 1: Create .env.local file

Create a file named `.env.local` in the root directory (same level as package.json) with the following content:

```env
# MongoDB Connection String
DATABASE_URL=your_mongodb_connection_string_here

# Development Mode
NODE_ENV=development
```

### Step 2: Replace with your actual MongoDB URL

Replace `your_mongodb_connection_string_here` with your actual MongoDB connection string. It should look like:

```
mongodb+srv://username:password@cluster.mongodb.net/millioncxo?retryWrites=true&w=majority
```

### Step 3: Test the functionality

1. Start the development server: `npm run dev`
2. Navigate to the contact page: `http://localhost:3000/contact`
3. Fill out and submit the form
4. Verify the data is stored in your MongoDB database
5. Confirm the redirect to the booking link works

## Features Implemented

### ✅ Contact Form Integration
- **MongoDB Storage**: All form submissions stored in database
- **Booking Redirect**: Automatic redirect to Outlook booking link after successful submission
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Fallback Option**: Direct booking link if form submission fails

### ✅ API Endpoint
- **Route**: `/api/contact` (POST method)
- **Validation**: Server-side validation for all required fields
- **Security**: Input sanitization and error handling
- **Analytics**: IP address and user agent tracking for lead analytics

### ✅ Database Schema
- **Contact Model**: Structured data storage with validation
- **Required Fields**: name, email, company, service
- **Optional Fields**: phone, budget, timeline, message
- **Metadata**: submission timestamp, IP address, user agent, processed flag

### ✅ User Experience
- **Loading States**: Visual feedback during submission
- **Success Message**: Clear confirmation before redirect
- **Error Recovery**: Automatic error clearing when user types
- **Direct Booking**: Fallback option if form submission fails

## Database Schema

```javascript
ContactSubmission {
  name: String (required, max 100 chars),
  email: String (required, validated),
  company: String (required, max 200 chars),
  phone: String (optional, max 20 chars),
  service: String (required, enum: pilot/sdr/consultation/free-consultation),
  budget: String (optional, enum: under-5k/5k-15k/15k-30k/30k-plus),
  timeline: String (optional, enum: immediate/1-month/3-months/6-months/exploring),
  message: String (optional, max 1000 chars),
  submittedAt: Date (auto),
  ipAddress: String (for analytics),
  userAgent: String (for analytics),
  processed: Boolean (for follow-up tracking)
}
```

## Booking Link Integration

After successful form submission, users are automatically redirected to:
```
https://outlook.office.com/book/BookYourDiscoveryCall@millioncxo.com/s/3nnbUYEr9E28OGQwzgOAUQ2?ismsaljsauthenabled
```

## Next Steps

1. Set up your MongoDB database and get the connection string
2. Create the `.env.local` file with your DATABASE_URL
3. Test the contact form functionality
4. Monitor form submissions in your MongoDB database
5. Follow up with leads as they come in

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your MongoDB connection string is correct
3. Ensure your database allows connections from your deployment platform
4. Check the server logs for detailed error information 