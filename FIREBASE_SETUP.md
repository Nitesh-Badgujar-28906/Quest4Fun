# Firebase Setup Guide for Quest4Fun

## Current Status
Your Firebase project `quest4fun-f2ab6` is configured but needs services to be enabled and security rules to be set up.

## Step-by-Step Setup

### 1. Enable Firebase Services

Go to [Firebase Console](https://console.firebase.google.com/project/quest4fun-f2ab6) and enable these services:

#### A. Authentication
1. Go to **Authentication** → **Get started**
2. Go to **Sign-in method** tab
3. Enable **Anonymous** sign-in
4. Enable **Email/Password** sign-in
5. Click **Save**

#### B. Firestore Database
1. Go to **Firestore Database** → **Create database**
2. Choose **Start in test mode** (we'll update rules later)
3. Choose your preferred location (closest to your users)
4. Click **Done**

#### C. Storage
1. Go to **Storage** → **Get started**
2. Choose **Start in test mode**
3. Choose the same location as Firestore
4. Click **Done**

#### D. Analytics (Optional)
1. Go to **Analytics** → **Enable Google Analytics**
2. Choose your Google Analytics account or create new
3. Click **Enable Analytics**

### 2. Set Up Firestore Security Rules

In **Firestore Database** → **Rules**, replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access for authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Allow anonymous users to read public data
    match /subjects/{document} {
      allow read: if true;
    }
    
    match /levels/{document} {
      allow read: if true;
    }
    
    match /lessons/{document} {
      allow read: if true;
    }
    
    // Test collection for connection testing
    match /test/{document} {
      allow read, write: if true;
    }
  }
}
```

### 3. Set Up Storage Security Rules

In **Storage** → **Rules**, use:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 4. Verify Configuration

1. Visit `http://localhost:3001/firebase-test` to test connection
2. All tests should pass ✅
3. If tests fail, check browser console for specific errors

### 5. Populate Sample Data

1. Visit `http://localhost:3001/seed-data`
2. Click **Seed All Data** to populate initial content
3. This creates sample children, parents, subjects, and lessons

## Common Issues & Solutions

### "Missing or insufficient permissions"
- **Cause**: Firestore rules too restrictive or services not enabled
- **Solution**: Follow steps 1 & 2 above

### "Firebase app not initialized"
- **Cause**: Environment variables not loaded
- **Solution**: Restart development server

### "Project not found"
- **Cause**: Wrong project ID in environment
- **Solution**: Verify `.env.local` has correct `quest4fun-f2ab6` project ID

### Authentication errors
- **Cause**: Auth service not enabled
- **Solution**: Enable Anonymous and Email/Password auth in console

## Test Checklist

- [ ] Authentication service enabled
- [ ] Anonymous sign-in enabled
- [ ] Email/Password sign-in enabled
- [ ] Firestore Database created
- [ ] Firestore security rules updated
- [ ] Storage service enabled
- [ ] Storage security rules updated
- [ ] Firebase test page shows all green ✅
- [ ] Sample data seeded successfully

## Next Steps After Setup

1. **Test the app**: Visit `http://localhost:3001`
2. **Create child profile**: Use the login/signup flow
3. **Explore learning content**: Navigate through subjects and lessons
4. **Test parent dashboard**: Switch to parent mode
5. **Monitor usage**: Check Firebase Console for real-time data

## Support

If you encounter issues:
1. Check browser console for specific error messages
2. Verify all services are enabled in Firebase Console
3. Ensure security rules are properly set
4. Test connection using the Firebase test page

---

**Project Details:**
- Firebase Project ID: `quest4fun-f2ab6`
- App running on: `http://localhost:3001`
- Test page: `http://localhost:3001/firebase-test`
- Data seeding: `http://localhost:3001/seed-data`