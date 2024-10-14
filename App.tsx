import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ThemeProvider } from './src/context/ThemeContext';
import { CartProvider } from './src/context/CartContext';
import { AuthProvider } from './src/context/AuthContext';
import CartNavigation from './src/components/CartNavigation';
import LoginNavigation from './src/components/NavigationAuth';
import { ProductPage } from './src/pages/Products/ProductsPage';
import { HomePage } from './src/pages/Home/Home';
import 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import SplashScreen from './src/pages/SplashScreen/SplashScreen';

const Drawer = createDrawerNavigator();

export default function App() {

  const [splashVisible, setSplashVisible] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthProvider>
        <ThemeProvider>
          <CartProvider>
            <NavigationContainer>
              <StatusBar
                backgroundColor="transparent"
                translucent={true}
                barStyle="dark-content"
              />
              {splashVisible ? (
                <SplashScreen />
              ) : (
                <Drawer.Navigator initialRouteName="Login">
                  <Drawer.Screen name="Login" component={LoginNavigation} options={{headerShown: false}} />
                  <Drawer.Screen name="Home" component={HomePage} />
                  <Drawer.Screen name="Cart" component={CartNavigation} />
                  <Drawer.Screen name="ProductPage" component={ProductPage} />
                </Drawer.Navigator>
              )}
            </NavigationContainer>
          </CartProvider>
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaView>
  );
}

<CartNavigation />

