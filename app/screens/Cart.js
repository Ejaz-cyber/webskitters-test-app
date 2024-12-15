import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import {useDispatch, useSelector} from 'react-redux';
import { clearCart, decrementQuantity, incrementQuantity } from '../slices/cartSlice';
import { addOrder } from '../slices/orderSlice';
import { globalStyles } from './styles/globalStyles';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch()

  const totalAmount = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const navigation = useNavigation();

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id))
  }
  
  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id))
  }

  const getOrderId = () => {
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    return randomNumber
  }
  const handleCheckout = () => {
    let orderId = getOrderId()
    let orderBody = {
      orderId,
      date: new Date().toLocaleString(),
      status: "in-progress",
      items: cartItems
    }
    dispatch(addOrder(orderBody))
    dispatch(clearCart())

    navigation.reset({
      index: 1, 
      routes: [
        { name: 'ProductList' }, 
        { name: 'OrderDetails', params: { orderId } } 
      ],
    });

    // navigation.navigate('OrderDetails', {orderId})
  }

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      {/* Thumbnail Image */}
      <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />

      {/* Item Details */}
      <View style={styles.itemDetails}>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text
          style={[
            styles.availability,
            item.availabilityStatus === 'Low Stock'
              ? styles.lowStock
              : styles.inStock,
          ]}>
          {item.availabilityStatus}
        </Text>
      </View>

      {/* Quantity Controls */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleDecrement(item.id)}>
          <Icon name="subtract-fill" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => handleIncrement(item.id)}>
          <Icon name="add-fill" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.backIcon}>
        <Icon name="arrow-left-circle-fill" size={40} />
      </View>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Price: ${totalAmount}</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Check Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E6F3',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemDetails: {
    flex: 1,
  },
  brand: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginTop: 10,
    backgroundColor: '#D5006D',
    padding: 10,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  brand: {
    fontSize: 14,
    color: '#555',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  price: {
    fontSize: 14,
    color: '#007BFF',
  },
  availability: {
    fontSize: 12,
    marginTop: 5,
  },
  lowStock: {
    color: '#FF6347',
  },
  inStock: {
    color: '#228B22',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default Cart;
