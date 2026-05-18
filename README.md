# CloudHost Pricing Calculator ☁️

A modern, interactive, and highly optimized pricing calculator built as a Proof-of-Concept for "CloudHost". 

**🚀 Live Demo:** [https://calculator-rho-blue.vercel.app/]

## 🏗️ Architecture & Approach
Instead of putting all the logic into a single UI file, I focused on a clean, scalable architecture:

1. **Data Separation:** All pricing data and configurations are extracted into `src/data/pricingData.ts`. This acts as a mock database. If pricing changes, we update one file, not the UI components.
2. **Custom Hook (`useCalculator`):** The core business logic and math are encapsulated in a tested React hook. It uses `useMemo` to prevent unnecessary re-renders when calculating the total price.
3. **Smart vs Dumb Components:** The main `PricingCalculator` acts as a container (Smart), holding the state and passing it down via props to isolated, reusable UI components (Dumb) like `StorageSlider` or `PlanSelector`.

## 🤖 AI-First Mindset
This project was built leveraging AI tools as engineering assistants, allowing me to focus on architecture, performance, and best practices:
* **UI Generation (Vercel v0):** Used to rapidly prototype the visual layout based on shadcn/ui.
* **Logic Integration (Cursor AI):** Assisted in refactoring the static UI components to seamlessly connect with my custom `useCalculator` hook.
* **Automated Testing:** Used AI to help write comprehensive `Vitest` unit tests for the pricing logic, ensuring dynamic resilience against future data changes.

## ✨ "Wow" Factors (Beyond Requirements)
* **PWA (Progressive Web App):** Configured with a manifest and Service Worker. The calculator can be installed directly on a mobile device or desktop for offline-ready, app-like experience (perfect for Sales Reps).
* **Accessibility (a11y):** Full keyboard navigation support (Tab, Space, Arrows for the slider) and ARIA attributes via Radix UI primitives.
* **Code Quality:** Configured ESLint, Prettier, and basic CI pipeline concepts.

## 🛠️ Tech Stack
* **Framework:** Next.js (App Router) + TypeScript
* **Styling:** Tailwind CSS
* **Testing:** Vitest + React Testing Library
* **Deployment:** Vercel

## 🚀 How to run locally
\`\`\`bash
npm install
npm run dev
\`\`\`
To test the PWA features locally, run: `npm run build && npm run start`.