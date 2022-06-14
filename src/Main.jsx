import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SpeedDial, Overlay } from "react-native-elements";

import { ToraComponent, Tora } from "./components/Tora";
import Confirmar from "./components/ConfirmarLimpar";
import NovaTora from "./components/NovaTora";
import ConfigurarPreco from "./components/ConfigurarPreco";

const storePreco = async (preco) => {
  try {
    await AsyncStorage.setItem("@preco", preco.toString());
  } catch (e) {
    console.log(e);
  }
};

const getPreco = async () => {
  try {
    const value = await AsyncStorage.getItem("@preco");
    if (value != null) {
      return parseFloat(value);
    }
    return 0;
  } catch (e) {
    console.log(e);
  }
  return 0;
};

const storeToras = async (toras) => {
  try {
    let torasJson = toras.map((tora) => {
      return {
        diametroMaior: tora.diametroMaior,
        unidadeDiametroMaior: tora.unidadeDiametroMaior,
        diametroMenor: tora.diametroMenor,
        unidadeDiametroMenor: tora.unidadeDiametroMenor,
        comprimento: tora.comprimento,
        unidadeComprimento: tora.unidadeComprimento,
      };
    });
    await AsyncStorage.setItem("@toras", JSON.stringify(torasJson));
  } catch (e) {
    console.log(e);
  }
};

const getToras = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@toras");
    if (jsonValue != null) {
      const toras = JSON.parse(jsonValue);
      return toras;
    } else {
      return [];
    }
  } catch (e) {
    console.log(e);
  }
  return [];
};

let storedPreco = 0;
let storedToras = [];

getPreco().then((preco) => {
  storedPreco = preco;
});
getToras().then((toras) => {
  storedToras = toras.map((tora) => {
    return new Tora(
      tora.diametroMaior,
      tora.unidadeDiametroMaior,
      tora.diametroMenor,
      tora.unidadeDiametroMenor,
      tora.comprimento,
      tora.unidadeComprimento
    );
  });
});

const Main = () => {
  const [open, setOpen] = useState(false);
  const [confirmaLimparOverlay, setConfirmaLimparOverlay] = useState(false);
  const [confirmaExcluirToraOverlay, setConfirmaExcluirToraOverlay] =
    useState(false);
  const [novaToraOverlay, setNovaToraOverlay] = useState(false);
  const [editToraOverlay, setEditToraOverlay] = useState(false);
  const [configurarPrecoOverlay, setConfigurarPrecoOverlay] = useState(false);
  const [toras, setToras] = useState(storedToras);
  const [preco, setPreco] = useState(storedPreco);
  const [toraSelecionada, setToraSelecionada] = useState(null);
  const [toraSelecionadaIndex, setToraSelecionadaIndex] = useState(null);

  const getVolumeTotal = () => {
    return toras.reduce((soma, tora) => {
      return soma + tora.calculaVolume();
    }, 0);
  };

  const deleteTora = () => {
    if (toraSelecionada == null) return;

    const toraId = toraSelecionada.id;
    const novaListaToras = toras.filter((item) => item.id !== toraId);

    setToras(novaListaToras);
    storeToras(novaListaToras);
    setToraSelecionada(null);
  };

  const renderListaToras = () => {
    if (toras.length > 0) {
      return toras.map((tora, i) => {
        return (
          <ToraComponent
            key={tora.id}
            count={i + 1}
            tora={tora}
            deleteCallback={(tora) => {
              setConfirmaExcluirToraOverlay(!confirmaExcluirToraOverlay);
              setToraSelecionada(tora);
            }}
            editCallback={(tora, toraCount) => {
              setEditToraOverlay(!editToraOverlay);
              setToraSelecionada(tora);
              setToraSelecionadaIndex(toraCount);
            }}
          />
        );
      });
    } else {
      return (
        <Text
          style={{
            borderWidth: 1,
            margin: 10,
            marginBottom: 5,
            padding: 5,
            flexDirection: "row",
            fontSize: 30,
          }}
        >
          Nenhuma tora cadastrada...
        </Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Timber Calc</Text>
        <Text style={{ color: "white" }}>
          R$ {preco.toString().replace(".", ",")} / m³
        </Text>
      </View>
      <ScrollView style={styles.scrollView}>{renderListaToras()}</ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Volume Total: {getVolumeTotal().toFixed(2)} m³
        </Text>
        <Text style={styles.footerText}>
          Preço Total: R${" "}
          {(getVolumeTotal() * preco).toFixed(2).replace(".", ",")}
        </Text>
      </View>
      <SpeedDial
        isOpen={open}
        icon={{ name: "menu", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          icon={{ name: "attach-money", color: "#fff" }}
          title="Configurar Preço do m³"
          onPress={() => setConfigurarPrecoOverlay(!configurarPrecoOverlay)}
        />
        <SpeedDial.Action
          icon={{ name: "add", color: "#fff" }}
          title="Adicionar"
          onPress={() => setNovaToraOverlay(!novaToraOverlay)}
        />
        <SpeedDial.Action
          icon={{ name: "delete", color: "#fff" }}
          title="Limpar"
          onPress={() => setConfirmaLimparOverlay(!confirmaLimparOverlay)}
        />
      </SpeedDial>

      <Confirmar
        visible={confirmaExcluirToraOverlay}
        onBackDropPress={() => {
          setConfirmaExcluirToraOverlay(!confirmaExcluirToraOverlay);
          setToraSelecionada(null);
        }}
        confirmar={() => {
          deleteTora();
          setConfirmaExcluirToraOverlay(!confirmaExcluirToraOverlay);
        }}
        mensagem="Você tem certeza de que deseja excluir esta tora?"
      />

      <Confirmar
        visible={confirmaLimparOverlay}
        onBackDropPress={() => {
          setConfirmaLimparOverlay(!confirmaLimparOverlay);
          setOpen(!open);
        }}
        confirmar={() => {
          setToras([]);
          storeToras([]);
          setConfirmaLimparOverlay(!confirmaLimparOverlay);
          setOpen(!open);
        }}
        mensagem="Você tem certeza de que deseja limpar a lista de Toras?"
      />

      <Overlay
        isVisible={novaToraOverlay}
        onBackdropPress={() => {
          setNovaToraOverlay(!novaToraOverlay);
          setOpen(!open);
        }}
      >
        <NovaTora
          countNovaTora={toras.length + 1}
          editing={false}
          adicionarToraCallback={(novaTora) => {
            setToras((toras) => [...toras, novaTora]);
            setNovaToraOverlay(!novaToraOverlay);
            setOpen(!open);
            storeToras([...toras, novaTora]);
          }}
        />
      </Overlay>
      <Overlay
        isVisible={editToraOverlay}
        onBackdropPress={() => {
          setEditToraOverlay(!editToraOverlay);
          setToraSelecionadaIndex(null);
          setToraSelecionada(null);
        }}
      >
        <NovaTora
          countNovaTora={toraSelecionadaIndex}
          toraSelecionada={toraSelecionada}
          editing={true}
          adicionarToraCallback={(editedTora) => {
            let novaListaToras = toras;
            for (let i = 0; i < toras.length; i++) {
              if (toras[i].id == editedTora.id) {
                novaListaToras[i].diametroMaior = editedTora.diametroMaior;
                novaListaToras[i].unidadeDiametroMaior =
                  editedTora.unidadeDiametroMaior;
                novaListaToras[i].diametroMenor = editedTora.diametroMenor;
                novaListaToras[i].unidadeDiametroMenor =
                  editedTora.unidadeDiametroMenor;
                novaListaToras[i].comprimento = editedTora.comprimento;
                novaListaToras[i].unidadeComprimento =
                  editedTora.unidadeComprimento;
              }
            }
            setToras(novaListaToras);
            setEditToraOverlay(!editToraOverlay);
            storeToras(novaListaToras);
            setToraSelecionadaIndex(null);
            setToraSelecionada(null);
          }}
        />
      </Overlay>
      <Overlay
        isVisible={configurarPrecoOverlay}
        onBackdropPress={() => {
          setConfigurarPrecoOverlay(!configurarPrecoOverlay);
          setOpen(!open);
        }}
      >
        <ConfigurarPreco
          precoAtual={preco}
          configurarPrecoCallback={(preco) => {
            setPreco(preco);
            storePreco(preco);
            setConfigurarPrecoOverlay(!configurarPrecoOverlay);
            setOpen(!open);
          }}
        />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  footerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    flex: 0.1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    paddingBottom: 10,
  },
  scrollView: {
    flex: 0.65,
    width: "100%",
  },
  footer: {
    backgroundColor: "red",
    padding: 10,
    flex: 0.1,
    width: "100%",
  },
});

export default Main;
