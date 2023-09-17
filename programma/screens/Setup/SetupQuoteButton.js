import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

function cancellaQuota({singoli, totale, persone, setSingoli, setQuoteMod, quoteMod,setAddQuota, setCliccato, cliccato}) {
    let soldiRidistribuire = singoli.find((p)=> p.selezionato);
    let quantiPrezzoBloccato = singoli.filter((i) => i.bloccato);
    let prezziBloccati = 0.0;
    let personeBloccate =0, denominatore = 0, numeratore=0, prezzoRestanti=0.0;
    for (const c of quantiPrezzoBloccato) {
        let numPers = 1;
        if (!isNaN(parseInt(c.persona.split(" ")[0])))
            numPers = parseInt(c.persona.split(" ")[0]);
        
        prezziBloccati += parseFloat(c.soldi)*numPers;
        personeBloccate += numPers;
    }
    
    if(soldiRidistribuire.bloccato){
        denominatore = parseInt( persone)  - personeBloccate +1;
        numeratore = parseFloat( totale) - prezziBloccati + parseFloat(soldiRidistribuire.soldi);
    }
    else{
        denominatore = parseInt( persone)  - personeBloccate;
        numeratore = parseFloat( totale) - prezziBloccati;
    }
    
    if(denominatore!==0 && numeratore>=0){
        prezzoRestanti = parseFloat(((numeratore) / (denominatore)).toFixed(2));
    }
    if(singoli.length === 3 && singoli[0].bloccato == true && singoli[1].bloccato == true){
        setSingoli(singoli.filter((p) => p.chiave !== cliccato.chiave ).map((r,i)=> {
            if(r.bloccato && i===0){
                return{...r,chiave:i,bloccato:false}
            }
            else if(!r.bloccato && r.soldi!==-1){
                return{...r,chiave:i,soldi:parseFloat(prezzoRestanti).toFixed(2)}
            }
        }));
    }
    else {
        setSingoli(singoli.filter((p) => p.chiave !== cliccato.chiave ).map((r,i)=> {
            if(r.bloccato){
                return{...r,chiave:i}
            }
            else if(!r.bloccato && r.soldi!==-1){
                return{...r,chiave:i,soldi:parseFloat(prezzoRestanti).toFixed(2)}
            }
        }));
    }
    setQuoteMod(quoteMod.filter((p) => p.chiave !== cliccato.chiave ).map((r,i)=> {
        if(r.bloccato){
            return{...r,chiave:i+1}
        }
        else if(!r.bloccato && r.soldi!==-1){
            return{...r,chiave:i+1,soldi:parseFloat(prezzoRestanti).toFixed(2)}
        }
    }));
    setAddQuota(true);
    setCliccato({persona: '1 quota', chiave: -1, soldi: 0, bloccato: false, selezionato: true })
}

const SetupQuoteButton = ({setSingoli, singoli, setCliccato, cliccato, setQuoteMod, quoteMod, totale, persone,setAddQuota, setDue, finalState }) => {

    const textRef = useRef(null);

    useEffect(() => {
        textRef.current?.fadeInUp(500);
      }, []);

    const bloccaQuota = () => {
        setSingoli(singoli.map((p)=>{
            if(p.selezionato){
                setCliccato({persona: p.persona, chiave : p.chiave, soldi: parseFloat(p.soldi).toFixed(2), bloccato : !p.bloccato, selezionato : p.selezionato});
                return{
                    ...p,
                    bloccato : !p.bloccato,
                }
            }
            else{
                return{
                    ...p,
                }
            }
        }));
        setQuoteMod(quoteMod.map((p)=>{
            if(p.selezionato){
                return{
                    ...p,
                    bloccato : !p.bloccato,
                }
            }
            else{
                return{
                    ...p,
                }
            }
        }))
        setDue(true);
    }

    return (
        <Animatable.View ref={textRef}>
            <View style={{ backgroundColor: '#121212' }}>
                <View style={[styles.viewPreconto2, { backgroundColor: '#171717', paddingTop: 20, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, }]}>
                    <View style={[styles.viewButton2, { backgroundColor: '#BC3030', marginLeft: 20, borderColor: '#BC3030', opacity:quoteMod.length===0 || cliccato.chiave===-1 || finalState[0][0].selezionato ? 0.5 : 1 }]}>
                        <Pressable disabled={cliccato.chiave===-1 || cliccato.chiave===0 || quoteMod.length===0  ? true : false} onPress={() => { cancellaQuota({singoli: singoli,totale:totale, persone:persone, setSingoli:setSingoli, setQuoteMod:setQuoteMod, quoteMod:quoteMod,setAddQuota:setAddQuota, setCliccato:setCliccato,cliccato:cliccato})}} style={styles.touchButton}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                                <Icon name='trash-o' size={21} color='white' />
                                <Text style={styles.menuItemText}> Elimina quota</Text>
                            </View>
                        </Pressable>
                    </View>
                    <View style={[styles.viewButton2, { backgroundColor: '#54d169', marginRight: 20, opacity:cliccato.chiave===-1 || quoteMod.length===0 ? 0.5 : 1 }]}>
                        <Pressable disabled={cliccato.chiave===-1 || quoteMod.length===0? true : false} onPress={() => { bloccaQuota() }} style={styles.touchButton}>
                            {!cliccato.bloccato ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                                <Icon name='lock' size={21} color='white' />
                                <Text style={styles.menuItemText}> Blocca quota</Text>
                            </View> : 
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                            <Icon name='unlock' size={21} color='white' />
                            <Text style={styles.menuItemText}> Sblocca quota</Text>
                        </View>}
                        </Pressable>
                    </View>
                </View>
            </View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    viewPreconto2: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    touchButton: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    menuItemText: {
        fontSize: 15,
        color: 'white',
        paddingVertical: 7,
        fontFamily:'Montserrat-Regular'
    },
    viewButton2: {
        width: 150,
        height: 41,
        borderRadius: 20,
        borderColor: '#54d169',
        borderWidth: 1
    }
});
    
export default SetupQuoteButton;