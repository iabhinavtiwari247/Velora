import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ShieldCheck, Mail, Phone, ArrowRight } from 'lucide-react';
import { auth, db, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

export const Auth: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'user',
          subscriptionTier: 'free',
          createdAt: serverTimestamp(),
        });

        // Initialize empty profile
        await setDoc(doc(db, 'profiles', user.uid), {
          uid: user.uid,
          gender: 'male', // Default, should be asked in onboarding
          matrimony: {},
          social: { interests: [] },
          professional: { skills: [] },
          isVerified: false,
          visibility: 'public'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full sleek-card grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Side: Brand Visual */}
        <div className="hidden md:flex flex-col items-center justify-center p-12 bg-primary text-white relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/royal-lineage.png')]"></div>
          <img 
            src="https://storage.googleapis.com/antigravity-dev-images/d38f8cf6-c39c-48c9-bc84-9a8bb6ba63d7.png" 
            alt="Velora Brand" 
            className="w-64 h-64 object-contain mb-8 relative z-10"
            referrerPolicy="no-referrer"
          />
          <h2 className="text-4xl font-serif italic text-secondary text-center mb-4 relative z-10">Velora</h2>
          <p className="text-xs font-black tracking-[0.3em] uppercase text-secondary/80 text-center leading-loose relative z-10">
            Connected by Heart,<br />Committed for Life
          </p>
        </div>

        {/* Right Side: Auth Form */}
        <div className="p-10 md:p-14 text-center flex flex-col justify-center">
          <div className="md:hidden inline-flex items-center justify-center w-16 h-16 bg-primary/5 rounded-2xl mb-6">
            <img src="https://storage.googleapis.com/antigravity-dev-images/d38f8cf6-c39c-48c9-bc84-9a8bb6ba63d7.png" alt="" className="w-10 h-10 object-contain" />
          </div>
          <h1 className="text-3xl font-serif font-black text-text-main tracking-tight mb-2">Welcome Back</h1>
          <p className="text-text-muted font-medium mb-10 text-sm">Join India's most trusted hybrid matrimonial network.</p>

          <div className="space-y-4 text-left">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 bg-primary text-secondary rounded-2xl font-black hover:bg-primary/95 transition-all disabled:opacity-50 shadow-xl shadow-primary/20"
            >
              <img src="https://www.google.com/favicon.ico" alt="" className="w-5 h-5 brightness-200" />
              Continue with Google
            </button>
            
            <div className="relative py-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-black text-text-muted">
                <span className="bg-white px-4">Secure Access</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-4 bg-white border border-gray-100 rounded-2xl font-black text-text-main hover:bg-gray-50 transition-all text-[10px] uppercase tracking-widest">
                <Phone size={16} className="text-primary" /> Phone
              </button>
              <button className="flex items-center justify-center gap-2 py-4 bg-white border border-gray-100 rounded-2xl font-black text-text-main hover:bg-gray-50 transition-all text-[10px] uppercase tracking-widest">
                <Mail size={16} className="text-primary" /> Email
              </button>
            </div>
          </div>

          <div className="mt-12 p-5 bg-secondary-light/30 rounded-[20px] border border-secondary/10 flex items-start gap-4 text-left">
            <ShieldCheck className="text-primary shrink-0" size={24} />
            <div>
              <p className="text-[10px] font-black text-primary uppercase tracking-wider mb-1">Aadhaar & PAN Inspected</p>
              <p className="text-[10px] text-text-muted font-bold leading-normal">Every profile undergoes a strict multi-layer verification process for your peace of mind.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
