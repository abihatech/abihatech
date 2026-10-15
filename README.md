# MenuPilot - QR Ordering & Payments

MenuPilot is a modern restaurant ordering and payments experience built as a React + Vite landing page and interactive product demo. It showcases a QR-based ordering flow for Indian restaurants and cafes, including live kitchen tracking, customer ordering screens, payment confirmation, and WhatsApp receipt delivery.

## Overview

This project demonstrates how a restaurant can digitize table ordering with:

- QR-enabled table ordering
- Real-time kitchen order status updates
- Customer app simulation for item selection and checkout
- UPI, card, and cash payment flow
- Digital receipt capture with WhatsApp-ready messaging
- Vendor dashboard and revenue analytics

## Features

- Responsive landing page for restaurant sales and product positioning
- Vendor dashboard with live order queue and order state controls
- Full customer mobile ordering UI for table scans
- Menu management with item availability toggles
- Payment and receipt modal with order summaries
- Revenue and order analytics overview
- Pricing and FAQ sections for product marketing

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React icons
- Motion animations

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

The app will start on:

- http://localhost:3000

### Production build

```bash
npm run build
```

### Type-checking

```bash
npm run lint
```

## Project Structure

```text
src/
  components/      UI sections and interactive modals
  data/            mock menu and order data
  App.tsx          main application layout and state
  main.tsx         app bootstrap
  index.css        base styling and Tailwind setup
```

## Notes

This repository contains a front-end demo of a restaurant QR ordering product. The current implementation uses mock data to simulate orders, menu updates, payment flows, and vendor interactions for presentation and product discovery purposes.
