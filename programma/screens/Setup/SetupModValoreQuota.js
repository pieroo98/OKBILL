import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Keyboard, Alert } from 'react-native';


const SetupModValoreQuota = ({ onSubmit, item, singoli, setSingoli, quoteMod, setQuoteMod, setDue, totale, persone }) => {
    const [editing, setEditing] = useState(false);
    const [newValore, setNewValore] = useState(parseFloat(item.soldi).toFixed(2));
    let disabilita;
    let tmp = item.soldi;
    let lun = Math.round(tmp).toString().length +3;
    if (item.bloccato) disabilita = true;
    else disabilita = false;
    let soldiPersona = parseFloat(item.soldi);
    useEffect(() => {
        soldiPersona = parseFloat(item.soldi);
        setNewValore(soldiPersona);
    }, [item.soldi]);
  
    const cambiaValore = (soldiPersona) => {
        setNewValore(soldiPersona);
        setSingoli(singoli.map((p)=>{
          if(p.chiave===item.chiave){
              return{
                  ...p,
                  soldi : parseFloat(soldiPersona).toFixed(2),
              }
          }
          else{
              return{
                  ...p
              }
          }
      }));
   };
  
    const handleSubmit = () => {
      setEditing(false);
      if (onSubmit){
        onSubmit(soldiPersona);
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
        let numeratore = parseFloat(totale) - parseFloat(newValore)*quantePersone - prezziBloccati;
        let prezzoRestanti=0;
        if(denominatore!==0 && numeratore>=0){
            prezzoRestanti = parseFloat(((numeratore) / (denominatore)).toFixed(2));
            setSingoli(singoli.map((p)=>{
                if(p.chiave===item.chiave){
                    return{
                        ...p,
                        soldi : parseFloat(newValore).toFixed(2),
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
                        soldi : parseFloat(newValore).toFixed(2),
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
            //probabile errore se non si inserisce nessun prezzo durante la modifica da tastiera
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
      
      Keyboard.dismiss();
    };

    useEffect(() => {
        if(!item.selezionato){
            setEditing(false);
            Keyboard.dismiss();
        }
      }, [item.selezionato]);
    
    useEffect(() => {
        if(item.bloccato){
            setEditing(false);
            Keyboard.dismiss();
        }
      }, [item.bloccato]);
  
    return (
      <>
        {editing ? 
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TextInput
              placeholder={'0 €'}
              placeholderTextColor='#9E9E9E'
              keyboardType='numeric'
              value={newValore.toString()}
              onChangeText={(soldiPersona) => cambiaValore(soldiPersona)}
              onSubmitEditing={handleSubmit}
              returnKeyType='send'
              maxLength={9}
              style={{ color: 'white', paddingBottom: 0, paddingTop: 0,fontFamily: 'Montserrat-Regular',width: 77,fontSize: lun <6 ? 24 : lun <=8 ? 17 : lun <10 ? 14 : lun <11 ? 12 : 11 }}
            />
          </View>
         :
          <TouchableOpacity disabled={!item.selezionato || item.bloccato} onPress={() => { if (!disabilita) setEditing(true); }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={{ fontSize: lun <6 ? 24 : lun <=8 ? 17 : lun <10 ? 14 : lun <11 ? 12 : 11, color: 'white', alignSelf: 'center', opacity: item.bloccato ? 0.5 : 1, fontFamily:'Montserrat-Regular' }}>{soldiPersona}</Text>
                <Text style={{ fontSize:lun <6 ? 24 : lun <=8 ? 17 : lun <10 ? 14 : lun <11 ? 12 : 11, color: '#54d169', alignSelf: 'center', opacity: item.bloccato ? 0.5 : 1,  fontFamily:'Montserrat-Regular' }}>{' €'}</Text>
            </View>
          </TouchableOpacity>
        }
      </>
    );
  };

export default SetupModValoreQuota;