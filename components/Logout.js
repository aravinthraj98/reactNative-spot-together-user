import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';

export default function Logout({ logout }) {
  useEffect(() => {
    logout();
  }, []);
  return <AppLoading />;
}
