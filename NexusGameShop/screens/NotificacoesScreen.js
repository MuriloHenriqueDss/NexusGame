import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NotificacoesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* NAV FIXA */}
      <View style={styles.navbar}>
      
                      <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                          <Image
                              source={require("../assets/img/logo_nexus.png")}
                              style={styles.logo}
                          />
                      </TouchableOpacity>
                      
                      <View style={styles.navIcons}>
                          <TouchableOpacity onPress={() => navigation.navigate("Categorias")}>
                              <Image
                                  source={require("../assets/img/buscar_icon.png")}
                                  style={styles.icon}
                              />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => navigation.navigate("Carrinho")}>
                              <Image
                                  source={require("../assets/img/carrinho_icon.png")}
                                  style={styles.icon}
                              />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => navigation.navigate("Notificacoes")}>
                              <Image
                                  source={require("../assets/img/notificacao_icon.png")}
                                  style={styles.icon}
                              />
                          </TouchableOpacity>
                      </View>
                  </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {/* Cabeçalho */}
        <View style={styles.parteCima}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.voltar}
          >
            <Ionicons name="arrow-back" size={22} color="white" />
            <Text style={styles.textoVoltar}>Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.titulo}>Notificações</Text>
        </View>

        {/* Seção NOVAS */}
        <View style={styles.linhaTitulo}>
          <View style={styles.linhaHorizontal} />
          <Text style={styles.subtitulo}>Novas</Text>
          <View style={styles.linhaHorizontal} />
        </View>

        {/* CARD NOVO */}
        <View style={styles.card}>
          <View style={styles.novaBolinha} />
          <Image
            source={require("../assets/img/icon_entregue.png")}
            style={styles.imgEntregue}
          />
          <View style={styles.cardTexto}>
            <Text style={styles.textoTitulo}>Seu pedido foi entregue!</Text>
            <Text style={styles.textoDescricao}>
              O pedido <Text style={styles.bold}>#431</Text> foi entregue com sucesso.{"\n"}
              Item: <Text style={styles.bold}>Overcooked! 2 (PS4)</Text> – 1 unidade{"\n"}
              Chegada prevista: <Text style={styles.entregue}>Entregue</Text>
            </Text>
          </View>
        </View>

        {/* Seção TODAS */}
        <View style={[styles.linhaTitulo, styles.margemCima]}>
          <View style={styles.linhaHorizontal} />
          <Text style={styles.subtitulo}>Todas</Text>
          <View style={styles.linhaHorizontal} />
        </View>

        {/* CARD 1 */}
        <View style={styles.card}>
          <Image
            source={require("../assets/img/icon_caminho.png")}
            style={styles.imgCaminhao}
          />
          <View style={styles.cardTexto}>
            <Text style={styles.textoTitulo}>Sua entrega está a caminho!</Text>
            <Text style={styles.textoDescricao}>
              O pedido <Text style={styles.bold}>#431</Text> saiu para entrega.{"\n"}
              Item: <Text style={styles.bold}>Overcooked! 2 (PS4)</Text> – 1 unidade{"\n"}
              Chegada prevista: <Text style={styles.bold}>07/09/2025 (Hoje)</Text>
            </Text>
          </View>
        </View>

        {/* CARD 2 */}
        <View style={styles.card}>
          <Image
            source={require("../assets/img/icon_transportadora.png")}
            style={styles.imgLoc}
          />
          <View style={styles.cardTexto}>
            <Text style={styles.textoTitulo}>
              Seu pedido chegou à transportadora!
            </Text>
            <Text style={styles.textoDescricao}>
              O pedido <Text style={styles.bold}>#431</Text> está no centro de distribuição.{"\n"}
              Item: <Text style={styles.bold}>Overcooked! 2 (PS4)</Text> – 1 unidade{"\n"}
              Chegada prevista: <Text style={styles.bold}>07/09/2025 (Amanhã)</Text>
            </Text>
          </View>
        </View>

        {/* CARD 3 */}
        <View style={styles.card}>
          <Image
            source={require("../assets/img/icon_separado.png")}
            style={styles.cardImagem}
          />
          <View style={styles.cardTexto}>
            <Text style={styles.textoTitulo}>Seu pedido já está separado!</Text>
            <Text style={styles.textoDescricao}>
              O pedido <Text style={styles.bold}>#431</Text> está pronto para envio.{"\n"}
              Item: <Text style={styles.bold}>Overcooked! 2 (PS4)</Text> – 1 unidade{"\n"}
              Chegada prevista: <Text style={styles.bold}>07/09/2025</Text>
            </Text>
          </View>
        </View>

        {/* CARD 4 */}
        <View style={[styles.card, styles.cardUltimo]}>
          <Image
            source={require("../assets/img/icon_confirmado.png")}
            style={styles.cardImagem}
          />
          <View style={styles.cardTexto}>
            <Text style={styles.textoTitulo}>
              Pedido confirmado!
            </Text>
            <Text style={styles.textoDescricao}>
              O pedido <Text style={styles.bold}>#431</Text> já está em processamento.{"\n"}
              Item: <Text style={styles.bold}>Overcooked! 2 (PS4)</Text> – 1 unidade{"\n"}
              Chegada prevista: <Text style={styles.bold}>07/09/2025</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  navbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },

    logo: {
        width: 200,
        height: 60,
        resizeMode: "contain"
    },

    navIcons: {
        flexDirection: "row",
        gap: 15
    },

    icon: {
        width: 20,
        height: 20
    },
  body: { flex: 1, backgroundColor: "black", paddingTop: 50 },
  parteCima: {
    width: "90%",
    alignItems: "center",
    marginBottom: 20,
    marginTop: -30,
  },
  voltar: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 10,
  },
  textoVoltar: { color: "white", fontSize: 16, marginLeft: 5 },
  titulo: { color: "white", fontSize: 22, fontWeight: "bold" },
  linhaTitulo: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginVertical: 0,
    justifyContent: "center",
  },
  linhaHorizontal: { flex: 1, height: 1, backgroundColor: "#FFFFFF" },
  subtitulo: {
    color: "white",
    fontWeight: "bold",
    marginHorizontal: 10,
    fontSize: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 2,
    borderColor: "#7B009A",
    borderRadius: 10,
    width: "90%",
    padding: 15,
    marginVertical: 8,
    position: "relative",
  },
  cardUltimo: { marginBottom: 40 },
  cardImagem: {
    width: 45,
    height: 45,
    marginRight: 15,
    marginTop: 15,
    borderRadius: 8,
  },
  imgEntregue: {
    width: 50,
    height: 50,
    marginRight: 15,
    marginLeft: 5,
    marginTop: 12,
    borderRadius: 8,
  },
  imgLoc: {
    width: 30,
    height: 40,
    marginRight: 17,
    marginLeft: 5,
    marginTop: 15,
  },
  imgCaminhao: {
    width: 55,
    height: 30,
    marginRight: 15,
    marginTop: 25,
  },
  cardTexto: { flex: 1 },
  textoTitulo: { color: "white", fontWeight: "bold", marginBottom: 4 },
  textoDescricao: { color: "white", lineHeight: 20 },
  bold: { fontWeight: "bold" },
  entregue: { color: "#00FF87", fontWeight: "bold" },
  novaBolinha: {
    position: "absolute",
    left: -15,
    top: 50,
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: "#FF09E6",
  },
  margemCima: { marginTop: 10 },
});