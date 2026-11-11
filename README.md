# AI Review Summary

A Next.js app that uses an LLM to turn a page of customer reviews into a short summary of the main themes and overall sentiment, so shoppers don't have to read every review.

Each product page shows the average star rating, an **AI-generated summary** of all its reviews, and the full review list underneath.

## How it works

1. Product and review data is validated with **Zod** schemas (`lib/types.ts`).
2. On the product page, a React Server Component (`components/ai-review-summary.tsx`) calls `summarizeReviews()`.
3. `lib/ai-summary.ts` builds a prompt from all of the product's reviews and sends it to an LLM through the **Vercel AI SDK** (`generateText`) via the **Vercel AI Gateway**.
4. The model returns a 2–3 sentence summary, which is rendered next to the average rating. If the LLM call fails, the error is caught and a friendly message is shown.

The summary is generated on the server, so no API key is ever exposed to the browser.

## Tech stack

- **Next.js 16** (App Router, React Server Components, static params per product)
- **React 19** + **TypeScript**
- **Vercel AI SDK** (`ai`) with the Vercel AI Gateway: the model can be swapped by changing one string
- **Zod** for data validation
- **Tailwind CSS 4** + **shadcn/ui** components

## Project structure

```
app/
  page.tsx                  # Product list with average ratings
  [productId]/page.tsx      # Product page: AI summary + reviews
components/
  ai-review-summary.tsx     # Server component that renders the AI summary
  reviews.tsx, review.tsx   # Review list
  five-star-rating.tsx
lib/
  ai-summary.ts             # Prompt + LLM call
  sample-data.ts            # Sample products and reviews
  types.ts                  # Zod schemas and types
```

## Running locally

```bash
pnpm install
```

Create a `.env.local` file with your Vercel AI Gateway key:

```
AI_GATEWAY_API_KEY=your_key_here
```

Then start the dev server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and click on a product to see its AI summary.

## Ideas for next steps

- Stream the summary to the UI as it's generated
- Return structured output (pros, cons, sentiment score) instead of free text
- Cache summaries so they're only regenerated when new reviews arrive
