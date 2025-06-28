import { client, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'

async function getBlogPost(slug: string) {
  try {
    return await client.fetch(`
      *[_type == "blogPost" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        publishedAt,
        mainImage,
        body,
        categories,
        seo,
        socialShare,
        author->{
          name,
          bio,
          image,
          social
        }
      }
    `, { slug })
  } catch (error) {
    console.warn('Failed to fetch blog post:', error)
    return null
  }
}

const components = {
  types: {
    image: ({ value }: any) => (
      <div style={{ margin: '2rem 0', textAlign: 'center' }}>
        <img
          src={urlFor(value).width(800).url()}
          alt={value.alt || ''}
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '0.5rem' }}
        />
        {value.caption && (
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem', fontStyle: 'italic' }}>
            {value.caption}
          </p>
        )}
      </div>
    )
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug.current}`
  const shareTitle = post.socialShare?.shareTitle || post.title
  const shareDescription = post.socialShare?.shareDescription || post.seo?.metaDescription

  return (
    <article style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      {/* Header */}
      <header style={{ marginBottom: '2rem' }}>
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
        
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: '1.2', color: '#1f2937', marginBottom: '1rem' }}>
          {post.title}
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          {post.author?.image && (
            <img
              src={urlFor(post.author.image).width(48).height(48).url()}
              alt={post.author.name}
              style={{ width: '48px', height: '48px', borderRadius: '50%' }}
            />
          )}
          <div>
            <p style={{ fontWeight: '500', color: '#1f2937', margin: 0 }}>{post.author?.name}</p>
            <time style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </div>
        
        {post.mainImage && (
          <div style={{ marginBottom: '2rem' }}>
            <img
              src={urlFor(post.mainImage).width(800).height(400).url()}
              alt={post.mainImage.alt || post.title}
              style={{ width: '100%', height: 'auto', borderRadius: '0.5rem' }}
            />
          </div>
        )}
      </header>

      {/* Content */}
      <div style={{ 
        fontSize: '1.125rem', 
        lineHeight: '1.7', 
        color: '#374151',
        marginBottom: '3rem'
      }}>
        <PortableText value={post.body} components={components} />
      </div>

      {/* Social Share */}
      <div style={{
        background: '#f9fafb',
        padding: '2rem',
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb',
        marginBottom: '2rem'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
          Share this article
        </h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#1da1f2',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Share on Twitter
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#0077b5',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Share on LinkedIn
          </a>
          <button
            onClick={() => navigator.clipboard.writeText(shareUrl)}
            style={{
              background: '#6b7280',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Copy Link
          </button>
        </div>
      </div>

      {/* Author Bio */}
      {post.author?.bio && (
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '0.5rem',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
            {post.author.image && (
              <img
                src={urlFor(post.author.image).width(80).height(80).url()}
                alt={post.author.name}
                style={{ width: '80px', height: '80px', borderRadius: '50%', flexShrink: 0 }}
              />
            )}
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                About {post.author.name}
              </h4>
              <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '1rem' }}>
                {post.author.bio}
              </p>
              {post.author.social && (
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {post.author.social.twitter && (
                    <a href={post.author.social.twitter} target="_blank" rel="noopener noreferrer" style={{ color: '#1da1f2', textDecoration: 'none' }}>
                      Twitter
                    </a>
                  )}
                  {post.author.social.linkedin && (
                    <a href={post.author.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5', textDecoration: 'none' }}>
                      LinkedIn
                    </a>
                  )}
                  {post.author.social.website && (
                    <a href={post.author.social.website} target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', textDecoration: 'none' }}>
                      Website
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}