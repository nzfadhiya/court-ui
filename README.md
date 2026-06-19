# Court Click - CTC Orders Management Dashboard

A modern admin dashboard for managing Certified True Copy (CTC) court orders.

## Tech Stack

- **Next.js 15** with TypeScript
- **Ant Design** for UI components
- **Turbopack** for fast development

## Features

- Orders table with status management
- Filter by district, court, and product type
- Assign clerks to orders
- Tag management system
- Order details with case, address, and eSign documents
- E-copy upload support

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure
components/

├── Sidebar.tsx          # Navigation sidebar

├── Header.tsx           # Header with search and filters

├── OrdersTable.tsx      # Main orders table

├── OrderTabs.tsx        # Tab navigation

├── TagModal.tsx         # Tag management

├── AssignClerkModal.tsx # Clerk assignment

├── AddClerkModal.tsx    # Add new clerk

└── ProductFilterModal.tsx # Product filter

## Deployment

Deployed on [Vercel](https://vercel.com) — auto deploys on every push to `main`.
