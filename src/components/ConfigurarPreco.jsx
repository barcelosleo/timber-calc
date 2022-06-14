import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, Input } from "react-native-elements";

const ConfigurarPreco = ({ precoAtual, configurarPrecoCallback }) => {
  const [preco, setPreco] = useState(precoAtual);

  const confirmar = () => {
    configurarPrecoCallback(preco);
  };
  return (
    <View>
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
        }}
      >
        Configurar Preço do m³
      </Text>
      <Input
        placeholder="Preço"
        keyboardType="number-pad"
        onChangeText={(text) => setPreco(text.replace(",", "."))}
        value={preco.toString()}
      />
      <Button
        title="Confirmar"
        buttonStyle={{ backgroundColor: "rgba(127, 220, 103, 1)" }}
        onPress={confirmar}
      ></Button>
    </View>
  );
};

export default ConfigurarPreco;
