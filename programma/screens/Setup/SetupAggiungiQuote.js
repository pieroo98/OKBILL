import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

const SetupAggiungiQuote = ({ anima, spazio, item, setAddQuota, quoteMod, setQuoteMod, setCliccato, singoli, setSingoli, totale, persone }) => {
    const textRef = useRef(null);

    useEffect(() => {
        textRef.current?.fadeInRight(500);
      }, []);

    const handlePress = () => {
        if(singoli[0].bloccato){
            Alert.alert(
                'Attenzione',
                "non puoi aggiungere un'altra quota, sblocca prima la quota bloccata con più quote!",
                [
                  { text: 'OK', onPress: () => {} },
                ]
              );
        }
        else{
            let quantiPrezzoBloccato = singoli.filter((i) => i.bloccato);
            let prezziBloccati = 0.0;
            let personeBloccate =0, denominatore = 0, numeratore=0, prezzoRestanti=0.0;
            for (const c of quantiPrezzoBloccato) {
                let numPers = 1;
                if (!isNaN(parseInt(c.persona.split(" ")[0])))
                    numPers = parseInt(c.persona.split(" ")[0]);
                
                let numPerson = c.chiave== 0 ? numPers : 1;
                prezziBloccati += parseFloat(c.soldi)*numPerson;
                personeBloccate += numPerson;
            }
            
            denominatore = parseInt(persone) - personeBloccate;
            numeratore = parseFloat(totale) - prezziBloccati;
            if(denominatore>0 && numeratore>=0){
                prezzoRestanti = parseFloat(((numeratore) / (denominatore)).toFixed(2));
            }
            
            let esporta = { persona: '1 quota', chiave: item.chiave, soldi: prezzoRestanti, bloccato: false, selezionato: true };
            let prec = quoteMod.map((p) => {
                if(p.bloccato){
                    return {
                    ...p,
                    selezionato: false,
                    }
                }
                else{
                    return {
                        ...p,
                        selezionato: false,
                        soldi: parseFloat(prezzoRestanti).toFixed(2),
                    }
                }
            })
            prec.push(esporta);
            setQuoteMod(prec);
            setSingoli(singoli.map((p)=>{
                if(p.bloccato){
                    return {
                    ...p,
                    selezionato: false,
                    }
                }
                else{
                    return {
                        ...p,
                        selezionato: false,
                        soldi: parseFloat(prezzoRestanti).toFixed(2),
                    }
                }
            }))
            setAddQuota(true);
            setCliccato(esporta);
        }
    };

    return (
        <>
        {anima ?
        <Animatable.View ref={textRef}>
            <TouchableOpacity onPress={() => { handlePress() }}>
                <View style={[styles.item, { backgroundColor: '#121212', paddingBottom: 20 }]}>
                    <View style={{ width: 169, height: 61, backgroundColor: '#121212', marginTop: 10, borderRadius: 50, marginRight: spazio, marginLeft: spazio, marginBottom: 18, borderWidth: 1, borderColor: '#1D1D1D', }}>
                        <Text style={{ fontSize: 14, color: 'white', alignSelf: 'center', paddingTop: 4, opacity: item.bloccato ? 0.5 : 1,  fontFamily:'Montserrat-Regular' }}>{item.persona}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 4 }}>
                            <Icon name="plus" size={25} color="#54d169" />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Animatable.View> :
        <TouchableOpacity onPress={() => { handlePress() }}>
                <View style={[styles.item, { backgroundColor: '#121212', paddingBottom: 20 }]}>
                    <View style={{ width: 169, height: 61, backgroundColor: '#121212', marginTop: 10, borderRadius: 50, marginRight: spazio, marginLeft: spazio, marginBottom: 18, borderWidth: 1, borderColor: '#1D1D1D', }}>
                        <Text style={{ fontSize: 14, color: 'white', alignSelf: 'center', paddingTop: 4, opacity: item.bloccato ? 0.5 : 1,  fontFamily:'Montserrat-Regular' }}>{item.persona}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 4 }}>
                            <Icon name="plus" size={25} color="#54d169" />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        }
        </>
    );
}

const styles = StyleSheet.create({
    item: {
        width: 169,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        margin: 20,
    }
});

export default SetupAggiungiQuote;