import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

const len7 = 90;
const len5 = 67;
const len9 = 118;

const Configure2Block = ({mancia, totale, quotaxPers, manciaOpaco, coloreMancia, coloreTotale, coloreQuota, conto}) => {
    const textRef = useRef(null);
    useEffect(() => {
        textRef.current?.fadeInUp(900);
      }, []);
    return (
        <Animatable.View ref={textRef}>
        <View style={{ backgroundColor: '#171717', }} >
            
            <View style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#1D1D1D' }}>
                <View style={styles.rigeSeparate}>
                    <Text style={styles.parola}>Mancia</Text>
                    <View style={styles.containerLine}>
                        <Text style={[styles.valoreCampi,{ opacity: manciaOpaco, marginTop:20 }]} >{mancia + '%'}</Text>                                
                        <View style={[styles.line, { backgroundColor: coloreMancia, width: conto.toString().length <=5 ? len5: conto.toString().length<8 ? len7: len9, }]} />
                    </View>
                    
                </View>
                <View style={styles.rigeSeparate}>
                    <Text style={[styles.parola, { marginBottom: 20 }]}>Totale</Text>
                    <View style={styles.containerLine}>
                        <Text style={styles.valoreCampi} >{totale + '€'}</Text>
                        <View style={[styles.line, { backgroundColor: coloreTotale, width: conto.toString().length <=5 ? len5: conto.toString().length<8 ? len7: len9, }]} />
                    </View>
                </View>
                <View style={styles.rigeSeparate}>
                    <Text style={[styles.parola, { marginBottom: 20 }]}>Quota</Text>
                    <View style={styles.containerLine}>
                        <Text style={styles.valoreCampi} >{quotaxPers + '€'}</Text>
                        <View style={[styles.line, { backgroundColor: coloreQuota, width: conto.toString().length <=5 ? len5: conto.toString().length<8 ? len7: len9, }]} />
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

export default Configure2Block;