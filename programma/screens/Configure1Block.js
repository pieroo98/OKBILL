import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

const len7 = 90;
const len5 = 67;
const len9 = 118;

const Configure1Block = ({conto, coloreConto}) => {
    const textRef = useRef(null);
    useEffect(() => {
        textRef.current?.fadeInUp(700);
      }, []);
    return(
        <Animatable.View ref={textRef}>
        <View style={{ backgroundColor: '#121212' }} >
            
            <View style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#171717' }}>
                <View style={styles.rigeSeparate}>
                    <Text style={styles.parola}>Conto</Text>
                    <View style={styles.containerLine}>
                        <Text style={[styles.valoreCampi, { marginTop:20 }]} >{conto + '€'}</Text>
                        <View style={[styles.line, { backgroundColor: coloreConto, width: conto.toString().length <=5 ? len5: conto.toString().length<8 ? len7: len9, }]} />
                    </View>
                </View>
            </View>
            
        </View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    containerLine: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 20,
    }
    , line: {
        height: 1,
        alignItems: 'center',
        marginTop: 8, 
        marginBottom: 20,
    },
    parola: {
        color: 'white',
        fontSize: 16,
        alignSelf: 'center',
        marginLeft: 20,
        fontFamily:'Montserrat-Regular'
    },
    valoreCampi: { 
        color: "white", 
        fontSize: 14, 
        fontFamily:'Montserrat-Regular' 
    },
    rigeSeparate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default Configure1Block;