import React, { useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import SetupModQuotaUnitario from './SetupModQuotaUnitario';
import SetupModNomeQuota from './SetupModNomeQuota';
import SetupModValoreQuota from './SetupModValoreQuota';

const SetupGeneralQuote = ({ anima, spazio, item, flag, totale, singoli, setSingoli, quoteMod, setQuoteMod, setDue, persone }) => {
    let tmp = item.soldi;
    let lun = Math.round(tmp).toString().length +3;
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
                        <Text style={{ fontSize: lun <6 ? 24 : lun <=8 ? 17 : lun <10 ? 14 : lun <11 ? 12 : 11, color: 'white', alignSelf: 'center', opacity: item.bloccato ? 0.5 : 1, fontFamily:'Montserrat-Regular' }}>{item.soldi}</Text>
                        <Text style={{ fontSize: lun <6 ? 24 : lun <=8 ? 17 : lun <10 ? 14 : lun <11 ? 12 : 11, color: '#54d169', alignSelf: 'center', opacity: item.bloccato ? 0.5 : 1,  fontFamily:'Montserrat-Regular' }}>{' €'}</Text>
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
                    <SetupModValoreQuota item={item} singoli={singoli} setSingoli={setSingoli} quoteMod={quoteMod} setQuoteMod={setQuoteMod} setDue={setDue} totale={totale} persone={persone} onSubmit={(soldiPersona) => {}}/>
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