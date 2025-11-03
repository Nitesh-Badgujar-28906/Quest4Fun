# Vercel Deployment Guide for Quest4Fun

## Prerequisites
- GitHub account with this repository pushed
- Vercel account (sign up at https://vercel.com)
- Firebase project credentials

## Step-by-Step Deployment Process

### 1. Push Your Code to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "**Add New...**" → "**Project**"
3. Import your GitHub repository: `Quest4Fun`
4. Click "**Import**"

### 3. Configure Build Settings

Vercel will auto-detect Next.js settings:
- **Framework Preset:** Next.js
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

Click "**Deploy**" but it will fail because environment variables are missing. That's okay!

### 4. Add Environment Variables

#### Option A: During Initial Setup
Before clicking Deploy, expand "**Environment Variables**" section and add:

#### Option B: After First Deploy (Recommended)
1. Go to your project in Vercel Dashboard
2. Click "**Settings**" tab
3. Click "**Environment Variables**" in left sidebar
4. Add each variable:

**Required Variables:**

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Your Firebase API Key | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `your-project.firebaseapp.com` | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Your Firebase Project ID | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `your-project.appspot.com` | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Your Messaging Sender ID | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Your Firebase App ID | Production, Preview, Development |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Your Measurement ID | Production, Preview, Development |

**How to add each variable:**
1. Click "**Add New**"
2. Enter the **Key** (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY`)
3. Enter the **Value** (copy from your `.env.local` file)
4. Select which environments: **Production**, **Preview**, **Development** (check all three)
5. Click "**Save**"
6. Repeat for all 7 variables

### 5. Find Your Firebase Credentials

If you don't remember your Firebase credentials:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the ⚙️ gear icon → "**Project settings**"
4. Scroll down to "**Your apps**" section
5. Find your web app or create one
6. Click "**Config**" to see your credentials
7. Copy each value to Vercel

### 6. Redeploy

After adding environment variables:

1. Go to "**Deployments**" tab
2. Click the three dots (⋮) on the latest deployment
3. Click "**Redeploy**"
4. Check "**Use existing Build Cache**" (optional)
5. Click "**Redeploy**"

### 7. Configure Firebase for Vercel Domain

After successful deployment:

1. Copy your Vercel URL (e.g., `quest4fun.vercel.app`)
2. Go to Firebase Console
3. Navigate to "**Authentication**" → "**Settings**" → "**Authorized domains**"
4. Click "**Add domain**"
5. Add your Vercel domain: `quest4fun.vercel.app`
6. If you have a custom domain, add that too

### 8. Update Firestore Rules (if needed)

Your Firestore rules should already be deployed, but verify:

1. Go to Firebase Console → Firestore Database → Rules
2. Make sure rules match your `firestore.rules` file
3. Click "**Publish**" if needed

## Environment-Specific Deployment

### Production
- Automatic deployment when you push to `main` branch
- Uses Production environment variables

### Preview Deployments
- Automatic deployment for Pull Requests
- Uses Preview environment variables
- Test changes before merging

### Development
- Local development only
- Uses `.env.local` file

## Common Issues & Solutions

### Issue: "Firebase: Error (auth/invalid-api-key)"
**Solution:** Double-check environment variables in Vercel Settings

### Issue: Build fails with "Module not found"
**Solution:** Make sure all dependencies are in `package.json`, run `npm install` locally first

### Issue: "Unauthorized domain"
**Solution:** Add your Vercel domain to Firebase Authorized Domains

### Issue: Environment variables not updating
**Solution:** After changing variables, you must **Redeploy** (not just push new code)

## Useful Commands

```bash
# Deploy from CLI (optional)
npm i -g vercel
vercel login
vercel

# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]
```

## Security Best Practices

✅ **DO:**
- Keep `.env.local` in `.gitignore`
- Use Vercel Environment Variables for all secrets
- Enable Firebase security rules
- Use different Firebase projects for staging/production

❌ **DON'T:**
- Commit `.env.local` to Git
- Share your API keys publicly
- Use production credentials in development
- Hardcode secrets in your code

## Custom Domain (Optional)

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Add custom domain to Firebase Authorized Domains

## Automatic Deployments

Once set up, Vercel automatically deploys when you:
- Push to `main` branch → Production deployment
- Create a Pull Request → Preview deployment
- Push to any branch → Preview deployment

## Need Help?

- Vercel Documentation: https://vercel.com/docs
- Firebase Documentation: https://firebase.google.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment

---

**Ready to deploy?** Follow the steps above and your Quest4Fun app will be live! 🚀
