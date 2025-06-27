import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Sanity queries for BeatSwap
export const queries = {
  // Get all beats with producer info
  allBeats: `*[_type == "beat"] | order(_createdAt desc) {
    _id,
    title,
    description,
    price,
    bpm,
    key,
    genre->{title, slug},
    producer->{name, slug, image},
    audioFile,
    coverImage,
    tags,
    isExclusive,
    _createdAt
  }`,
  
  // Get beat by slug
  beatBySlug: `*[_type == "beat" && slug.current == $slug][0] {
    _id,
    title,
    description,
    price,
    bpm,
    key,
    genre->{title, slug},
    producer->{name, slug, image, bio},
    audioFile,
    coverImage,
    tags,
    isExclusive,
    _createdAt
  }`,
  
  // Get all producers
  allProducers: `*[_type == "producer"] | order(name asc) {
    _id,
    name,
    slug,
    bio,
    image,
    socialLinks,
    isVerified,
    _createdAt
  }`,
  
  // Get producer by slug with their beats
  producerBySlug: `*[_type == "producer" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    bio,
    image,
    socialLinks,
    isVerified,
    "beats": *[_type == "beat" && producer._ref == ^._id] | order(_createdAt desc) {
      _id,
      title,
      price,
      coverImage,
      audioFile,
      genre->{title}
    }
  }`,
  
  // Get all genres
  allGenres: `*[_type == "genre"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    "beatCount": count(*[_type == "beat" && genre._ref == ^._id])
  }`,
  
  // Get featured collections
  featuredCollections: `*[_type == "collection" && isFeatured == true] | order(_createdAt desc) {
    _id,
    title,
    description,
    coverImage,
    beats[]->{
      _id,
      title,
      producer->{name}
    }
  }`
}

export default client