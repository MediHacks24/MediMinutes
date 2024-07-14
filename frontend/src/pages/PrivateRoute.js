// Import necessary modules
import { useRouter } from 'next/router'; // Import useRouter from next/router
import { useAuth } from '@/contexts/authContext'; // Adjust path as needed

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  const router = useRouter(); // Initialize router using useRouter

  // Array of protected routes
  const protectedRoutes = ['/user', '/updateprofile'];

  // Check if user is authenticated, redirect to login if not
  if (!currentUser && protectedRoutes.includes(router.pathname)) {
    router.push('/login');
    return null;
  }

  // Render children if user is authenticated
  return children;
}

export default PrivateRoute;