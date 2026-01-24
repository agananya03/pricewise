# Pricewise
💰 Smart Price Comparison & Shopping Assistant

Pricewise is an intelligent shopping companion designed to help users track prices, compare deals across stores, and manage their grocery shopping efficiently. By leveraging barcode scanning, location-based services, and gamification, it empowers consumers to make data-driven purchasing decisions and save money.

## ✨ Core Features

Pricewise offers a comprehensive suite of tools to optimize your shopping experience:

### 🛍️ Shopping & Products
1. **Barcode Scanning**: Integrated camera scanner (powered by QuaggaJS) to instantly identify products.
2. **Global Product Lookup**: Automatically retrieves product details (Name, Image, Category) from the **OpenFoodFacts API**.
3. **Smart Search**: Robust search functionality to find products by name, brand, or category.
4. **Shopping Lists**: Create and manage multiple shopping lists. Check off items as you shop and see estimated totals.
5. **Favorites**: Save frequently bought items for quick access.

### 💰 Pricing & Savings
6. **Real-time Price Comparison**: Compare product prices across different store chains (Walmart, Target, Whole Foods, etc.).
7. **Price History Integration**: View historical price trends for products to decide the best time to buy.
8. **Price Alerts**: Set target prices for specific items and receive notifications when they drop.
9. **Receipt Scanning & Analytics**: Upload or scan digital copies of your shopping receipts. The system automatically parses items and prices to update your spending history and price tracking (powered by **Google Cloud Vision**).

### 📍 Location & Maps
10. **Store Finder**: Interactive map interface (powered by **Leaflet & OpenStreetMap**) to visualize nearby stores.
11. **Location Services**: Automatically detects your location to show relevant local pricing and deals.
12. **Store Layouts**: (Planned) View aisle information for supported stores.

### 📊 Analytics & Gamification
13. **Spending Analytics**: Visual charts (powered by **Recharts**) to track your spending habits over time.
14. **Personal Savings**: Track your total amount saved through smart comparisons.
15. **Leaderboards**: Compete with other users to become a "Top Saver" in your community.
16. **Achievements**: Unlock badges and rewards for scanning items, finding deals, and consistent usage.

### 👤 User Experience
17. **Profile Management**: Customize your preferences, search radius, and notification settings.
18. **Secure Authentication**: Full user account system with secure login and session management.
19. **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.

## 🛠️ Technologies Used

Pricewise is built using a modern full-stack architecture, leveraging powerful libraries and services:

### Frontend
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) / Radix Primitives
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Visualization**: [Recharts](https://recharts.org/) (Analytics)
- **Maps**: [React Leaflet](https://react-leaflet.js.org/) + [Leaflet](https://leafletjs.com/)
- **Scanning**: [QuaggaJS](https://serratus.github.io/quaggaJS/) (Barcode)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js v5](https://authjs.dev/)
- **Caching**: [Upstash Redis](https://upstash.com/) (Rate limiting & caching)

### Services & APIs
- **Product Data**: [OpenFoodFacts API](https://world.openfoodfacts.org/)
- **Geolocation**: [OpenStreetMap (OSM)](https://www.openstreetmap.org/)
- **AI/OCR**: [Google Cloud Vision](https://cloud.google.com/vision) (Image Analysis)

### DevOps & Tooling
- **Linting**: ESLint + Prettier
- **Testing**: Vitest
- **Package Manager**: npm

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v18 or higher)
- **npm** (or yarn/pnpm)
- **PostgreSQL Database**

### Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/pricewise.git
   cd pricewise
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your environment variables:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/pricewise"
   DIRECT_URL="postgresql://user:password@localhost:5432/pricewise"
   NEXTAUTH_SECRET="your_nextauth_secret"
   GOOGLE_CLIENT_ID="your_google_id"
   GOOGLE_CLIENT_SECRET="your_google_secret"
   # Add other API keys (Stripe, Upstash, Google Cloud Vision, etc.)
   ```

4. **Database Setup**
   Run Prisma migrations to create the database schema:
   ```bash
   npx prisma migrate dev
   ```
   Seed the database with initial products and stores:
   ```bash
   npx prisma db seed
   ```

### Running the Application

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and open a pull request.
