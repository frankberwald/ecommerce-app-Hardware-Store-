import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAuth } from '../context/AuthContext'; // Verifique se o caminho está correto
import {HomePage} from '../pages/Home/Home';
import {CartPage} from '../pages/Cart/Cart';
import {ProductPage} from '../pages/Products/ProductsPage';
import Login from '../pages/Login/Login'; // Verifique se o caminho está correto
import CartNavigation from './CartNavigation'; // Certifique-se de que isso está correto

const Drawer = createDrawerNavigator();

const LoginNavigation = () => {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="FB Ferramentas"
            component={HomePage}
            options={{
              headerRight: () => <CartNavigation />,
              title: 'Home',
            }}
          />
          <Drawer.Screen name="Cart" component={CartPage} />
          <Drawer.Screen
        name="Products"
        component={ProductPage}
        options={{
          headerRight: () => <CartNavigation />,
        }}
      />
        </Drawer.Navigator>
      ) : (
        <Login />
      )}
    </>
  );
};

export default LoginNavigation;
