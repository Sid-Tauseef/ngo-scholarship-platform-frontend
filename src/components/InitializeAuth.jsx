import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAuth } from '../features/auth/authSlice';

const InitializeAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return null;
};

export default InitializeAuth;