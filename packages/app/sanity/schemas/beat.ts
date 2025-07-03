import { defineField, defineType } from 'sanity'

export const beat = defineType({
  name: 'beat',
  title: 'Beat',
  type: 'document',
  icon: () => '🎵',
  fields: [
    defineField({
      name: 'title',
      title: 'Beat Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'producer',
      title: 'Beat Creator',
      type: 'reference',
      to: [{ type: 'producer' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'genre',
      title: 'Genre',
      type: 'string',
      options: {
        list: [
          { title: 'Hip Hop', value: 'hip-hop' },
          { title: 'Trap', value: 'trap' },
          { title: 'Amapiano', value: 'amapiano' },
          { title: 'Afrobeats', value: 'afrobeats' },
          { title: 'House', value: 'house' },
          { title: 'Electronic', value: 'electronic' },
          { title: 'R&B', value: 'rnb' },
          { title: 'Pop', value: 'pop' },
          { title: 'Drill', value: 'drill' },
          { title: 'Gqom', value: 'gqom' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bpm',
      title: 'BPM (Beats Per Minute)',
      type: 'number',
      validation: (Rule) => Rule.required().min(60).max(200),
    }),
    defineField({
      name: 'key',
      title: 'Musical Key',
      type: 'string',
      placeholder: 'e.g., C Major, A Minor, F# Minor',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'price',
      title: 'Price (ETH)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0.001),
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'waveform',
      title: 'Waveform Image',
      type: 'image',
      description: 'Visual waveform representation',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Pending Review', value: 'pending' },
          { title: 'Published', value: 'published' },
          { title: 'Rejected', value: 'rejected' },
        ],
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Beat',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'exclusive',
      title: 'Exclusive License Available',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'royaltyPercentage',
      title: 'Royalty Percentage',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(50),
      initialValue: 5,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          validation: (Rule) => Rule.max(160),
        }),
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      producer: 'producer.name',
      genre: 'genre',
      status: 'status',
      media: 'coverImage',
    },
    prepare(selection) {
      const { title, producer, genre, status } = selection
      return {
        title,
        subtitle: `${producer} • ${genre} • ${status}`,
        media: selection.media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})