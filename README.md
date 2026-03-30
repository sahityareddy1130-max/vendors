# Local Vendor Website Builder

A full-stack project to generate small business landing pages from a vendor form and template system.

## Folder Structure

- `backend/`: Express API and JSON storage
  - `server.js`: Backend entry point
  - `routes/vendorRoutes.js`: Vendor create and fetch routes
  - `data/vendors.json`: Stores saved vendor profiles
- `frontend/`: React + Tailwind website builder
  - `src/App.jsx`: Main router and page layout
  - `src/pages/`: Home, form and vendor landing pages
  - `src/components/templates/`: 20 reusable template components
  - `src/data/`: Category and template configuration

## Features

- Clean landing page with a call-to-action
- Vendor form with shop name, description, phone, address, category and template selection
- 20 distinct templates in `frontend/src/components/templates/`
- Dynamic route `/vendor/:shopname`
- WhatsApp button integration using `https://wa.me/91XXXXXXXXXX`
- Placeholder image support when uploads are not available
- Responsive design and subtle animations

## Setup

1. Install backend dependencies:

```bash
cd "c:\Users\sahit\OneDrive\Desktop\project vendor\backend"
npm install
```

2. Install frontend dependencies:

```bash
cd "c:\Users\sahit\OneDrive\Desktop\project vendor\frontend"
npm install
```

## Run the app

1. Start the backend server:

```bash
cd "c:\Users\sahit\OneDrive\Desktop\project vendor\backend"
npm run start
```

2. Start the frontend app:

```bash
cd "c:\Users\sahit\OneDrive\Desktop\project vendor\frontend"
npm run dev
```

3. Open the app in your browser at:

```text
http://localhost:5173
```

## Notes

- The backend uses JSON storage in `backend/data/vendors.json`.
- Template selection is saved when the form is submitted.
- Each vendor gets a unique URL based on the shop name.
