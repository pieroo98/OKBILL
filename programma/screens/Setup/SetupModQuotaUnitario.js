import React from 'react';
import { Alert } from 'react-native';

const SetupModQuotaUnitario =({item, valore, singoli, setSingoli, quoteMod, setQuoteMod, setDue, totale, persone}) => {
    let numPers = 1;
    if (!isNaN(parseInt(item.persona.split(" ")[0])))
        numPers = parseInt(item.persona.split(" ")[0]);
    
    let quantePersone = item.chiave== 0 ? numPers : 1;// valutare se usare il num per il calcolo o meno in caso in cui volessi mod il nome e dire tipo 4 quote a questo prezzo.
    let quantiPrezzoBloccato = singoli.filter((i) => i.bloccato);
    let prezziBloccati = 0.0, personeBloccate =0;
    for (const c of quantiPrezzoBloccato) {
        let numPers = 1;
        if (!isNaN(parseInt(c.persona.split(" ")[0])))
            numPers = parseInt(c.persona.split(" ")[0]);
        
        let numPerson = c.chiave== 0 ? numPers : 1;
        prezziBloccati += parseFloat(c.soldi)*numPerson;
        personeBloccate += numPerson;
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
                    soldi : parseFloat(valore).toFixed(2),
                }
            }
            else if (!p.bloccato && p.soldi!==-1){
                return{
                    ...p,
                    soldi: parseFloat(prezzoRestanti).toFixed(2),
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
                    soldi : parseFloat(valore).toFixed(2),
                }
            }
            else if (!p.bloccato ){
                return{
                    ...p,
                    soldi: parseFloat(prezzoRestanti).toFixed(2),
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

export default SetupModQuotaUnitario;