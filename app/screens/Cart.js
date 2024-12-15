import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
} from '../slices/cartSlice';
import {addOrder} from '../slices/orderSlice';
import {globalStyles} from './styles/globalStyles';
import colors from './styles/colors';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const totalAmount = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const navigation = useNavigation();

  const handleDecrement = id => {
    dispatch(decrementQuantity(id));
  };

  const handleIncrement = id => {
    dispatch(incrementQuantity(id));
  };

  const getOrderId = () => {
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    return randomNumber;
  };
  const handleCheckout = () => {
    setLoading(true);
  
    let orderId = getOrderId();
    let orderBody = {
      orderId,
      date: new Date().toLocaleString(),
      status: 'in-progress',
      items: cartItems,
    };
  
    //delay (e.g., 2 seconds)
    setTimeout(() => {
      dispatch(addOrder(orderBody));
      dispatch(clearCart());
      setLoading(false);
  
      navigation.reset({
        index: 1,
        routes: [
          { name: 'ProductList' },
          { name: 'OrderDetails', params: { orderId } },
        ],
      });
    }, 2000); // 2000ms = 2 seconds
  };
  

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
      <Modal
        transparent={true}
        animationType="fade"
        visible={isLoading}
        // onRequestClose={hideLoading} // Handle back press
      >
        <View style={globalStyles.modalBackground}>
          <View style={globalStyles.activityIndicatorWrapper}>
            <ActivityIndicator size="large" color={colors.orange} />
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={globalStyles.backIcon}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left-circle-fill" size={40} />
      </TouchableOpacity>
      <View
        style={{
          marginTop: 60,
        }}>
        <Text style={styles.header}>Cart</Text>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>

      <View
        style={[
          globalStyles.actionContainer,
          {position: 'absolute', bottom: 0, right: 0},
        ]}>
        <TouchableOpacity
          style={globalStyles.primaryBtn}
          onPress={handleCheckout}>
          <Text style={globalStyles.buyButtonText}>
            Place Order: ${totalAmount}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 16,
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
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
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
    fontWeight: 'bold',
  },
});

export default Cart;
