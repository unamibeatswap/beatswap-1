import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import { imageHotspotArrayPlugin } from 'sanity-plugin-hotspot-array'

// Schema imports
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION!

export default defineConfig({
  name: 'beatschain-studio',
  title: 'BeatsChain Studio',
  
  projectId,
  dataset,
  apiVersion,
  
  basePath: '/studio',
  
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('BeatsChain Content')
          .items([
            // Beats Management
            S.listItem()
              .title('Beats')
              .child(
                S.list()
                  .title('Beat Management')
                  .items([
                    S.listItem()
                      .title('All Beats')
                      .child(S.documentTypeList('beat').title('All Beats')),
                    S.listItem()
                      .title('Featured Beats')
                      .child(
                        S.documentTypeList('beat')
                          .title('Featured Beats')
                          .filter('_type == "beat" && featured == true')
                      ),
                    S.listItem()
                      .title('Pending Review')
                      .child(
                        S.documentTypeList('beat')
                          .title('Pending Review')
                          .filter('_type == "beat" && status == "pending"')
                      ),
                  ])
              ),
            
            // Producers Management
            S.listItem()
              .title('Beat Creators')
              .child(
                S.list()
                  .title('Creator Management')
                  .items([
                    S.listItem()
                      .title('All Creators')
                      .child(S.documentTypeList('producer').title('All Beat Creators')),
                    S.listItem()
                      .title('Verified Creators')
                      .child(
                        S.documentTypeList('producer')
                          .title('Verified Creators')
                          .filter('_type == "producer" && verified == true')
                      ),
                  ])
              ),
            
            // Content Management
            S.listItem()
              .title('Content')
              .child(
                S.list()
                  .title('Content Management')
                  .items([
                    S.listItem()
                      .title('Blog Posts')
                      .child(S.documentTypeList('post').title('Blog Posts')),
                    S.listItem()
                      .title('Pages')
                      .child(S.documentTypeList('page').title('Pages')),
                    S.listItem()
                      .title('Categories')
                      .child(S.documentTypeList('category').title('Categories')),
                  ])
              ),
            
            // Site Configuration
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Site Settings')
              ),
          ])
    }),
    
    // Vision tool for GROQ queries (disable in production)
    ...(process.env.NODE_ENV === 'development' ? [visionTool()] : []),
    
    // Additional plugins
    colorInput(),
    imageHotspotArrayPlugin(),
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  // Enterprise features
  document: {
    // Prevent accidental deletion of important documents
    actions: (prev, context) => {
      if (context.schemaType === 'siteSettings') {
        return prev.filter(({ action }) => action !== 'delete')
      }
      return prev
    },
  },
  
  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    // Disable unnecessary features in production
    tools: (prev) => prev.filter((tool) => tool.name !== 'vision'),
  }),
})