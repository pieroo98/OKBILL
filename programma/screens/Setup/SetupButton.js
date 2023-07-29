import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SetupButton = ({conto, persone, mancia, quotaxPers, totale, singoli }) => {
    const navigation = useNavigation();
    return (
        <View style={{ backgroundColor: '#222222' }} >
            <View style={{ backgroundColor: '#222222', paddingTop: 20 }} >
                <View style={styles.view2Button}>
                    <View style={[styles.viewButton, { backgroundColor: '#222222', marginLeft: 20 }]}>
                        <TouchableOpacity onPress={() => navigation.navigate('configure', { conto: conto })} style={styles.touchButton}>
                            <Text style={styles.menuItemText}>Indietro</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.viewButton, { backgroundColor: '#54d169', marginRight: 20 }]}>
                        <TouchableOpacity onPress={() => navigation.navigate('riepilogo', { conto: conto, persone: persone, mancia: mancia, quotaxPers: quotaxPers, totale: totale, items: singoli[singoli.length-1].soldi===-1? singoli.slice(0,singoli.length-1) : singoli })} style={styles.touchButton}>
                            <Text style={styles.menuItemText}>Riepilogo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view2Button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    touchButton: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    viewButton: {
        width: 127,
        height: 41,
        borderRadius: 20,
        borderColor: '#54d169',
        borderWidth: 1
    },
    menuItemText: {
        fontSize: 15,
        color: 'white',
        paddingVertical: 7,
        fontFamily:'Montserrat-Regular'
    }
});

export default SetupButton;