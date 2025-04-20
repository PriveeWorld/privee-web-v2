import { createClient } from '@sanity/client';

const config = {
  projectId: '7vqnxp8f',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-20',
  useCdn: process.env.NODE_ENV === 'production',
};

export const client = createClient(config);

// Helper function to handle draft mode
export const getClient = (preview) => {
  if (preview) {
    return createClient({
      ...config,
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    });
  }
  return client;
}; 