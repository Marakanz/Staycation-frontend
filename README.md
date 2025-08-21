# Staycation - Vacation Accommodation Reservation App

A modern, responsive frontend application for vacation accommodation reservations built with React, TypeScript, and GraphQL. Users can browse accommodations, make reservations, and manage their bookings through an intuitive interface.

## 🚀 Features

- **User Authentication** - Secure login and registration system
- **Accommodation Browsing** - Browse and search vacation properties
- **Booking System** - Make and manage accommodation reservations
- **Interactive Calendar** - Date selection and availability checking
- **Responsive Design** - Optimized for desktop and mobile devices
- **Real-time Updates** - GraphQL subscriptions for live data
- **Smooth Animations** - Framer Motion for enhanced user experience

## 🛠️ Tech Stack

### Core Technologies
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript for better development experience
- **GraphQL** - Efficient data fetching with Apollo Client
- **Redux Toolkit** - Predictable state management
- **React Router 6** - Client-side routing

### UI & Styling
- **Bootstrap 5** - Responsive component library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Icons** - Comprehensive icon library

### Additional Libraries
- **Apollo Client** - GraphQL client with caching
- **Axios** - HTTP client for REST APIs
- **Date-fns** - Modern date utility library
- **React Calendar** - Interactive calendar component
- **React Date Range** - Date range picker
- **Redux Persist** - State persistence across sessions
- **Cloudinary** - Image optimization and management

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
├── images/             # Static image assets
├── mutations/          # GraphQL mutation queries
├── queries/           # GraphQL data queries
├── redux/             # Redux store, slices, and reducers
├── types/             # TypeScript type definitions
├── utils/             # Helper functions and utilities
├── App.tsx            # Main application component
├── index.tsx          # Application entry point
└── index.css          # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd staycation-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory (if needed):
   ```env
   REACT_APP_API_URL=https://staycation-backend-8tzd.onrender.com/
   CLOUDINARY_URL=cloudinary://399166194617254:KMTnF72qn2ACothZ97lCO_Xh7Lk@clothing-wave
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

## 📜 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 🔧 Configuration

### GraphQL Endpoint
The application connects to a GraphQL backend hosted at:
```
https://staycation-backend-8tzd.onrender.com/
Backend Github Repo: https://github.com/Marakanz/Staycation-backend/tree/master
```

### State Management
- **Redux Toolkit** for global state management
- **Redux Persist** for state persistence across browser sessions
- **Apollo Client** cache for GraphQL data

## 🎨 Styling

The project uses a hybrid approach:
- **Bootstrap 5** for component styling and layout
- **Tailwind CSS** for utility classes and custom styling
- **CSS Modules** for component-specific styles

## 🔒 Authentication

User authentication is handled through:
- GraphQL mutations for login/register
- Redux state for user session management
- Protected routes for authenticated users

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔄 Data Management

### GraphQL Integration
- **Queries** - Fetch accommodations, bookings, user data
- **Mutations** - Create bookings, update user profiles, authentication
- **Apollo Client** - Caching, optimistic updates, error handling

### State Architecture
- **Global State** (Redux) - User authentication, app-wide settings
- **Local State** (React hooks) - Component-specific data
- **Server State** (Apollo) - Remote data with caching

## 🧪 Testing

The project includes testing setup with:
- **Jest** - JavaScript testing framework
- **React Testing Library** - React component testing utilities
- **User Event** - User interaction testing

Run tests:
```bash
npm test
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Deployment Platforms
The app can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Guidelines

- Follow TypeScript best practices
- Use meaningful component and variable names
- Write tests for new features
- Follow the existing code style
- Update documentation when needed

## 🐛 Known Issues

- Image upload performance optimization needed
- Calendar date selection edge cases
- Mobile navigation improvements in progress

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This is the frontend application. Make sure the backend GraphQL server is running for full functionality.