import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { logout } from '../redux/userSlice';
import { EMPTY_USER } from '../mutations/userMutations';

// Custom hook for authentication state and actions
export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, isFetching, error, errorMessage } = useSelector(
    (state: RootState) => state.user
  );

  const isAuthenticated = currentUser && 
    currentUser._id && 
    currentUser._id !== "" && 
    currentUser._id !== EMPTY_USER._id;

  const isAdmin = isAuthenticated && currentUser.isAdmin;

  const logoutUser = () => {
    dispatch(logout());
    navigate('/');
  };

  const requireAuth = () => {
    if (!isAuthenticated) {
      navigate('/user');
      return false;
    }
    return true;
  };

  const requireAdmin = () => {
    if (!isAuthenticated) {
      navigate('/user');
      return false;
    }
    if (!isAdmin) {
      navigate('/');
      return false;
    }
    return true;
  };

  return {
    currentUser,
    isAuthenticated,
    isAdmin,
    isFetching,
    error,
    errorMessage,
    logoutUser,
    requireAuth,
    requireAdmin
  };
};

// Custom hook for typed dispatch and selector
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;