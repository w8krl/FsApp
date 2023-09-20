import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, element }) => {
  return isLoggedIn ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
