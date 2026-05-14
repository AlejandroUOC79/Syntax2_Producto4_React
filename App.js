import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Text, View } from "react-native";
import { HeaderHeightContext } from "@react-navigation/elements";
import messaging from '@react-native-firebase/messaging';

import Inicio from "./src/screens/HomeScreen";
import Detalle from "./src/screens/Detalle";
import Reproductor from "./src/screens/Reproductor";

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
      try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Fallo de permiso para notificaciones');
          return;
        }
        
        // A veces el token tarda un pelín en generarse al primer inicio
        const token = await messaging().getToken();
        console.log("----------------------------");
        console.log("TU TOKEN DE FIREBASE:");
        console.log(token);
        console.log("----------------------------");

      } catch (error) {
        console.error("Error obteniendo el token:", error);
      }
    } else {
      alert('Debes usar un dispositivo físico');
    }
  }

  return (
    <NavigationContainer style={{ backgroundColor: "#00000000", height: 300}}>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerMode: "float",
          headerTransparent: true,
          headerBackground: () => (
            <View
              style={{
                backgroundColor: "#e69520",
                flex: 1,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                height: "100",
                elevation: 5,
                shadowColor: "#000",
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 2 },
              }}
            />
          ),
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerShown: Boolean(true), // Forzado como booleano puro
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Inicio")}
              style={{ marginRight: 15 }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Inicio</Text>
            </TouchableOpacity>
          ),
        })}
      >
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{ title: "BasketTech - Retos" }}
          style={{ fontWeight: "bold" }}
        />
        <Stack.Screen
          name="Detalle"
          component={Detalle}
          options={{ title: "Detalle del Jugador" }}
          style={{ fontWeight: "bold" }}
        />
        <Stack.Screen
          name="Reproductor"
          component={Reproductor}
          options={{ title: "Vídeo Highlights" }}
          style={{ fontWeight: "bold" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
