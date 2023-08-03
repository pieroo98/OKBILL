import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Keyboard, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const SetupModValoreQuota = ({ onSubmit, item, singoli, setSingoli, quoteMod, setQuoteMod, setDue, totale, persone }) => {
    const [editing, setEditing] = useState(false);
    let disabilita;
    let tmp = item.soldi;
    let lun = Math.round(tmp).toString().length +3;
    if (item.bloccato) disabilita = true;
    else disabilita = false;
    let soldiPersona = parseFloat(item.soldi).toFixed(2);
  
    const cambiaValore = (soldiPersona) => {
        let quantePersone = item.chiave== 0 ? parseInt(item.persona.split(" ")[0]) : 1;// valutare se usare il num per il calcolo o meno in caso in cui volessi mod il nome e dire tipo 4 quote a questo prezzo.
        let quantiPrezzoBloccato = singoli.filter((i) => i.bloccato);
        let prezziBloccati = 0.0, personeBloccate =0;
        for (const c of quantiPrezzoBloccato) {
            let numPerson = c.chiave== 0 ? parseInt(c.persona.split(" ")[0]) : 1;
            prezziBloccati += parseFloat(c.soldi)*numPerson;
            personeBloccate += numPerson;
        }
        let denominatore = parseInt(persone) - quantePersone - personeBloccate;
        let numeratore = parseFloat(totale) - parseFloat(soldiPersona)*quantePersone - prezziBloccati;
        let prezzoRestanti=0;
        if(denominatore!==0 && numeratore>=0){
            prezzoRestanti = parseFloat(((numeratore) / (denominatore)).toFixed(2));
            setSingoli(singoli.map((p)=>{
                if(p.chiave===item.chiave){
                    return{
                        ...p,
                        soldi : parseFloat(soldiPersona),
                    }
                }
                else if (!p.bloccato && p.soldi!==-1){
                    return{
                        ...p,
                        soldi: prezzoRestanti.toFixed(2),
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
                        soldi : parseFloat(soldiPersona),
                    }
                }
                else if (!p.bloccato ){
                    return{
                        ...p,
                        soldi: prezzoRestanti.toFixed(2),
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
   };
  
    const handleSubmit = () => {
      setEditing(false);
      if (onSubmit)
        onSubmit(soldiPersona);
      
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

    const handleCancel = () => { setEditing(false) };
  
    return (
      <>
        {editing ? 
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TextInput
              placeholder={''}
              placeholderTextColor='#9E9E9E'
              keyboardType='numeric'
              value={soldiPersona}
              onChangeText={(soldiPersona) => cambiaValore(soldiPersona)}
              onSubmitEditing={handleSubmit}
              returnKeyType='send'
              maxLength={9}
              style={{ color: 'white', paddingBottom: 0, paddingTop: 0,fontFamily: 'Montserrat-Regular',width: 77,fontSize: lun <6 ? 24 : lun <=8 ? 17 : lun <10 ? 14 : lun <11 ? 12 : 11 }}
            />
            <TouchableOpacity onPress={handleCancel}>
              <Icon name='close' size={20} color='red' />
            </TouchableOpacity>
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