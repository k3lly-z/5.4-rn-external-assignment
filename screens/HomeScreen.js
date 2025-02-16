import { useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../styles/styles";

export default function HomeScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Failed to pick image");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Camera App</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.launchButton}
          onPress={() => navigation.navigate("Camera")}
        >
          <Text style={styles.launchButtonText}>Launch Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.launchButton, { marginTop: 20 }]}
          onPress={pickImage}
        >
          <Text style={styles.launchButtonText}>Open Gallery</Text>
        </TouchableOpacity>
      </View>

      {selectedImage && (
        <View style={styles.imageContainer}>
          <Text style={styles.subtitle}>Selected Image:</Text>
          <Image
            source={{ uri: selectedImage }}
            style={styles.selectedImage}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
}
