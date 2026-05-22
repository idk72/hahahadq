import Head from 'next/head';

// This is a mock database for a single-file setup.
// In production, you would connect this to a database like Supabase or MongoDB.
let globalImageStorage = {
  currentImageUrl: "https://i.imgur.com/4M3m9Kb.gif", // Default fallback image
  title: "My Hosted Media",
  description: "Check out this embed!"
};

// SERVER-SIDE COMPONENT (Handles Discord Crawler)
export default async function Page({ searchParams }) {
  // If you want to support multiple images, you can pass an ID in the URL: ?img=...
  const query = await searchParams;
  
  // Handle form submission (Server Action)
  async function updateEmbed(formData) {
    'use server'
    const newUrl = formData.get('imageUrl');
    const newTitle = formData.get('title');
    
    if (newUrl) {
      globalImageStorage.currentImageUrl = newUrl;
    }
    if (newTitle) {
      globalImageStorage.currentTitle = newTitle;
    }
  }

  return (
    <>
      {/* This forces Next.js to inject these tags into the HTML headers so Discord can read them */}
      <head>
        <title>{globalImageStorage.title}</title>
        <meta property="og:title" content={globalImageStorage.title} />
        <meta property="og:description" content={globalImageStorage.description} />
        <meta property="og:image" content={globalImageStorage.currentImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </head>

      <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
          
          <div className="text-center mb-6">
            <h1 className="text-2xl font-black tracking-tight text-indigo-400">React Embed Host</h1>
            <p className="text-xs text-slate-400 mt-1">Paste your media link below to host it for Discord</p>
          </div>

          {/* Configuration Form */}
          <form action={updateEmbed} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Image / GIF Direct URL
              </label>
              <input 
                type="url" 
                name="imageUrl"
                placeholder="https://example.com/image.gif"
                defaultValue={globalImageStorage.currentImageUrl}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Embed Title
              </label>
              <input 
                type="text" 
                name="title"
                placeholder="Cool GIF"
                defaultValue={globalImageStorage.title}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium text-sm py-2.5 rounded-lg transition"
            >
              Update Hosted Media
            </button>
          </form>

          <hr className="my-6 border-slate-800" />

          {/* Preview Section */}
          <div className="space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-widest mb-2">Live Live Preview</span>
              <img 
                src={globalImageStorage.currentImageUrl} 
                alt="Embed Preview" 
                className="max-h-48 w-auto mx-auto object-contain rounded"
              />
            </div>

            <CopyButton />
          </div>

        </div>
      </main>
    </>
  );
}

// CLIENT-SIDE REACT COMPONENT (For the Copy Button Interactivity)
function CopyButton() {
  return (
    <button 
      onClick={() => {
        navigator.clipboard.writeText(window.location.origin);
        alert("Link copied! Paste this main website URL directly into Discord.");
      }}
      className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-sm py-2 rounded-lg transition"
    >
      Copy Discord Link
    </button>
  );
}
