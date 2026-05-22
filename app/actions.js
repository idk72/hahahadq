'use server'

import { kv } from '@vercel/kv';

// Permanent database keys
const KV_IMAGE_KEY = 'discord_embed_image_url';
const KV_TITLE_KEY = 'discord_embed_title';
const KV_DESC_KEY = 'discord_embed_description';

// Function to get data from database
export async function getEmbedData() {
  try {
    const imageUrl = await kv.get(KV_IMAGE_KEY) || 'https://i.imgur.com/4M3m9Kb.gif';
    const title = await kv.get(KV_TITLE_KEY) || 'My Hosted Media';
    const description = await kv.get(KV_DESC_KEY) || 'Check out this embed!';
    
    return { imageUrl, title, description };
  } catch (error) {
    console.error("Database fetch error:", error);
    return {
      imageUrl: 'https://i.imgur.com/4M3m9Kb.gif',
      title: 'My Hosted Media',
      description: 'Check out this embed!'
    };
  }
}

// Function to permanently save data to database
export async function saveEmbedData(data) {
  try {
    await kv.set(KV_IMAGE_KEY, data.imageUrl);
    await kv.set(KV_TITLE_KEY, data.title);
    await kv.set(KV_DESC_KEY, data.description);
    return { success: true };
  } catch (error) {
    console.error("Database save error:", error);
    return { success: false };
  }
}
