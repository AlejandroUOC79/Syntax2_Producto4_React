import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

const { width, height } = Dimensions.get('window');

function Reproductor({ route }) {
  const videoUrl = route?.params?.videoUrl;
  const playerName = route?.params?.playerName || 'Jugador Desconocido';
  
  // Estados para el control manual
  const [paused, setPaused] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => setPaused(!paused);

  return (
    <View style={styles.container}>
      <View style={styles.contentBody}>
        <View style={styles.videoCard}>
          {/* Header */}
          <View style={styles.playerBanner}>
            <Text style={styles.playerNameText}>{playerName}</Text>
          </View>
          {/* Área del Video */}
          <View style={styles.videoWrapper}>
            {videoUrl ? (
              <Video 
                ref={videoRef}
                source={{ uri: videoUrl }}
                style={styles.videoPlayer}
                shouldPlay={!paused}
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                useNativeControls={false}
              />
            ) : (
              <View style={styles.noVideoContainer}>
                <Text style={styles.noVideoText}>No hay video disponible</Text>
              </View>
            )}
          </View>
          {/* Como he odiado hacer esto */}
          <View style={styles.customControls}>
            <TouchableOpacity onPress={togglePlay} style={styles.controlButton}>
              <Text style={styles.controlButtonText}>
                {paused ? '▶ PLAY' : '|| PAUSA'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => videoRef.current?.setPositionAsync(0)} 
              style={styles.controlButton}
            >
              <Text style={styles.controlButtonText}>Reiniciar vídeo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0000002d',
  },
  contentBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoCard: {
    width: width * 0.85,
    height: height * 0.85,
    backgroundColor: '#565656',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: 'hidden',
    elevation: 10,
  },
  playerBanner: {
    backgroundColor: '#7B42FF',
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  playerNameText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  videoWrapper: {
    flex: 1,
    backgroundColor: '#565656',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  customControls: {
    backgroundColor: '#7B42FF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  controlButton: {
    paddingHorizontal: 20,
  },
  controlButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  noVideoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noVideoText: {
    color: '#AAA',
    fontSize: 16,
  }
});

export default Reproductor;