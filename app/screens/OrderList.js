import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrder } from '../slices/orderSlice';

const OrderList = () => {
  // Sample data for orders

  const orderList = useSelector(state => state.order.orders)
  console.log("orderList--------", orderList)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleOrderPress = (order) => {
    // Navigate to order details or perform an action
    console.log('Order clicked:', order);
    // dispatch(selectOrder(order))
    navigation.navigate('OrderDetails', {orderId: order.orderId});
  };

  const renderOrderItem = ({ item }) => {
    console.log("-----------", item)
    return <TouchableOpacity style={styles.orderItem} onPress={() => handleOrderPress(item)} key={item.orderId}>
      <View>
        <Text style={styles.orderNumber}>Order #{item.orderId}</Text>
        <Text style={styles.orderStatus}>Status: {item.status}</Text>
        <Text style={styles.orderDate}>Date: {item.date}</Text>
      </View>
      <Text style={styles.orderTotal}>{item.total}</Text>
    </TouchableOpacity>
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Orders</Text>
      <FlatList
        data={orderList}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderStatus: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  orderDate: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff4d4d',
  },
});

export default OrderList;
