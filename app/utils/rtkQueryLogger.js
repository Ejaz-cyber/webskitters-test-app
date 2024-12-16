import { isFulfilled, isRejected, isPending } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';

// Middleware to log requests and responses
const rtkQueryLogger = (storeAPI) => (next) => (action) => {
  if (isPending(action)) {
    console.log('Request Sent:', action.meta.arg);
  }

  if (isFulfilled(action)) {
    console.log('Response Received:', JSON.stringify(action.payload));
  }

  if (isRejected(action)) {
    console.error('Request Failed:', action.error);
  }

  return next(action);
};

export default rtkQueryLogger;
