// app/CustomDrawerContent.tsx
import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CustomDrawerContent(props: any) {
  const router = useRouter();

  return (
    <DrawerContentScrollView {...props}>
      {/* Touchable Profile Section */}
      <TouchableOpacity
        style={styles.profileContainer}
        onPress={() => {
          router.push("/profile");
        }}
      >
        <Image
          source={require("../assets/images/3107.png")}
          style={styles.avatar}
        />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.profileName}>Kidphima</Text>
          <Text style={styles.profileLink}>View Profile</Text>
        </View>
      </TouchableOpacity>

      {/* Drawer Links */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 999,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  profileLink: {
    color: "#888",
    fontSize: 14,
  },
});