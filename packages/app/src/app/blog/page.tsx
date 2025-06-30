import { client } from '@/lib/sanity'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

async function getBlogPosts() {
  try {
    return await client.fetch(`
      *[_type == "blogPost"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        mainImage,
        categories,
        author->{
          name,
          image
        }
      }
    `)
  } catch (error) {
    console.warn('Failed to fetch blog posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }}></div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            📝 BeatsChain Blog
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
            Latest insights on music production, Web3, and the future of beats
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1.5rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.2)' }}>
              🎵 Music Insights
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1.5rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.2)' }}>
              🔗 Web3 Updates
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1.5rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.2)' }}>
              💡 Producer Tips
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>

      {posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
          <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
            No blog posts yet. Check back soon for the latest updates!
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {posts.map((post: any) => (
            <article key={post._id} style={{
              background: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              overflow: 'hidden'
            }}>
              {post.mainImage && (
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img
                    src={urlFor(post.mainImage).width(400).height(200).url()}
                    alt={post.mainImage.alt || post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
              
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  {post.categories?.map((category: string) => (
                    <span key={category} style={{
                      background: '#dbeafe',
                      color: '#1e40af',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      {category}
                    </span>
                  ))}
                </div>
                
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                  <Link href={`/blog/${post.slug.current}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {post.title}
                  </Link>
                </h2>
                
                {post.excerpt && (
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                    {post.excerpt}
                  </p>
                )}
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#9ca3af' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {post.author?.image && (
                      <img
                        src={urlFor(post.author.image).width(24).height(24).url()}
                        alt={post.author.name}
                        style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                      />
                    )}
                    <span>{post.author?.name}</span>
                  </div>
                  <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
      </div>
    </div>
  )
}