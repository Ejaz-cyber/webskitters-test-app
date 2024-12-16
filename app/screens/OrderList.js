import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectOrder} from '../slices/orderSlice';
import {globalStyles} from './styles/globalStyles';
import Icon from 'react-native-remix-icon';
import colors from './styles/colors';

const OrderList = () => {
  // Sample data for orders

  const orderList = useSelector(state => state.order.orders);
  console.log('orderList--------', orderList);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleOrderPress = order => {
    console.log('Order clicked:', order);
    // dispatch(selectOrder(order))
    navigation.navigate('OrderDetails', {orderId: order.orderId});
  };

  const renderOrderItem = ({item, index}) => {
    console.log('-----------', item);
    return (
      <TouchableOpacity
        style={styles.orderItem}
        onPress={() => handleOrderPress(item)}
        key={index}>
        
        <View>
          <Text style={styles.orderNumber}>Order #{item.orderId}</Text>
          <Text style={styles.orderStatus}>Status: {item.status}</Text>
          <Text style={styles.orderDate}>Date: {item.date}</Text>
        </View>
        <Text style={styles.orderTotal}>${item.total}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity
        style={globalStyles.backIcon}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left-circle-fill" size={40} />
      </TouchableOpacity>
      <View
        style={{
          marginTop: 60,
        }}>
        <Text style={globalStyles.header}>My Orders</Text>
      </View>
      {orderList.length > 1 ? (
        <FlatList
          data={orderList}
          keyExtractor={item => item.id}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={{textAlign: 'center'}}>No Order Found</Text>
        </View>
      )}
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
    shadowOffset: {width: 0, height: 2},
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
    fontWeight: '600',
    color: colors.orange,
  },
});

export default OrderList;
