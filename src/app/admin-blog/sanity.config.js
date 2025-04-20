import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Privee Blog',
  
  projectId: '7vqnxp8f', // Replace with your Sanity project ID
  dataset: 'production',
  
  basePath: '/admin-blog',
  
  plugins: [
    deskTool(),
    visionTool()
  ],
  
  schema: {
    types: schemaTypes,
  },
}) 