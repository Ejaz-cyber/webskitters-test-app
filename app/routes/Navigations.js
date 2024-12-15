import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Easing} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {
//   createStackNavigator,
//   TransitionSpecs,
//   HeaderStyleInterpolators,
//   CardStyleInterpolators,
// } from '@react-navigation/stack';
import Login from '../screens/Login';
import ProductList from '../screens/ProductList';
import ProductDetails from '../screens/ProductDetails';
import Cart from '../screens/Cart';
import OrderDetails from '../screens/OrderDetails';
import UserProfile from '../screens/UserProfile';
import OrderList from '../screens/OrderList';
import { getToken } from '../utils/tokenUtils';
import SplashScreen from '../screens/SplashScreen';


// navigation animation
// https://reactnavigation.org/docs/stack-navigator/#animations

const Navigations = () => {
  const Stack = createNativeStackNavigator();
  // const Stack = createStackNavigator();

  const stackOptions = () => ({
    headerShown: false,
    unmountOnBlur: true,
    statusBarAnimation: 'slide',
    animation: 'fade_from_bottom',
  });
  const navigationOption = () => ({
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
  });

  const [initialRoute, setInitialRoute] = useState(null); // Null indicates the token check is in progress.

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      console.log('Token:', token);
      setInitialRoute(token ? 'ProductList' : 'Login'); // Set the route based on token presence.
    };

    checkToken();
  }, []);

  if (initialRoute === null) {
    return <SplashScreen />; // Show splash screen while checking token
  }

  return (
    <Stack.Navigator
      initialRouteName={"Login"}
      screenOptions={
        {
          headerShown: false,
          // gestureEnabled: true,
          // gestureDirection: 'horizontal',
        }
      }
      >
      <Stack.Screen
        name="Login"
        component={Login}
        // options={navigationOption}
        options={stackOptions}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        // options={navigationOption}
        // options={stackOptions}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        // options={navigationOption}
        // options={stackOptions}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        // options={navigationOption}
        // options={stackOptions}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        // options={navigationOption}
        // options={stackOptions}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        // options={navigationOption}
        // options={stackOptions}
      />
      <Stack.Screen
        name="OrderList"
        component={OrderList}
        // options={navigationOption}
        // options={stackOptions}
      />
    </Stack.Navigator>
    
  );
};

const styles = StyleSheet.create({});

export default Navigations;
