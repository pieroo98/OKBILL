import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, TextInput, Keyboard, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import SetupModQuotaUnitario from './SetupModQuotaUnitario';
import SetupModNomeQuota from './SetupModNomeQuota';

const ModValoreQuota = ({ onSubmit, item, singoli, setSingoli, quoteMod, setQuoteMod, setDue, totale, persone }) => {
    const [editing, setEditing] = useState(false);
    let disabilita;
    let tmp = item.soldi;
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
        else {
            Alert.alert(
                'Attenzione',
                'non puoi modificare la quota, errore generico.',
                [
                  { text: 'OK', onPress: () => {} },
                ]
              );
        }
   };
  
    const handleSubmit = () => {
      setEditing(false);
      if (onSubmit) {
        onSubmit(soldiPersona);
      }
      Keyboard.dismiss();
    };

    useEffect(() => {
        if(!item.selezionato){
            setEditing(false);
            Keyboard.dismiss();
        }
      }, [item.selezionato]);
    

    const handleCancel = () => {
      setEditing(false);
    };
  
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
              maxLength={6}
              style={{ color: 'white', paddingBottom: 0, paddingTop: 0,fontFamily: 'Montserrat-Regular',width: 100,fontSize: tmp.toString().length <6 ? 24 : tmp.toString().length <8 ? 17 : tmp.toString().length <10 ? 14 : tmp.toString().length <11 ? 12 : 11 }}
            />
            <TouchableOpacity onPress={handleCancel}>
              <Icon name='close' size={20} color='red' />
            </TouchableOpacity>
          </View>
         :
          <TouchableOpacity disabled={!item.selezionato || item.bloccato} onPress={() => { if (!disabilita) setEditing(true); }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={{ fontSize: tmp.toString().length <6 ? 24 : tmp.toString().length <8 ? 17 : tmp.toString().length <10 ? 14 : tmp.toString().length <11 ? 12 : 11, color: 'white', alignSelf: 'center', opacity: item.bloccato ? 0.5 : 1, fontFamily:'Montserrat-Regular' }}>{soldiPersona}</Text>
                <Text style={{ fontSize: tmp.toString().length <6 ? 24 : tmp.toString().length <8 ? 17 : tmp.toString().length <10 ? 14 : tmp.toString().length <11 ? 12 : 11, color: '#54d169', alignSelf: 'center', opacity: item.bloccato ? 0.5 : 1,  fontFamily:'Montserrat-Regular' }}>{' €'}</Text>
            </View>
          </TouchableOpacity>
        }
      </>
    );
  };

const SetupGeneralQuote = ({ anima, spazio, item, flag, totale, singoli, setSingoli, quoteMod, setQuoteMod, setDue, persone }) => {
    let tmp = item.soldi;
    const textRef = useRef(null);
    useEffect(() => {
        textRef.current?.fadeInLeft(500);
      }, []);
    return (
        <>
        { anima ? <Animatable.View ref={textRef}> 
            <View style={{ width: 169, height: 61, backgroundColor: '#1D1D1D', marginRight: spazio, marginLeft: spazio, borderRadius: 50, borderWidth: 1, borderColor: item.selezionato ? '#54d169' : item.bloccato ? 'white' : '#1D1D1D' }} >
                <Text style={{ fontSize: 14, color: 'white', alignSelf: 'center', opacity: item.bloccato ? 0.5 : 1,  fontFamily:'Montserrat-Regular' }}>{item.persona}</Text>
                <View style={{ flexDirection: 'row', justifyContent: flag ? 'space-between' : 'center' }}>
                    {flag ? parseFloat(item.soldi) - 1 >= 0 ?
                        <TouchableOpacity disabled={item.selezionato && !item.bloccato ? false : true } style={{ paddingHorizontal: 10,opacity: item.bloccato ? 0.5 : 1 }} onPress={()=>{SetupModQuotaUnitario({item:item, valore:parseFloat(item.soldi)-1, singoli:singoli, setSingoli:setSingoli, quoteMod:quoteMod, setQuoteMod: setQuoteMod, setDue:setDue, totale: totale, persone: persone})}} >
                            <Icon name="minus" size={21} color={item.bloccato ?"white" : item.selezionato ? "#54d169": "white"} />
                        </TouchableOpacity> :
                        <View style={{ paddingHorizontal: 10, opacity: item.bloccato ? 0.5 : 1 }}>
                            <Icon name="minus" size={21} color={item.bloccato ?"white" : item.selezionato ? "#54d169": "white"} />
                        </View>
                        : null}
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: tmp.toString().length <6 ? 24 : tmp.toString().length <8 ? 17 : tmp.toString().length <10 ? 14 : tmp.toString().length <11 ? 12 : 11, color: 'white', alignSelf: 'center', opacity: item.bloccato ? 0.5 : 1, fontFamily:'Montserrat-Regular' }}>{item.soldi}</Text>
                        <Text style={{ fontSize: tmp.toString().length <6 ? 24 : tmp.toString().length <8 ? 17 : tmp.toString().length <10 ? 14 : tmp.toString().length <11 ? 12 : 11, color: '#54d169', alignSelf: 'center', opacity: item.bloccato ? 0.5 : 1,  fontFamily:'Montserrat-Regular' }}>{' €'}</Text>
                    </View>
                    {flag ? parseFloat(item.soldi) + 1 <= parseFloat(totale) ?
                        <TouchableOpacity disabled={item.selezionato && !item.bloccato ? false : true } style={{ paddingHorizontal: 10, opacity: item.bloccato ? 0.5 : 1 }} onPress={()=>{SetupModQuotaUnitario({item:item, valore:parseFloat(item.soldi)+1, singoli:singoli, setSingoli:setSingoli, quoteMod:quoteMod, setQuoteMod: setQuoteMod, setDue:setDue, totale: totale, persone: persone})}} >
                            <Icon name="plus" size={21} color={item.bloccato ?"white" : item.selezionato ? "#54d169": "white"} />
                        </TouchableOpacity> :
                        <View style={{ paddingHorizontal: 10, opacity: item.bloccato ? 0.5 : 1 }}>
                            <Icon name="plus" size={21} color={item.bloccato ?"white" : item.selezionato ? "#54d169": "white"} />
                        </View>
                        : null}
                </View>
            </View>
        </Animatable.View>
        :
        <View style={{ width: 169, height: 61, backgroundColor: '#1D1D1D', marginRight: spazio, marginLeft: spazio, borderRadius: 50, borderWidth: 1, borderColor: item.selezionato ? '#54d169' : item.bloccato ? 'white' : '#1D1D1D' }} >
            {item.chiave > 0 ? 
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <SetupModNomeQuota item={item} singoli={singoli} setSingoli={setSingoli} quoteMod={quoteMod} setQuoteMod={setQuoteMod} setDue={setDue} onSubmit={(nomePersona) => {}} />
            </View>
            : <Text style={{ fontSize: 14, color: 'white', alignSelf: 'center', opacity: item.bloccato ? 0.5 : 1,  fontFamily:'Montserrat-Regular' }}>{item.persona}</Text>}
            <View style={{ flexDirection: 'row', justifyContent: flag ? 'space-between' : 'center' }}>
                {flag ? parseFloat(item.soldi) - 1 >= 0 ?
                    <TouchableOpacity disabled={item.selezionato && !item.bloccato ? false : true } style={{ paddingHorizontal: 10,opacity: item.bloccato ? 0.5 : 1 }} onPress={()=>{SetupModQuotaUnitario({item:item, valore:parseFloat(item.soldi)-1, singoli:singoli, setSingoli:setSingoli, quoteMod:quoteMod, setQuoteMod: setQuoteMod, setDue:setDue, totale: totale, persone: persone})}} >
                        <Icon name="minus" size={21} color={item.bloccato ?"white" : item.selezionato ? "#54d169": "white"} />
                    </TouchableOpacity> :
                    <View style={{ paddingHorizontal: 10, opacity: item.bloccato ? 0.5 : 1 }}>
                        <Icon name="minus" size={21} color={item.bloccato ?"white" : item.selezionato ? "#54d169": "white"} />
                    </View>
                    : null}
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <ModValoreQuota item={item} singoli={singoli} setSingoli={setSingoli} quoteMod={quoteMod} setQuoteMod={setQuoteMod} setDue={setDue} totale={totale} persone={persone} onSubmit={(soldiPersona) => {}}/>
                </View>
                {flag ? parseFloat(item.soldi) + 1 <= parseFloat(totale) ?
                    <TouchableOpacity disabled={item.selezionato && !item.bloccato ? false : true } style={{ paddingHorizontal: 10, opacity: item.bloccato ? 0.5 : 1 }} onPress={()=>{SetupModQuotaUnitario({item:item, valore:parseFloat(item.soldi)+1, singoli:singoli, setSingoli:setSingoli, quoteMod:quoteMod, setQuoteMod: setQuoteMod, setDue:setDue, totale: totale, persone: persone})}} >
                        <Icon name="plus" size={21} color={item.bloccato ?"white" : item.selezionato ? "#54d169": "white"} />
                    </TouchableOpacity> :
                    <View style={{ paddingHorizontal: 10, opacity: item.bloccato ? 0.5 : 1 }}>
                        <Icon name="plus" size={21} color={item.bloccato ?"white" : item.selezionato ? "#54d169": "white"} />
                    </View>
                    : null}
            </View>
        </View>
        }
        </>
    );
}


export default SetupGeneralQuote;