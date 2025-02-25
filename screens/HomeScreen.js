import { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../styles/styles";

export default function HomeScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  // Function to handle date change
  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShow(false); // Hide picker after selecting date
  };

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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          top: 0,
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 18 }}>
          Today's Date: {date.toDateString()}
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => setShow(true)}>
          <Text style={{ textDecorationLine: "underline", color: "#2196F3" }}>
            Change Date
          </Text>
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            value={date}
            mode="date" // "date" | "time" | "datetime"
            display={Platform.OS === "ios" ? "spinner" : "calendar"}
            onChange={onChange}
          />
        )}
      </View>

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
