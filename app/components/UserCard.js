import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../screens/styles/colors';

const UserCard = () => {
  const {user} = useSelector(state => state.user.user);
  const {location} = useSelector(state => state.user);

  return (
    <View style={styles.cardContainer}>
        <Text style={styles.name}>Deliver to</Text>

  
    <View style={styles.card}>

      <Image source={{uri: user.image}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
    </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'column',
        marginTop: 20
    },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    // margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 1,
    borderColor: colors.lightOrange,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
});
