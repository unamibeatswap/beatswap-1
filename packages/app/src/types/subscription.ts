export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  limits: {
    beatsPerMonth: number
    storageGB: number
    analyticsRetention: number
  }
  stripePriceId?: string
}

export interface UserSubscription {
  userId: string
  planId: string
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  stripeSubscriptionId?: string
  createdAt: Date
  updatedAt: Date
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      'Upload up to 5 beats',
      'Basic analytics',
      'Community support'
    ],
    limits: {
      beatsPerMonth: 5,
      storageGB: 1,
      analyticsRetention: 30
    }
  },
  {
    id: 'producer',
    name: 'Producer',
    price: 19.99,
    interval: 'month',
    features: [
      'Upload unlimited beats',
      'Advanced analytics',
      'Priority support',
      'Custom branding',
      'Revenue insights'
    ],
    limits: {
      beatsPerMonth: -1, // unlimited
      storageGB: 10,
      analyticsRetention: 365
    },
    stripePriceId: 'price_producer_monthly'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 49.99,
    interval: 'month',
    features: [
      'Everything in Producer',
      'API access',
      'White-label options',
      'Advanced revenue splits',
      'Dedicated support'
    ],
    limits: {
      beatsPerMonth: -1,
      storageGB: 50,
      analyticsRetention: -1 // unlimited
    },
    stripePriceId: 'price_pro_monthly'
  }
]