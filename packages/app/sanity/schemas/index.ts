import { beat } from './beat'
import { producer } from './producer'
import { post } from './post'
import { page } from './page'
import { category } from './category'
import { siteSettings } from './siteSettings'

export const schemaTypes = [
  // Core content types
  beat,
  producer,
  
  // Content management
  post,
  page,
  category,
  
  // Site configuration
  siteSettings,
]