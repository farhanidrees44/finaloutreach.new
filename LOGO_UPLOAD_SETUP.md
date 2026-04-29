# Client Logo Upload System - Setup Guide

## Overview
This system allows you to upload official company logos (SVG/PNG) that will be displayed in a modern marquee section on your website.

## Quick Setup

### 1. Environment Variables Required

Add these to your `.env.local` file:

```env
# Vercel Blob Storage (automatically configured if Blob integration is added)
BLOB_READ_WRITE_TOKEN=your_blob_token_here

# Supabase (optional, for metadata storage)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
# OR use anon key if service role is not available
SUPABASE_ANON_KEY=your_anon_key

# Admin Panel Authentication
ADMIN_PASSWORD=your_secure_admin_password
```

### 2. Set Up Supabase Table (Optional but Recommended)

If using Supabase, run this SQL in the Supabase SQL editor:

```sql
CREATE TABLE IF NOT EXISTS uploaded_logos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  blob_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT DEFAULT 'svg',
  height_class TEXT DEFAULT 'h-7 sm:h-8',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_uploaded_logos_sort_order ON uploaded_logos(sort_order);
```

## Using the System

### Admin Dashboard
1. Navigate to `/admin/logos`
2. Enter your `ADMIN_PASSWORD` from environment variables
3. Upload logos by:
   - Dragging and dropping files onto the drop zone
   - Or clicking "Select File" button
   - Selecting SVG or PNG files (max 2MB each)
4. Enter the company name
5. Choose display size (Small, Medium, Large, Extra Large)
6. Logos appear in the grid below
7. Delete logos using the trash icon

### Client Logo Display
- Logos automatically appear in the "Trusted by these companies" section on the homepage
- The section displays between `FeaturedIn` and `ResultsBar`
- Logos animate with:
  - Scale up on hover (125%)
  - Electric blue glow effect
  - Smooth transitions

## File Specifications

### Supported Formats
- **SVG** (recommended for crisp scaling)
- **PNG** (requires proper transparency)

### File Constraints
- Maximum file size: **2MB**
- Recommended logo dimensions: 100px–300px wide
- Keep transparent backgrounds for PNG logos

### Height Classes
- **Small**: `h-6 sm:h-7` (16-28px)
- **Medium**: `h-7 sm:h-8` (28-32px)
- **Large**: `h-8 sm:h-9` (32-36px)
- **Extra Large**: `h-9 sm:h-10` (36-40px)

## API Endpoints

### Upload Logo
**POST** `/api/admin/logos/upload`

Headers:
```
Authorization: Bearer YOUR_ADMIN_PASSWORD
```

Body (FormData):
```
file: File
companyName: string
heightClass: string (optional, defaults to "h-7 sm:h-8")
```

Response:
```json
{
  "ok": true,
  "logo": {
    "name": "Company Name",
    "url": "https://...",
    "type": "svg",
    "heightClass": "h-7 sm:h-8"
  }
}
```

### List Logos
**GET** `/api/logos/list`

Response:
```json
{
  "ok": true,
  "logos": [
    {
      "id": "uuid",
      "name": "Company Name",
      "url": "https://...",
      "type": "svg",
      "heightClass": "h-7 sm:h-8",
      "order": 0
    }
  ],
  "source": "supabase"
}
```

### Delete Logo
**DELETE** `/api/admin/logos/delete?id=logo_uuid`

Headers:
```
Authorization: Bearer YOUR_ADMIN_PASSWORD
```

## Troubleshooting

### "Admin panel not configured"
- Ensure `ADMIN_PASSWORD` is set in `.env.local`

### "Only SVG and PNG files are allowed"
- Check that your file has the correct extension
- SVG files should have MIME type `image/svg+xml`

### Logos not appearing on homepage
1. Check that Blob storage is connected in Settings
2. Verify logos were successfully uploaded (check admin dashboard)
3. Clear browser cache and reload
4. Check browser console for API errors

### Metadata not saving
- This is expected if Supabase is not configured
- Logos will still upload and display correctly
- Metadata can be restored from browser API requests

## Integration Location

Logos appear in `/app/page.tsx` via the `<ClientLogosMarquee />` component, positioned after the `<FeaturedIn />` section.

## Security Notes

- Admin password is transmitted in Authorization header (use HTTPS in production)
- Consider implementing stronger authentication (JWT tokens, OAuth) for production
- Blob storage URLs are public by default
- Always validate file types and sizes on the server

## Support

For issues with:
- **Blob Storage**: Check Vercel documentation at https://vercel.com/docs/storage/vercel-blob
- **Supabase**: Check Supabase docs at https://supabase.com/docs
- **Admin Panel**: Review logs in `/api/admin/logos/upload` endpoint
