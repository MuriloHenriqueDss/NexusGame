import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MeusCartoes({ navigation }) {
  const cartoes = [
    {
      id: 1,
      imagem: require("../assets/img/visa_card.png"), // imagem do cartão
      nome: "Cartão Visa - Final 8922",
      titular: "João Gustavo Mota Ramos",
      validade: "09/29",
      tipo: "Crédito",
      padrao: true,
    },
    {
      id: 2,
      imagem: require("../assets/img/visa_card.png"),
      nome: "Cartão Visa - Final 1306",
      titular: "João Gustavo Mota Ramos",
      validade: "01/30",
      tipo: "Débito",
      padrao: false,
    },
    {
      id: 3,
      imagem: require("../assets/img/visa_card.png"),
      nome: "Cartão Visa - Final 1306",
      titular: "João Gustavo Mota Ramos",
      validade: "01/30",
      tipo: "Débito",
      padrao: false,
    },
  ];

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.nav}>
                <Image
                   style={styles.logoNav}
                   source={require("../assets/img/logo_nexus.png")}
                />
                <View style={styles.icons}>
                    <Image
                    style={styles.iconNav}
                    source={require("../assets/img/buscar_icon.png")}
                    />
                    <Image
                    style={styles.iconNav}
                    source={require("../assets/img/carrinho_icon.png")}
                    />
                    <Image
                    style={styles.iconNav}
                    source={require("../assets/img/notificacao_icon.png")}
                    />
                </View>
            </View>
            <View style={styles.navGlow} />
        </View>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.voltar}
      >
        <Ionicons name="arrow-back" size={22} color="white" />
        <Text style={styles.textoVoltar}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Meus cartões</Text>

      <ScrollView
        contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {cartoes.map((cartao) => (
          <View key={cartao.id} style={styles.card}>
            <Image source={cartao.imagem} style={styles.imagemCartao} />

            <View style={styles.info}>
              <Text style={styles.nome}>{cartao.nome}</Text>
              <Text style={styles.titular}>{cartao.titular}</Text>
              <Text style={styles.validade}>
                Válido até: <Text style={styles.bold}>{cartao.validade}</Text>
              </Text>
              <Text style={styles.tipo}>
                Tipo do cartão:{" "}
                <Text style={styles.bold}>{cartao.tipo}</Text>
              </Text>

              {cartao.padrao ? (
                <View style={styles.linhaBaixo}>
                  <Ionicons name="checkmark-circle" size={18} color="#FF00C8" />
                  <Text style={styles.padrao}>Padrão</Text>
                </View>
              ) : (
                <View style={styles.linhaBaixo}>
                  <Text style={styles.tornarPadrao}>Tornar padrão</Text>
                  <Text style={styles.excluir}>Excluir</Text>
                </View>
              )}
            </View>
          </View>
        ))}
                {/* Botão de adicionar cartão */}
        <TouchableOpacity style={styles.botaoAdicionar}>
          <Ionicons name="add" size={20} color="white" style={{ marginRight: 6 }} />
          <Text style={styles.textoBotaoAdicionar}>Adicionar cartão</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 50,
  },
  header: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: "black",
  },
  nav: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  logoNav: {
    height: 50,
    width: 170,
    marginLeft: 10,
    marginTop: -5,
  },
  icons: {
    flexDirection: "row",
    gap: 20,
    marginRight: 5,
  },
  iconNav: {
    height: 20,
    width: 20,
  },
  navGlow: {
    height: 3,
    width: "100%",
    backgroundColor: "black",
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
  voltar: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 60,
  },
  textoVoltar: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
  titulo: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#7B009A",
    borderRadius: 10,
    width: "90%",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "black",
  },
  imagemCartao: {
    width: 100,
    height: 65,
    borderRadius: 6,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  nome: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  titular: {
    color: "white",
    fontSize: 13,
    marginTop: 2,
  },
  validade: {
    color: "white",
    fontSize: 13,
    marginTop: 2,
  },
  tipo: {
    color: "white",
    fontSize: 13,
    marginTop: 2,
  },
  bold: {
    fontWeight: "bold",
  },
  linhaBaixo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    justifyContent: "space-between",
    width: "80%",
  },
  padrao: {
    color: "#FF00C8",
    fontWeight: "bold",
    marginLeft: 5,
  },
  tornarPadrao: {
    color: "#FF00C8",
    fontWeight: "bold",
  },
  excluir: {
    color: "red",
    fontWeight: "bold",
  },
    botaoAdicionar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF09E6",
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginTop: 30,
  },
  textoBotaoAdicionar: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});