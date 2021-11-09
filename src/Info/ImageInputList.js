import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import DeliveredDoc from "./DeliveredDoc";

const ImageInputList = ({ imageUris = [], onRemoveImage, onAddImage }) => {
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <View key={uri} style={styles.image}>
              <DeliveredDoc
                imageUri={uri}
                onChangeImage={() => onRemoveImage(uri)}
              />
            </View>
          ))}
          <DeliveredDoc onChangeImage={(uri) => onAddImage(uri)} />
        </View>
      </ScrollView>
    </View>
  );
}


export const SingleImage = ({ imageUris, onRemoveImage, onAddImage }) => {
  return (
      <View style={styles.container}>
          <View style={styles.image}>
            {imageUris ?
            <>
              <DeliveredDoc
                imageUri={imageUris}
                onChangeImage={() => onRemoveImage(imageUris)}
              />
            </> 
            :
            <>
              <DeliveredDoc onChangeImage={(uri) => onAddImage(uri)} />
            </> 
          }
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
});

export default ImageInputList;
