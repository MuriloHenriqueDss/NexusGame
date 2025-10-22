import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EscolherCartaoScreen({ navigation }) {
    const [cartaoPadrao, setCartaoPadrao] = useState(1);

    const cartoes = [
        {
            id: 1,
            nome: "Cartão Visa – Final 8922",
            titular: "João Gustavo Mata Ramos",
            validade: "09/29",
            tipo: "Crédito",
            imagem: require("../assets/img/cartao_visa.png"),
        },
        {
            id: 2,
            nome: "Cartão Visa – Final 1306",
            titular: "João Gustavo Mata Ramos",
            validade: "01/30",
            tipo: "Débito",
            imagem: require("../assets/img/cartao_visa.png"),
        },
        {
            id: 3,
            nome: "Cartão Visa – Final 1306",
            titular: "João Gustavo Mata Ramos",
            validade: "01/30",
            tipo: "Débito",
            imagem: require("../assets/img/cartao_visa.png"),
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

            <ScrollView style={styles.scrollview}>
                {/* Botão Voltar */}
                <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                    <Text style={styles.voltarTexto}>Voltar</Text>
                </TouchableOpacity>

                {/* Título */}
                <Text style={styles.titulo}>Faça o pagamento</Text>

                {/* Subtítulo */}
                <Text style={styles.subtitulo}>Meus cartões</Text>

                {/* Lista de cartões */}
                {cartoes.map((cartao) => (
                    <TouchableOpacity
                        key={cartao.id}
                        style={[
                            styles.cartaoContainer,
                            { borderColor: cartao.id === cartaoPadrao ? "#FF00C8" : "#a200ff" },
                        ]}
                        onPress={() => setCartaoPadrao(cartao.id)}
                    >
                        <Image source={cartao.imagem} style={styles.cartaoImagem} resizeMode="contain" />
                        <View style={styles.cartaoInfo}>
                            <Text style={styles.cartaoNome}>{cartao.nome}</Text>
                            <Text style={styles.cartaoTexto}> {cartao.titular}</Text>
                            <Text style={styles.cartaoTexto}>Válido até: {cartao.validade}</Text>
                            <Text style={styles.cartaoTexto}>Tipo do cartão: {cartao.tipo}</Text>
                            {cartao.id === cartaoPadrao && (
                                <View style={styles.padraoContainer}>
                                    <Ionicons name="checkmark-circle" size={14} color="#FF00C8" />
                                    <Text style={styles.padraoTexto}>Padrão</Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}

                {/* Botão Confirmar */}
                <TouchableOpacity style={styles.botao}>
                    <Text style={styles.botaoTexto}>Confirmar</Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
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

    scrollview: {
        flex: 1,
        backgroundColor: "#000",
        padding: 20,
    },
    voltar: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    voltarTexto: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 6,
    },
    titulo: {
        color: "#fff",
        fontSize: 26,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 20,
    },
    subtitulo: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 10,
    },
    cartaoContainer: {
        backgroundColor: "#0d0d0d",
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    cartaoImagem: {
        width: "100%",
        height: 80,
        marginBottom: 10,
    },
    cartaoInfo: {
        marginTop: 5,
    },
    cartaoNome: {
        color: "#fff",
        fontWeight: "700",
        marginBottom: 2,
    },
    cartaoTexto: {
        color: "#ccc",
        fontSize: 14,
        marginBottom: 2,
    },
    padraoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },
    padraoTexto: {
        color: "#FF00C8",
        fontSize: 13,
        marginLeft: 4,
        fontWeight: "600",
    },
    botao: {
        backgroundColor: "#FF00C8",
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 20,
        borderWidth: 2,
        borderColor: "#a200ff",
    },
    botaoTexto: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});