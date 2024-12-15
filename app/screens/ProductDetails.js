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
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from '../slices/cartSlice';
import {globalStyles} from './styles/globalStyles';
import colors from './styles/colors';

const ProductDetails = () => {
  const product = useSelector(state => state.product.showDetailsForProduct);
  let cartItems = useSelector(state => state.cart.cartItems);
  let item = cartItems.find(item => item.id === product.id);
  console.log("otem---",item)

  const navigation = useNavigation();

  const layout = useWindowDimensions();

  const dispatch = useDispatch();

  // todo: these aboutItem and Reviws component can be optimized
  const AboutItem = React.memo(() => {
    return (
      <View style={styles.tabContent}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        <Text style={styles.sectionTitle}>Details</Text>
        <Text>Brand: {product.brand}</Text>
        <Text>Category: {product.category}</Text>
        <Text>Availability: {product.availabilityStatus}</Text>
        <Text>Shipping: {product.shippingInformation}</Text>
        <Text>Warranty: {product.warrantyInformation}</Text>

        <Text style={styles.sectionTitle}>Dimensions</Text>
        <Text>Height: {product.dimensions.height} cm</Text>
        <Text>Width: {product.dimensions.width} cm</Text>
        <Text>Depth: {product.dimensions.depth} cm</Text>
      </View>
    );
  }, []);

  const Reviews = React.memo(() => {
    return (
      <View>
        <Text style={[styles.sectionTitle, {marginTop: 30}]}>Reviews</Text>

        {product.reviews.map((item, index) => (
          <View style={styles.reviewItem} key={index}>
            <Text style={styles.reviewerName}>{item.reviewerName}</Text>
            <Text style={styles.reviewDate}>
              {new Date(item.date).toLocaleDateString()}
            </Text>
            <Text style={styles.reviewRating}>
              Rating: {item.rating} <Icon name="star-fill" size={15} color={colors.orange}/>
            </Text>
            <Text style={styles.reviewComment}>{item.comment}</Text>
          </View>
        ))}
      </View>
    );
  }, []);

  const [tempQuantity, setTempQuantity] = useState(1);

  const increment = () => {
    // setQuantity(prevQuantity => prevQuantity + 1);
    if (!item) {
      setTempQuantity(prevState => prevState + 1);
    } else {
      dispatch(incrementQuantity(product.id));
    }
  };

  const decrement = () => {
    // setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    if (!item) {
      if (tempQuantity > 1) {
        setTempQuantity(prevState => prevState - 1);
      }
    } else {
      dispatch(decrementQuantity(product.id));
    }
  };

  const handleAddToCart = () => {
    // Add your buy now logic here
    let obj = {
      ...product,
      quantity: tempQuantity,
    };
    dispatch(addToCart(obj));
  };

  const handleGoToCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <>
      <TouchableOpacity style={globalStyles.backIcon} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left-circle-fill" size={40} />
      </TouchableOpacity>
      <ScrollView style={globalStyles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: product?.images[0]}} // replace with your image URL
            style={styles.productImage}
          />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.brand}>Brand: {product.brand}</Text>
          <Text style={styles.productName}>{product.title}</Text>

          <View style={styles.productChipContainer}>
            <View style={[globalStyles.productChip, {marginRight: 10}]}>
              <Text style={globalStyles.productDiscount}>
                {`${product.discountPercentage}% Off`}
              </Text>
            </View>
            <View style={[globalStyles.productChip, {marginRight: 10}]}>
              <Text style={globalStyles.productDiscount}>
                {product.rating} <Icon name="star-fill" size={12} />
              </Text>
            </View>
          </View>

          <Text style={styles.price}>Price: ${product.price}</Text>
        </View>

        <AboutItem />
        <Reviews />
      </ScrollView>

      <View style={styles.actionContainer}>
        <View style={globalStyles.quantityContainer}>
          <TouchableOpacity style={globalStyles.decrementButton} onPress={decrement}>
            <Text style={globalStyles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={globalStyles.quantityText}>
            {item?.quantity ?? tempQuantity}
          </Text>
          <TouchableOpacity style={globalStyles.incrementButton} onPress={increment}>
            <Text style={globalStyles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {cartItems.length > 0 && item?.quantity > 0 ? (
          <TouchableOpacity style={globalStyles.primaryBtn} onPress={handleGoToCart}>
            <Text style={globalStyles.buyButtonText}>Go to Cart</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={globalStyles.primaryBtn} onPress={handleAddToCart}>
            <Text style={globalStyles.buyButtonText}>
              Add item ${product.price * tempQuantity}
            </Text>
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
  productChipContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imageContainer: {
    alignItems: 'center',
    paddingTop: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
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
    // padding: 16,
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
    paddingVertical: 10,
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
    color: colors.orange,
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
