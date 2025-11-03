# Quest4Fun - Educational Learning Platform

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Quest4Fun is an interactive educational platform designed for children to learn various subjects through engaging lessons, quizzes, and rewards.

## Features

- 🎓 Interactive learning modules for Math, English, Science, and Art
- 👶 Child-friendly UI with colorful design and animations
- 🏆 Reward system with badges, stars, and coins
- 📊 Parent dashboard to track children's progress
- 🔥 Streak tracking and daily challenges
- 🎮 Game-based learning activities

## Prerequisites

- Node.js 18+ installed
- Firebase project set up (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Nitesh-Badgujar-28906/Quest4Fun.git
cd Quest4Fun
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the `.env.example` file to `.env.local` and fill in your Firebase configuration:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Firebase project credentials from the [Firebase Console](https://console.firebase.google.com/):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Set up Firebase (First Time Only)

1. Follow the instructions in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) to configure Firebase services
2. Visit `http://localhost:3000/firebase-test` to verify your Firebase connection
3. Visit `http://localhost:3000/seed-data` to populate sample data

## Building for Production

```bash
npm run build
```

This will create an optimized production build in the `.next` folder.

To test the production build locally:

```bash
npm run build
npm start
```

## Deploy on Vercel

The easiest way to deploy Quest4Fun is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

### Deployment Steps:

1. **Push your code to GitHub** (if not already done)

2. **Import your repository to Vercel:**
   - Go to [Vercel](https://vercel.com)
   - Click "Add New Project"
   - Import your Quest4Fun repository

3. **Configure Environment Variables:**
   - In the Vercel project settings, go to "Environment Variables"
   - Add all the environment variables from your `.env.local` file:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
     NEXT_PUBLIC_FIREBASE_PROJECT_ID
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
     NEXT_PUBLIC_FIREBASE_APP_ID
     NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
     ```

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application
   - Your app will be available at `https://your-project-name.vercel.app`

### Important Notes for Vercel Deployment:

- ✅ All ESLint errors have been fixed to ensure successful builds
- ✅ Firebase is configured to only initialize on the client-side
- ✅ Diagnostic pages (`/firebase-test`, `/firebase-diagnostic`, `/seed-data`) are marked as dynamic to prevent SSR issues
- ✅ The build command has been optimized for Vercel (no Turbopack in production)

### Troubleshooting Deployment Issues:

If you encounter deployment issues:

1. **Check Environment Variables:** Ensure all Firebase environment variables are set in Vercel
2. **Review Build Logs:** Check the Vercel deployment logs for specific errors
3. **Verify Firebase Configuration:** Make sure your Firebase project is properly configured with Authentication, Firestore, and Storage enabled

## Project Structure

```
Quest4Fun/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── context/          # React context providers
│   ├── lib/              # Utility libraries (Firebase, etc.)
│   ├── types/            # TypeScript type definitions
│   └── data/             # Sample data and constants
├── public/               # Static assets
├── .env.example          # Environment variable template
├── vercel.json           # Vercel configuration
└── next.config.ts        # Next.js configuration
```

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Firebase Documentation](https://firebase.google.com/docs) - learn about Firebase services
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - animation library for React

## Contributing

See [QUICK_FIX_GUIDE.md](./QUICK_FIX_GUIDE.md) for common issues and best practices.

## License

This project is open source and available under the MIT License.
