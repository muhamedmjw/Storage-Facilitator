# Storage - Storage Facility Management System

## Problem Statement
Storage facility operators struggle with managing units, tracking rentals, monitoring payments, and maintaining customer records using outdated paper systems or complex enterprise software. These methods are time-consuming, error-prone, and lack real-time visibility into unit status. They need an intuitive, lightweight application that helps with facilitating operations without overwhelming staff with unnecessary features. This project is a modern, web-based platform designed to simplify the daily operations of self-storage facilities. It helps facility managers, staff, and owners efficiently manage unit availability, customer records, and rental payments — all within a clean, intuitive interface built for speed and usability.

This project is developed using Vue 3, TypeScript, and Vite, ensuring scalability, maintainability, and exceptional performance.

---

## Target Users
- Small to medium storage facility operators
- Facility managers and staff
- Self-storage businesses
- Storage facilities without dedicated IT resources

---

## Success Criteria
- Staff can manage unit availability and assignments efficiently
- Rental agreements and customer information are easily accessible
- Payment tracking and overdue notices are automated
- Unit occupancy are visible at a glance
- Average rental duration tracked and improving monthly

---

## User Stories

1. As a facility manager, I want to view all storage units in one dashboard with clear indicators of whether they are available, occupied, or under maintenance, so that I can quickly identify which units can be rented out and which need attention.

2. As a staff member, I want to create and manage customer profiles that include contact details, rental history, and current storage unit assignments. This will allow me to efficiently handle new rentals, renew existing ones, and answer customer questions about their rental agreements or payment records without searching through paper files.

3. As a facility manager, I want the system to track and display the payment status of each customer—including due dates, overdue balances, and completed payments—so that I can identify accounts that require reminders or follow-up and ensure the facility maintains steady cash flow without manually reviewing financial logs.

4. As a staff member, I want to view customer information and rental history so I can provide better service and answer questions.

5. As a business owner, I want to analyze occupancy rates, revenue trends, and average rental durations over time so I can make informed business decisions, such as when to expand the facility, adjust pricing, or introduce promotional offers during low-occupancy months.

6. As a staff user, I want to filter and search storage units by criteria such as size, type, or status so that I can quickly find an appropriate unit for a new customer without scrolling through the entire list.

7. As a facility manager, I want to view a calendar of lease expirations and payment due dates so I can plan follow-ups.

8. As an administrator, I want to assign different user roles (e.g., manager, staff, or viewer) with specific permissions, ensuring that sensitive actions—like editing rental prices or viewing financial data—are restricted to authorized personnel only.

9. As a staff member, I want to add notes to customer accounts so I can track communications and special requests.

---

## Non-Goals

- Online customer portal
- Automated payment processing
- Complex financial reporting
- Gate access control integration
- Insurance policy management
- Public API
- Mobile native apps

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone https://github.com/muhamedmjw/Web-Application-Milestone-Project
cd Web-Application-Milestone-Project
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open http://localhost:5173 in your browser

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Lint and fix code

## Tech Stack
- Vue 3 with Composition API
- TypeScript for type safety
- Vite for fast development
- Vue Router for navigation
- Pinia for state management
- Axios for API requests
- ESLint + Prettier for code quality

## Project Structure
```
src/
├── assets/          # Styles and static assets
├── components/      # Reusable Vue components
│   └── layout/      # Layout components (Header, Sidebar, Footer)
├── router/          # Vue Router configuration
├── stores/          # Pinia stores
├── types/           # TypeScript type definitions
├── views/           # Page components
├── App.vue          # Root component
└── main.ts          # Application entry point
```