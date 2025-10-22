import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PixPagarScreen({ navigation }) {
    const valor = 465.5;
    const codigoPix =
        "00020126580014BR.GOV.BCB.PIX01363f2d1c6a9b454e2391d762f44a8a7c92520400053039865802BR5925NexusGameShopLtda6009SãoPaulo62070503***63041A2B";

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

                {/* Card principal */}
                <View style={styles.card}>
                    <Image
                        source={require("../assets/img/qr_pix.png")}
                        style={styles.qrCode}
                    />

                    <Text style={styles.infoQR}>Validade do QR Code: 15 minutos</Text>
                    <Text style={styles.infoQR}>Número do pedido: #784512</Text>
                    <Text style={styles.infoQR}>Data: 08/09/2025 - 19:45</Text>

                    <Text style={styles.valor}>
                        Valor: <Text style={styles.bold}>R${valor.toFixed(2).replace(".", ",")}</Text>
                    </Text>

                    <Text style={styles.codigoPix}>{codigoPix}</Text>

                    <TouchableOpacity style={styles.botao} onPress={() => Alert.alert("Obrigado!", "Compra efetuada com sucesso.")}>
                        <Text style={styles.botaoTexto}>Copiar código copia e cola</Text>
                    </TouchableOpacity>
                </View>

                {/* Instruções */}
                <View style={styles.instrucoesContainer}>
                    <Text style={styles.subtitulo}>Como pagar com PIX?</Text>
                    <Text style={styles.instrucoes}>
                        1. Abra o app do seu banco.{"\n"}
                        2. Escaneie o QR Code ou copie o código PIX.{"\n"}
                        3. Confirme o pagamento.{"\n"}
                        4. Pronto! A aprovação é em segundos.
                    </Text>
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
    card: {
        backgroundColor: "#0d0d0d",
        borderWidth: 2,
        borderColor: "#a200ff",
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
        marginBottom: 30,
    },
    qrCode: {
        width: 150,
        height: 150,
        marginBottom: 15,
    },
    infoQR: {
        color: "#ccc",
        fontSize: 13,
        marginBottom: 3,
    },
    valor: {
        color: "#fff",
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
    },
    bold: {
        fontWeight: "700",
    },
    codigoPix: {
        color: "#fff",
        fontSize: 12,
        textAlign: "center",
        marginBottom: 15,
    },
    botao: {
        backgroundColor: "#FF00C8",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    botaoTexto: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
    },
    instrucoesContainer: {
        marginBottom: 40,
    },
    subtitulo: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 10,
    },
    instrucoes: {
        color: "#ccc",
        fontSize: 14,
        lineHeight: 22,
    },
});