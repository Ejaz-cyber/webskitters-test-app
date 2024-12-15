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
import {
  useGetProductsQuery,
  useLazyGetProductsQuery,
} from '../services/productsApi';
import {useDispatch, useSelector} from 'react-redux';
import {setShowDetailsForProduct} from '../slices/productSlice';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';
import {globalStyles} from './styles/globalStyles';
import colors from './styles/colors';
import {storeInfo} from '../utils/staticData';

const wordLimit = 10;

const ProductList = () => {
  const {
    data: products,
    error,
    isLoading,
    isUninitialized,
    isFetching,
  } = useGetProductsQuery();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const renderLoader = () => (
    <View style={globalStyles.modalBackground}>
      <View style={globalStyles.activityIndicatorWrapper}>
        <ActivityIndicator size="large" color={colors.orange} />
      </View>
    </View>
  );

  const renderProduct = ({item}) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => {
        dispatch(setShowDetailsForProduct(item.id));
        navigation.navigate('ProductDetails');
      }}>
      <View style={globalStyles.productChipContainer}>
        <View style={globalStyles.productChip}>
          <Text style={globalStyles.productDiscount}>
            {`${item.discountPercentage}% Off`}
          </Text>
        </View>
        <View style={globalStyles.productChip}>
          <Text style={globalStyles.productDiscount}>
            {item.rating} {""}
            <Icon name="star-fill" size={12} />
          </Text>
        </View>
      </View>
      <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>
          {item.description?.split(' ').slice(0, wordLimit).join(' ') + '...'}
        </Text>
        {/* <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text> */}
        <Text style={styles.productPrice}>${item.price}</Text>

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
          borderRadius: '50%',
          borderWidth: 2,
          borderColor: colors.orange,
          padding: 5,
          backgroundColor: colors.lightOrange,
        }}
        onPress={() => {
          navigation.navigate('UserProfile');
        }}>
        <Icon name="user-5-fill" size={32} />
      </TouchableOpacity>

      <Image source={{uri: storeInfo.imageUrl}} style={styles.storeImage} />
      <View style={styles.storeDetails}>
        <Text style={styles.storeName}>{storeInfo.name}</Text>
        <Text style={styles.storeAddress}>{storeInfo.address}</Text>
        <View style={styles.storeMetaContainer}>
          <View style={styles.storeMetaItem}>
            <Text style={styles.metaInfo}>{storeInfo.rating}</Text>
            <Text style={styles.metaInfoType}>{storeInfo.ratingsCount}</Text>
          </View>
          <View style={styles.storeMetaItem}>
            <Text style={styles.metaInfo}>{storeInfo.deliveryTime}</Text>
            <Text style={styles.metaInfoType}>{storeInfo.distance}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // will replace the loader with shimmer
  if (isLoading || isFetching || isUninitialized) {
    return (
      <>
        {renderStoreHeader()}
        {renderLoader()}
      </>
    );
  }
  return (
    <FlatList
      data={products.products}
      keyExtractor={item => item.id}
      renderItem={renderProduct}
      ListHeaderComponent={renderStoreHeader}
      contentContainerStyle={styles.container}
      numColumns={2}
      columnWrapperStyle={{justifyContent: 'space-between'}}
    />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  storeHeader: {
    alignItems: 'center', // Center content horizontally
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  storeImage: {
    width: 100,
    height: 100,
    borderRadius: 10, // Circular image
    marginBottom: 15, // Space below the image
  },
  storeName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  storeAddress: {
    fontSize: 16,
    fontWeight: 'medium',
    marginBottom: 8,
    textAlign: 'center',
  },
  storeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    width: '60%',
  },
  metaInfo: {
    fontSize: 16,
    fontWeight: '600',
  },
  metaInfoType: {
    fontSize: 14,
    color: colors.lightText,
  },
  storeDistance: {
    fontSize: 16,
    fontWeight: '600',
    color: 'gray',
  },
  storeMetaItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  // productContainer: {
  //   margin: 10,
  //   padding: 20,
  //   borderWidth: 1,
  //   borderColor: '#ddd',
  //   borderRadius: 10,
  //   backgroundColor: '#fff',
  // },
  productContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 8, // Add margin to create spacing between items
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    flex: 1, // Make it flexible to evenly distribute space
    maxWidth: '48%', // Ensure two items fit per row with spacing
  },
  thumbnail: {
    width: '100%', // Make the thumbnail full width of the card
    height: 120, // Adjust height as needed
    borderRadius: 8,
  },
  productInfo: {
    marginTop: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    fontSize: 12,
    color: colors.lightText,
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  productRating: {
    fontSize: 12,
    color: '#f39c12',
  },
});
