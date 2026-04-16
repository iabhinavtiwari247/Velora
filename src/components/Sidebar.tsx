import React from 'react';
import { motion } from 'motion/react';
import { 
  Home, 
  Search, 
  Heart, 
  MessageCircle, 
  User, 
  Briefcase, 
  PlusSquare, 
  Settings,
  LogOut,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { auth } from '../firebase';
import { useAuth } from '../AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();

  const menuItems = [
    { id: 'feed', icon: Home, label: 'Feed' },
    { id: 'discover', icon: Search, label: 'Discover' },
    { id: 'matrimony', icon: Heart, label: 'Matrimony' },
    { id: 'professional', icon: Briefcase, label: 'Professional' },
    { id: 'chat', icon: MessageCircle, label: 'Messages' },
    { id: 'marketplace', icon: ShoppingBag, label: 'Marketplace' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="w-[260px] h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-8 pb-4">
        <div className="flex flex-col items-center gap-2 mb-6 text-center">
          <img 
            src="https://storage.googleapis.com/antigravity-dev-images/d38f8cf6-c39c-48c9-bc84-9a8bb6ba63d7.png" 
            alt="Velora Logo" 
            className="w-20 h-20 object-contain"
            referrerPolicy="no-referrer"
          />
          <div>
            <h1 className="text-2xl font-serif font-black text-primary tracking-tight">
              Velora
            </h1>
            <p className="text-[8px] text-secondary font-black tracking-[0.2em] uppercase mt-1">
              Connected by Heart
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-primary text-secondary font-bold shadow-lg shadow-primary/20' 
                : 'text-text-muted hover:bg-primary-light/30 hover:text-primary'
            }`}
          >
            <item.icon size={18} className={activeTab === item.id ? 'text-secondary' : 'text-text-muted'} />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-50">
        {user && (
          <div className="flex items-center gap-3 px-4 py-3 mb-4 bg-secondary-light/50 rounded-xl border border-secondary/20">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-secondary font-bold border-2 border-secondary shadow-sm">
              {user.displayName?.[0] || 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate text-text-main">{user.displayName}</p>
              <p className="text-[10px] text-primary font-bold uppercase tracking-wider">{user.subscriptionTier} member</p>
            </div>
          </div>
        )}
        <button 
          onClick={() => auth.signOut()}
          className="w-full flex items-center gap-3 px-4 py-3 text-text-muted hover:bg-red-50 hover:text-red-500 rounded-xl transition-all text-sm font-semibold"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
