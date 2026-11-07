// Re-export from standard TypeScript module lib/firebase for backwards compatibility
export * from "./lib/firebase";
export {
  auth,
  googleProvider,
  appleProvider,
  signInWithGoogle,
  signInWithApple,
  signInWithEmail,
  signUpWithEmail,
  logOut,
} from "./lib/firebase";
