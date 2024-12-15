import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-remix-icon';
import {TabView, SceneMap} from 'react-native-tab-view';
import {useNavigation} from '@react-navigation/native';
import { addToCart, decrementQuantity, incrementQuantity } from '../slices/cartSlice';
import { globalStyles } from './styles/globalStyles';

const ProductDetails = () => {
  const prod = useSelector(state => state.product.showDetailsForProduct); // Access the 'products' array from the Redux store
  // console.log('prod-----------------', prod);

  let cartItems = useSelector(state => state.cart.cartItems);
  let item = cartItems.find(item => item.id === prod.id)

  const navigation = useNavigation();

  const layout = useWindowDimensions();

  const dispatch = useDispatch();

  // todo: these aboutItem and Reviws component can be optimized
  const AboutItem = React.memo(() => {
    return (
      <View style={styles.tabContent}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{prod.description}</Text>

        <Text style={styles.sectionTitle}>Details</Text>
        <Text>Brand: {prod.brand}</Text>
        <Text>Category: {prod.category}</Text>
        <Text>Availability: {prod.availabilityStatus}</Text>
        <Text>Shipping: {prod.shippingInformation}</Text>
        <Text>Warranty: {prod.warrantyInformation}</Text>

        <Text style={styles.sectionTitle}>Dimensions</Text>
        <Text>Height: {prod.dimensions.height} cm</Text>
        <Text>Width: {prod.dimensions.width} cm</Text>
        <Text>Depth: {prod.dimensions.depth} cm</Text>

        <Text style={styles.sectionTitle}>Tags</Text>
        <Text>{prod.tags.join(', ')}</Text>
      </View>
    );
  }, []);

  const Reviews = React.memo(() => {
    return (
      <View>
        {prod.reviews.map((item, index) => (
          <View style={styles.reviewItem} key={index}>
            <Text style={styles.reviewerName}>{item.reviewerName}</Text>
            <Text style={styles.reviewDate}>
              {new Date(item.date).toLocaleDateString()}
            </Text>
            <Text style={styles.reviewRating}>Rating: {item.rating}</Text>
            <Text style={styles.reviewComment}>{item.comment}</Text>
          </View>
        ))}
      </View>
    );
  }, []);

  const [tempQuantity, setTempQuantity] = useState(1);

  const increment = () => {
    // setQuantity(prevQuantity => prevQuantity + 1);
    if(!item){
      setTempQuantity(prevState => prevState + 1)
    }else{
      dispatch(incrementQuantity(prod.id))
    }
  };

  const decrement = () => {
    // setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    if(!item){
      if(tempQuantity > 1){
        setTempQuantity(prevState => prevState - 1)
      }
    }else{
      dispatch(decrementQuantity(prod.id))
    }
  };

  const handleAddToCart = () => {
    // Add your buy now logic here
    let product = {
      ...prod,
      quantity: tempQuantity,
    };
    console.log('Buying product with quantity:', tempQuantity);

    dispatch(addToCart(product));
  };

  const handleGoToCart = () => {
    navigation.navigate("Cart")
  }

  

  return (
    <>
      <View style={globalStyles.backIcon}>
        <Icon name="arrow-left-circle-fill" size={40} />
      </View>
      <ScrollView style={styles.container}>
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={{uri: prod?.images[0]}} // replace with your image URL
            style={styles.productImage}
          />
          {/* <View style={styles.thumbnailContainer}>
        <Image
          source={{ uri: 'https://example.com/thumbnail1.jpg' }} // replace with your thumbnail URL
          style={styles.thumbnail}
        />
        <Image
          source={{ uri: 'https://example.com/thumbnail2.jpg' }} // replace with your thumbnail URL
          style={styles.thumbnail}
        />
      </View> */}
        </View>

        {/* Product Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.brand}>Brand: {prod.brand}</Text>
          <Text style={styles.productName}>{prod.title}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{prod.rating} Ratings</Text>
            <Text style={styles.reviews}>{prod.reviews.length} Reviews</Text>
          </View>

          <Text style={styles.price}>Price: $18.00</Text>

          {/* Quantity Selector and Buy Button */}
        </View>

        <AboutItem />
        <Reviews />

        {/* {SecondRoute()} */}
      </ScrollView>

      <View style={styles.actionContainer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.decrementButton}
            onPress={decrement}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item?.quantity ?? tempQuantity}</Text>
          <TouchableOpacity
            style={styles.incrementButton}
            onPress={increment}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {(cartItems.length > 0 && item?.quantity > 0) ? (
          <TouchableOpacity style={styles.buyButton} onPress={handleGoToCart}>
            <Text style={styles.buyButtonText}>Go to Cart</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buyButton} onPress={handleAddToCart}>
            <Text style={styles.buyButtonText}>Add item {prod.price * tempQuantity}</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  thumbnailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  detailsContainer: {
    marginTop: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  rating: {
    marginRight: 10,
  },
  reviews: {
    marginRight: 10,
  },
  sold: {
    marginRight: 10,
  },
  brand: {
    marginTop: 10,
    fontSize: 16,
  },
  price: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    // position: 'absolute',
    // bottom: 0,
    // zIndex: 9,
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buyButton: {
    backgroundColor: '#ff5722',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabBar: {
    backgroundColor: 'black',
  },
  tabIndicator: {
    backgroundColor: 'red',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabContent: {
    // flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
  reviewItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    // backgroundColor: 'black',
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: 12,
    color: 'gray',
  },
  reviewRating: {
    fontSize: 14,
    color: '#f39c12',
  },
  reviewComment: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
  decrementButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  incrementButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  quantityText: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  buyButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginLeft: 10,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
