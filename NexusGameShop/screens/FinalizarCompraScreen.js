import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FinalizarCompraScreen({ navigation }) {
    const pedido = [
        {
            id: 1,
            nome: "The Legend of Zelda (Nintendo Switch)",
            preco: 349.9,
            imagem: require("../assets/img/jogos/astrobot.png"),
        },
        {
            id: 2,
            nome: "Call of Duty Black Ops Cold War (Xbox Series X/S)",
            preco: 87.99,
            imagem: require("../assets/img/jogos/astrobot.png"),
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
                <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                    <Text style={styles.voltarTexto}>Voltar</Text>
                </TouchableOpacity>

                <Text style={styles.titulo}>Finalizar compra</Text>

                <View style={styles.pedidoContainer}>
                    <Text style={styles.subtitulo}>Meu Pedido</Text>

                    {pedido.map((item) => (
                        <View key={item.id} style={styles.itemContainer}>
                            <Image source={item.imagem} style={styles.imagem} />
                            <View style={styles.info}>
                                <Text style={styles.nome}>{item.nome}</Text>
                                <Text style={styles.preco}>
                                    R${item.preco.toFixed(2).replace(".", ",")}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                <Text style={styles.subtitulo}>Escolha de pagamento</Text>

                <View style={styles.pagamentoContainer}>
                    <TouchableOpacity style={styles.pagamentoOpcao} onPress={() => navigation.navigate("Pix")}>
                        <View style={styles.pagamentoIcone}>
                            <Ionicons name="cash-outline" size={26} color="#00CBA9" />
                        </View>
                        <View>
                            <Text style={styles.pagamentoTitulo}>Pix</Text>
                            <Text style={styles.pagamentoDescricao}>Aprovação imediata</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.pagamentoOpcao} onPress={() => navigation.navigate("Boleto")}>
                        <View style={styles.pagamentoIcone}>
                            <Ionicons name="document-text-outline" size={26} color="#fff" />
                        </View>
                        <View>
                            <Text style={styles.pagamentoTitulo}>Boleto</Text>
                            <Text style={styles.pagamentoDescricao}>Aprovação em 1 a 2 dias úteis</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.pagamentoOpcao} onPress={() => navigation.navigate("EscolherCartao")}>
                        <View style={styles.pagamentoIcone}>
                            <Ionicons name="card-outline" size={26} color="#FFD84D" />
                        </View>
                        <View>
                            <Text style={styles.pagamentoTitulo}>Cartão</Text>
                            <Text style={styles.pagamentoDescricao}>Aprovação em 1 a 2 dias úteis</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
        marginBottom: 10,
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
    pedidoContainer: {
        backgroundColor: "#0d0d0d",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#a200ff",
        padding: 10,
        marginBottom: 25,
    },
    subtitulo: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        borderBottomWidth: 2,
        borderBottomColor: "#a200ff",
        marginBottom: 10,
        paddingBottom: 5,
    },
    itemContainer: {
        flexDirection: "row",
        backgroundColor: "#1a1a1a",
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#a200ff",
        marginBottom: 10,
        padding: 8,
        alignItems: "center",
    },
    imagem: {
        width: 60,
        height: 75,
        borderRadius: 5,
        marginRight: 10,
    },
    info: {
        flex: 1,
    },
    nome: {
        color: "#fff",
        fontSize: 14,
        marginBottom: 5,
    },
    preco: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    pagamentoContainer: {
        gap: 10,
        marginBottom: 30,
    },
    pagamentoOpcao: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1a1a1a",
        borderWidth: 2,
        borderColor: "#a200ff",
        borderRadius: 10,
        padding: 12,
    },
    pagamentoIcone: {
        marginRight: 12,
    },
    pagamentoTitulo: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    pagamentoDescricao: {
        color: "#ccc",
        fontSize: 13,
    },
});