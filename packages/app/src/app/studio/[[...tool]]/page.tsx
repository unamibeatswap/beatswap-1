'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../../../packages/sanity/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}