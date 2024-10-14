import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {useCart} from '../context/CartContext'

const CartNavigation = () => {
  const { getTotalItems } = useCart();
  const navigation = useNavigation();
  const [cartItemCount, setCartItemCount] = useState('');

  useEffect(() => {
    const totalItems = getTotalItems();
    setCartItemCount(totalItems.toString());
  }, [getTotalItems]);

  return (
    <TouchableOpacity
      style={styles.cartContainer}
      onPress={() => navigation.navigate('Cart')}
    >
      <MaterialCommunityIcons name="cart-outline" size={24} color="#000" />
      {cartItemCount !== '0' && (
        <Text style={styles.cartCount}>{cartItemCount}</Text>
      )}
    </TouchableOpacity>
  );
};
// Estilos
const styles = StyleSheet.create({
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  cartCount: {
    marginLeft: 4,
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default CartNavigation;
