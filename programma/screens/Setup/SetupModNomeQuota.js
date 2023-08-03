import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SetupModNomeQuota = ({ onSubmit, item, singoli, setSingoli, quoteMod, setQuoteMod, setDue }) => {
    const [editing, setEditing] = useState(false);
    let disabilita;
    if (item.bloccato) disabilita = true;
    else disabilita = false;
    let nomePersona = item.persona;

    useEffect(() => {
        if(!item.selezionato){
            setEditing(false);
            Keyboard.dismiss();
        }
      }, [item.selezionato]);

    const cambiaNome = (nomePersona) => {
      setSingoli(
        singoli.map((p) => {
          if (p.chiave === item.chiave) {
            return { ...p, persona: nomePersona };
          } else {
            return { ...p };
          }
        })
      );
      setQuoteMod(
        quoteMod.map((p) => {
          if (p.chiave === item.chiave && !p.bloccato) {
            return { ...p, persona: nomePersona };
          } else {
            return { ...p };
          }
        })
      );
      setDue(true);
    };
  
    const handleSubmit = () => {
      setEditing(false);
      if (onSubmit) {
        onSubmit(nomePersona);
      }
      Keyboard.dismiss();
    };
  
    const handleCancel = () => {
      setEditing(false);
    };
  
    return (
      <>
        {editing ? 
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TextInput
              placeholder={''}
              placeholderTextColor='#9E9E9E'
              keyboardType='default'
              value={nomePersona}
              onChangeText={(nomePersona) => cambiaNome(nomePersona)}
              onSubmitEditing={handleSubmit}
              returnKeyType='send'
              maxLength={13}
              style={{ color: 'white', paddingBottom: 0, paddingTop: 0,fontFamily: 'Montserrat-Regular',width: 100 }}
            />
            <TouchableOpacity onPress={handleCancel}>
              <Icon name='close' size={20} color='red' />
            </TouchableOpacity>
          </View>
         :
          <TouchableOpacity disabled={!item.selezionato || item.bloccato} onPress={() => { if (!disabilita) setEditing(true); }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={{ fontSize: 14, color: 'white', alignSelf: 'center', opacity: disabilita ? 0.5 : 1, fontFamily: 'Montserrat-Regular' }}>
                {nomePersona + "  " }
                </Text>
                <View style={{ opacity: item.bloccato ? 0.5 : 1 }}>
                    <Icon name='pencil' size={20} color={item.bloccato ? 'white' : item.selezionato ? '#54d169' : 'white'} />
                </View>
            </View>
          </TouchableOpacity>
        }
      </>
    );
  };

export default SetupModNomeQuota;