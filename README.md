This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Modern Cricket Analytics Dashboard

![Cricket Dashboard Screenshot](https-placeholder-for-screenshot.png) <!-- TODO: Add a screenshot of your app here -->

A fully interactive, modern web application for visualizing and analyzing cricket player statistics. This dashboard is built with Next.js and features dynamic charts, a responsive design, and an integrated AI chatbot powered by the Google Gemini API to answer player-related queries.

---

## Core Features

-   **Dynamic Player Selection**: Easily search and select from a list of top cricket players.
-   **Instant Analytics**: View key career statistics (Matches, Runs, Average, Strike Rate) that update instantly upon player selection.
-   **Performance Trend Analysis**: Visualize a player's year-on-year performance with an animated, responsive line chart.
-   **AI-Powered Chatbot**: Ask any question about the selected player and get real-time answers from the integrated Google Gemini API.
-   **Modern UI/UX**: Beautifully designed interface built with **shadcn/ui** and **Tailwind CSS**, featuring a sleek dark mode and light mode.
-   **Responsive Design**: A seamless experience across all devices, from mobile phones to desktops.
-   **Smooth Animations**: Fluid animations and transitions powered by **Framer Motion** for an enhanced user experience.

---

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **AI Integration**: [Google Gemini API](https://ai.google.dev/)
-   **Data Visualization**: [Recharts](https://recharts.org/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.0 or later recommended)
-   npm, yarn, or pnpm package manager

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/DipayanDasgupta/cricket_dashboard.git
    cd cricket_dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a new file named `.env.local` in the root of your project and add your Google Gemini API key. You can get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

    ```env
    # .env.local
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Project Structure

The project follows the standard Next.js App Router structure:

-   **/app**: Contains all the routes, pages, and core application logic.
    -   **/api**: API routes for server-side logic (e.g., Gemini integration).
    -   **/components**: All the custom React components used in the application.
        -   **/ui**: Auto-generated components from shadcn/ui.
    -   **page.tsx**: The main entry point and dashboard page.
    -   **layout.tsx**: The root layout of the application.
-   **/lib**: Utility functions (e.g., `cn` for Tailwind class merging).
-   **/public**: Static assets like images and fonts.
