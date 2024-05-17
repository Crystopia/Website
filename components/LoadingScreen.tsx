// components/LoadingScreen.tsx
import React from 'react';

const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black z-50">
    <div className="spinner">
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
    </div>
  </div>
);

export default LoadingScreen;
