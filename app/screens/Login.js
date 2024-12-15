import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';
import colors from './styles/colors';
import {globalStyles} from './styles/globalStyles';
import { useLoginUserMutation } from '../services/userApi';
import { useDispatch } from 'react-redux';

const Login = () => {
  const navigation = useNavigation();
  const [username, setusername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');

  const [loginUser, loginUserResult] = useLoginUserMutation()
  const dispatch = useDispatch()

  const handleLogin = () => {
    // Your login logic here
    console.log('Login with username:', username, 'and password:', password);
    loginUser({
        username,
        password
    })

  };

  useEffect(() => {
    // console.log("login user result", loginUserResult)
    if(loginUserResult.status == "fulfilled"){
        navigation.navigate("ProductList")
    }

  }, [loginUserResult])

  return (
    <View style={globalStyles.container}>
      {/* <View style={styles.headerDecoration}></View> */}

      <View style={styles.content}>
        <Text style={globalStyles.title}>Login</Text>
        <Text style={globalStyles.subtitle}>Please sign in to continue.</Text>

        <View style={styles.inputContainer}>
          <Icon name="mail-fill" size="24" color="black" />
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setusername}
            placeholder="Username"
            autoCapitalize="none"
            placeholderTextColor={colors.gray}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="mail-lock-fill" size="24" color="black" />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            autoCapitalize="none"
            placeholderTextColor={colors.gray}
            secureTextEntry
          />
          <TouchableOpacity>
            <Text style={styles.forgotText}>FORGOT</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
          <Text style={globalStyles.buttonText}>LOGIN</Text>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: colors.black,
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
    marginBottom: 50

  },
  signUpText: {
    color: colors.orange,
    fontWeight: 'bold',
  },
});
