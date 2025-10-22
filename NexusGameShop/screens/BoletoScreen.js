import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PixScreen({ navigation }) {
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

    const subtotal = 465.5;

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

                <Text style={styles.titulo}>Revise e confirme</Text>

                {/* MEU PEDIDO */}
                <View style={styles.pedidoContainer}>
                    <Text style={styles.subtitulo}>Meu Pedido</Text>

                    {pedido.map((item) => (
                        <View key={item.id} style={styles.itemContainer}>
                            <Image source={item.imagem} style={styles.imagem} />
                            <View style={styles.info}>
                                <Text style={styles.nome}>{item.nome}</Text>
                                <Text style={styles.preco}>R${item.preco.toFixed(2).replace(".", ",")}</Text>
                            </View>
                        </View>
                    ))}

                    <View style={styles.totalLinha}>
                        <Text style={styles.totalLabel}>Subtotal</Text>
                        <Text style={styles.totalValor}>R${subtotal.toFixed(2).replace(".", ",")}</Text>
                    </View>

                    <View style={styles.totalLinha}>
                        <Text style={styles.vocePagara}>Você Pagará</Text>
                        <Text style={styles.totalFinal}>R${subtotal.toFixed(2).replace(".", ",")}</Text>
                    </View>

                    <TouchableOpacity style={styles.botaoConfirmar} onPress={() => navigation.navigate("PagarBoleto")}>
                        <Text style={styles.botaoTexto}>Confirmar a compra</Text>
                    </TouchableOpacity>
                </View>

                {/* FATURAMENTO */}
                <Text style={styles.subtitulo}>Faturamento</Text>
                <View style={styles.infoBox}>
                    <Ionicons name="document-text-outline" size={22} color="#fff" style={styles.iconeInfo} />
                    <View>
                        <Text style={styles.infoTitulo}>Kaique Ferreira</Text>
                        <Text style={styles.infoTexto}>CPF 123.456.789-1</Text>
                    </View>
                </View>

                {/* ENTREGA */}
                <Text style={styles.subtitulo}>Detalhes da entrega</Text>
                <View style={styles.infoBox}>
                    <Ionicons name="location-outline" size={22} color="#fff" style={styles.iconeInfo} />
                    <View>
                        <Text style={styles.infoTitulo}>Rua José Bonifácio 395</Text>
                        <Text style={styles.infoTexto}>Jardim Rafael - CEP 12280470</Text>
                        <Text style={styles.link}>Alterar endereço</Text>
                    </View>
                </View>

                {/* PAGAMENTO */}
                <Text style={styles.subtitulo}>Detalhes do pagamento</Text>
                <View style={styles.infoBox}>
                    <Ionicons name="document-text-outline" size={26} color="#fff" />
                    <View>
                        <Text style={styles.infoTitulo}>Boleto</Text>
                        <Text style={styles.infoTexto}>R${subtotal.toFixed(2).replace(".", ",")}</Text>
                        <Text style={styles.infoTextoPequeno}>
                            Ao gerar o boleto, o prazo de aprovação é de 2 a 3 dias úteis
                        </Text>
                    </View>
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
    totalLinha: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    totalLabel: {
        color: "#fff",
        fontSize: 15,
    },
    totalValor: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
    },
    vocePagara: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
        marginTop: 5,
    },
    totalFinal: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 18,
    },
    botaoConfirmar: {
        backgroundColor: "#FF00C8",
        borderRadius: 8,
        marginTop: 12,
        paddingVertical: 10,
    },
    botaoTexto: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "700",
        fontSize: 16,
    },
    infoBox: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#a200ff",
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#1a1a1a",
        marginBottom: 15,
    },
    iconeInfo: {
        marginRight: 10,
    },
    infoTitulo: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 15,
    },
    infoTexto: {
        color: "#ccc",
        fontSize: 13,
    },
    infoTextoPequeno: {
        color: "#aaa",
        fontSize: 12,
        marginTop: 3,
    },
    link: {
        color: "#FF00C8",
        fontSize: 13,
        marginTop: 2,
    },
});