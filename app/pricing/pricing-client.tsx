"use client"

import { handleCustomerPortal, handleSubscription } from "@/app/actions/subscription"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { Stripe } from "stripe"
import Link from "next/link"

interface SubscriptionStatus {
  status: string;
  subscription?: {
    id: string;
    price_id: string;
  };
  priceId?: string;
}

interface StripePriceData {
  id: string;
  unit_amount: number | null;
  recurring: {
    interval: 'month' | 'year';
  } | null;
}

interface StripeProductData {
  id: string;
  name: string;
  description: string | null;
  metadata: Record<string, string>;
  default_price: StripePriceData;
  prices?: {
    data: StripePriceData[];
  };
}

interface PricingClientProps {
  products: Stripe.Product[];
  subscriptionStatus: SubscriptionStatus;
  isSubscribed: boolean;
  dbUser: any; // Replace with your actual user type
}

export default function PricingClient({
  products,
  subscriptionStatus,
  isSubscribed,
  dbUser
}: PricingClientProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  // Filter out products without prices and sort them
  const productsWithPrices = products
    .filter(product => product.default_price)
    .sort((a, b) => {
      const priceA = ((a.default_price as Stripe.Price)?.unit_amount) || 0;
      const priceB = ((b.default_price as Stripe.Price)?.unit_amount) || 0;
      return priceA - priceB;
    });

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold tracking-tight text-center lg:text-5xl mb-8">Choose Your Plan</h1>
      <p className="text-xl text-center text-muted-foreground mb-12">
        Unlock full access to all features and get started today
      </p>

      <div className="flex items-center justify-center gap-4 mb-8">
        <Label htmlFor="billing-interval">Monthly</Label>
        <Switch
          id="billing-interval"
          checked={isAnnual}
          onCheckedChange={setIsAnnual}
        />
        <Label htmlFor="billing-interval">
          Annually <span className="text-sm text-primary">(Save 20%)</span>
        </Label>
      </div>

      <div className="flex gap-8 justify-center">
        {productsWithPrices.map((product) => {
          const prices = (product as any).prices?.data || [];
          const monthlyPrice = prices.find((p: any) => p.recurring?.interval === 'month') || product.default_price;
          const yearlyPrice = prices.find((p: any) => p.recurring?.interval === 'year');

          const price = isAnnual && yearlyPrice ? yearlyPrice : monthlyPrice;
          const amount = (price as Stripe.Price)?.unit_amount ? price.unit_amount / 100 : 0;
          const interval = (price as Stripe.Price)?.recurring?.interval;
          const isFree = amount === 0;
          const isCurrentPlan = isFree ? !isSubscribed : (subscriptionStatus?.subscription?.price_id === price.id);

          // Extract features from metadata
          const features = Object.entries(product.metadata || {})
            .filter(([key]) => key.startsWith('feature_'))
            .map(([_, value]) => value);

          return (
            <div
              key={product.id}
              className={`rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden relative w-full md:w-1/3 ${product.metadata.recommended ? 'ring-2 ring-primary' : ''}`}
            >
              {product.metadata.recommended && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                  RECOMMENDED
                </div>
              )}

              <div className="p-6 flex flex-col h-full">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <div className="mt-4 text-4xl font-bold">
                  ${amount}
                  {interval && (
                    <span className="text-lg font-normal text-muted-foreground">/{interval}</span>
                  )}
                </div>
                <p className="mt-2 text-muted-foreground">{product.description}</p>

                <ul className="mt-6 space-y-3 flex-grow">
                  {features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <form action={() => handleSubscription(dbUser.stripeCustomerId)} className="mt-6">
                  <Button type="submit" className="w-full" variant={isFree ? "outline" : "default"}>
                    {isFree ? "Current Plan" : "Subscribe Now"}
                  </Button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}