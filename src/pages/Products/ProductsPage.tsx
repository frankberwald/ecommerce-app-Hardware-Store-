import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, Image, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios'
import { ProductsList } from '../../interfaces/InterfaceTypes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CartProvider, useCart } from '../../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import CartNavigation from '../../components/CartNavigation';

export const ProductPage = () => {
  const navigation = useNavigation()
  const { addItem } = useCart();
  const [products, setProducts] = useState<ProductsList[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    axios.get('http://10.0.0.113:3000/produtos')
      .then((response) => {
        setProducts(response.data)
        setFilteredProducts(response.data)
        console.log(response.data)
      })
      .catch(() => {
        Alert.alert("Não foi possível se conectar a base de dados")
      })
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      if (query) {
        const filteredData = products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filteredData);
      } else {
        setFilteredProducts(products);
      }
    }, 100)
  };

  const renderProduct = ({ item }: { item: ProductsList }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>R$ {item.price}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity style={styles.cartAdd} onPress={() => { addItem(item); Alert.alert(`${item.name} adicionado ao carrinho!`) }}><Text style={styles.buttonText}>Adicionar ao carrinho</Text></TouchableOpacity>
    </View>
  );

  return (
    
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.container}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar produto..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {filteredProducts.length === 0 ? (
            <Text>Nenhum produto encontrado.</Text>
          ) : (
            <FlatList
              data={filteredProducts}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>
      </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#cccccc',
    justifyContent: 'center'
  },
  searchInput: {
    height: 40,
    borderColor: '#999',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  card: {
    width: 350,
    backgroundColor: '#CDC9BF',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cartAdd: {
    borderWidth: 1,
    borderColor: 'CCC',
    borderRadius: 10,
    backgroundColor: '#425063'
  },
  buttonText: {
    fontSize: 16,
    padding: 5,
    color: '#fff'
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 8,
    borderRadius: 10
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#222B3C',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#222B3C',
    marginBottom: 8,
    textAlign: 'center'
  },
  cartIconContainer: {
    position: 'relative',
    marginRight: 10,
  },
  cartCount: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});