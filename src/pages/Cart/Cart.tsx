import React, { useState } from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { CartProvider, useCart } from "../../context/CartContext";
import { CartItem,  } from "../../interfaces/InterfaceTypes";

export const CartPage = () => {
    const { items, clearCart, getTotalItems, addItem, removeItemFromCart, updateItemQuantity } = useCart();
    const [ cartItems, setItems] = useState('')

    const renderCartItem = ({ item }: { item: CartItem }) => (
        <View style={styles.cartItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>R$ {item.price}</Text>
            <Text style={styles.itemQuantity}>Quantidade: {item.quantity}</Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => handleDecreaseQuantity(item)}>
                    <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.itemQuantity}>{item.quantity ?? 1}</Text>
                <TouchableOpacity onPress={() => handleIncreaseQuantity(item)}>
                    <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const handleClearCart = () => {
        clearCart();
        Alert.alert("Carrinho limpo!");
    };

    const handleIncreaseQuantity = (item: CartItem) => {
        addItem(item);
    }

    const handleDecreaseQuantity = (item: CartItem) => {
        const newQuantity = (item.quantity ?? 1) - 1;
        if (newQuantity > 0) {
            // Chama a nova função para atualizar a quantidade
            updateItemQuantity(item.id, newQuantity);
        } else {
            removeItemFromCart(item.id); // Remove o item se a quantidade for menor que 1
        }
    };

    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.price * (item.quantity ?? 1), 0).toFixed(2);
    };

    const handlePurchase = () => {
        if (items.length === 0) {
            Alert.alert("Seu carrinho está vazio.");
        } else {
            Alert.alert("Compra realizada com sucesso!");
            clearCart();
        }
    };

    return (
        <CartProvider>
            <View style={styles.container}>
                <Text style={styles.title}>Carrinho</Text>
                {items.length === 0 ? (
                    <Text style={styles.emptyMessage}>Seu carrinho está vazio.</Text>
                ) : (
                    <>
                        <FlatList
                            data={items}
                            renderItem={renderCartItem}
                            keyExtractor={(item) => item.id.toString()}
                        />
                        <Text style={styles.totalText}>Total: R$ {calculateTotal()}</Text>
                        <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
                            <Text style={styles.buttonText}>Comprar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
                            <Text style={styles.buttonText}>Limpar Carrinho</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </CartProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    emptyMessage: {
        fontSize: 18,
        color: '#777',
        textAlign: 'center',
    },
    cartItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemName: {
        fontSize: 18,
    },
    itemPrice: {
        fontSize: 16,
        color: '#333',
    },
    itemQuantity: {
        fontSize: 16,
        color: '#777',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 100,
    },
    quantityButton: {
        fontSize: 18,
        paddingHorizontal: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        textAlign: 'center',
    },
    itemImage: {
        width: 100,
        height: 100
    },
    clearButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#222B3C',
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    purchaseButton: {
        marginTop: 10,
        padding: 15,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        alignItems: 'center',
    },
}
);
