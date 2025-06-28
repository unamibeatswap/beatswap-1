import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET() {
  try {
    // Get blog posts from Sanity
    const blogPosts = await client.fetch(`
      *[_type == "blogPost"] | order(publishedAt desc)[0...10] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        author->{name}
      }
    `).catch(() => [])

    // Mock beats data for RSS
    const beats = [
      {
        id: '1',
        title: 'Dark Trap Beat',
        description: 'Hard hitting trap beat with dark melodies',
        createdAt: new Date(),
        audioUrl: 'https://example.com/beat1.mp3'
      },
      {
        id: '2', 
        title: 'Melodic Hip Hop',
        description: 'Smooth melodic hip hop instrumental',
        createdAt: new Date(Date.now() - 86400000),
        audioUrl: 'https://example.com/beat2.mp3'
      }
    ]

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>BeatSwap - Latest Beats</title>
    <description>Discover the latest beats from talented producers on BeatSwap</description>
    <link>${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <itunes:author>BeatSwap</itunes:author>
    <itunes:category text="Music"/>
    
    ${beats.map(beat => `
    <item>
      <title>${beat.title}</title>
      <description>${beat.description}</description>
      <link>${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/marketplace?beat=${beat.id}</link>
      <guid>${beat.id}</guid>
      <pubDate>${beat.createdAt.toUTCString()}</pubDate>
      <enclosure url="${beat.audioUrl}" type="audio/mpeg"/>
    </item>
    `).join('')}
    
    ${blogPosts.map((post: any) => `
    <item>
      <title>${post.title}</title>
      <description>${post.excerpt || 'Latest blog post from BeatsChain'}</description>
      <link>${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/blog/${post.slug.current}</link>
      <guid>blog-${post._id}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>${post.author?.name || 'BeatsChain Team'}</author>
    </item>
    `).join('')}
  </channel>
</rss>`

    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/rss+xml',
        'Cache-Control': 'public, max-age=3600'
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'RSS generation failed' }, { status: 500 })
  }
}