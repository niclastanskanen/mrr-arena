# MRR Arena – Startup Battle Arena

A fun viral web app where you choose two indie startups from the TrustMRR API and let them "fight" in a Pokémon-like arena. MRR = HP, Growth = Attack/Speed, Profit Margin = Defense. Funny random commentary + animated battle. Super-shareable on X.

## Tech Stack

- Next.js 16 (App Router + Server Actions)
- TypeScript
- Tailwind CSS + shadcn/ui
- Motion (animation)
- lucide-react
- html-to-image (share screenshot)
- canvas-confetti
- Sonner (toasts)

## Setup

### 1. Add your API key

Create `.env.local` in the project root with:

```
TRUSTMRR_API_KEY=tmrr_your_actual_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Get your API key from [TrustMRR](https://trustmrr.com).

### 2. Run the app

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 3. Deploy on Vercel

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `TRUSTMRR_API_KEY` – your TrustMRR API key
   - `NEXT_PUBLIC_BASE_URL` – your production URL (e.g. `https://mrrarena.vercel.app`)
4. Deploy

## How it works

- **Homepage**: Select two startups (or use Random Battle), then click Battle!
- **Battle page**: Watch the auto-battle with 5–8 rounds, HP bars, attack animations, and funny commentary
- **Share**: Copy screenshot + tweet text, or share directly on X

## Project structure

```
app/
  page.tsx                    # Homepage
  battle/[slugs]/page.tsx     # Battle page
  battle/loading.tsx
  not-found.tsx
components/
  HomePageClient.tsx
  FighterCard.tsx
  Arena.tsx
  HPBar.tsx
  Commentary.tsx
  StartupAvatar.tsx
  StartupSelectorModal.tsx
  ShareButton.tsx
  ui/                         # shadcn components
lib/
  trustmrr.ts                 # Types + TrustMRR fetch helpers
  commentary.ts               # Battle commentary generator
  confetti.ts
  utils.ts
```
