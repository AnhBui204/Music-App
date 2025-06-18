// file components/AlbumDetail.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import db from "../db.json";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const images: Record<string, any> = {
  cover: require("../assets/images/cover.png"),
};

const AlbumDetail = ({ album, goBack }: any) => {
  const [songs, setSongs] = useState(db.favorites.slice(0, 5));
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleRemove = () => {
    setSongs((prevSongs) => prevSongs.filter((s) => s.id !== selectedSongId));
    setShowOptions(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
  
      <Image source={images[album.imageKey]} style={styles.albumCover} />
      <Text style={styles.title}>{album.title}</Text>
      <Text style={styles.artist}>{album.artist}</Text>
  
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.playButton}>
          <Ionicons name="play" size={18} color="#000" />
          <Text style={styles.playText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shuffleButton}>
          <Ionicons name="shuffle" size={18} color="#fff" />
          <Text style={styles.shuffleText}>Shuffle</Text>
        </TouchableOpacity>
      </View>
  
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.songItem}>
            <Image source={images[item.imageKey]} style={styles.cover} />
            <View style={styles.info}>
              <Text style={styles.songTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.artist}>{item.artist}</Text>
            </View>
            <View style={styles.iconGroup}>
              <TouchableOpacity>
                <FontAwesome name="thumbs-up" size={22} color="#1DB954" />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="thumbs-down" size={22} color="#888" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedSongId(item.id);
                  setShowOptions(true);
                }}
              >
                <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
  
      {/* 👉 Modal đặt ở đây */}
      <Modal
        transparent={true}
        visible={showOptions}
        animationType="fade"
        onRequestClose={() => setShowOptions(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setShowOptions(false)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleRemove}>
              <Text style={styles.modalText}>Remove</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
  
};



export default AlbumDetail;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
      },
      modalContent: {
        backgroundColor: "#222",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
      },
      modalText: {
        color: "#fff",
        fontSize: 18,
      },
      
  cover: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 14,
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },
  info: {
    flex: 1,
  },
  songTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  artist: {
    color: "#bbb",
    fontSize: 15,
    marginTop: 2,
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginRight: 10,
  },

  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  albumCover: {
    width: "100%",
    height: 200,
    borderRadius: 14,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },

  buttonRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  shuffleButton: {
    backgroundColor: "#444",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  playText: {
    color: "#000",
    marginLeft: 6,
    fontWeight: "bold",
  },
  shuffleText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "bold",
  },
  songArtist: {
    color: "#aaa",
    fontSize: 13,
  },
});
