'use client';

import { useState } from 'react';
import { saveEmbedData } from './actions';

export default function ClientDashboard({ initialData }) {
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl);
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  
  const [isSaving, setIsSaving] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await saveEmbedData({ imageUrl, title, description });
    setIsSaving(false);
    alert("Saved permanently to database!");
  };

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      // Add a timestamp query to bust Discord's cache when testing updates
      const shareUrl = `${window.location.origin}/?t=${Date.now()}`;
      navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-black tracking-tight text-indigo-400">React Embed Host</h1>
        <p className="text-xs text-slate-400 mt-1">Data is stored permanently in the database</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Image / GIF URL</label>
          <input 
            type="url" 
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Description</label>
          <input 
            type="text" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white font-medium text-sm py-2 rounded-lg transition"
        >
          {isSaving ? 'Saving to Database...' : 'Save Configuration'}
        </button>
      </div>

      <hr className="my-6 border-slate-800" />

      <div className="space-y-4">
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
          <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-widest mb-2">Live Preview</span>
          <div className="text-sm font-semibold text-indigo-400 mb-1">{title}</div>
          <div className="text-xs text-slate-400 mb-3">{description}</div>
          <img 
            src={imageUrl} 
            alt="Preview" 
            className="max-h-48 w-auto mx-auto object-contain rounded"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=Invalid+Image'; }}
          />
        </div>

        <button 
          onClick={handleCopy}
          className={`w-full font-medium text-sm py-2.5 rounded-lg transition ${
            isCopied ? 'bg-slate-700 text-emerald-400 border border-emerald-500/30' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
          }`}
        >
          {isCopied ? '✓ Link Copied!' : 'Copy Link for Discord'}
        </button>
      </div>
    </div>
  );
}
