import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button, Input, ButtonGroup } from "react-native-elements";

import { Tora } from "./Tora";

const NovaTora = ({
  countNovaTora,
  adicionarToraCallback,
  editing,
  toraSelecionada,
}) => {
  const [diametroMaior, setDiametroMaior] = useState(0);
  const [unidadeDiametroMaior, setUnidadeDiametroMaior] = useState("cm");
  const [diametroMenor, setDiametroMenor] = useState(0);
  const [unidadeDiametroMenor, setUnidadeDiametroMenor] = useState("cm");
  const [comprimento, setComprimento] = useState(0);
  const [formValido, setFormValido] = useState(true);
  const [unidadeComprimento, setUnidadeComprimento] = useState("m");
  const [diametroMaiorSelectedIndex, setDiametroMaiorSelectedIndex] =
    useState(0);
  const [diametroMenorSelectedIndex, setDiametroMenorSelectedIndex] =
    useState(0);
  const [comprimentoSelectedIndex, setComprimentoSelectedIndex] = useState(1);

  const confirmar = () => {
    let tora;
    if (editing) {
      toraSelecionada.diametroMaior = diametroMaior;
      toraSelecionada.unidadeDiametroMaior = unidadeDiametroMaior;
      toraSelecionada.diametroMenor = diametroMenor;
      toraSelecionada.unidadeDiametroMenor = unidadeDiametroMenor;
      toraSelecionada.comprimento = comprimento;
      toraSelecionada.unidadeComprimento = unidadeComprimento;
      tora = toraSelecionada;
    } else {
      tora = new Tora(
        diametroMaior,
        unidadeDiametroMaior,
        diametroMenor,
        unidadeDiametroMenor,
        comprimento,
        unidadeComprimento
      );
    }
    adicionarToraCallback(tora);
  };

  useEffect(() => {
    if (editing) {
      if (toraSelecionada.unidadeDiametroMaior == "cm") {
        setUnidadeDiametroMaior("cm");
        setDiametroMaiorSelectedIndex(0);
      } else {
        setUnidadeDiametroMaior("m");
        setDiametroMaiorSelectedIndex(1);
      }

      if (toraSelecionada.unidadeDiametroMenor == "cm") {
        setUnidadeDiametroMenor("cm");
        setDiametroMenorSelectedIndex(0);
      } else {
        setUnidadeDiametroMenor("m");
        setDiametroMenorSelectedIndex(1);
      }

      if (toraSelecionada.unidadeComprimento == "cm") {
        setUnidadeComprimento("cm");
        setComprimentoSelectedIndex(0);
      } else {
        setUnidadeComprimento("m");
        setComprimentoSelectedIndex(1);
      }

      setDiametroMaior(toraSelecionada.diametroMaior);
      setDiametroMenor(toraSelecionada.diametroMenor);
      setComprimento(toraSelecionada.comprimento);
      setFormValido(true);
    }
  }, []);

  const checkFormValido = () => {
    let _valido = true;
    if (diametroMaior <= 0) _valido = false;
    if (diametroMenor <= 0) _valido = false;
    if (comprimento <= 0) _valido = false;

    setFormValido(_valido);
  };

  return (
    <View style={{ flexDirection: "column" }}>
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
        }}
      >
        {editing ? "Editando Tora" : "Adicionar Tora"} #{countNovaTora}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 0.6 }}>
          <Input
            placeholder="Diâmetro Maior"
            keyboardType="number-pad"
            onChangeText={(text) => {
              if (text != "") {
                setDiametroMaior(parseFloat(text.replace(",", ".")));
              } else {
                setDiametroMaior(0);
              }
            }}
            defaultValue={editing ? diametroMaior.toString() : ""}
            autoFocus={true}
          />
        </View>
        <View style={{ flex: 0.4 }}>
          <ButtonGroup
            buttons={["cm", "m"]}
            selectedIndex={diametroMaiorSelectedIndex}
            onPress={(index) => {
              if (index == 0) {
                setUnidadeDiametroMaior("cm");
              } else {
                setUnidadeDiametroMaior("m");
              }
              setDiametroMaiorSelectedIndex(index);
            }}
            containerStyle={{ marginBottom: 20 }}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 0.6 }}>
          <Input
            placeholder="Diâmetro Menor"
            keyboardType="number-pad"
            onChangeText={(text) => {
              if (text != "") {
                setDiametroMenor(parseFloat(text.replace(",", ".")));
              } else {
                setDiametroMenor(0);
              }
            }}
            defaultValue={editing ? diametroMenor.toString() : ""}
          />
        </View>
        <View style={{ flex: 0.4 }}>
          <ButtonGroup
            buttons={["cm", "m"]}
            selectedIndex={diametroMenorSelectedIndex}
            onPress={(index) => {
              if (index == 0) {
                setUnidadeDiametroMenor("cm");
              } else {
                setUnidadeDiametroMenor("m");
              }
              setDiametroMenorSelectedIndex(index);
            }}
            containerStyle={{ marginBottom: 20 }}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 0.6 }}>
          <Input
            placeholder="Comprimento"
            keyboardType="number-pad"
            onChangeText={(text) => {
              if (text != "") {
                setComprimento(parseFloat(text.replace(",", ".")));
              } else {
                setComprimento(0);
              }
            }}
            defaultValue={editing ? comprimento.toString() : ""}
          />
        </View>
        <View style={{ flex: 0.4 }}>
          <ButtonGroup
            buttons={["cm", "m"]}
            selectedIndex={comprimentoSelectedIndex}
            onPress={(index) => {
              if (index == 0) {
                setUnidadeComprimento("cm");
              } else {
                setUnidadeComprimento("m");
              }
              setComprimentoSelectedIndex(index);
            }}
            containerStyle={{ marginBottom: 20 }}
          />
        </View>
      </View>
      <Button
        title="Confirmar"
        buttonStyle={{ backgroundColor: "rgba(127, 220, 103, 1)" }}
        onPress={confirmar}
        disabled={!formValido}
      ></Button>
    </View>
  );
};

export default NovaTora;
