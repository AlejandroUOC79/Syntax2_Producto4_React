import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation, // Para que la transición sea suave
  Platform,
  UIManager
} from "react-native";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Detalle = ({ route, navigation }) => {
  const { player } = route.params;
  const [expanded, setExpanded] = useState(false);

  const toggleStats = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageMask}>
        <Image
          source={{ uri: player.img }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.infoContainer}>
        {/* Banner de Información General */}
        <View style={styles.playerBanner}>
          <Text style={styles.name}>{player.nombre}</Text>
          <Text style={styles.label}>Equipo: <Text style={styles.value}>{player.equipo}</Text></Text>
          <Text style={styles.label}>Posición: <Text style={styles.value}>{player.posicion}</Text></Text>
          <Text style={styles.label}>Edad: <Text style={styles.value}>{player.edad} años</Text></Text>
          <Text style={styles.label}>Altura: <Text style={styles.value}>{player.altura} cm</Text></Text>
        </View>

        {/* Banner de Estadísticas (Desplegable) */}
        <TouchableOpacity 
          style={styles.playerBanner} 
          onPress={toggleStats}
          activeOpacity={0.8}
        >
          <View style={styles.headerRow}>
            <Text style={styles.name}>Estadísticas</Text>
            <Text style={styles.arrow}>{expanded ? "▲" : "▼"}</Text>
          </View>

          {/* Si 'expanded' es true, mostramos el contenido */}
          {expanded && (
            <View style={styles.statsContent}>
              <Text style={styles.label}>aPP: <Text style={styles.value}>{player.aPP}</Text></Text>
              <Text style={styles.label}>pPP: <Text style={styles.value}>{player.pPP}</Text></Text>
              <Text style={styles.label}>rPP: <Text style={styles.value}>{player.rPP}</Text></Text>
              <Text style={styles.label}>
                Porcentaje de tiros: <Text style={styles.value}>{player.porcentajeTiros} %</Text>
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {player.vid && (
          <TouchableOpacity
            style={styles.videoButton}
            onPress={() =>
              navigation.navigate("Reproductor", { 
                videoUrl: player.vid, 
                playerName: player.nombre 
              })
            }
          >
            <Text style={styles.buttonText}>VER HIGHLIGHTS (VIDEO)</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0000002d", paddingTop: "15%" },
  imageMask: {
    width: "100%",
    height: 350,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "flex-end"
  },
  infoContainer: { padding: 20 },
  name: { fontSize: 28, fontWeight: "bold", color: "#7B42FF" },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 20,
    color: "#e69520",
    fontWeight: "bold"
  },
  statsContent: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  label: {
    fontSize: 18,
    color: "#e69520",
    marginTop: 10,
    fontWeight: "600",
  },
  value: {
    color: "#7B42FF",
    fontWeight: "bold",
  },
  videoButton: {
    backgroundColor: "#7B42FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 100,
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  playerBanner: {
    marginBottom: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#8a8a8a",
    backgroundColor: '#f8f9fa',
    padding: 15,
    width: "100%",
  },
});

export default Detalle;