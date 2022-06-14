import React from "react";
import { View, Text } from "react-native";
import { Overlay, Button } from "react-native-elements";

const Confirmar = ({ visible, onBackDropPress, confirmar, mensagem }) => {
  return (
    <Overlay isVisible={visible} onBackdropPress={onBackDropPress}>
      <View>
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
          }}
        >
          {mensagem}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            margin: 20,
          }}
        >
          <Button
            title="Cancelar"
            buttonStyle={{
              backgroundColor: "rgba(214, 61, 57, 1)",
              width: "80%",
            }}
            onPress={onBackDropPress}
          ></Button>
          <Button
            title="Confirmar"
            buttonStyle={{
              backgroundColor: "rgba(127, 220, 103, 1)",
              width: "80%",
            }}
            onPress={confirmar}
          ></Button>
        </View>
      </View>
    </Overlay>
  );
};

export default Confirmar;
