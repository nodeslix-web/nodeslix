# 🚀 NodeSlix - AI-Powered Telecom Intelligence Platform

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Sandbox-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Turnstile-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://www.cloudflare.com/)
[![Chatwoot](https://img.shields.io/badge/Chatwoot-Live_Chat-1F93FF?style=for-the-badge&logo=chatwoot&logoColor=white)](https://www.chatwoot.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **NodeSlix** is an enterprise-grade AI-powered telecom intelligence platform built to monitor, analyze, and orchestrate next-generation distributed telecom infrastructure at scale.

---

## 📖 Overview

NodeSlix provides telecom operators and network engineers with a premium visual workspace to track network health, deploy autonomous AI-driven traffic optimization pipelines, and visualize core network topologies. By combining real-time telemetry simulators with secure payment authentication and dynamic assistant chat, NodeSlix demonstrates a production-ready software-as-a-service (SaaS) architecture for telecom infrastructure scaling.

---

## ✨ Features

### 🏠 Home Experience
* **Hero Dashboard**: A premium, high-impact introductory fold featuring animated visualizers and clear product value propositions.
* **Product Overview**: Side-by-side solutions showcasing network challenge metrics and automated resolutions.
* **Core Capabilities Grid**: Staggered interactive highlight cards with active status pulsing.
* **3D Network Mesh & Architecture Flow**: Interactive tabs showing Core Network, 5G Towers, Edge Gateways, and Mesh Nodes.
* **Operational Workflow Summary**: Visual process steps mapping monitor-to-optimization stages.

### 📦 Product Experience
* **Module Deep-Dives**: Expanded capabilities breakdown including predictive intelligence models.
* **Interactive Command Center Panel**: An inline live-simulated terminal for operating test commands.

### 🔐 Authentication
* **Email & Password Authentication**: Secured via Firebase Authentication SDK.
* **Google OAuth Sign-In**: Quick identity provider integration for telecom operators.
* **Session Persistence**: Automatic route protection via a global React Context provider.

### 🖥️ Dashboard
* **Protected Command Center Layout**: A full-scale operator viewport restricted to authenticated accounts.
* **8 Core Dashboard Modules**: Complete visual modules mapping key operations (see Dashboard Modules section below).

### 💳 Stripe Sandbox Payments
* **Redirection Flow**: Checks login state and routes users to Stripe-hosted Sandbox checkout pages.
* **Billing Toggle**: Seamless switch between Monthly and Yearly options displaying derived discounted prices.
* **Feedback Pages**: Premium, animated `/payment-success` and `/payment-cancelled` feedback screens.

### 📞 Communication & Security
* **Formspree Contact Form**: Asynchronous support form utilizing Cloudflare Turnstile token validation to filter automated submissions.
* **Chatwoot Live Widget**: Clean global lazy-loaded assistant widget with custom branding, positioned neatly at the bottom right.

---

## 🏗️ Application Flow

```text
       ┌──────────────┐
       │  Home Page   │
       └──────┬───────┘
              │
              ▼
       ┌──────────────┐
       │ Product Page │
       └──────┬───────┘
              │
              ▼
       ┌──────────────┐
       │ Pricing Sec  |
       └──────┬───────┘        
              │ 
              │        
              │       
              │        
              │         
              ▼   
       ┌──────────────────────────────┐
       │ Stripe Sandbox Hosted Links  │
       └──────────────┬───────────────┘
                      │
            ┌─────────┴─────────┐
            ▼                   ▼
    ┌──────────────┐    ┌──────────────┐
    │ Payment Succ │    │ Payment Canc │
    └──────┬───────┘    └──────┬───────┘
           │                   │
           ▼                   ▼
    ┌──────────────┐    ┌──────────────┐
    │  Dashboard   │    │ Pricing Sec  │
    └──────────────┘    └──────────────┘
```

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React.js (latest) | Component-driven UI rendering |
| **Styles** | Tailwind CSS + CSS Variables | Premium glassmorphic design & typography |
| **Animations** | Framer Motion | Smooth page reveals, card flips, and glows |
| **Icons** | Lucide React | Minimalist UI vector icons |
| **Authentication** | Firebase Auth | Secure identity and session persistence |
| **Payments** | Stripe Sandbox | Production-ready checkout link redirection |
| **Bot Protection** | Cloudflare Turnstile | Captcha-less spam prevention |
| **Support Chat** | Chatwoot Web SDK | Dynamic lazy-loaded assistant communication |
| **Contact Submissions** | Formspree | Serverless support ticketing |
| **Routing** | React Router DOM | Declarative client-side navigation |

---


## 🖥️ Dashboard Modules

* **Overview**: Operations status feeds and aggregate telemetry analytics.
* **Infrastructure**: Real-time signal graphs mapping tower nodes and latency limits.
* **AI Engine**: Node weight calculators and route optimization simulations.
* **Operations**: Active process tasks logs showing optimization triggers.
* **Topology**: Node connection maps tracking active node linkages.
* **Analytics**: Core telemetry history charting CPU load and packet drop.
* **Users**: Operator directory displaying the authenticated profile (badge: *You*) alongside simulated users.
* **Settings**: Password changes, custom UI adjustments, and basic account profile controls.

---

## 🔌 External Integrations

* **Firebase Authentication**: Implements standard email authentication and Google OAuth sign-in.
* **Stripe Sandbox**: Pre-configured Hosted Checkout links connected to professional SaaS tiers.
* **Cloudflare Turnstile**: Zero-friction captcha validation protecting Formspree API contact routes.
* **Chatwoot Widget**: Lazy-loaded script using a custom container matching the styling system.

---

## 🚀 Installation & Setup

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* `npm` (packaged by default with Node.js)

### Step 1: Clone the repository
```bash
git clone https://github.com/your-username/nodeslix.git
cd nodeslix
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

# Cloudflare Turnstile Verification
VITE_TURNSTILE_SITE_KEY=your_turnstile_site_key

# Chatwoot Chat Integration
VITE_CHATWOOT_BASE_URL=https://app.chatwoot.com
VITE_CHATWOOT_WEBSITE_TOKEN=AJG5jjXGEgtiN5srA6RF6dSb
```

### Step 4: Run the application
Start the Vite development server:
```bash
npm run dev
```

Build the optimized production assets:
```bash
npm run build
```

---

## 🖼️ Screenshots

* **Hero Interface**: `[Placeholder: /public/screenshots/hero.png]`
* **Product Catalog**: `[Placeholder: /public/screenshots/product.png]`
* **Pricing & checkout plans**: `[Placeholder: /public/screenshots/pricing.png]`
* **Operator Console (Dashboard)**: `[Placeholder: /public/screenshots/dashboard.png]`
* **Analytics Panel**: `[Placeholder: /public/screenshots/analytics.png]`
* **Operator Registration**: `[Placeholder: /public/screenshots/auth.png]`

---

## 🌐 Official Links

* **𝕏 (Twitter)**: [https://x.com/NodeSlix](https://x.com/NodeSlix)
* **📘 Facebook**: [https://www.facebook.com/NodeSlix/](https://www.facebook.com/NodeSlix/)
* **📌 Pinterest**: [https://www.pinterest.com/NodeSlix/](https://www.pinterest.com/NodeSlix/)
* **▶️ YouTube**: [https://www.youtube.com/@NodeSlix](https://www.youtube.com/@NodeSlix)

---

## 👨‍💻 Developer Information

* **Developer Name**: Pavith Nimantha
* **Role**: Junior Web Developer
* **Company**: Altitude1

---

## 📝 License

This project is licensed under the **MIT License**. See the LICENSE file for details.
