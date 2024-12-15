import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {getToken} from '../utils/tokenUtils';
import {useLazyGetProductsQuery} from '../services/productsApi';
import {useDispatch, useSelector} from 'react-redux';
import {setShowDetailsForProduct} from '../slices/productSlice';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';

const storeInfo = {
  name: 'Store Name',
  address: 'Store Address',
  rating: '4.6',
  ratingsCount: '18k ratings',
  deliveryTime: '20 min',
  distance: '4 km',
  imageUrl: 'https://via.placeholder.com/100', // Placeholder image URL
};

const ProductList = () => {
  const [getProducts, productsResponse] = useLazyGetProductsQuery();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    // let delay = setTimeout(() => {
    //   // getProducts();
    // }, 2000);

    // return () => {
    //   clearTimeout(delay);
    // };
    getProducts();
  }, []);

  const prods = useSelector(state => state.product.products);

  useEffect(() => {
    console.log('prods---', prods);
  }, [prods]);

  useEffect(() => {
    console.log(
      productsResponse.isFetching,
      productsResponse.isLoading,
      productsResponse.isUninitialized,
      productsResponse.currentData,
    );
  }, [productsResponse]);

  const renderLoader = () => (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );

  const renderProduct = ({item}) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => {
        dispatch(setShowDetailsForProduct(item.id));
        navigation.navigate('ProductDetails');
      }}>
      <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        {/* <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text> */}
        <Text style={styles.productPrice}>${item.price}</Text>
        <Text style={styles.productDiscount}>
          {`Discount: ${item.discountPercentage}%`}
        </Text>
        <Text style={styles.productRating}>{`Rating: ${item.rating}`}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderStoreHeader = () => (
    <View style={styles.storeHeader}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 2,
        }}
        onPress={() => {
          console.log('clicked----------');
          navigation.navigate('UserProfile');
        }}>
        <Icon name="user-5-fill" size={28} />
      </TouchableOpacity>

      <Image source={{uri: storeInfo.imageUrl}} style={styles.storeImage} />
      <View style={styles.storeDetails}>
        <Text style={styles.storeName}>{storeInfo.name}</Text>
        <Text style={styles.storeAddress}>{storeInfo.address}</Text>
        <Text style={styles.storeRating}>
          {storeInfo.rating} ⭐ ({storeInfo.ratingsCount})
        </Text>
        <Text style={styles.storeMeta}>
          {storeInfo.deliveryTime} • {storeInfo.distance}
        </Text>
      </View>
    </View>
  );

  // will replace the loader with shimmer
  if (
    productsResponse.isLoading ||
    productsResponse.isFetching ||
    productsResponse.isUninitialized
  ) {
    return (
      <>
        {renderStoreHeader()}
        {renderLoader()}
      </>
    );
  }
  return (
    <>
      <FlatList
        data={productsResponse.data.products} // Empty array during loading
        keyExtractor={item => item.id}
        renderItem={renderProduct} // Conditionally render loader
        ListHeaderComponent={renderStoreHeader} // Header remains static
        contentContainerStyle={styles.container}
      />
    </>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  storeHeader: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  storeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  storeDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  storeName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  storeAddress: {
    fontSize: 14,
    color: 'gray',
  },
  storeRating: {
    fontSize: 14,
    marginTop: 5,
  },
  storeMeta: {
    fontSize: 14,
    color: 'gray',
    marginTop: 3,
  },
  productContainer: {
    margin: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  productText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loaderContainer: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    padding: 10,
  },
  productContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  productDiscount: {
    fontSize: 14,
    color: '#e74c3c',
  },
  productRating: {
    fontSize: 14,
    color: '#f39c12',
  },
});
