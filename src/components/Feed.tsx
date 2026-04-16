import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Play, Sparkles, MapPin, ShieldCheck, UserPlus, ShoppingBag } from 'lucide-react';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { Post } from '../types';

export const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(20));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
      
      if (postsData.length === 0) {
        setPosts([
          {
            id: 'mock1',
            authorUid: 'system',
            authorName: 'Velora Team',
            type: 'post',
            mediaUrl: 'https://picsum.photos/seed/velora1/800/800',
            caption: 'Welcome to Velora! Start your journey to find a meaningful connection today. ✨',
            likesCount: 1240,
            createdAt: new Date()
          },
          {
            id: 'mock2',
            authorUid: 'system',
            authorName: 'Aditi Rao',
            type: 'reel',
            mediaUrl: 'https://picsum.photos/seed/velora2/800/800',
            caption: 'Exploring the Sahyadris! Anyone up for a trek next weekend? 🏔️ #Hiking #Social',
            likesCount: 856,
            createdAt: new Date()
          }
        ]);
      } else {
        setPosts(postsData);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto py-6 px-4 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
      <div className="space-y-6">
        {/* Stories/Reels Row */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex-shrink-0 relative group">
              <div className="w-[100px] h-[160px] rounded-2xl bg-gray-200 overflow-hidden border-2 border-secondary shadow-sm hover:scale-[1.02] transition-transform">
                <img src={`https://picsum.photos/seed/reel${i}/200/320`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
                <span className="absolute bottom-2 left-2 text-[10px] text-white font-black leading-tight">Misty Mornings</span>
              </div>
            </div>
          ))}
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
            {posts.map((post) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="sleek-card overflow-hidden bg-white hover:shadow-xl transition-shadow"
              >
                {/* Post Header */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden border border-gray-100 shadow-inner">
                      <img src={post.authorPhoto || `https://picsum.photos/seed/${post.authorUid}/100/100`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h4 className="font-serif font-black text-sm text-text-main leading-none">{post.authorName || 'User'}</h4>
                      <p className="text-[10px] text-text-muted font-black tracking-widest uppercase mt-1">2h ago • Mumbai, MH</p>
                    </div>
                  </div>
                  <button className="text-secondary text-[10px] font-black hover:bg-primary/90 px-4 py-2 bg-primary rounded-xl transition-all flex items-center gap-1.5 shadow-lg shadow-primary/20 uppercase tracking-widest active:scale-95">
                    <UserPlus size={14} /> Connect
                  </button>
                </div>
  
                {/* Post Content */}
                <div className="px-5 pb-4">
                  <p className="text-sm text-text-main leading-relaxed font-medium">{post.caption}</p>
                </div>
  
                {/* Post Media */}
                <div className="aspect-video bg-gray-50 relative group">
                  <img src={post.mediaUrl} alt="" className="w-full h-full object-cover shadow-inner" referrerPolicy="no-referrer" />
                  {post.type === 'reel' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-all">
                      <Play className="text-white fill-white drop-shadow-lg" size={40} />
                    </div>
                  )}
                </div>
  
                {/* Post Actions */}
                <div className="p-4 border-t border-gray-50 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-8 px-2">
                    <button className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors font-black text-[11px] uppercase tracking-widest">
                      <Heart size={20} className="hover:fill-primary" /> {post.likesCount}
                    </button>
                    <button className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors font-black text-[11px] uppercase tracking-widest">
                      <MessageCircle size={20} /> 12
                    </button>
                    <button className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors font-black text-[11px] uppercase tracking-widest">
                      <Share2 size={20} /> Share
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 text-primary text-[10px] font-black uppercase tracking-[0.2em] bg-secondary-light/30 px-3 py-1.5 rounded-xl border border-secondary/20 shadow-sm">
                    <Sparkles size={14} className="text-primary" /> Match: 94%
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="hidden lg:flex flex-col gap-6">
        <div className="sleek-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xs font-black text-text-main uppercase tracking-widest">AI Matches</h5>
            <button className="text-[10px] font-bold text-primary">VIEW ALL</button>
          </div>
          
          <div className="space-y-3">
            {[
              { name: 'Ananya Iyer, 26', sub: 'CA • Mumbai', tag: 'High Compatibility' },
              { name: 'Sneha Kapoor, 27', sub: 'Doctor • Delhi', tag: 'Common Interests' },
              { name: 'Riya Varma, 29', sub: 'Architect • Pune', tag: 'Values Match' }
            ].map((match, i) => (
              <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden border-2 border-transparent group-hover:border-primary">
                  <img src={`https://picsum.photos/seed/match${i}/100/100`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h6 className="text-sm font-bold text-text-main truncate">{match.name}</h6>
                  <p className="text-[10px] text-text-muted truncate mb-1">{match.sub}</p>
                  <span className="text-[9px] font-black uppercase text-primary bg-primary/5 px-1.5 py-0.5 rounded tracking-tighter shadow-sm">{match.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <h6 className="text-[10px] font-black text-amber-800 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <ShoppingBag size={14} /> Wedding Marketplace
          </h6>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {['Venues (24)', 'Caterers (12)', 'Photo (08)', 'Decor (15)'].map(item => (
              <div key={item} className="bg-white p-2 rounded-lg text-[10px] font-bold text-amber-700 border border-amber-100 shadow-sm text-center">
                {item}
              </div>
            ))}
          </div>
          <button className="w-full py-2 bg-transparent border border-amber-500 rounded-xl text-amber-700 text-xs font-bold hover:bg-amber-100 transition-colors">
            Explore Vendors
          </button>
        </div>

        <div className="mt-auto pt-8 border-t border-gray-200 opacity-30 text-[9px] font-bold text-center tracking-widest uppercase">
          © 2026 Velora Social-Matrimony
        </div>
      </aside>
    </div>
  );
};
