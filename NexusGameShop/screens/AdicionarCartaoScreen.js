import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AdicionarCartaoScreen({ navigation }) {
  const [tipoCartao, setTipoCartao] = useState("Crédito");
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

  const alternarDropdown = () => setMostrarOpcoes(!mostrarOpcoes);
  const selecionarOpcao = (opcao) => {
    setTipoCartao(opcao);
    setMostrarOpcoes(false);
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
      {/* Botão Voltar */}
      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={22} color="white" />
        <Text style={styles.voltarTexto}>Voltar</Text>
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.cardContainer}>
          <Text style={styles.titulo}>Novo cartão</Text>

          <View style={styles.boxImage}>
            <Image
                source={require("../assets/img/cartao_visa.png")}
                style={styles.imagemCartao}
            />
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Número do cartão</Text>
            <TextInput
              style={styles.input}
              placeholder="************"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Nome do titular da conta</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              placeholderTextColor="#999"
            />

            <View style={styles.linha}>
              <View style={styles.metade}>
                <Text style={styles.label}>Data de validade</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/AA"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.metade}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  style={styles.input}
                  placeholder="***"
                  placeholderTextColor="#999"
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.linha}>
              {/* Dropdown de tipo do cartão */}
              <View style={styles.metade}>
                <Text style={styles.label}>Tipo do cartão</Text>

                <TouchableOpacity style={styles.select} onPress={alternarDropdown}>
                  <Text style={styles.selectText}>{tipoCartao}</Text>
                  <Ionicons
                    name={mostrarOpcoes ? "chevron-up" : "chevron-down"}
                    size={16}
                    color="black"
                  />
                </TouchableOpacity>

                {mostrarOpcoes && (
                  <View style={styles.dropdown}>
                    <TouchableOpacity
                      style={styles.opcao}
                      onPress={() => selecionarOpcao("Crédito")}
                    >
                      <Text style={styles.opcaoTexto}>Crédito</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.opcao}
                      onPress={() => selecionarOpcao("Débito")}
                    >
                      <Text style={styles.opcaoTexto}>Débito</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <View style={styles.metade}>
                <Text style={styles.label}>CPF</Text>
                <TextInput
                  style={styles.input}
                  placeholder="*******"
                  placeholderTextColor="#999"
                />
              </View>
            </View>




            <View style={styles.seguro}>
              <Ionicons name="checkmark-circle" size={18} color="green" />
              <Text style={styles.seguroTexto}>Seus dados estão seguros</Text>
            </View>

            <TouchableOpacity style={styles.botao} onPress={() => alert("Cartão cadastrado com sucesso!")}>
              <Text style={styles.textoBotao}>Adicionar cartão</Text>
            </TouchableOpacity>
          </View>
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
  voltar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 30,
  },
  voltarTexto: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
  scroll: {
    alignItems: "center",
    paddingBottom: 40,
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    width: "85%",
    padding: 20,
    alignItems: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  boxImage: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#7B009A",
    padding: 5,
    marginBottom: 20,
  },
  imagemCartao: {
    width: 160,
    height: 100,
  },
  form: {
    width: "100%",
  },
  label: {
    fontWeight: "600",
    fontSize: 13,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
    fontSize: 13,
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metade: {
    width: "48%",
  },
  select: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectText: {
    fontSize: 13,
    color: "black",
  },
  dropdown: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
  },
  opcao: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  opcaoTexto: {
    fontSize: 13,
    color: "black",
  },
  seguro: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  seguroTexto: {
    color: "black",
    marginLeft: 6,
    fontSize: 13,
  },
  botao: {
    backgroundColor: "#FF00C8",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    width: "60%",
    marginLeft: 70,
  },
  textoBotao: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});