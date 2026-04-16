import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Briefcase, User, ShieldCheck, MapPin, Calendar, Book, Award } from 'lucide-react';
import { useAuth } from '../AuthContext';

export const ProfileView: React.FC = () => {
  const { user } = useAuth();
  const [activeLayer, setActiveLayer] = useState<'matrimony' | 'social' | 'professional'>('matrimony');

  if (!user) return null;

  const layers = [
    { id: 'matrimony', icon: Heart, label: 'Matrimony' },
    { id: 'social', icon: User, label: 'Social' },
    { id: 'professional', icon: Briefcase, label: 'Professional' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Profile Header */}
      <div className="sleek-card p-8 mb-8 bg-white shadow-xl shadow-primary/5">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-3xl bg-secondary-light/30 border-4 border-white shadow-xl overflow-hidden shadow-primary/10">
              <img src={user.photoURL || `https://picsum.photos/seed/${user.uid}/200/200`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-secondary p-2 rounded-xl border-4 border-white shadow-lg">
              <ShieldCheck size={18} />
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
              <h2 className="text-3xl font-serif font-black text-text-main leading-tight">{user.displayName}</h2>
              <span className="px-3 py-1 bg-secondary text-primary text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-secondary/20">
                {user.subscriptionTier} Member
              </span>
            </div>
            <p className="text-text-muted flex items-center justify-center md:justify-start gap-1 mb-6 font-bold text-xs uppercase tracking-widest opacity-70">
              <MapPin size={16} className="text-primary" /> Mumbai, Maharashtra
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {[
                { label: 'Followers', val: '1.2k' },
                { label: 'Matches', val: '45' },
                { label: 'Groups', val: '12' }
              ].map(stat => (
                <div key={stat.label} className="text-center px-6 py-3 bg-[#FAF9F6] rounded-2xl border border-gray-100 shadow-sm border-primary/5">
                  <p className="text-xl font-serif font-black text-primary leading-none mb-1">{stat.val}</p>
                  <p className="text-[10px] text-text-muted font-black uppercase tracking-widest opacity-60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            <button className="px-8 py-4 bg-primary text-secondary font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-primary/95 transition-all shadow-xl shadow-primary/30 active:scale-95 leading-none">
              Edit Branding
            </button>
            <button className="px-8 py-4 border-2 border-primary/10 text-primary font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-primary/5 transition-all leading-none">
              Share Profile
            </button>
          </div>
        </div>
      </div>

      {/* Layer Tabs */}
      <div className="flex bg-white p-1.5 rounded-[24px] mb-8 border border-gray-100 shadow-xl shadow-primary/5">
        {layers.map((layer) => (
          <button
            key={layer.id}
            onClick={() => setActiveLayer(layer.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl transition-all text-[10px] font-black uppercase tracking-widest ${
              activeLayer === layer.id 
                ? 'bg-primary text-secondary shadow-lg shadow-primary/20 scale-105 z-10' 
                : 'text-text-muted hover:text-primary hover:bg-primary-light/20'
            }`}
          >
            <layer.icon size={18} />
            <span>{layer.label} Profile</span>
          </button>
        ))}
      </div>

      {/* Layer Content */}
      <motion.div
        key={activeLayer}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div className="md:col-span-2 space-y-8">
          {activeLayer === 'matrimony' && (
            <div className="sleek-card p-8 space-y-8">
              <h3 className="text-xl font-black text-text-main flex items-center gap-2 uppercase tracking-tight">
                <Heart className="text-primary fill-primary" /> Matrimonial Details
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {[
                  { label: 'Age', val: '28 Years' },
                  { label: 'Religion', val: 'Hindu' },
                  { label: 'Caste', val: 'Brahmin' },
                  { label: 'Height', val: "5' 10\"" },
                  { label: 'Salary', val: '₹18 - 25 LPA' },
                  { label: 'Gotra', val: 'Vashistha' }
                ].map(item => (
                  <div key={item.label}>
                    <p className="text-[10px] text-text-muted uppercase font-black tracking-widest mb-1">{item.label}</p>
                    <p className="font-bold text-text-main">{item.val}</p>
                  </div>
                ))}
              </div>
              <div className="pt-8 border-t border-gray-50">
                <h4 className="font-black text-text-main mb-3 uppercase text-xs tracking-widest">About My Family</h4>
                <p className="text-sm text-text-muted leading-relaxed font-medium">
                  We are a close-knit family based in Mumbai. My father is a retired banker, and my mother is a homemaker. I have one younger sister who is currently pursuing her MBA.
                </p>
              </div>
            </div>
          )}

          {activeLayer === 'social' && (
            <div className="space-y-8">
              <div className="sleek-card p-8">
                <h3 className="text-xl font-black text-text-main mb-4 uppercase tracking-tight">About Me</h3>
                <p className="text-sm text-text-muted leading-relaxed font-medium">
                  Passionate about technology, travel, and photography. I love exploring new cultures and trying out different cuisines. Looking for someone who shares a similar zest for life.
                </p>
                <div className="flex flex-wrap gap-2 mt-8">
                  {['Photography', 'Hiking', 'Tech', 'Cooking', 'Jazz'].map(tag => (
                    <span key={tag} className="px-4 py-2 bg-primary-light/20 text-primary text-[11px] font-black rounded-xl border border-primary-light/30">
                      #{tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <img src={`https://picsum.photos/seed/post${i}/400/400`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeLayer === 'professional' && (
            <div className="sleek-card p-8 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-text-main flex items-center gap-2 uppercase tracking-tight">
                  <Briefcase className="text-primary" /> Professional
                </h3>
                <div className="verified-badge">
                  <ShieldCheck size={16} /> Verified Skills
                </div>
              </div>
              
              <div className="space-y-8">
                {[
                  { title: 'Senior Software Engineer', company: 'Google India', duration: 'Jan 2021 - Present' },
                  { title: 'Software Engineer', company: 'Microsoft', duration: 'Jun 2018 - Dec 2020' }
                ].map((exp, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-100">
                      <Award className="text-text-muted" size={24} />
                    </div>
                    <div>
                      <p className="font-black text-text-main">{exp.title}</p>
                      <p className="text-xs text-text-muted font-bold">{exp.company} • Full-time</p>
                      <p className="text-[10px] text-text-muted font-bold opacity-60 uppercase tracking-tighter mt-1">{exp.duration}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-gray-50">
                <h4 className="font-black text-text-main mb-5 uppercase text-xs tracking-widest">Skills & Endorsements</h4>
                <div className="flex flex-wrap gap-3">
                  {['React', 'TypeScript', 'System Design', 'Cloud Computing'].map(skill => (
                    <div key={skill} className="px-5 py-2.5 bg-gray-50 border border-gray-100 rounded-[14px] flex items-center gap-3 hover:bg-white hover:border-primary-light transition-all cursor-default">
                      <span className="font-bold text-xs text-text-main">{skill}</span>
                      <span className="text-[10px] font-black text-primary bg-primary-light/40 px-2 py-0.5 rounded-lg shadow-inner">12</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="sleek-card p-6">
            <h4 className="font-black text-text-main mb-6 uppercase text-xs tracking-widest">Trust Index</h4>
            <div className="space-y-3">
              {[
                { label: 'Aadhaar Verified', status: 'verified', icon: ShieldCheck },
                { label: 'PAN Verified', status: 'verified', icon: ShieldCheck },
                { label: 'Physical Visit', status: 'pending', icon: MapPin }
              ].map(kyc => (
                <div key={kyc.label} className={`flex items-center justify-between p-4 rounded-xl border ${
                  kyc.status === 'verified' ? 'bg-verified/5 border-verified/20' : 'bg-gray-50 border-gray-100'
                }`}>
                  <div className="flex items-center gap-3">
                    <kyc.icon className={kyc.status === 'verified' ? 'text-verified' : 'text-text-muted'} size={18} />
                    <span className={`text-xs font-bold ${kyc.status === 'verified' ? 'text-verified' : 'text-text-muted'}`}>
                      {kyc.label.toUpperCase()}
                    </span>
                  </div>
                  {kyc.status === 'pending' && <button className="text-[10px] font-black text-primary hover:underline">REQUEST</button>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary via-primary to-[#4A0A19] rounded-[40px] p-10 text-white shadow-2xl shadow-primary/40 relative overflow-hidden group border border-secondary/20">
            <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-secondary/20 transition-all"></div>
            <h4 className="font-serif italic text-2xl text-secondary mb-3 relative z-10 tracking-wide">Velora Prime</h4>
            <p className="text-xs opacity-90 mb-10 relative z-10 leading-loose font-bold uppercase tracking-widest">Your profile is currently boosted by 10x. Discover elite connections today.</p>
            <button className="w-full py-5 bg-secondary text-primary font-black text-[10px] uppercase tracking-[0.2em] rounded-[20px] shadow-2xl shadow-secondary/40 hover:scale-[1.05] transition-transform relative z-10">
              Upgrade to Ultimate
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
