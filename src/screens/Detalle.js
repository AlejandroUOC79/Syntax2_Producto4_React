import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const Detalle = ({ route, navigation }) => {
  // Recibimos los datos que nos envía el FlatList de la HomeScreen
  const { player } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: player.img }} style={styles.image} resizeMode = "cover"/>
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{player.nombre}</Text>
        <Text style={styles.position}>Posición: Alero / Base</Text> 
        <Text style={styles.description}>
          Análisis técnico: Jugador con gran capacidad de salto y precisión en el tiro exterior. 
          Clave en la estrategia de Syntax2 - BasketTech.
        </Text>

        <TouchableOpacity 
          style={styles.videoButton}
          onPress={() => navigation.navigate('Reproductor', { videoUrl: player.video })}
        >
          <Text style={styles.buttonText}>VER HIGHLIGHTS (VIDEO)</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  image: { width: '100%', height: 350, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  infoContainer: { padding: 20 },
  name: { fontSize: 32, fontWeight: 'bold', color: '#7c4dff' },
  position: { fontSize: 18, color: '#e69520', marginBottom: 15, fontWeight: '600' },
  description: { fontSize: 16, color: '#444', lineHeight: 24, marginBottom: 30 },
  videoButton: { backgroundColor: '#7c4dff', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});

export default Detalle;