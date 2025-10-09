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
            <TouchableOpacity onPress={() => navigation.navigate("Carrinho")}>
              <Image
                style={styles.iconNav}
                source={require("../assets/img/carrinho_icon.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Notificacoes")}>
              <Image
                style={styles.iconNav}
                source={require("../assets/img/notificacao_icon.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.navGlow} />
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
  logoNav: { height: 50, width: 170, marginLeft: 10, marginTop: -5 },
  icons: { flexDirection: "row", gap: 20, marginRight: 5 },
  iconNav: { height: 20, width: 20 },
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
  body: { flex: 1, backgroundColor: "black", paddingTop: 50 },
  parteCima: {
    width: "90%",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 60,
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