import { createContext, useContext, useState } from 'react';
import { CartItem, CartContextData, CartProviderProps } from '../interfaces/InterfaceTypes';

// Criacao do contexto
const CartContext = createContext<CartContextData | undefined>(undefined);

// Criacao do Provider e exportar funcoes e variaveis
export const CartProvider = ({ children }: CartProviderProps) => {
    const [items, setItems] = useState<CartItem[]>([])

    // Numero de itens no carrinho
    function getTotalItems(): number {
        return items.length // [1, 2, 3].length => 3
    }

    // Add Item
    function addItem(item: CartItem): void {
        setItems(prev => {
            const existingItem = prev.find(i => i.id === item.id);
            if (existingItem) {
                return prev.map(i =>
                    i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
                );
            } else {
                return [...prev, { ...item, quantity: 1 }];
            }
        });
    }

    function updateItemQuantity(id: number, quantity: number): void {
        setItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    }

    function removeItemFromCart(id: number): void {
        setItems(prev => prev.filter(item => item.id !== id));
    }

    // Clear Cart
    function clearCart(): void {
        setItems([])
    }

    return (
        <CartContext.Provider value={{ items, getTotalItems, addItem, clearCart, removeItemFromCart, updateItemQuantity }}>
            {children}
        </CartContext.Provider>
    )
}

// Criar o hook personalizado
export const useCart = (): CartContextData => {
    const context = useContext(CartContext);
    if(context === undefined){
        throw new Error("useCart must be used within a CartProvider")
    }
    return context;
}


// const { getTotalItems, clearCart } = useCart()