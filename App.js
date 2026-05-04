import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Text, View } from "react-native";
import { HeaderHeightContext } from "@react-navigation/elements";

import Inicio from "./src/screens/HomeScreen";
import Detalle from "./src/screens/Detalle";
import Reproductor from "./src/screens/Reproductor";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={{ backgroundColor: "#00000000"}}>
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
                height: "15%",
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
