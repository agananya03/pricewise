# Pricewise
💰 Smart Price Comparison & Shopping Assistant

Pricewise is an intelligent shopping companion designed to help users track prices, compare deals across stores, and manage their grocery shopping efficiently. By leveraging barcode scanning, location-based services, and gamification, it empowers consumers to make data-driven purchasing decisions and save money.

## ✨ Core Features

Pricewise offers a comprehensive suite of tools to optimize your shopping experience:

1. **Barcode Scanning & Product Lookup**:
   Instantly scan product barcodes to retrieve detailed information and pricing history. Uses advanced OCR and external databases to identify products quickly.

2. **Real-time Price Comparison**:
   Compare prices for the same product across different physical stores and online retailers. Find the best deal near you with location-based filtering.

3. **Smart Shopping Lists**:
   Create and manage digital shopping lists. Automatically check for deals on items in your list and track your total estimated cost before you even leave home.

4. **Receipt Scanning & Analytics**:
   Upload or scan your shopping receipts to track expenses automatically. The system parses receipt data to update price history and provide personal spending analytics.

5. **Price Alerts**:
   Set target price alerts for specific products. Receive immediate notifications when a product's price drops below your threshold.

6. **Gamification & Leaderboards**:
   Earn points for contributing price data, scanning receipts, and saving money. Compete on leaderboards to become a "Top Saver" in your community.

## 🛠️ Technologies Used

Pricewise is built using a modern full-stack architecture, leveraging powerful libraries and services for a seamless experience:

### Core Stack
- **Next.js 16 (App Router)**: React framework for high-performance server-side rendering and static generation.
- **React 19**: Library for building dynamic and interactive user interfaces.
- **TypeScript**: Ensures type safety and code robustness across the full stack.
- **Prisma ORM**: Modern database access for PostgreSQL.
- **PostgreSQL**: Robust relational database for storing user, product, and pricing data.

### Frontend & UI
- **Tailwind CSS v4**: Utility-first CSS framework for rapid and responsive styling.
- **Shadcn UI**: Accessible and customizable component library.
- **Lucide React**: Beautiful and consistent iconography.
- **Recharts**: Data visualization library for price history and spending analytics.
- **Leaflet / React-Leaflet**: Interactive maps for store locations and radius search.

### Backend & Services
- **NextAuth.js (v5 Beta)**: Secure authentication and session management.
- **Upstash Redis**: Serverless Redis for caching and rate limiting.
- **Google Cloud Vision**: Advanced image analysis and OCR for receipt parsing.
- **Zod**: TypeScript-first schema declaration and validation.
- **React Hook Form**: Performant and flexible form validation.

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
