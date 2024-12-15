import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';

const MyStatusBar = (props) => {
  return (
    <StatusBar
      animated={true}
      // backgroundColor={"#ffffff00"}
      translucent={false}  // makes the view translucent, other view are visible on statusbar
      {...props}
    />
  );
};

const styles = StyleSheet.create({});

export default MyStatusBar;
