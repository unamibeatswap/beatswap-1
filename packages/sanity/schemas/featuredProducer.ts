export default {
  name: 'featuredProducer',
  title: 'Featured Producer',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Producer Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' }
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'heroImage',
      title: 'Hero Background',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string'
    },
    {
      name: 'genres',
      title: 'Genres',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Amapiano', 'Afrobeats', 'House', 'Deep House', 'Tech House',
          'Trap', 'Hip Hop', 'Drill', 'Gqom', 'Kwaito', 'Electronic'
        ]
      }
    },
    {
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number'
    },
    {
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'twitter', title: 'Twitter', type: 'url' },
        { name: 'soundcloud', title: 'SoundCloud', type: 'url' },
        { name: 'spotify', title: 'Spotify', type: 'url' }
      ]
    }
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
}