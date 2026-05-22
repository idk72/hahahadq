import { getEmbedData } from './actions';
import ClientDashboard from './ClientDashboard';

// This forces Next.js to fetch fresh data every time Discord or a user loads the link
export const revalidate = 0;

export default async function Page() {
  // Fetch permanent data from database during server render
  const initialData = await getEmbedData();

  return (
    <>
      <head>
        <title>{initialData.title}</title>
        <meta property="og:title" content={initialData.title} />
        <meta property="og:description" content={initialData.description} />
        <meta property="og:image" content={initialData.imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </head>

      <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 font-sans">
        <ClientDashboard initialData={initialData} />
      </main>
    </>
  );
}
