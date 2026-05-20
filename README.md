# CloudHost Pricing Calculator

A modern, interactive pricing calculator built as a Proof-of-Concept for **CloudHost**.

**Live Demo:** [calculator-rho-blue.vercel.app](https://calculator-rho-blue.vercel.app/)

## Architecture

Instead of putting all logic into a single UI file, the project uses a small, scalable structure:

1. **Data layer** — `src/data/pricingData.ts` holds plans, storage rules, and add-ons. Pricing changes live in one place.
2. **Business logic** — `useCalculator` encapsulates state and price calculation (`useMemo` for `totalPrice`). Covered by Vitest unit tests.
3. **Container / presentational components** — `PricingCalculator` owns state from the hook and passes it down via props to UI pieces such as `PlanSelector`, `StorageSlider`, `AddOns`, and `PriceSummary`.

```
src/
├── data/pricingData.ts
├── hooks/useCalculator.ts
├── components/pricing-calculator.tsx
└── components/pricing/   # plan-selector, storage-slider, add-ons, price-summary
```

## Additional features

- **PWA** — Web manifest and service worker via `@ducanh2912/next-pwa` (enabled in production; disabled in `npm run dev`). Installable on desktop and mobile.
- **Accessibility** — Keyboard navigation and Radix UI primitives (slider, checkbox).
- **CI** — GitHub Actions: Prettier, ESLint, unit tests, production build.

## AI-assisted development

Built with AI as an engineering assistant, while architecture and integration decisions stayed manual:

- **Vercel v0** — UI layout prototype (shadcn-style components).
- **Cursor** — Refactoring v0 components to connect with `useCalculator` and `pricingData`.
- **Vitest** — Unit tests for pricing logic in the hook.

## Tech stack

- **Framework:** Next.js 16 (App Router) + TypeScript + React 19
- **Styling:** Tailwind CSS 4
- **UI:** Radix UI, Lucide icons
- **Testing:** Vitest + React Testing Library
- **Deployment:** Vercel

## Getting started

**Requirements:** Node.js 20+

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
npm test              # run unit tests (useCalculator)
npm run test:watch    # tests in watch mode
npm run lint          # ESLint
npm run format        # Prettier
npm run build         # production build
npm run start         # serve production build (also needed to verify PWA)
```

To verify PWA locally (service worker is off in development):

```bash
npm run build && npm run start
```
