import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';

const BottoniScorrimento = ({ conto, navigation, setConto }) => {
    const textRef = useRef(null);
    const [isSubmittedConfig, setIsSubmittedConfig] = useState(false);

    const toggleIsSubmittedConfig = () => {
        setIsSubmittedConfig(true);
      };
    
    useEffect(() => {
    if (isSubmittedConfig === true) {
        setConto(filtered);
        navigation.setParams({conto : String(filtered)});
        navigation.navigate('configure', { conto: conto});
        setIsSubmittedConfig(false);
    }
    }, [isSubmittedConfig]);

    useEffect(() => {
        textRef.current?.fadeInUp(2500);
    }, []);

    let filtered = conto;
    let regex = /[a-zA-Z]/;
    let prova = parseFloat(conto).toFixed(2);
    
    if (!isNaN(prova) && prova>=0.1 && !regex.test(conto)){
        filtered = prova;
    }
    else 
        filtered = 0;

    const handlePress = () => {
        Alert.alert(
          'Errore di formato o conto troppo alto',
          'scrivi il conto correttamente per continuare',
          [
            { text: 'OK', onPress: () => {} },
          ]
        );
      };

    return (
        <>
            <View>
                <Animatable.View ref={textRef}>
                    {filtered>=0.1 ? 
                    <View style={[styles.menuItem,{backgroundColor:'#54D169'}]}>
                        <TouchableOpacity onPress={toggleIsSubmittedConfig} >
                            <Text style={styles.menuItemText}>Continua</Text>
                        </TouchableOpacity>
                    </View> :
                    <View style={[styles.menuItem,{backgroundColor:'#94eba3'}]}>
                        <TouchableOpacity onPress={handlePress}>
                            <Text style={styles.menuItemText}>Continua</Text>
                        </TouchableOpacity>
                    </View>}
                    <TouchableOpacity>
                        <Text style={styles.tutorial} >Tutorial</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    menuItemText: {
        fontSize: 16,
        color: 'white',
        textAlignVertical: 'auto',
        textAlign: 'center',
        paddingTop: 9,
        fontFamily:'Montserrat-Regular'
    },
    tutorial: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        paddingTop: 25,
        fontFamily:'Montserrat-Regular'
    },
    menuItem: {
        marginTop: 44,
        borderRadius: 20,
        width: 165,
        height: 41
    }
});

export default BottoniScorrimento;
