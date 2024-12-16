import {
  ActivityIndicator,
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';
import colors from './styles/colors';
import {globalStyles} from './styles/globalStyles';
import {useLoginUserMutation} from '../services/userApi';
import {useDispatch} from 'react-redux';

const Login = () => {
  const navigation = useNavigation();
  const [username, setusername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');

  const [loginUser, loginUserResult] = useLoginUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(loginUserResult)
  },[loginUserResult])

  const handleLogin = () => {
    console.log('Login with username:', username, 'and password:', password);

    if(password.length < 5){
      ToastAndroid.show("Password must be greater than 5 characters", ToastAndroid.SHORT);
      return
    }
    loginUser({
      username,
      password,
    });
  };

  useEffect(() => {
    // console.log("login user result", loginUserResult)
    if (loginUserResult.status == 'fulfilled') {
      navigation.navigate('ProductList');
    }
    if (loginUserResult.error != null) {
      ToastAndroid.show(loginUserResult.error.data?.message, ToastAndroid.SHORT);
    }
  }, [loginUserResult]);

  return (
    <View style={globalStyles.container}>
      {/* <View style={styles.headerDecoration}></View> */}

        <Modal
          transparent={true}
          animationType="fade"
          visible={loginUserResult.isLoading}
          // onRequestClose={hideLoading} // Handle back press
        >
          <View style={globalStyles.modalBackground}>
            <View style={globalStyles.activityIndicatorWrapper}>
              <ActivityIndicator size="large" color={colors.orange} />
            </View>
          </View>
        </Modal>

      <View style={styles.content}>
        <Text style={globalStyles.title}>Login</Text>
        <Text style={globalStyles.subtitle}>Please sign in to continue.</Text>

        <View style={globalStyles.inputContainer}>
          <Icon name="user-5-fill" size="24" color="black" />
          <TextInput
            style={globalStyles.input}
            value={username}
            onChangeText={setusername}
            placeholder="Username"
            autoCapitalize="none"
            placeholderTextColor={colors.gray}
          />
        </View>

        <View style={globalStyles.inputContainer}>
          <Icon name="key-fill" size="24" color="black" />
          <TextInput
            style={globalStyles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            autoCapitalize="none"
            placeholderTextColor={colors.gray}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.forgot}>
          <Text style={styles.forgotText}>FORGOT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[globalStyles.primaryBtn, {marginTop: 30}]} onPress={handleLogin}>
          <Text style={globalStyles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footerText}>
        Don’t have an account? <Text style={styles.signUpText}>Sign up</Text>
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  headerDecoration: {
    height: 200,
    backgroundColor: colors.yellow,
    borderBottomRightRadius: 100,
    position: 'absolute',
    top: 0,
    right: 0,
    width: '50%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  forgot: {
    alignItems: 'flex-end',
  },
  icon: {
    marginRight: 10,
  },
  forgotText: {
    color: colors.orange,
    fontWeight: 'bold',
    fontSize: 12,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.gray,
    marginBottom: 50,
  },
  signUpText: {
    color: colors.orange,
    fontWeight: 'bold',
  },
});
