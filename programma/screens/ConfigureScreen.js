import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import Configure2Block from './Configure/Configure2Block';
import Configure3Block from './Configure/Configure3Block';
import Configure1Block from './Configure/Configure1Block';
import ConfigureButton from './Configure/ConfigureButton';

const vett = [{ val: 0, press: false }, { val: 5, press: false }, { val: 10, press: false }, { val: 15, press: false }, { val: 20, press: false }];

const ConfigureScreen = ({ route }) => {
    const [conto, setConto] = useState(parseFloat(route.params.conto).toFixed(2));
    const [persone, setPersone] = useState(2);
    const [mancia, setMancia] = useState(0);
    const [totale, setTotale] = useState(parseFloat(route.params.conto).toFixed(2));
    const [quotaxPers, setQuotaxPers] = useState(parseFloat(totale/persone).toFixed(2));
    const [isSubmittedLoading, setIsSubmittedLoading] = useState(false);
    const [isSubmittedSetup, setIsSubmittedSetup] = useState(false);
    let coloreConto, colorePersone, coloreMancia, coloreTotale, coloreQuota, manciaOpaco;
    coloreConto = colorePersone = coloreMancia = coloreTotale = coloreQuota = 'white';
    if (conto > 0)
        coloreConto = '#54D169';
    else if (conto == 0)
        coloreConto = 'white';

    if (persone > 2)
        colorePersone = '#54D169';
    else if (persone == 0)
        colorePersone = 'white';

    if (mancia > 0) {
        coloreMancia = '#54D169';
        manciaOpaco = 1;
    }
    else if (mancia == 0) {
        coloreMancia = 'white';
        manciaOpaco = 0.5
    }
    if (totale > 0)
        coloreTotale = '#54D169';
    else if (totale == 0)
        coloreTotale = 'white';

    if (quotaxPers > 0)
        coloreQuota = '#54D169';
    else if (quotaxPers == 0)
        coloreQuota = 'white';

    const [vettFilter, setVettFilter] = useState(vett);
    const [signleButton, setSingleButton] = useState({ val: 0, press: true });
    const [cliccato, setCliccato] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);

    useEffect(() => {
        setTimeout(() => {
          setLoading1(false);
        },500);
      }, []);

    useEffect(() => {
        setTimeout(() => {
          setLoading2(false);
        },500);
      }, []);

    useEffect(() => {
        setTimeout(() => {
          setLoading3(false);
        },500);
      }, []);

    useEffect(() => {
        if (cliccato) {
            setVettFilter(vettFilter.map(p => {
                if (p.val == signleButton.val) {
                    return {
                        ...p,
                        press: signleButton.press,
                    }
                }
                else {
                    return {
                        ...p,
                        press: false,
                    }
                }
            }));
            setCliccato(false);
        }
    }, [cliccato]);

    return (
        <>
            <ScrollView style={{ backgroundColor: '#222222' }}  >
                <View style={{ backgroundColor: '#121212' }} >
                    <Text style={styles.didascalia} >{"Inserisci l’importo e dividi la \nquota con i tuoi amici"}</Text>
                </View>
                {loading1 ? null : <Configure1Block conto={conto} coloreConto={coloreConto} /> }
                
                {loading2 ? null : <Configure2Block conto={conto} quotaxPers={quotaxPers} mancia={mancia} totale={totale} coloreMancia={coloreMancia} coloreQuota={coloreQuota} coloreTotale={coloreTotale} manciaOpaco={manciaOpaco} /> }

                { loading3 ? null : <Configure3Block vettFilter={vettFilter} signleButton={signleButton} setTotale={setTotale} setSingleButton={setSingleButton} setCliccato={setCliccato} setQuotaxPers={setQuotaxPers} setPersone={setPersone} persone={persone} conto={conto} mancia={mancia} setMancia={setMancia} coloreTotale={coloreTotale} /> }

            </ScrollView>
            
                <ConfigureButton isSubmittedLoading={isSubmittedLoading} setIsSubmittedLoading={setIsSubmittedLoading} setIsSubmittedSetup={setIsSubmittedSetup} isSubmittedSetup={isSubmittedSetup} conto={route.params.conto} persone={persone} mancia={mancia} quotaxPers={quotaxPers} totale={totale} />
            
        </>
    );
};

const styles = StyleSheet.create({
    didascalia: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginBottom: 25,
        marginTop: 25,
        fontFamily:'Montserrat-Regular'
    }
});

export default ConfigureScreen;