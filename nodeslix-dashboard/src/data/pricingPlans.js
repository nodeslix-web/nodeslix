export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    interval: "forever",
    stripeLink: "https://buy.stripe.com/test_dRm4gz5vy2Ii3Qx0LH9Zm00",
    buttonLabel: "Get Started",
    isPopular: false,
    description: "Ideal for learning and small-scale deployments.",
    features: [
      "5 infrastructure sources",
      "Basic monitoring",
      "5 team members",
      "24-hour analytics history",
      "Email support"
    ]
  },
  {
    id: "professional",
    name: "Professional",
    price: 29,
    interval: "monthly",
    stripeLink: "https://buy.stripe.com/test_cNi8wPbTWer0evbamh9Zm01",
    buttonLabel: "Start Professional",
    isPopular: true,
    description: "Built for growing telecom operations.",
    features: [
      "Unlimited monitoring",
      "AI optimization engine",
      "50 team members",
      "Topology visualizer",
      "Advanced analytics",
      "Priority support"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    interval: "monthly",
    stripeLink: "https://buy.stripe.com/test_00w28rbTWdmW4UBamh9Zm02",
    buttonLabel: "Start Enterprise",
    isPopular: false,
    description: "For large-scale telecom infrastructure.",
    features: [
      "Unlimited everything",
      "Dedicated AI engine",
      "Unlimited users",
      "Multi-region deployment",
      "Dedicated support",
      "Custom integrations"
    ]
  }
];
