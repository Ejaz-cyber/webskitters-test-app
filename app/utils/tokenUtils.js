import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import constants from './constants';

// const encryptToken = (token) => {
//   return CryptoJS.AES.encrypt(token, constants.TOKEN_SECRET_KEY).toString();
// };

// Function to decrypt the token
// const decryptToken = (encryptedToken) => {
//   const bytes = CryptoJS.AES.decrypt(encryptedToken, constants.TOKEN_SECRET_KEY);
//   return bytes.toString(CryptoJS.enc.Utf8);
// };

// Store token in AsyncStorage securely
export const storeToken = async (token) => {
  try {
    // console.log('token--', token.toString())
    // const encryptedToken = encryptToken(token);
    await AsyncStorage.setItem('userToken', token.toString());
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

// Retrieve token from AsyncStorage securely
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    // if (encryptedToken) {
    //   return decryptToken(encryptedToken);
    // }
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

// Remove token from AsyncStorage
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};
