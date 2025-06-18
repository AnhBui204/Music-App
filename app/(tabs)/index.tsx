
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "@/components/HomePage/HomePage";

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',  
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  }
})