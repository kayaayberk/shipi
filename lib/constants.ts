import { BarChart, BarChart3, Computer, Database, Search, SearchCheck } from 'lucide-react'
import Shoify from '@/public/TechIcons/shopify.svg'
import Meili from '@/public/TechIcons/meilisearch.svg'
import Supabase from '@/public/TechIcons/supabase.svg'
import Middleware from '@/public/TechIcons/middleware.svg'
import Google from '@/public/TechIcons/google.svg'
import Vercel from '@/public/TechIcons/vercel.svg'

export const servicePlan = {
  name: 'Service Plan',
  price: 999,
  options: [
    'Consultation',
    'Customized Shopify Store',
    'Average 72 hours delivery',
    'Unlimited Revisions',
    'Shopify Store Education',
    'Store Maintenance'
  ]
}

export const NavItems = [
  {
    name: 'Pricing',
    link: '/#pricing'
  },
  {
    name: 'Wall of Love',
    link: '/#wol'
  },
  {
    name: 'What is Shipi.fyi?',
    link: '/#wtf'
  },
  {
    name: 'FAQ',
    link: '/#faq'
  }
]

export const DETAILS = [
  {
    name: 'E-COMMERCE',
    icon: Computer,
    options: [
      'Customers, products, and inventory',
      'Secure Payment gateway',
      'Interaction through GraphQl API',
      'Flexible UI customization',
      'SEO optimized',
      'Product suggestions',
      'Many more...'
    ],
    image: Shoify,
    description: 'With Shopify'
  },
  {
    name: 'SEARCH',
    icon: Search,
    options: ['AI powered Vector search', 'Faceted search', 'Fast search results', 'mul'],
    image: Meili,
    description: 'With MeiliSearch'
  },
  {
    name: 'DATABASE',
    icon: Database,
    options: [
      'Fast and reliable',
      'Scalable',
      'Secure',
      'Real-time data',
      'Product records',
      'Many more...'
    ],
    image: Supabase,
    description: 'With Supabase'
  },
  {
    name: 'SEO',
    icon: SearchCheck,
    options: [
      'Bloom filters',
      'Highly Scalable SEO Redirects',
      'Bloom filters',
      'Fast indexing',
      'High ranking'
    ],
    image: Middleware,
    description: 'With Bloom Filters'
  },
  {
    name: 'ANALYTICS',
    icon: BarChart3,
    options: [
      'Real-time analytics',
      'Customized reports',
      'Data visualization',
      'Data insights',
      'Many more...'
    ],
    image: [Google, Vercel],
    description: 'With Google & Vercel'
  }
]
