import { StyleSheet } from 'react-native';
import colors from './colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 20,
  },
  primaryBtn: {
    backgroundColor: colors.orange,
    borderRadius: 30,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
    // marginVertical: 20,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  backIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 9,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  header: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    fontSize: 32,
    fontWeight: 'bold',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
    fontWeight: 'bold'
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: colors.black,
    paddingStart: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  activityIndicatorWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  productChipContainer: {
    position: 'absolute',
    top: 5,
    left: 0,
  },
  productChip: {
    backgroundColor: colors.lightOrange,
    padding: 5,
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    marginBottom: 5,
  },
  productDiscount: {
    fontSize: 12,
    // color: '#e74c3c',
  },
});
