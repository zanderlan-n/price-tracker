# Price Tracker

Price Tracker is a web application that helps users track and compare product prices across different supermarkets. The frontend is built with **Next.js**, **React**, **TailwindCSS**, and **ShadCN/UI**.

## Features

- Search for products by name or barcode
- Add, edit, and delete supermarkets
- Register new product prices
- View product price history
- Display supermarkets on a map with MapBox

## Technologies Used

- **Next.js** - React framework for SSR and API routes
- **React** - Frontend library
- **TailwindCSS** - Utility-first CSS framework
- **ShadCN/UI** - Modern component library
- **Apollo Client** - GraphQL API consumption
- **MapBox** - Interactive maps
- **NextAuth.js** - Authentication handling

## Installation

1. Clone the repository
   ```
   git clone https://github.com/zanderlan-n/price-tracker
   cd price-tracker
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Set up the environment variables

   ```
   cp .env.example .env
   ```

   Edit the `.env` file and add your **MapBox API Key** and **Backend GraphQL URL**.

4. Start the development server
   ```
   npm run dev
   ```
5. Open the application
   ```
   http://localhost:3000
   ```

## License

This project is licensed under the MIT License.
