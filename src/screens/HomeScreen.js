import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebaseConfig'; 

const BasketTechApp = ({ navigation }) => { 
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = {
    primary: '#7c4dff',
    accent: '#e69520',
    background: '#f8f9fa',
    borde: '#0000002d',
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "jugadores"));
      const playersList = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPlayers(playersList);
      setLoading(false);
    } catch (error) {
      console.error("Error al buscar:", error); 
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: COLORS.borde }]}
      onPress={() => navigation.navigate('Detalle', { player: item })} // Nombre exacto que pusiste en App.js
    >
      <Image source={{ uri: item.img }} style={styles.image} />
      <Text style={[styles.name, { color: COLORS.primary }]}>{item.nombre}</Text>
    </TouchableOpacity>
  );
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#7c4dff" />
      </View>
    );
  }
  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 5 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { height: 90, justifyContent: 'center', paddingHorizontal: 20, paddingTop: 30 },
  headerTitle: { color: 'white', fontWeight: 'bold', fontSize: 25, textAlign: 'center' },
  card: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, borderRadius: 15, overflow: 'hidden', borderWidth: 1, borderColor: "#8a8a8a", marginHorizontal: 10 },
  image: { width: 100, height: 100 },
  name: { marginLeft: 20, fontSize: 20, fontWeight: 'bold' }
});

export default BasketTechApp;