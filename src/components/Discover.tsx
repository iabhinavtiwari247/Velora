import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X, ShieldCheck, Sparkles, MapPin, Briefcase } from 'lucide-react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { Profile, User } from '../types';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const Discover: React.FC = () => {
  const [profiles, setProfiles] = useState<(Profile & { user: User })[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [compatibility, setCompatibility] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'profiles'), limit(10));
        const snapshot = await getDocs(q);
        const profilesData = await Promise.all(snapshot.docs.map(async (d) => {
          const profile = d.data() as Profile;
          const userDoc = await getDocs(query(collection(db, 'users'), where('uid', '==', profile.uid)));
          const user = userDoc.docs[0]?.data() as User;
          return { ...profile, user };
        }));
        setProfiles(profilesData.filter(p => p.user));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const currentProfile = profiles[currentIndex];

  const checkCompatibility = async () => {
    if (!currentProfile) return;
    setCompatibility('Analyzing compatibility...');
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the compatibility between two users for a matrimony platform.
        User 1 (Me): Software Engineer, Mumbai, Loves Hiking.
        User 2: ${currentProfile.professional.jobTitle || 'Professional'}, ${currentProfile.social.bio || 'Interested in life'}.
        Provide a short, encouraging compatibility score and reason in 2 sentences.`,
      });
      setCompatibility(response.text || 'High compatibility detected!');
    } catch (error) {
      setCompatibility('Compatibility analysis unavailable.');
    }
  };

  const handleAction = (type: 'like' | 'dislike') => {
    setCompatibility(null);
    setCurrentIndex(prev => prev + 1);
  };

  if (loading) return <div className="flex items-center justify-center h-[80vh]">Loading matches...</div>;
  if (!currentProfile) return <div className="flex items-center justify-center h-[80vh]">No more matches for today!</div>;

  return (
    <div className="max-w-md mx-auto py-12 px-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-serif font-black text-primary tracking-tight uppercase leading-none">Discover</h2>
          <p className="text-text-muted text-[10px] font-black uppercase tracking-widest mt-1 opacity-60">AI-Powered Matchmaking</p>
        </div>
        <div className="bg-primary/5 px-4 py-2 rounded-2xl border border-primary/10 shadow-inner">
          <p className="text-[9px] font-black text-primary uppercase tracking-widest leading-tight">Daily Limit</p>
          <p className="text-sm font-black text-text-main">12 / 20</p>
        </div>
      </div>

      <div className="relative aspect-[3/4] rounded-[48px] overflow-hidden shadow-2xl bg-white group border-[6px] border-white shadow-primary/10">
        <img 
          src={currentProfile.user.photoURL || `https://picsum.photos/seed/${currentProfile.uid}/600/800`} 
          alt="" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-3xl font-serif font-bold text-secondary">{currentProfile.user.displayName}, {currentProfile.matrimony.age || 26}</h2>
            {currentProfile.isVerified && <ShieldCheck className="text-secondary" size={24} />}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
              <MapPin size={12} className="text-secondary" /> Mumbai
            </span>
            <span className="px-3 py-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
              <Briefcase size={12} className="text-secondary" /> {currentProfile.professional.jobTitle || 'Professional'}
            </span>
          </div>

          <p className="text-[11px] font-medium opacity-80 line-clamp-2 mb-8 leading-relaxed uppercase tracking-wide">
            {currentProfile.social.bio || 'Looking for a meaningful connection and a partner to share life\'s adventures with.'}
          </p>

          <AnimatePresence>
            {compatibility && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-10 p-5 bg-secondary/20 backdrop-blur-2xl border border-secondary/30 rounded-3xl flex gap-3 items-start shadow-xl shadow-black/20"
              >
                <Sparkles className="text-secondary-light shrink-0" size={20} />
                <p className="text-[11px] font-bold text-white leading-relaxed tracking-wider">{compatibility}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-center gap-6">
            <button 
              onClick={() => handleAction('dislike')}
              className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90 shadow-lg"
            >
              <X size={32} />
            </button>
            <button 
              onClick={checkCompatibility}
              className="w-20 h-20 rounded-[32px] bg-secondary flex items-center justify-center text-primary shadow-2xl shadow-secondary/40 hover:scale-105 active:scale-95 transition-all border-4 border-white/20"
            >
              <Sparkles size={40} className="fill-primary" />
            </button>
            <button 
              onClick={() => handleAction('like')}
              className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90 shadow-lg"
            >
              <Heart size={32} className="fill-white" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-[10px] text-text-muted font-black uppercase tracking-[0.2em]">Swipe to find your Velora match</p>
      </div>
    </div>
  );
};
