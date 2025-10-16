import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CarrinhoScreen({ navigation }) {
  const [itens, setItens] = useState([
    {
      id: 1,
      nome: "The Legend of Zelda (Nintendo Switch)",
      preco: 349.9,
      quantidade: 1,
      imagem: require("../assets/img/zelda.png"),
    },
    {
      id: 2,
      nome: "Call of Duty Black Ops Cold War (Xbox Series X/S)",
      preco: 87.99,
      quantidade: 1,
      imagem: require("../assets/img/cod.png"),
    },
  ]);

  const [cupom, setCupom] = useState("");
  const frete = 27.61;

  const subtotal = itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );
  const total = subtotal + frete;

  const aumentar = (id) => {
    setItens((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  };

  const diminuir = (id) => {
    setItens((prev) =>
      prev.map((item) =>
        item.id === id && item.quantidade > 1
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
          <Image
            source={require("../assets/img/logo_nexus.png")}
            style={styles.logo}
          />
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <Text style={styles.titulo}>Carrinho</Text>

        {/* Lista de itens */}

        {itens.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Image source={item.imagem} style={styles.imagem} />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.preco}>
                R${(item.preco * item.quantidade).toFixed(2).replace(".", ",")}
              </Text>
            </View>
            <View style={styles.quantidadeContainer}>
              <TouchableOpacity onPress={() => diminuir(item.id)}>
                <Ionicons name="remove-circle" size={22} color="#FF00C8" />
              </TouchableOpacity>
              <Text style={styles.quantidade}>{item.quantidade}</Text>
              <TouchableOpacity onPress={() => aumentar(item.id)}>
                <Ionicons name="add-circle" size={22} color="#FF00C8" />
              </TouchableOpacity>
            </View>
          </View>
        ))}




        {/* {itens.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Image source={item.imagem} style={styles.imagem} />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.preco}>
                R${item.preco.toFixed(2).replace(".", ",")}
              </Text>
            </View>
            <View style={styles.quantidadeContainer}>
              <TouchableOpacity onPress={() => diminuir(item.id)}>
                <Ionicons name="remove-circle" size={22} color="#FF00C8" />
              </TouchableOpacity>
              <Text style={styles.quantidade}>{item.quantidade}</Text>
              <TouchableOpacity onPress={() => aumentar(item.id)}>
                <Ionicons name="add-circle" size={22} color="#FF00C8" />
              </TouchableOpacity>
            </View>
          </View>
        ))} */}

        <View style={styles.linhaDivisoria} />

        {/* Resumo de valores */}
        <View style={styles.resumo}>
          <View style={styles.linhaResumo}>
            <Text style={styles.textoResumo}>Subtotal:</Text>
            <Text style={styles.valorResumo}>
              R${subtotal.toFixed(2).replace(".", ",")}
            </Text>
          </View>

          <View style={styles.linhaResumo}>
            <Text style={styles.textoResumo}>Descontos:</Text>
            <View style={styles.areaCupom}>
              <TextInput
                style={styles.inputCupom}
                placeholder="Inserir cupom"
                placeholderTextColor="#999"
                value={cupom}
                onChangeText={setCupom}
              />
              <TouchableOpacity style={styles.botaoAplicar} onPress={() => alert("Desconto aplicado com sucesso!")}>
                <Text style={styles.textoAplicar}>Aplicar</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.linhaResumo}>
            <Text style={styles.textoResumo}>Frete:</Text>
            <Text style={styles.valorResumo}>
              R${frete.toFixed(2).replace(".", ",")}
            </Text>
          </View>

          <View style={styles.linhaResumo}>
            <Text style={styles.totalTexto}>Total:</Text>
            <Text style={styles.totalValor}>
              R${total.toFixed(2).replace(".", ",")}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Botões inferiores */}
      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botaoCinza} onPress={() => navigation.navigate("Main")}>
          <Ionicons name="cart-outline" size={18} color="white" />
          <Text style={styles.textoBotao}>Continuar compras</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoRosa}
          onPress={() => navigation.navigate("Pagamento")}
        >
          <Text style={styles.textoBotao}>Avançar →</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: "center",
    paddingBottom: 100,
  },
  titulo: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 30,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderWidth: 2,
    borderColor: "#7B009A",
    borderRadius: 10,
    width: "90%",
    padding: 10,
    marginBottom: 12,
  },
  imagem: {
    width: 70,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  nome: {
    color: "white",
    fontSize: 18,
    marginBottom: 5,
  },
  preco: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  quantidadeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  quantidade: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  linhaDivisoria: {
    width: "90%",
    height: 1,
    backgroundColor: "#7B009A",
    marginVertical: 10,
  },
  resumo: {
    width: "90%",
  },
  linhaResumo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  textoResumo: {
    color: "white",
    fontSize: 20,
  },
  valorResumo: {
    color: "white",
    fontSize: 18,
  },
  areaCupom: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  inputCupom: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    width: 210,
    fontSize: 16,
    marginRight: 2,
  },
  botaoAplicar: {
    backgroundColor: "#FF00C8",
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  textoAplicar: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  totalTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 5,
  },
  totalValor: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 5,
  },
  botoesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "black",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  botaoCinza: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#303030",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  botaoRosa: {
    backgroundColor: "#FF00C8",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  textoBotao: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 5,
  },
});