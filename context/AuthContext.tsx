"use client";

import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User, type UserCredential } from "firebase/auth";
import {
  auth,
  signInWithGoogle as fbSignInWithGoogle,
  signInWithApple as fbSignInWithApple,
  signInWithEmail as fbSignInWithEmail,
  signUpWithEmail as fbSignUpWithEmail,
  logOut as fbLogOut,
  getFriendlyAuthErrorMessage,
  isFirebaseConfigured,
} from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authError: string | null;
  isFirebaseConfigured: boolean;
  clearError: () => void;
  signInWithGoogle: () => Promise<UserCredential>;
  signInWithApple: () => Promise<UserCredential>;
  signInWithEmail: (email: string, password: string) => Promise<UserCredential>;
  signUpWithEmail: (
    email: string,
    password: string,
    displayName?: string
  ) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const clearError = () => setAuthError(null);

  const signInWithGoogle = async (): Promise<UserCredential> => {
    setAuthError(null);
    try {
      const result = await fbSignInWithGoogle();
      setUser(result.user);
      return result;
    } catch (error) {
      const message = getFriendlyAuthErrorMessage(error);
      setAuthError(message);
      throw error;
    }
  };

  const signInWithApple = async (): Promise<UserCredential> => {
    setAuthError(null);
    try {
      const result = await fbSignInWithApple();
      setUser(result.user);
      return result;
    } catch (error) {
      const message = getFriendlyAuthErrorMessage(error);
      setAuthError(message);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string): Promise<UserCredential> => {
    setAuthError(null);
    try {
      const result = await fbSignInWithEmail(email, password);
      setUser(result.user);
      return result;
    } catch (error) {
      const message = getFriendlyAuthErrorMessage(error);
      setAuthError(message);
      throw error;
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    displayName?: string
  ): Promise<UserCredential> => {
    setAuthError(null);
    try {
      const result = await fbSignUpWithEmail(email, password, displayName);
      setUser(result.user);
      return result;
    } catch (error) {
      const message = getFriendlyAuthErrorMessage(error);
      setAuthError(message);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    setAuthError(null);
    try {
      await fbLogOut();
      setUser(null);
    } catch (error) {
      const message = getFriendlyAuthErrorMessage(error);
      setAuthError(message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authError,
        isFirebaseConfigured,
        clearError,
        signInWithGoogle,
        signInWithApple,
        signInWithEmail,
        signUpWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
