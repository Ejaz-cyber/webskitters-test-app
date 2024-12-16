import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-remix-icon';
import { globalStyles } from './styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import UserCard from '../components/UserCard';

const OrderDetails = ({route}) => {
  const {orderId} = route.params;
  const [itemHeight, setItemHeight] = useState(null);
  const navigation = useNavigation()
  const orders = useSelector(state => state.order.orders);
  const order = orders.find(order => order.orderId === orderId);

  const handleItemLayout = useCallback(event => {
    if (itemHeight == null) {
      setItemHeight(event.nativeEvent.layout.height * order.items.length);
    }
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View
        style={[
          styles.itemContainer,
          {borderBottomWidth: index == order.items.length - 1 ? 0 : 1},
        ]}
        onLayout={handleItemLayout}
        key={item.id}>
        <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemPrice}>
            ${item.price.toFixed(2)} x {item.quantity}
          </Text>
          <Text style={styles.itemSubtotal}>
            Subtotal: ${(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={globalStyles.backIcon}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left-circle-fill" size={40} />
      </TouchableOpacity>
      <View
        style={{
          marginTop: 60,
        }}>
        <Text style={globalStyles.header}>Order Details</Text>
      </View>
      <UserCard />

      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <Text style={styles.summaryText}>Order ID: {order.orderId}</Text>
        <Text style={styles.summaryText}>Date: {order.date}</Text>
        <Text style={[styles.summaryText, styles.status]}>
          Status: {order.status}
        </Text>
      </View>

      <View style={styles.itemsContainer}>
        <Text style={styles.sectionTitle}>Items</Text>
        <FlatList
          // style={{height: itemHeight}}
          data={order.items}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
        />
      </View>

      {/* Payment and Shipping Details */}
      {/* <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        <Text style={styles.detailText}>{order.shippingAddress}</Text>

        <Text style={styles.sectionTitle}>Payment Method</Text>
        <Text style={styles.detailText}>{order.paymentMethod}</Text>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${order.totalAmount.toFixed(2)}</Text>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  summaryContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 14,
    marginVertical: 2,
  },
  status: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  itemsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  itemSubtotal: {
    fontSize: 14,
    color: '#333',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailText: {
    fontSize: 14,
    marginVertical: 5,
  },
  totalContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default OrderDetails;
