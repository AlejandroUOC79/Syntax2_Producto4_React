import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Text } from "react-native";

import Inicio from "./src/screens/HomeScreen";
import Detalle from "./src/screens/Detalle";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: "#e69520" },
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
        />
        <Stack.Screen
          name="Detalle"
          component={Detalle}
          options={{ title: "Detalle del Jugador" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
