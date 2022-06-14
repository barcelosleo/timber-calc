import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import "react-native-get-random-values";
import { v4 } from "uuid";

const pi = 3.14159265359;

class Tora {
  constructor(
    diametroMaior,
    unidadeDiametroMaior,
    diametroMenor,
    unidadeDiametroMenor,
    comprimento,
    unidadeComprimento
  ) {
    this.id = v4();
    this.diametroMaior = diametroMaior;
    this.unidadeDiametroMaior = unidadeDiametroMaior;
    this.diametroMenor = diametroMenor;
    this.unidadeDiametroMenor = unidadeDiametroMenor;
    this.comprimento = comprimento;
    this.unidadeComprimento = unidadeComprimento;
  }

  get diametroMaiorEmMetros() {
    if (this.unidadeDiametroMaior == "cm") {
      return this.diametroMaior / 100;
    }

    return this.diametroMaior;
  }

  get diametroMenorEmMetros() {
    if (this.unidadeDiametroMenor == "cm") {
      return this.diametroMenor / 100;
    }

    return this.diametroMenor;
  }

  get comprimentoEmMetros() {
    if (this.unidadeComprimento == "cm") {
      return this.comprimento / 100;
    }

    return this.comprimento;
  }

  calculaVolume() {
    const R = this.diametroMaiorEmMetros / 2;
    const r = this.diametroMenorEmMetros / 2;

    return ((pi * this.comprimentoEmMetros) / 3) * (R * R + R * r + r * r);
  }
}

const ToraComponent = (props) => {
  const deleteTora = () => {
    props.deleteCallback(props.tora);
  };

  const editTora = () => {
    props.editCallback(props.tora, props.count);
  };

  return (
    <View style={styles.tile}>
      <View
        style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 25 }}>#{props.count}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>Diâmetro</Text>
        <Text>
          Maior: {props.tora.diametroMaior.toFixed(2)}{" "}
          {props.tora.unidadeDiametroMaior}
        </Text>
        <Text>
          Menor: {props.tora.diametroMenor.toFixed(2)}{" "}
          {props.tora.unidadeDiametroMenor}
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>Comprimento</Text>
        <Text>
          {props.tora.comprimento.toFixed(2)} {props.tora.unidadeComprimento}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>Volume</Text>
        <Text>{props.tora.calculaVolume().toFixed(2)} m³</Text>
      </View>
      <View
        style={{
          flex: 0.5,
          justifyContent: "space-evenly",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Button
          icon={{ name: "delete", color: "white" }}
          buttonStyle={{ backgroundColor: "red", borderRadius: 20 }}
          onPress={deleteTora}
        />
        <Button
          icon={{ name: "edit", color: "white" }}
          buttonStyle={{ backgroundColor: "blue", borderRadius: 20 }}
          onPress={editTora}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    borderWidth: 1,
    margin: 10,
    marginBottom: 5,
    padding: 5,
    flexDirection: "row",
  },
});

export { ToraComponent, Tora };
