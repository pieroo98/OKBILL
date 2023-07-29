import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Keyboard, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ModQuota =({item, valore, singoli, setSingoli, quoteMod, setQuoteMod, setDue, totale, persone}) => {
    let quantePersone = parseInt(item.persona.split(" ")[0]);
    let quantiPrezzoBloccato = singoli.filter((i) => i.bloccato);
    let prezziBloccati = 0.0, personeBloccate =0;
    for (const c of quantiPrezzoBloccato) {
        prezziBloccati += parseFloat(c.soldi)*parseInt(c.persona.split(" ")[0]);
        personeBloccate += parseInt(c.persona.split(" ")[0]);
    }
    let denominatore = parseInt(persone) - quantePersone - personeBloccate;
    let numeratore = parseFloat(totale) - parseFloat(valore)*quantePersone - prezziBloccati;
    let prezzoRestanti=0;
    if(denominatore!==0 && numeratore>=0){
        prezzoRestanti = parseFloat(((numeratore) / (denominatore)).toFixed(2));
        setSingoli(singoli.map((p)=>{
            if(p.chiave===item.chiave){
                return{
                    ...p,
                    soldi : valore.toFixed(2),
                }
            }
            else if (!p.bloccato && p.soldi!==-1){
                return{
                    ...p,
                    soldi: prezzoRestanti,
                }
            }
            else{
                return{
                    ...p
                }
            }
        }));
        setQuoteMod(quoteMod.map((p)=>{
            if(p.chiave===item.chiave){
                return{
                    ...p,
                    soldi : valore.toFixed(2),
                }
            }
            else if (!p.bloccato ){
                return{
                    ...p,
                    soldi: prezzoRestanti,
                }
            }
            else{
                return{
                    ...p
                }
            }
        }));
        setDue(true)
    }
    else{
        //console.log("non puoi modificare la quota, sblocca prima una quota bloccata!");
        if(denominatore===0){
            Alert.alert(
            'Attenzione',
            'non puoi modificare la quota, sblocca prima una quota bloccata!',
            [
              { text: 'OK', onPress: () => {} },
            ]
          );
        }
        else if(numeratore<0){
            Alert.alert(
                'Attenzione',
                'non puoi modificare la quota, supereresti il conto totale!',
                [
                  { text: 'OK', onPress: () => {} },
                ]
              );
        }
        else {
            Alert.alert(
                'Attenzione',
                'non puoi modificare la quota, errore generico.',
                [
                  { text: 'OK', onPress: () => {} },
                ]
              );
        }
    }
}

const SetupGeneralQuote = ({ spazio, item, flag, totale, singoli, setSingoli, quoteMod, setQuoteMod, setDue, persone }) => {
    let tmp = item.soldi;
    return (
        <View style={{ width: 169, height: 61, backgroundColor: '#1D1D1D', marginRight: spazio, marginLeft: spazio, borderRadius: 50, borderWidth: 1, borderColor: item.selezionato ? '#54d169' : item.bloccato ? 'white' : '#1D1D1D' }} >
            <Text style={{ fontSize: 14, color: 'white', alignSelf: 'center', opacity: item.bloccato ? 0.5 : 1,  fontFamily:'Montserrat-Regular' }}>{item.persona}</Text>
            <View style={{ flexDirection: 'row', justifyContent: flag ? 'space-between' : 'center' }}>
                {flag ? parseFloat(item.soldi) - 1 >= 0 ?
                    <TouchableOpacity disabled={item.selezionato && !item.bloccato ? false : true } style={{ paddingHorizontal: 10,opacity: item.bloccato ? 0.5 : 1 }} onPress={()=>{ModQuota({item:item, valore:parseFloat(item.soldi)-1, singoli:singoli, setSingoli:setSingoli, quoteMod:quoteMod, setQuoteMod: setQuoteMod, setDue:setDue, totale: totale, persone: persone})}} >
                        <Icon name="minus" size={21} color={item.bloccato ?"white" : item.selezionato ? "#54d169": "white"} />
                    </TouchableOpacity> :
                    <View style={{ paddingHorizontal: 10, opacity: item.bloccato ? 0.5 : 1 }}>
                        <Icon name="minus" size={21} color={item.bloccato ?"white" : item.selezionato ? "#54d169": "white"} />
                    </View>
                    : null}
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ fontSize: tmp.toString().length <5 ? 24 : tmp.toString().length <8 ? 17 : tmp.toString().length <10 ? 14 : tmp.toString().length <11 ? 12 : 11, color: 'white', alignSelf: 'center', opacity: item.bloccato ? 0.5 : 1, fontFamily:'Montserrat-Regular' }}>{item.soldi}</Text>
                    <Text style={{ fontSize: tmp.toString().length <5 ? 24 : tmp.toString().length <8 ? 17 : tmp.toString().length <10 ? 14 : tmp.toString().length <11 ? 12 : 11, color: '#54d169', alignSelf: 'center', opacity: item.bloccato ? 0.5 : 1,  fontFamily:'Montserrat-Regular' }}>{' €'}</Text>
                </View>
                {flag ? parseFloat(item.soldi) + 1 <= parseFloat(totale) ?
                    <TouchableOpacity disabled={item.selezionato && !item.bloccato ? false : true } style={{ paddingHorizontal: 10, opacity: item.bloccato ? 0.5 : 1 }} onPress={()=>{ModQuota({item:item, valore:parseFloat(item.soldi)+1, singoli:singoli, setSingoli:setSingoli, quoteMod:quoteMod, setQuoteMod: setQuoteMod, setDue:setDue, totale: totale, persone: persone})}} >
                        <Icon name="plus" size={21} color={item.bloccato ?"white" : item.selezionato ? "#54d169": "white"} />
                    </TouchableOpacity> :
                    <View style={{ paddingHorizontal: 10, opacity: item.bloccato ? 0.5 : 1 }}>
                        <Icon name="plus" size={21} color={item.bloccato ?"white" : item.selezionato ? "#54d169": "white"} />
                    </View>
                    : null}
            </View>
        </View>
    );
}


export default SetupGeneralQuote;