# BornoBihar - Bookstore Web Application (Frontend)

BornoBihar is an e-commerce web application tailored for browsing, purchasing, and managing books. The application is developed with Next.js (App Router), TypeScript, Tailwind CSS, and Redux Toolkit, featuring a public storefront, customer dashboard, role-based admin management portal, and SSLCommerz payment gateway integration.

## Live Deployment

- Production URL: https://borno-bihar-frontend-umber.vercel.app
- Source Repository: https://github.com/Emam-Bokhari/BornoBihar-Frontend.git

## Technical Stack

| Layer | Technologies |
| --- | --- |
| Framework | Next.js 15 (App Router), React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4, tw-animate-css |
| UI Components | Radix UI primitives, shadcn/ui component patterns |
| State Management | Redux Toolkit, Redux Persist |
| Form Handling | React Hook Form, Zod schema validation |
| Data Presentation | TanStack Table v8, Recharts, Embla Carousel |
| Authentication | JWT (JSON Web Token), Next.js Middleware RBAC |
| Payment Gateway | SSLCommerz |
| Notifications | Sonner |
| Deployment | Vercel |

## Features

### Storefront and Customer Experience
- Catalog Browsing: Book listing with category navigation, keyword search, price range filtering, and sorting.
- Product Details: Single product views displaying author, category, publication information, stock availability, and pricing.
- Cart and Wishlist: Client-side persistent cart and wishlist state managed via Redux Toolkit and Redux Persist.
- Interactive Home Modules: Promotional banners, featured titles, new arrivals, book of the month, and blog previews.
- Content and Inquiries: Blog article reading, contact form submission, and newsletter subscription.

### Checkout and Order Processing
- Checkout Workflow: Form-driven checkout collecting delivery addresses and customer contact information.
- Payment Integration: Redirect-based payment handling via SSLCommerz gateway.
- Payment Status Handlers: Dedicated callback routes for successful and cancelled transactions.

### Customer Dashboard (`/user/*`)
- Profile Management: View and edit personal account information.
- Order History: Detailed list of placed orders, itemized receipts, and fulfillment status.
- Support System: Ticket creation for order inquiries and technical issues.
- Browsing History: Record of recently viewed books for quick access.

### Administrator Dashboard (`/admin/*`)
- Analytics Overview: Metric summaries and visual reporting powered by Recharts.
- Inventory Management: Create, update, list, and delete books with image URL support and schema validation.
- Order Management: Monitor order transactions, inspect customer delivery info, and update order statuses.
- User Management: View registered accounts and monitor platform user activity.
- Content Management: Create and update blog articles.
- Communication Center: Manage incoming support tickets, contact queries, and subscriber lists.

## Architecture and Routing

The application uses Next.js route groups to separate concerns and layout hierarchies:

- `(WithCommonLayout)`: Public-facing routes sharing the main navigation bar, footer, and promotional summary bars.
- `(WithDashboardLayout)`: Secure administrative and customer interfaces sharing sidebar navigation and profile controls.
- Route Protection: A root-level Next.js middleware (`src/middleware.ts`) validates access tokens from cookies and enforces role-based access control (RBAC) across protected user and admin endpoints.

## Project Structure

```text
src/
├── app/
│   ├── (WithCommonLayout)/       # Storefront pages (Home, Books, Categories, Cart, Checkout, etc.)
│   ├── (WithDashboardLayout)/    # Protected user and admin dashboard interfaces
│   ├── cancelled/                # Payment cancellation handler route
│   ├── login/                    # Customer and admin authentication entry
│   ├── register/                 # Customer account registration
│   ├── success/                  # Payment success confirmation route
│   ├── layout.tsx                # Root layout definition
│   └── middleware.ts             # Route guard and JWT role verification
├── components/
│   ├── modules/                  # Feature-specific components (Home, Dashboard, Cart, etc.)
│   ├── shared/                   # Reusable shared components (Navbar, Footer, Sidebar, etc.)
│   └── ui/                       # Base UI design system components (Button, Dialog, Table, etc.)
├── constants/                    # Application constants and static configuration
├── hooks/                        # Custom React hooks
├── lib/                          # Utility helpers and class merges
├── providers/                    # Redux and application context providers
├── redux/
│   ├── features/                 # Cart and wishlist slices with persistence setup
│   └── store.ts                  # Redux store configuration
├── services/                     # Server actions and data-fetching modules
└── types/                        # TypeScript interface and type declarations
```

## Getting Started

### Prerequisites

Ensure the following tools are installed on your workstation:
- Node.js: version 20.x or higher
- Package Manager: npm (v10+), yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Emam-Bokhari/BornoBihar-Frontend.git
   cd BornoBihar-Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory:
   ```env
   NEXT_PUBLIC_BASE_API=http://localhost:5001/api/v1
   ```
   For production backend integration, point `NEXT_PUBLIC_BASE_API` to your hosted backend URL.

4. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

To compile and verify the application for production deployment:

```bash
# Build production bundle
npm run build

# Run production server
npm run start
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Runs the Next.js development server with Turbopack/Fast Refresh |
| `npm run build` | Compiles the production build |
| `npm run start` | Boots the compiled production server |
| `npm run lint` | Runs ESLint validation across codebase |

## Environment Variables Reference

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_BASE_API` | Yes | Base URL endpoint for backend REST API services |

## Author and Contact

- Author: Moshfiqur Rahman
- Email: moshfiqurrahman37@gmail.com
- GitHub: https://github.com/Emam-Bokhari
- LinkedIn: https://www.linkedin.com/in/moshfiqurrahman37
