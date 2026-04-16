import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Phone, Video, MoreVertical, Search, CheckCheck, MessageCircle } from 'lucide-react';
import { useAuth } from '../AuthContext';

export const Chat: React.FC = () => {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState<number | null>(0);

  const contacts = [
    { id: 0, name: 'Ananya Sharma', lastMsg: 'The compatibility score was amazing!', time: '2m ago', unread: 2, online: true },
    { id: 1, name: 'Rahul Verma', lastMsg: 'Are you free for a call tomorrow?', time: '1h ago', unread: 0, online: false },
    { id: 2, name: 'Priya Patel', lastMsg: 'Sent a photo', time: '3h ago', unread: 0, online: true },
  ];

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-2rem)] flex bg-white sleek-card overflow-hidden">
      {/* Sidebar */}
      <div className="w-[320px] border-r border-gray-100 flex flex-col bg-[#FAF9F6]/30">
        <div className="p-6 border-b border-gray-50">
          <h2 className="text-xl font-serif font-black text-primary uppercase tracking-tight mb-4 leading-none">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setActiveChat(contact.id)}
              className={`w-full p-4 flex items-center gap-4 transition-all border-b border-gray-50/50 ${
                activeChat === contact.id ? 'bg-primary/5' : 'hover:bg-primary-light/20'
              }`}
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden border border-gray-100 shadow-sm">
                  <img src={`https://picsum.photos/seed/chat${contact.id}/100/100`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                {contact.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-verified border-2 border-white rounded-full shadow-sm"></div>
                )}
              </div>
              <div className="flex-1 text-left overflow-hidden">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="font-serif font-black text-[13px] text-text-main truncate leading-none">{contact.name}</span>
                  <span className="text-[9px] text-text-muted uppercase font-black tracking-tighter">{contact.time}</span>
                </div>
                <p className={`text-[11px] truncate uppercase tracking-widest ${contact.unread > 0 ? 'text-primary font-black' : 'text-text-muted font-bold'}`}>{contact.lastMsg}</p>
              </div>
              {contact.unread > 0 && (
                <div className="min-w-[20px] h-[20px] bg-primary text-secondary text-[9px] font-black rounded-lg flex items-center justify-center px-1 shadow-lg shadow-primary/20">
                  {contact.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-[#FAF9F6]/20">
        {activeChat !== null ? (
          <>
            {/* Header */}
            <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 overflow-hidden border border-gray-100 shadow-sm relative">
                  <img src={`https://picsum.photos/seed/chat${activeChat}/100/100`} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="font-serif font-black text-sm text-text-main leading-tight leading-none">{contacts[activeChat].name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-1.5 h-1.5 bg-verified rounded-full"></div>
                    <p className="text-[9px] text-verified font-black uppercase tracking-[0.1em]">Online</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2.5 text-text-muted hover:text-primary hover:bg-primary/5 rounded-xl transition-all"><Phone size={18} /></button>
                <button className="p-2.5 text-text-muted hover:text-primary hover:bg-primary/5 rounded-xl transition-all"><Video size={18} /></button>
                <button className="p-2.5 text-text-muted hover:text-primary hover:bg-primary/5 rounded-xl transition-all"><MoreVertical size={18} /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-8 overflow-y-auto space-y-8 scrollbar-hide bg-[url('https://www.transparenttextures.com/patterns/royal-lineage.png')] opacity-80 decoration-primary/5">
              <div className="flex justify-center mb-10">
                <span className="px-4 py-1.5 bg-white border border-gray-100 text-text-muted text-[10px] font-black uppercase rounded-full shadow-sm tracking-widest border-primary/5">Today</span>
              </div>
              
              <div className="flex justify-start">
                <div className="max-w-[75%] p-5 bg-white rounded-3xl rounded-tl-none shadow-sm border border-gray-100">
                  <p className="text-[13px] text-text-main font-semibold leading-relaxed">Hey! I saw your profile on Velora. Your professional background is really impressive!</p>
                  <p className="text-[9px] text-text-muted mt-3 text-right font-black uppercase tracking-tighter opacity-60">10:42 AM</p>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="max-w-[75%] p-5 bg-primary text-secondary rounded-3xl rounded-tr-none shadow-2xl shadow-primary/20 border border-secondary/20">
                  <p className="text-[13px] font-semibold leading-relaxed">Thank you! I noticed we both love hiking. Have you been to the Sahyadris lately?</p>
                  <div className="flex items-center justify-end gap-1.5 mt-3">
                    <p className="text-[9px] font-black uppercase tracking-tighter opacity-80">10:45 AM</p>
                    <CheckCheck size={14} className="opacity-100 text-secondary" />
                  </div>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-[20px] border border-gray-100 shadow-inner">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="flex-1 bg-transparent px-4 py-2 text-sm font-bold focus:outline-none text-text-main"
                />
                <button className="w-12 h-12 bg-primary text-secondary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30 hover:bg-primary/95 transition-all active:scale-90 border border-secondary/20">
                  <Send size={20} className="ml-0.5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-white/50 backdrop-blur-md">
            <div className="w-24 h-24 bg-primary/5 rounded-[40px] flex items-center justify-center text-primary mb-8 border border-primary/10 shadow-inner">
              <MessageCircle size={48} />
            </div>
            <h3 className="text-2xl font-serif font-black text-primary tracking-tight uppercase mb-2">Conversations</h3>
            <p className="text-text-muted font-bold max-w-xs text-[10px] uppercase tracking-widest leading-relaxed opacity-60">Select a chat to start messaging your potential matches.</p>
          </div>
        )}
      </div>
    </div>
  );
};
