// UserProfile.js
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearUser} from '../slices/userSlice';
import {globalStyles} from './styles/globalStyles';
import Icon from 'react-native-remix-icon';

const UserProfile = () => {
  const {user} = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleOptionPress = option => {
    console.log(`You clicked on: ${option}`);
    if (option == 'MyOrders') {
      navigation.navigate('OrderList');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout', // Dialog title
      'Are you sure you want to log out?', // Dialog message
      [
        {
          text: 'Cancel', // Cancel button
          style: 'cancel',
        },
        {
          text: 'OK', // OK button
          onPress: () => {
            dispatch(clearUser()); // Clear user data
            navigation.reset({
              index: 0,
              routes: [{name: 'Login'}], // Navigate to the login screen
            });
          },
        },
      ],
      {cancelable: false}, // Prevent dialog dismissal by tapping outside
    );
  };

  if (user == null) {
    return (
      <View>
        <Text>please login</Text>
      </View>
    );
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'Login'}],
    // });
  }
  console.log('cached user', user);

  return (
    <View style={[globalStyles.container, {paddingTop: '30%'}]}>
      <TouchableOpacity style={globalStyles.backIcon} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left-circle-fill" size={40} />
      </TouchableOpacity>
      <View style={styles.header}>
        <Image source={{uri: user?.image}} style={styles.profilePic} />
        <Text style={styles.userName}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          disabled
          onPress={() => handleOptionPress('EditProfile')}
          style={styles.option}>
          <Text style={styles.disabled}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOptionPress('MyOrders')}
          style={styles.option}>
          <Text style={styles.text}>My Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled
          onPress={() => handleOptionPress('MyAddress')}
          style={styles.option}>
          <Text style={styles.disabled}>My Address</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled
          onPress={() => handleOptionPress('Language')}
          style={[styles.option, {borderBottomWidth: 0}]}>
          <Text style={styles.disabled}>Language</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          globalStyles.primaryBtn,
          {
            marginHorizontal: 16,
            position: 'absolute',
            bottom: 10,
            left: 0,
            right: 0,
          },
        ]}
        onPress={handleLogout}>
        <Text style={globalStyles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  userEmail: {
    fontSize: 16,
    color: '#555',
  },
  ordersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  ordersList: {
    marginBottom: 20,
  },
  orderItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderPrice: {
    fontSize: 14,
    color: '#D5006D',
  },
  orderDate: {
    fontSize: 12,
    color: '#555',
  },
  // logoutButton: {
  //   marginHorizontal: 16,
  //   backgroundColor: '#ff4d4d',
  //   padding: 15,
  //   borderRadius: 5,
  //   alignItems: 'center',
  //   position: 'absolute',
  //   bottom: 10,
  //   left: 0,
  //   right: 0,
  // },
  // logoutButtonText: {
  //   color: '#fff',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
  optionsContainer: {
    marginHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    paddingVertical: 10,
  },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  disabled: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#cccccc',
    margin: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    margin: 5,
  },
});

export default UserProfile;
