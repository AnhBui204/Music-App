import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { StatusBar, Platform } from "react-native";
import React, { useState } from 'react';
import SearchScreen from './SearchScreen'; // hoặc từ 'app/search' nếu bạn dùng expo-router

export default function Header() {
    const [searchVisible, setSearchVisible] = useState(false);

    return (
        <>
            <View style={styles.headerContainer}>
                <View style={styles.leftContainer}>
                    <Image
                        source={require('@/assets/images/partial-react-logo.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.musicText}>Music</Text>
                </View>

                <View style={styles.rightContainer}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="notifications-outline" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSearchVisible(true)}>
                        <Ionicons name="search-outline" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <FontAwesome name="user-circle-o" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <Modal visible={searchVisible} animationType="slide">
                <SearchScreen />
                <TouchableOpacity onPress={() => setSearchVisible(false)}>
                    <Text style={{ fontSize: 18, textAlign: 'center', padding: 10 }}>Close</Text>
                </TouchableOpacity>
            </Modal>
        </>
    );
}


const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        width: '100%',
        top: 0,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#1E1E1E',
        elevation: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        borderRadius: 15,
        zIndex: 10,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 32,
        height: 32,
        marginRight: 8,
    },
    musicText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: 16,
    },
    searchInput: {
        flex: 1,
        marginLeft: 16,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: '#333',
        color: 'white',
        fontSize: 16,
    },
});
