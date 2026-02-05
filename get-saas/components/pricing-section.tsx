"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { StripeCheckoutButton } from "./stripe-checkout-button"
import { SUBSCRIPTION_PRICE_IDS, POINTS_PRICE_IDS } from "@/lib/stripe"
import { DiscountPriceDisplay, RegularPriceDisplay } from "./discount-price-display"

export function PricingSection() {
  const locale = useLocale()
  const t = useTranslations("pricing")

  const plans = [
    {
      name: t("free.name"),
      price: t("free.price"),
      description: t("free.description"),
      features: [t("free.features.template"), t("free.features.auth"), t("free.features.support")],
      cta: t("free.cta"),
      popular: false,
      priceId: null,
      planType: 'free',
    },
    {
      name: t("pro.name"),
      price: t("pro.price"),
      originalPrice: t("pro.originalPrice"),
      discountPercent: t("pro.discountPercent"),
      savings: t("pro.savings"),
      discountBadge: t("pro.discountBadge"),
      description: t("pro.description"),
      features: [
        t("pro.features.template"),
        t("pro.features.payment"),
        t("pro.features.support"),
      ],
      cta: t("pro.cta"),
      popular: true,
      priceId: SUBSCRIPTION_PRICE_IDS.pro,
      planType: 'pro',
      hasDiscount: true,
    },
    {
      name: t("enterprise.name"),
      price: t("enterprise.price"),
      description: t("enterprise.description"),
      features: [
        t("enterprise.features.custom"),
        t("enterprise.features.deployment"),
        t("enterprise.features.support"),
        t("enterprise.features.training"),
      ],
      cta: t("enterprise.cta"),
      popular: false,
      priceId: null,
      planType: 'enterprise',
    },
  ]

  const pointsPackages = [
    {
      name: t("starter.name"),
      price: t("starter.price"),
      points: t("starter.points"),
      description: t("starter.description"),
      features: [
        t("starter.features.points"),
        t("starter.features.permanent"),
        t("starter.features.priority"),
      ],
      cta: t("starter.cta"),
      popular: false,
      priceId: POINTS_PRICE_IDS.starter,
      planType: 'starter',
    },
    {
      name: t("popular.name"),
      price: t("popular.price"),
      points: t("popular.points"),
      description: t("popular.description"),
      features: [
        t("popular.features.points"),
        t("popular.features.permanent"),
        t("popular.features.priority"),
      ],
      cta: t("popular.cta"),
      popular: true,
      priceId: POINTS_PRICE_IDS.popular,
      planType: 'popular',
    },
    {
      name: t("premium.name"),
      price: t("premium.price"),
      points: t("premium.points"),
      description: t("premium.description"),
      features: [
        t("premium.features.points"),
        t("premium.features.permanent"),
        t("premium.features.priority"),
      ],
      cta: t("premium.cta"),
      popular: false,
      priceId: POINTS_PRICE_IDS.premium,
      planType: 'premium',
    },
  ]

  return (
    <section id="pricing" className="relative py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{t("title")}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${
                plan.popular
                  ? plan.hasDiscount
                    ? "border-cyber-500 shadow-xl scale-105 bg-gradient-to-br from-dark-600 to-dark-600 cyber-glow"
                    : "border-cyber-500 shadow-lg scale-105 cyber-glow-subtle"
                  : "border-border bg-secondary/50"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground cyber-glow">
                  {t("recommended")}
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>

                {/* 价格显示区域 */}
                <div className="mb-4">
                  {plan.hasDiscount ? (
                    <DiscountPriceDisplay
                      originalPrice={plan.originalPrice}
                      discountedPrice={plan.price}
                      discountPercent={plan.discountPercent}
                      savings={plan.savings}
                      discountBadge={plan.discountBadge}
                    />
                  ) : (
                    <RegularPriceDisplay price={plan.price} />
                  )}
                </div>

                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* 根据计划类型显示不同的按钮 */}
                {plan.planType === 'free' ? (
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => window.location.href = '/auth/signup'}
                  >
                    {plan.cta}
                  </Button>
                ) : plan.planType === 'enterprise' ? (
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => window.location.href = 'mailto:support@itsai-agent.com'}
                  >
                    {plan.cta}
                  </Button>
                ) : (
                  <StripeCheckoutButton
                    priceId={plan.priceId}
                    planType={plan.planType}
                    className={`w-full ${plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90 cyber-glow" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </StripeCheckoutButton>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 积分套餐 */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{t("pointsTitle")}</h2>
            <p className="text-lg text-muted-foreground">{t("pointsSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pointsPackages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative ${
                  pkg.popular
                    ? "border-cyber-500 shadow-xl scale-105 cyber-glow"
                    : "border-border bg-secondary/50"
                }`}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground cyber-glow">
                    {t("recommended")}
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>

                  {/* 价格显示 */}
                  <div className="mb-4">
                    <RegularPriceDisplay price={pkg.price} />
                    <div className="text-primary text-xl font-bold mt-2">{pkg.points} Credits</div>
                  </div>

                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <StripeCheckoutButton
                    priceId={pkg.priceId}
                    planType={pkg.planType}
                    className={`w-full ${pkg.popular ? "bg-primary text-primary-foreground hover:bg-primary/90 cyber-glow" : ""}`}
                    variant={pkg.popular ? "default" : "outline"}
                  >
                    {pkg.cta}
                  </StripeCheckoutButton>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
