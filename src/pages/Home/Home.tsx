import { StatusBar } from "expo-status-bar"
import { Text, View, Image, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export const HomePage = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <Image
                style={styles.logo}
                source={require('../../../assets/expositor.png')}
            />
            <View style={styles.card}>
            <Text>Bem-vindo à nossa loja de ferramentas! Com mais de 27 anos de experiência, oferecemos uma ampla variedade de ferramentas manuais e elétricas, além de equipamentos de jardinagem e materiais de construção. São mais de 1.000 produtos de qualidade para atender suas necessidades. Além disso, disponibilizamos serviços extras como afiação de ferramentas e assistência técnica, garantindo que você tenha tudo o que precisa para realizar seus projetos com eficiência. Venha nos visitar e descubra o que podemos fazer por você!</Text>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#435064',
    },
    logo: {
        width: '90%',
        height: '45%',
        position: 'relative',
        bottom: 50,
        borderRadius: 10
    },
    card: {
        width: 350,
        backgroundColor: '#CDC9BF',
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
});