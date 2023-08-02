import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import * as Animatable from 'react-native-animatable';

const len7 = 90;
const len5 = 67;
const len9 = 118;

const Configure3Block = ({setQuotaxPers, setPersone, mancia, conto, persone, setMancia, setCliccato, setSingleButton, setTotale, signleButton, vettFilter, coloreTotale }) => {
    const textRef = useRef(null);
    useEffect(() => {
        textRef.current?.fadeInUp(500);
      }, []);

    const handleValueChange = (newValue) => {
        setPersone(Math.round(newValue));
        let aggiunta = 0;
        if (mancia > 0) {
            if (conto > 0) {
                aggiunta = parseFloat((parseFloat(conto) * mancia) / 100);
                const numero = (parseFloat(conto) + aggiunta) / Math.round(newValue);
                setQuotaxPers(parseFloat(numero.toFixed(2)));
            }
            else
                setQuotaxPers(0);
        }
        else {
            if (conto > 0) {
                const numero = conto / Math.round(newValue);
                setQuotaxPers(parseFloat(numero.toFixed(2)));
            }
            else
                setQuotaxPers(0);
        }
    };

    const handlePress = (item) => {
        if (signleButton.val != item.val) {
            setSingleButton({ val: item.val, press: true });
            setMancia(item.val);
        }
        else {
            setSingleButton({ val: item.val, press: !signleButton.press });
            setMancia(!signleButton.press ? item.val : 0);
        }
        setCliccato(true);
        let aggiunta = 0;
        if (item.val > 0) {
            if (conto > 0) {
                aggiunta = parseFloat((item.val / 100) * conto);
                const fin = parseFloat(conto) + parseFloat(aggiunta);
                setTotale(fin.toFixed(2));
                const numero = fin / persone;
                setQuotaxPers(parseFloat(numero.toFixed(2)));
            }
        }
        else {
            setTotale(conto);
            const numero = conto / persone;
            setQuotaxPers(parseFloat(numero.toFixed(2)));
        }
        if (!item.press == false) {
            setTotale(conto);
            const numero = conto / persone;
            setQuotaxPers(parseFloat(numero.toFixed(2)));
        }
    };

    return (
        <Animatable.View ref={textRef}>
        <View style={{ backgroundColor: '#1D1D1D' }} >
            
            <View style={{ borderTopLeftRadius: 14, borderTopRightRadius: 14, backgroundColor: '#222222', }}>
                <View style={styles.rigeSeparate}>
                    <Text style={{ marginBottom: 10, marginTop: 20, color: 'white', fontSize: 16, marginLeft: 20, fontFamily:'Montserrat-Regular' }}>Numero di persone</Text>
                    <View style={styles.containerLine}>
                        <Text style={[styles.valoreCampi,{ marginTop: 20 }]} >{persone}</Text>
                        <View style={[styles.line, { backgroundColor: coloreTotale, width: conto.toString().length <=6 ? len5: conto.toString().length<8 ? len7: len9, }]} />
                    </View>
                </View>
                <Slider
                    minimumValue={2}
                    maximumValue={20}
                    minimumTrackTintColor="#54D169"
                    maximumTrackTintColor="#fff"
                    thumbTintColor="#54D169"
                    value={persone}
                    onValueChange={handleValueChange}
                    style={{ width: '100%', fontFamily:'Montserrat-Regular' }}
                    tapToSeek='true'
                />
                <View style={styles.rigeSeparate}>
                    <Text style={{ color: 'white', fontSize: 12, marginLeft: 17, fontFamily:'Montserrat-Regular' }}>2</Text>
                    <Text style={{ color: 'white', fontSize: 12, marginRight: 15, fontFamily:'Montserrat-Regular' }}>20</Text>
                </View>
                <Text style={{ marginBottom: 20, marginTop: 5, color: 'white', fontSize: 16, marginLeft: 20, fontFamily:'Montserrat-Regular' }}>Mancia</Text>
                <View style={[styles.container2, { paddingBottom: 15 }]}>
                    {vettFilter.map((item, i) => {
                        return (
                            <TouchableOpacity onPress={() => handlePress(item)} key={i}>
                                <View
                                    style={{
                                        backgroundColor: item.press ? '#54D169' : '#404040',
                                        borderRadius: 25, width: 50,
                                        height: 50, alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1, borderColor: 'white'
                                    }}>
                                    <Text style={{ color: 'white', fontSize: 14, fontFamily:'Montserrat-Regular' }}>
                                        {item.val}%
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }
                    )}
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
    valoreCampi: { 
        color: "white", 
        fontSize: 14, 
        fontFamily:'Montserrat-Regular' 
    },
    rigeSeparate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 30,
    }
});

export default Configure3Block;