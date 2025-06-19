import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Modal, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SearchScreen from './SearchScreen'; // đường dẫn tới màn search

type HeaderProps = {
    username?: string;
};

export default function Header({ username = 'Người dùng' }: HeaderProps) {
    const [searchVisible, setSearchVisible] = useState(false);

    return (
        <>
            <View style={styles.header}>
                <View style={styles.left}>
                    <Image
                        source={require('@/assets/images/partial-react-logo.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Hi, {username} 👋</Text>
                </View>

                <View style={styles.right}>
                    <TouchableOpacity style={styles.icon}>
                        <Ionicons name="notifications-outline" size={22} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon} onPress={() => setSearchVisible(true)}>
                        <Ionicons name="search-outline" size={22} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.avatar}>
                        <FontAwesome name="user-circle-o" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <Modal visible={searchVisible} animationType="slide">
                <SearchScreen />
                <TouchableOpacity onPress={() => setSearchVisible(false)}>
                    <Text style={{ fontSize: 18, textAlign: 'center', padding: 12 }}>Close</Text>
                </TouchableOpacity>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 50,
        paddingBottom: 16,
        paddingHorizontal: 20,
        backgroundColor: '#1C1C1E',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#333',
        zIndex: 10,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 32,
        height: 32,
        marginRight: 10,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 16,
        padding: 8,
        backgroundColor: '#2C2C2E',
        borderRadius: 50,
    },
    avatar: {
        marginLeft: 16,
        borderRadius: 50,
        overflow: 'hidden',
    }
});
