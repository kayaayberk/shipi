import { Computer, Search } from 'lucide-react'
import Shoify from '@/public/TechIcons/shopify.svg'
import Meili from '@/public/TechIcons/meilisearch.svg'
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
    name: 'E-COMMERCE ENGINE',
    icon: Computer,
    options: [
      'Manage customers, products, orders, and inventory',
      'Secure Payment gateway',
      'Interaction through GraphQl API',
      'Flexible theme customization',
      'SEO ooptimized',
      'Product suggestions'
    ],
    image: Shoify,
    description:
      'Shopify is a complete commerce platform that lets you start, grow, and manage a business.'
  },
  {
    name: 'SEARCH ENGINE',
    icon: Search,
    options: ['AI powered Vector search', 'Faceted search', 'Fast search results', 'mul'],
    image: Meili
  }
]
