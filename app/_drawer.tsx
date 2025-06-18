import { Drawer } from "expo-router/drawer";
import ProfileDrawerContent from "./profileDrawerContent";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <ProfileDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        // hide routes that start with 'hidden/' or '_drawer'
        drawerItemStyle:
          route.name.startsWith("hidden/") ||
          route.name === "_drawer" ||
          route.name === "profile" ||
          route.name === "profileDrawerContent"
            ? { display: "none" }
            : undefined,
      })}
    >
      <Drawer.Screen name="index" options={{ title: "Home" }} />
      <Drawer.Screen name="recents" options={{ title: "Recents" }} />
      <Drawer.Screen name="settings" options={{ title: "Settings" }} />
    </Drawer>
  );
}
