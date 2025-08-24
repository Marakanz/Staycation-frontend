// 1. AnimatedRoutes.tsx - Optimized
import React, { useMemo } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import type { RootState } from "../redux/store";
import { EMPTY_USER } from "../mutations/userMutations";
import { Landing} from "./Landing"

// Lazy load components for better performance
const Admin = React.lazy(() => import("../pages/Admin"));
const Home = React.lazy(() => import("../pages/Home"));
const Hotels = React.lazy(() => import("../pages/Hotels"));
const SingleHotel = React.lazy(() => import("../pages/SingleHotel"));
const BookingInfo = React.lazy(() => import("../pages/BookingInfo"));
const Layout = React.lazy(() => import("../pages/Layout"));
const Info = React.lazy(() => import("../pages/Info"));
const Payments = React.lazy(() => import("../pages/Payments"));
const Completed = React.lazy(() => import("../pages/Completed"));
const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const Stories = React.lazy(() => import("../pages/Stories"));
const SingleStory = React.lazy(() => import("../pages/SingleStory"));
const UserBookings = React.lazy(() => import("../pages/UserBookings"));


// Protected Route Component - Memoized
interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

const ProtectedRoute = React.memo<ProtectedRouteProps>(({ 
  children, 
  requireAuth = true, 
  requireAdmin = false 
}) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  
  const authStatus = useMemo(() => {
    const isAuthenticated = currentUser && 
      currentUser._id && 
      currentUser._id !== "" && 
      currentUser._id !== EMPTY_USER._id;
    
    const isAdmin = isAuthenticated && currentUser.isAdmin;
    
    return { isAuthenticated, isAdmin };
  }, [currentUser]);

  const { isAuthenticated, isAdmin } = authStatus;

  if (requireAuth && !isAuthenticated) {
    return <Login />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
          <p className="text-gray-600">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return <React.Suspense fallback={<div>Loading...</div>}>{children}</React.Suspense>;
});

ProtectedRoute.displayName = 'ProtectedRoute';

const AnimatedRoutes = React.memo(() => {
  const location = useLocation();
  const { currentUser } = useSelector((state: RootState) => state.user);
  
  const isAuthenticated = useMemo(() => 
    currentUser && 
    currentUser._id && 
    currentUser._id !== "" && 
    currentUser._id !== EMPTY_USER._id,
    [currentUser]
  );

  return (
    <AnimatePresence>
      <React.Suspense fallback={<div className="flex items-center justify-center min-h-96">Loading...</div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="hotels" element={<Hotels />} />
            <Route path="hotels/:hotelId" element={<SingleHotel />} />
            <Route path="stories" element={<Stories />} />
            <Route path="stories/:storyId" element={<SingleStory />} />
            
            <Route 
              path="admin" 
              element={
                <ProtectedRoute requireAuth requireAdmin>
                  <Admin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="user/:userId" 
              element={
                <ProtectedRoute requireAuth>
                  <UserBookings />
                </ProtectedRoute>
              } 
            />
          </Route>

          <Route path="/bookingInfo/:hotelId" element={<BookingInfo />}>
            <Route 
              index 
              element={
                <ProtectedRoute requireAuth>
                  <Info />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="payment" 
              element={
                <ProtectedRoute requireAuth>
                  <Payments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="completed" 
              element={
                <ProtectedRoute requireAuth>
                  <Completed />
                </ProtectedRoute>
              } 
            />
          </Route>

          <Route path="/user" element={isAuthenticated ? <Landing /> : <Login />} />
          <Route path="/user/register" element={isAuthenticated ? <Landing /> : <Register />} />
          <Route path="/auth" element={isAuthenticated ? <Landing /> : <Login />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
    </AnimatePresence>
  );
});

// Separate 404 component
const NotFound = React.memo(() => (
  <div className="flex items-center justify-center min-h-96">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-600">Page not found</p>
    </div>
  </div>
));

NotFound.displayName = 'NotFound';
AnimatedRoutes.displayName = 'AnimatedRoutes';

export default AnimatedRoutes;
