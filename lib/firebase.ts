import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  type Auth,
  type UserCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    (typeof process !== "undefined" ? process.env.VITE_FIREBASE_API_KEY : "") ||
    "",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    (typeof process !== "undefined" ? process.env.VITE_FIREBASE_AUTH_DOMAIN : "") ||
    "",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    (typeof process !== "undefined" ? process.env.VITE_FIREBASE_PROJECT_ID : "") ||
    "",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    (typeof process !== "undefined" ? process.env.VITE_FIREBASE_STORAGE_BUCKET : "") ||
    "",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    (typeof process !== "undefined" ? process.env.VITE_FIREBASE_MESSAGING_SENDER_ID : "") ||
    "",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    (typeof process !== "undefined" ? process.env.VITE_FIREBASE_APP_ID : "") ||
    "",
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.apiKey !== "your_firebase_api_key_here" &&
    firebaseConfig.projectId
);

let app: FirebaseApp;
let auth: Auth;

if (getApps().length > 0) {
  app = getApp();
  auth = getAuth(app);
} else {
  // Use config or safe fallback to prevent build-time crashes when env vars are missing
  const activeConfig = isFirebaseConfigured
    ? firebaseConfig
    : {
        apiKey: "AIzaSyDummyKeyForBuildOnly1234567890",
        authDomain: "dummy-app.firebaseapp.com",
        projectId: "dummy-project",
        storageBucket: "dummy-app.appspot.com",
        messagingSenderId: "123456789012",
        appId: "1:123456789012:web:abcdef1234567890",
      };

  app = initializeApp(activeConfig);
  auth = getAuth(app);
}

export { app, auth };

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Apple Auth Provider
export const appleProvider = new OAuthProvider("apple.com");
appleProvider.addScope("email");
appleProvider.addScope("name");

function ensureConfigured() {
  if (!isFirebaseConfigured) {
    throw new Error(
      "Firebase credentials are not configured yet. Please add your NEXT_PUBLIC_FIREBASE_* credentials to .env.local"
    );
  }
}

export async function signInWithGoogle(): Promise<UserCredential> {
  ensureConfigured();
  return await signInWithPopup(auth, googleProvider);
}

export async function signInWithApple(): Promise<UserCredential> {
  ensureConfigured();
  return await signInWithPopup(auth, appleProvider);
}

export async function signInWithEmail(email: string, password: string): Promise<UserCredential> {
  ensureConfigured();
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName?: string
): Promise<UserCredential> {
  ensureConfigured();
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName && credential.user) {
    await updateProfile(credential.user, { displayName });
  }
  return credential;
}

export async function logOut(): Promise<void> {
  return await signOut(auth);
}

export function getFriendlyAuthErrorMessage(error: unknown): string {
  if (!error) return "An unexpected error occurred.";
  const err = error as { code?: string; message?: string };
  const code = err.code || "";

  switch (code) {
    case "auth/popup-closed-by-user":
      return "The sign-in popup was closed before completing authentication.";
    case "auth/popup-blocked":
      return "The sign-in popup was blocked by your browser. Please allow popups for this site.";
    case "auth/cancelled-popup-request":
      return "Only one sign-in attempt can be in progress at a time.";
    case "auth/unauthorized-domain":
      return "This domain is not authorized in Firebase. In the Firebase Console, go to Authentication > Settings > Authorized domains and ensure 'localhost' is added.";
    case "auth/operation-not-allowed":
      return "This authentication provider is not enabled in Firebase Console. Go to Authentication > Sign-in method and enable it.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email address or password.";
    case "auth/email-already-in-use":
      return "An account with this email address already exists. Please sign in instead.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with the same email using a different sign-in provider.";
    default:
      return err.message || "Authentication failed. Please try again.";
  }
}
