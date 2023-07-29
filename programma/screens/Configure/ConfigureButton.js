import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import * as Animatable from 'react-native-animatable';

const vett = [{ val: 0, press: false }, { val: 5, press: false }, { val: 10, press: false }, { val: 15, press: false }, { val: 20, press: false }];

const ConfigureButton =({isSubmittedLoading, setIsSubmittedLoading, setIsSubmittedSetup, isSubmittedSetup, conto, persone, mancia, quotaxPers, totale}) => {
    const navigation = useNavigation();
    // const textRef = useRef(null);
    
    // useEffect(() => {
    //     textRef.current?.fadeInUp(1700);
    //   }, []);

    const toggleIsSubmittedLoading = () => {
        setIsSubmittedLoading(value => !value);
      };
    
    useEffect(() => {
    if (isSubmittedLoading === true) {
        navigation.navigate('loading');
    }
    }, [isSubmittedLoading]);

    const toggleIsSubmittedSetup = () => {
        setIsSubmittedSetup(value => !value);
      };
    
    useEffect(() => {
    if (isSubmittedSetup === true) {
        navigation.navigate('setup', { conto: conto, persone: persone, mancia: mancia, quotaxPers: quotaxPers, totale: totale });   
    }
    }, [isSubmittedSetup]);

    return(
        //<Animatable.View ref={textRef}>
        <View style={{ backgroundColor: '#222222' }} >
            <View style={[styles.rigeSeparate, { marginBottom: 30, backgroundColor: '#222222', paddingTop: 20 }]} >
                <View style={[styles.formaBottone, { backgroundColor: '#222222', marginLeft: 20 }]}>
                    <TouchableOpacity onPress={toggleIsSubmittedLoading} style={styles.posizioneBottone}>
                        <Text style={styles.menuItemText}>Indietro</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.formaBottone, { backgroundColor: '#54d169', marginRight: 20 }]}>
                    <TouchableOpacity onPress={toggleIsSubmittedSetup} style={styles.posizioneBottone} >
                        <Text style={styles.menuItemText}>Calcola</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        //</Animatable.View>
    )
}

const styles = StyleSheet.create({
    rigeSeparate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    posizioneBottone: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    formaBottone: {
        width: 127,
        height: 41,
        borderRadius: 20,
        borderColor: '#54d169',
        borderWidth: 1
    },
    menuItemText: {
        fontSize: 16,
        color: 'white',
        paddingVertical: 7,
        fontFamily:'Montserrat-Regular'
    }
});

export default ConfigureButton;