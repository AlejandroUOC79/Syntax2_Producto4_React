import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';

// Importación de pantallas
import Inicio from './src/screens/HomeScreen';
import Detalle from './src/screens/Detalle';
import Reproductor from './src/screens/Reproductor';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: '#e69520' }, // Estilo predeterminado de colores
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          // Añadimos botón en el menú para volver a la ventana inicial
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => navigation.navigate('Inicio')}
              style={{ marginRight: 15 }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Inicio</Text>
            </TouchableOpacity>
          ),
        })}
      >
        <Stack.Screen name="Inicio" component={Inicio} options={{ title: 'BasketTech - Retos' }} />
        <Stack.Screen name="Detalle" component={Detalle} />
        <Stack.Screen name="Reproductor" component={Reproductor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}