## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Git

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/lthieu96/chess-admin.git
   cd chess-admin
   ```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Environment Setup

- Copy the .env.example file to create a new .env file
- Update the following environment variables in .env:

  ```
  VITE_API_URL: Your API URL (default: http://localhost:8080)
  VITE_SUPABASE_URL: Your Supabase project URL
  VITE_SUPABASE_ANON_KEY: Your Supabase anonymous key
  ```

4. Start the development server
   ```bash
   npm run dev
    # or
   yarn dev
   ```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates a production build
- `npm start` - Runs the production build
- `npm run refine` - Runs Refine CLI commands

## Tech Stack

- React 18
- TypeScript
- Refine
- Ant Design
- Supabase
- Vite
