import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Star, MapPin, Camera, Utensils, Home, Music } from 'lucide-react';

export const Marketplace: React.FC = () => {
  const categories = [
    { name: 'Venues', icon: Home, color: 'bg-blue-100 text-blue-600' },
    { name: 'Catering', icon: Utensils, color: 'bg-orange-100 text-orange-600' },
    { name: 'Photography', icon: Camera, color: 'bg-purple-100 text-purple-600' },
    { name: 'Music', icon: Music, color: 'bg-pink-100 text-pink-600' },
  ];

  const vendors = [
    {
      name: 'The Grand Palace',
      category: 'Venue',
      rating: 4.9,
      reviews: 128,
      price: '₹2,50,000+',
      location: 'South Mumbai',
      image: 'https://picsum.photos/seed/venue1/400/300'
    },
    {
      name: 'Royal Flavors',
      category: 'Catering',
      rating: 4.8,
      reviews: 85,
      price: '₹1,200/plate',
      location: 'Bandra West',
      image: 'https://picsum.photos/seed/food1/400/300'
    },
    {
      name: 'Eternal Moments',
      category: 'Photography',
      rating: 4.9,
      reviews: 210,
      price: '₹80,000/day',
      location: 'Andheri East',
      image: 'https://picsum.photos/seed/photo1/400/300'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-serif font-black text-primary tracking-tight uppercase mb-1 flex items-center gap-3 leading-none">
            <ShoppingBag className="text-primary" /> Marketplace
          </h2>
          <p className="text-text-muted font-bold text-[10px] uppercase tracking-widest opacity-60">Discover top-rated vendors for your big day</p>
        </div>
        <div className="flex gap-2">
          {['All Vendors', 'High Rated', 'New Arrival'].map(f => (
            <button key={f} className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-muted hover:border-primary hover:text-primary transition-all shadow-sm">
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {categories.map((cat) => (
          <button key={cat.name} className="p-8 sleek-card hover:border-primary/30 hover:shadow-xl transition-all flex flex-col items-center gap-4 group bg-white">
            <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}>
              <cat.icon size={26} />
            </div>
            <span className="font-black text-text-main text-[11px] uppercase tracking-[0.2em]">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Featured Vendors */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-serif font-black text-primary uppercase tracking-tight">Featured Vendors</h3>
        <button className="text-primary text-xs font-black uppercase tracking-widest hover:underline">View All</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {vendors.map((vendor) => (
          <motion.div 
            key={vendor.name}
            whileHover={{ y: -8 }}
            className="sleek-card overflow-hidden group cursor-pointer bg-white"
          >
            <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
              <img src={vendor.image} alt="" className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute top-4 left-4 px-4 py-2 bg-primary/90 backdrop-blur-md rounded-xl text-[10px] font-black text-secondary shadow-lg border border-primary/20 uppercase tracking-widest">
                {vendor.category}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-serif font-black text-lg text-text-main">{vendor.name}</h4>
                <div className="flex items-center gap-1.5 text-secondary">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm font-black">{vendor.rating}</span>
                </div>
              </div>
              <p className="text-text-muted text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 mb-6 opacity-60">
                <MapPin size={14} className="text-primary" /> {vendor.location}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <span className="font-serif font-black text-primary text-xl tracking-tight">{vendor.price}</span>
                <button className="px-5 py-2.5 bg-primary text-secondary text-[9px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                  Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
