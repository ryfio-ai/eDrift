# eDrift Electric - Engineering Suite

Automotive-grade power electronics and engineering solutions for the global EV ecosystem.

## 🤝 Collaboration Workflow

To maintain the integrity of the `main` branch, all team members must follow this workflow:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/ryfio-ai/eDrift.git
    ```
2.  **Create a Feature Branch**: Never work directly on `main`. Create a descriptive branch for your task:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3.  **Work and Commit**: Make your changes and commit them to your local branch.
4.  **Push to Your Branch**:
    ```bash
    git push origin feature/your-feature-name
    ```
5.  **Direct Commit to Main**: Note that direct pushes to `main` are restricted. All changes must be reviewed and merged into `main` by the repository owner.

---

## 📁 Project Structure

The project follows a modular Next.js App Router architecture:

```text
edrift/
├── public/              # Static assets (logos, images, icons)
├── src/
│   ├── app/             # Application routes, layouts, and API endpoints
│   │   ├── api/         # Backend serverless functions (Chat, Contact, etc.)
│   │   ├── design-calculator/ # Engineering tools and calculators
│   │   └── ...          # Page routes (Products, About, Team, etc.)
│   ├── components/      # Reusable React components
│   │   ├── calculator/  # Logic-heavy calculator modules
│   │   ├── chatbot/     # AI assistant and chat widget
│   │   ├── layout/      # Global layout elements (Navbar, Footer)
│   │   ├── sections/    # Modular page sections (Hero, Features, etc.)
│   │   └── ui/          # Low-level primitive components (Buttons, Badges)
│   ├── data/            # Static data files (Product catalogs, blog posts)
│   ├── lib/             # Shared utilities, contexts, and business logic
│   │   ├── calculator/  # Engineering math engines and unit conversions
│   │   └── motion/      # Framer Motion animation tokens
│   └── types/           # Global TypeScript type definitions
├── scripts/             # Maintenance and data sync scripts
├── next.config.ts       # Next.js configuration
└── package.json         # Dependencies and project scripts
```

---

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠 Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: Groq (Llama 3.3)
- **Deployment**: Vercel
