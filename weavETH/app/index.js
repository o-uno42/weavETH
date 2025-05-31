import { StyleSheet, Text, View } from "react-native";
import Scarf from "../scarf.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function Page() {
  const navigation = useNavigation();  // <-- Aggiungi questa riga

  return (
    <View style={styles.container}>
      <Scarf />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ShowCollection')}  // Ora navigation è definito
      >
        <Text style={styles.buttonText}>See scarf</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
