import React, { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import { Sidebar } from './components/Sidebar';
import { Feed } from './components/Feed';
import { ProfileView } from './components/ProfileView';
import { Discover } from './components/Discover';
import { Marketplace } from './components/Marketplace';
import { Chat } from './components/Chat';
import { Auth } from './components/Auth';
import { motion, AnimatePresence } from 'motion/react';

const MainApp = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('feed');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-primary font-black text-4xl"
        >
          Velora
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-[260px] min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-4"
          >
            {activeTab === 'feed' && <Feed />}
            {activeTab === 'profile' && <ProfileView />}
            {activeTab === 'discover' && <Discover />}
            {activeTab === 'marketplace' && <Marketplace />}
            {activeTab === 'chat' && <Chat />}
            {['matrimony', 'professional'].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
                <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  >
                    {activeTab === 'chat' ? '💬' : '✨'}
                  </motion.div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 capitalize">{activeTab} Coming Soon</h2>
                <p className="text-gray-500 max-w-md">
                  We're working hard to bring the {activeTab} experience to Velora. Stay tuned for updates!
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
