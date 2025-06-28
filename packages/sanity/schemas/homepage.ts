export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'text' },
        { name: 'backgroundImage', title: 'Background Image', type: 'image' },
        { name: 'ctaText', title: 'CTA Button Text', type: 'string' },
        { name: 'ctaLink', title: 'CTA Button Link', type: 'string' }
      ]
    },
    {
      name: 'features',
      title: 'Features Section',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Feature Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'icon', title: 'Icon (Emoji)', type: 'string' }
        ]
      }]
    },
    {
      name: 'stats',
      title: 'Platform Stats',
      type: 'object',
      fields: [
        { name: 'totalBeats', title: 'Total Beats', type: 'number' },
        { name: 'totalProducers', title: 'Total Producers', type: 'number' },
        { name: 'totalSales', title: 'Total Sales', type: 'string' },
        { name: 'countries', title: 'Countries Served', type: 'number' }
      ]
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'quote', title: 'Quote', type: 'text' },
          { name: 'author', title: 'Author', type: 'string' },
          { name: 'role', title: 'Role/Title', type: 'string' },
          { name: 'image', title: 'Author Image', type: 'image' }
        ]
      }]
    }
  ]
}