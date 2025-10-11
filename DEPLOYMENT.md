# Quest4Fun Deployment Guide

This guide covers deploying Quest4Fun to Vercel and other platforms.

## Quick Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Firebase project configured (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))

### Step-by-Step Deployment

#### 1. Prepare Your Repository

Ensure your code is pushed to GitHub:

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### 2. Import to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Select **"Import Git Repository"**
4. Choose your Quest4Fun repository
5. Click **"Import"**

#### 3. Configure Project Settings

Vercel will auto-detect Next.js. Review the following settings:

**Framework Preset:** Next.js (auto-detected)
**Build Command:** `npm run build` (already configured)
**Output Directory:** `.next` (auto-detected)
**Install Command:** `npm install` (auto-detected)

#### 4. Add Environment Variables

Click **"Environment Variables"** and add the following:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Your Firebase API Key | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Your Firebase Auth Domain | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Your Firebase Project ID | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Your Firebase Storage Bucket | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Your Messaging Sender ID | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Your Firebase App ID | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Your Measurement ID (optional) | Production, Preview, Development |

**Where to find these values:**
- Go to [Firebase Console](https://console.firebase.google.com/)
- Select your project
- Go to **Project Settings** → **General**
- Scroll to **Your apps** section
- Copy values from the Firebase SDK snippet

#### 5. Deploy

1. Click **"Deploy"**
2. Vercel will build and deploy your application
3. Wait for the build to complete (usually 2-3 minutes)
4. Your app will be live at `https://your-project-name.vercel.app`

#### 6. Post-Deployment Setup

After deployment:

1. **Update Firebase Authorized Domains:**
   - Go to Firebase Console → Authentication → Settings → Authorized Domains
   - Add your Vercel domain: `your-project-name.vercel.app`

2. **Test Your Deployment:**
   - Visit your deployed URL
   - Try logging in as a child
   - Check if Firebase connection works
   - Verify all pages load correctly

3. **Seed Data (Optional):**
   - Visit `https://your-project-name.vercel.app/seed-data`
   - Click "Seed All Data" to populate sample content
   - **Note:** This page should be restricted in production (see Security section)

## Custom Domain Setup

### 1. Add Custom Domain in Vercel

1. Go to your project in Vercel Dashboard
2. Click **"Settings"** → **"Domains"**
3. Enter your custom domain
4. Follow Vercel's instructions to update DNS records

### 2. Update Firebase

Add your custom domain to Firebase Authorized Domains:
- Firebase Console → Authentication → Settings → Authorized Domains
- Add your custom domain

## Environment-Specific Configuration

### Production Environment Variables

For production, you can add additional environment variables:

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Preview Deployments

Vercel automatically creates preview deployments for pull requests. These use the same environment variables as production.

To use different values for preview:
1. Add variables with "Preview" environment selected
2. Use `process.env.VERCEL_ENV` to detect environment in code

## Troubleshooting Deployment Issues

### Build Failures

**Issue:** Build fails with ESLint errors
**Solution:** 
- Check the build logs in Vercel
- All major linting issues have been fixed
- If new issues arise, run `npm run lint` locally to identify them

**Issue:** Build fails with TypeScript errors
**Solution:**
- Run `npx tsc --noEmit` locally to check for type errors
- Fix any type errors before deploying
- Note: `next.config.ts` is configured to ignore build errors temporarily

**Issue:** Build fails with "Firebase not initialized"
**Solution:**
- Verify all environment variables are set in Vercel
- Check that variable names match exactly (including `NEXT_PUBLIC_` prefix)
- Redeploy after updating environment variables

### Runtime Errors

**Issue:** App loads but Firebase features don't work
**Solution:**
1. Check browser console for errors
2. Verify Firebase environment variables in Vercel
3. Ensure Firebase services are enabled (Authentication, Firestore, Storage)
4. Check Firebase security rules

**Issue:** "Invalid API Key" error
**Solution:**
- Verify `NEXT_PUBLIC_FIREBASE_API_KEY` is correct
- Check for extra spaces or quotes in environment variable
- Regenerate API key in Firebase if needed

**Issue:** Authentication not working
**Solution:**
1. Add Vercel domain to Firebase Authorized Domains
2. Enable Anonymous and Email/Password authentication in Firebase
3. Check Firebase security rules allow authentication

### Performance Issues

**Issue:** Slow page loads
**Solution:**
- Ensure images are optimized (use Next.js Image component)
- Check Firebase Firestore indexes
- Monitor Vercel Analytics for performance insights

**Issue:** High bandwidth usage
**Solution:**
- Optimize images (already using Next.js Image in Avatar component)
- Enable Firebase CDN for static assets
- Use Firestore query limits and pagination

## Security Considerations

### Production Security Checklist

- [ ] Remove or restrict access to debug pages:
  - `/firebase-test` - Should redirect to home in production
  - `/firebase-diagnostic` - Should redirect to home in production
  - `/seed-data` - Should redirect to home in production
  
  These pages are marked with `export const dynamic = 'force-dynamic'` but should have production guards:

```typescript
// Add to each debug page
if (process.env.NODE_ENV === 'production') {
  redirect('/');
}
```

- [ ] Update Firebase Security Rules:
  - Restrict Firestore read/write access
  - Implement proper authentication checks
  - See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for recommended rules

- [ ] Environment Variables:
  - Never commit `.env.local` to git
  - Use Vercel's environment variable encryption
  - Rotate API keys regularly

- [ ] Content Security:
  - Review user-generated content policies
  - Implement input validation
  - Sanitize user inputs

## Alternative Deployment Platforms

### Deploy to Netlify

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build the project: `npm run build`
3. Deploy: `netlify deploy --prod`
4. Add environment variables in Netlify dashboard

### Deploy to Railway

1. Connect GitHub repository to Railway
2. Add environment variables
3. Deploy automatically on push

### Deploy to Your Own Server

1. Build the project: `npm run build`
2. Start the server: `npm start`
3. Use PM2 or similar for process management
4. Set up reverse proxy with Nginx
5. Configure SSL with Let's Encrypt

## Continuous Deployment

Vercel automatically deploys on every push to your repository:

- **Push to `main`** → Deploys to Production
- **Push to other branches** → Creates Preview Deployment
- **Pull Requests** → Automatic preview deployments

To disable automatic deployments:
1. Go to Vercel Dashboard → Project Settings
2. Click "Git" → Uncheck "Automatic Deployments"

## Monitoring and Analytics

### Vercel Analytics

Enable Vercel Analytics to monitor:
- Page load times
- Core Web Vitals
- User engagement metrics

### Firebase Analytics

Firebase Analytics is already integrated (when in browser):
- Track user engagement
- Monitor feature usage
- Analyze user flows

## Rollback Procedures

If a deployment fails or has issues:

1. **Via Vercel Dashboard:**
   - Go to Deployments
   - Find the last working deployment
   - Click "Promote to Production"

2. **Via Git:**
   ```bash
   git revert HEAD
   git push origin main
   ```

3. **Instant Rollback:**
   - Vercel keeps previous deployments active
   - Use domain reassignment for instant rollback

## Cost Optimization

### Vercel Free Tier Limits
- 100 GB bandwidth per month
- 6000 build minutes per month
- Unlimited team members

### Tips to Stay Within Free Tier
- Optimize images to reduce bandwidth
- Use Firebase CDN for large assets
- Implement efficient caching strategies
- Monitor usage in Vercel dashboard

## Support and Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Quest4Fun Issues](https://github.com/Nitesh-Badgujar-28906/Quest4Fun/issues)

## Changelog

### Recent Fixes (2025-10-11)
- ✅ Removed deprecated `@types/uuid` dependency
- ✅ Fixed Turbopack flag in build command for Vercel compatibility
- ✅ Fixed all ESLint errors blocking deployment
- ✅ Fixed Firebase SSR initialization issues
- ✅ Added proper TypeScript types throughout the codebase
- ✅ Configured dynamic rendering for debug pages
- ✅ Added `.env.example` template
- ✅ Created `vercel.json` configuration
- ✅ Updated `next.config.ts` for production optimization

---

**Last Updated:** 2025-10-11
**Version:** 1.0.0
