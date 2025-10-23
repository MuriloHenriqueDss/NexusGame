import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MeusPedidos({ navigation }) {
  const pedidosEmProcessamento = [
    {
      id: "502",
      imagem: require("../assets/img/jogos/astrobot.png"),
      item: "Astro Bot (PS5)",
      valor: "R$216,99",
      compra: "11/09/2025",
      entrega: "15/09/2025 (Previsto)",
    },
  ];

  const pedidosEntregues = [
    {
      id: "431",
      imagem: require("../assets/img/jogos/astrobot.png"),
      item: "Astro Bot (PS5)",
      valor: "R$216,99",
      compra: "22/07/2025",
      entrega: "26/07/2025",
    },
    {
      id: "330",
      imagem: require("../assets/img/jogos/astrobot.png"),
      item: "Astro Bot (PS5)",
      valor: "R$216,99",
      compra: "04/04/2025",
      entrega: "07/04/2025",
    },
    {
      id: "298",
      imagem: require("../assets/img/jogos/astrobot.png"),
      item: "Astro Bot (PS5)",
      valor: "R$216,99",
      compra: "20/02/2025",
      entrega: "26/02/2025",
    },
  ];

  return (
    <View style={styles.container}>
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Topo com botão Voltar */}
        <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="white" />
          <Text style={styles.voltarTexto}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Meus pedidos</Text>

        {/* Em processamento */}
        <View style={styles.sessao}>
          <View style={styles.linhaTitulo}>
            <View style={[styles.linha, styles.linhaProcessamento]} />
            <View style={styles.textoComIcone}>
              <Ionicons name="time-outline" size={14} color="#FF09E6" style={styles.iconeTitulo} />
              <Text style={[styles.subtitulo]}>Em processamento</Text>
            </View>
            <View style={[styles.linha, styles.linhaProcessamento]} />
          </View>

          {pedidosEmProcessamento.map((pedido) => (
            <View key={pedido.id} style={styles.card}>
              <Image source={pedido.imagem} style={styles.imagemJogo} />
              <View style={styles.info}>
                <Text style={[styles.nome, styles.nomeProcessamento]}>Pedido #{pedido.id}</Text>
                <Text style={styles.item}>Item: {pedido.item} – 1 unidade</Text>
                <Text style={styles.valor}>Valor: {pedido.valor}</Text>
                <Text style={styles.data}>
                  Data da compra: <Text style={styles.bold}>{pedido.compra}</Text>
                </Text>
                <Text style={styles.data}>
                  Data de entrega: <Text style={styles.bold}>{pedido.entrega}</Text>
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Entregues */}
        <View style={[styles.sessao, styles.margemCima]}>
          <View style={styles.linhaTitulo}>
            <View style={[styles.linha, styles.linhaEntregue]} />
            <View style={styles.textoComIcone}>
              <Ionicons name="checkmark-circle-outline" size={15} color="#00FF87" style={styles.iconeTitulo} />
              <Text style={[styles.subtitulo]}>Entregues</Text>
            </View>
            <View style={[styles.linha, styles.linhaEntregue]} />
          </View>

          {pedidosEntregues.map((pedido) => (
            <View key={pedido.id} style={[styles.card, styles.cardEntregue]}>
              <Image source={pedido.imagem} style={styles.imagemJogo} />
              <View style={styles.info}>
                <Text style={[styles.nome, styles.nomeEntregue]}>Pedido #{pedido.id}</Text>
                <Text style={styles.item}>Item: {pedido.item} – 1 unidade</Text>
                <Text style={styles.valor}>Valor: {pedido.valor}</Text>
                <Text style={styles.data}>
                  Data da compra: <Text style={styles.bold}>{pedido.compra}</Text>
                </Text>
                <Text style={styles.data}>
                  Data de entrega: <Text style={[styles.bold, styles.dataEntregue]}>{pedido.entrega}</Text>
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 5,
  },
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
  scroll: {
    paddingBottom: 40,
    alignItems: "center",
  },
  voltar: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 10,
  },
  voltarTexto: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
  titulo: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 70,
    marginBottom: 15,
  },
  margemCima: {
    marginTop: -20,
  },
  sessao: {
    width: "90%",
    alignItems: "center",
    marginBottom: 25,
  },
  linhaTitulo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    width: "90%",
    marginVertical: 0,
    justifyContent: "center",
  },
  linha: {
    flex: 1,
    height: 1,
    backgroundColor: "#FFFFFF",
  },
  linhaProcessamento: {
    backgroundColor: "#FF09E6",
  },
  linhaEntregue: {
    backgroundColor: "#00FF87",
  },
  textoComIcone: {
    flexDirection: "row",
    alignItems: "center",
    // marginHorizontal: 8,
  },
  iconeTitulo: {
    marginTop: 1,
    marginLeft: 8,
    marginRight: -5,
  },
  subtitulo: {
    color: "white",
    fontSize: 14,
    marginHorizontal: 8,
    opacity: 0.8,
  },
  subtituloProcessamento: {
    color: "#FF09E6",
  },
  subtituloEntregue: {
    color: "#00FF87",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "#7B009A",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  imagemJogo: {
    width: 70,
    height: 90,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  nome: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 3,
  },
  nomeProcessamento: {
    color: "#FF09E6",
  },
  nomeEntregue: {
    color: "#00FF87",
  },
  item: {
    color: "white",
    fontSize: 13,
    marginBottom: 2,
  },
  valor: {
    color: "white",
    fontSize: 13,
    marginBottom: 2,
  },
  data: {
    color: "white",
    fontSize: 12,
    marginBottom: 1,
  },
  bold: {
    fontWeight: "bold",
  },
});