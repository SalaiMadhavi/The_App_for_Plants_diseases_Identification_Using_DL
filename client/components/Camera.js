import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

const CameraScreen = ({ handleUpload }) => {
  // const [type, setType] = useState(CameraType.back);
  // const [permission, requestPermission] = Camera.useCameraPermissions();

  // function toggleCameraType() {
  //   setType((current) =>
  //     current === CameraType.back ? CameraType.front : CameraType.back
  //   );
  // }

  const pickFromCamera = async () => {
    try {
      // Ask the user for the permission to access the camera
      const { granted } = await ImagePicker.requestCameraPermissionsAsync();
      console.log(granted);
      if (granted) {
        let data = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          base64: true,
          quality: 1, //1 means high quality
        });

        console.log(data.assets[0].uri);
        if (!data.canceled) {
          const filenameType = data.assets[0].uri
            .split(",")[0]
            .split(":")[1]
            .split(";")[0];
          const payload = {
            uri: data.assets[0].uri,
            base64: data.assets[0].base64,
            type: filenameType,
            fileName: `Image.${filenameType.split("/")[1]}`,
          };
          handleUpload(payload);
        }
      } else {
        alert("You need to give permissions");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const pickFromGallery = async () => {
    try {
      const { granted } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (granted) {
        let data = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          base64: true,
          quality: 1, //1 means high quality
        });
        console.log(data.assets[0].uri);
        if (!data.canceled) {
          const filenameType = data.assets[0].uri
            .split(",")[0]
            .split(":")[1]
            .split(";")[0];
          const payload = {
            uri: data.assets[0].uri,
            base64: data.assets[0].base64,
            type: filenameType,
            fileName: `Image.${filenameType.split("/")[1]}`,
          };
          handleUpload(payload);
        }
      } else {
        alert("You need to give permissions");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.options}>
      {/* <View style={styles.container}>
        <Camera style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View> */}
      <TouchableOpacity shadowless style={styles.tab} onPress={pickFromGallery}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 10,
            justifyContent: "center",
          }}
        >
          <Ionicons name="images-sharp" size={18} color="#fff" />
          <Text size={16} style={styles.tabTitle}>
            {"From Galary"}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity shadowless style={styles.tab} onPress={pickFromCamera}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 10,
            justifyContent: "center",
          }}
        >
          <Ionicons name="md-camera" size={18} color="#fff" />
          <Text size={16} style={styles.tabTitle}>
            {"From Camera"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    // width: width - theme.SIZES.BASE * 2,
    // paddingVertical: theme.SIZES.BASE,
  },
  card: {
    // backgroundColor: theme.COLORS.WHITE,
    // marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16,
    // shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCard: {
    // backgroundColor: theme.COLORS.WHITE,
    // marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    width: "90%",
    marginBottom: 16,
    // shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },

  cardTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: 270,
    height: 200,
  },
  button: {
    // marginBottom: theme.SIZES.BASE,
    width: "70%",
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  tab: {
    elevation: 8,
    backgroundColor: "#71b79c",
    borderRadius: 18,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginBottom: 5,
    marginTop: 5,
    width: width * 0.7,
  },
  divider: {
    borderRightWidth: 0.3,
    // borderRightColor: theme.COLORS.ICON,
  },
  tabTitle: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    paddingLeft: 10,
  },
  profileBackground: {
    width: "100%",
    height: "100%",
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
});

export default CameraScreen;
