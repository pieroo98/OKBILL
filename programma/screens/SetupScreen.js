import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import ParametriGenerali from './Setup/ParametriGenerali';
import SetupButton from './Setup/SetupButton';
import SetupQuoteButton from './Setup/SetupQuoteButton';
import SetupGeneralQuote from './Setup/SetupGeneralQuote';
import SetupAggiungiQuote from './Setup/SetupAggiungiQuote';

const QuotaVuota = ({spazio}) => {
    return (
        <View style={[styles.item, { backgroundColor: '#121212', paddingBottom: 20 }]}>
            <View style={{ width: 169, height: 61, backgroundColor: '#121212', marginTop: 10, borderRadius: 50, marginRight: spazio, marginLeft: spazio, marginBottom: 18 }}>
            </View>
        </View>
    )
}

const NoQuoteButton = () => {
    return (
        <View style={{ backgroundColor: '#121212', paddingBottom:81 }} />
    )
}

const SetupScreen = ({ route }) => {
    const [singoli, setSingoli] = useState([]);
    const [finalState, setFinalState] = useState([]);
    const [quoteMod, setQuoteMod] = useState([]);
    const [cliccato, setCliccato] = useState({persona: '1 quota', chiave: -1, soldi: 0, bloccato: false, selezionato: true });
    const [addQuota, setAddQuota] = useState(true);
    const [due, setDue] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const { width } = Dimensions.get('window');
    const scrollViewRef = useRef();
    const [spazio, setSpazio] = useState(((width - (169 * 2)) / 4));
    const [loading1, setLoading1] = useState(true);
    
    useEffect(() => {
            setTimeout(() => { setLoading1(false); },500);
      }, []);

    let items = [];
    let nomi = ' quote';
    let nome = ' quota';
    let cognome = 0;
    let final = [];
    let duepervolta = [];

    useEffect(() => {
        if (addQuota) {
            let aggiunte = quoteMod.length;
            cognome = route.params.persone - aggiunte;
            let tmp = { persona: cognome > 1 ? String(cognome).concat(nomi) : String(cognome).concat(nome), soldi: singoli.length>0 ? parseFloat(singoli[0].soldi).toFixed(2) : parseFloat(route.params.quotaxPers).toFixed(2), bloccato: singoli.length>0 ? singoli[0].bloccato : false, chiave: 0, selezionato: false }
            items.push(tmp);
            if (aggiunte > 0) {
                for (const c1 of quoteMod) {
                    items.push(c1);
                }
            }
            let bottoneAdd = { persona: 'modifica una quota', soldi: -1, bloccato: false, chiave: parseInt(aggiunte) + 1, selezionato: false };
            if (cognome > 1)
                items.push(bottoneAdd);
            setSingoli(items);
            setAddQuota(false);
            setDue(true);
        }
    }, [addQuota])

    useEffect(() => {
        if (due) {
            if (singoli.length % 4 == 0) {
                for (let i = 0; i < singoli.length; i = i + 4) {
                    duepervolta.push(singoli[i]);
                    duepervolta.push(singoli[i + 1]);
                    duepervolta.push(singoli[i + 2]);
                    duepervolta.push(singoli[i + 3]);
                    final.push(duepervolta);
                    duepervolta = [];
                }
                setFinalState(final);
            }
            else if (singoli.length % 4 == 1) {
                let i = 0;
                for (i = 0; i < singoli.length - 4; i = i + 4) {
                    duepervolta.push(singoli[i]);
                    duepervolta.push(singoli[i + 1]);
                    duepervolta.push(singoli[i + 2]);
                    duepervolta.push(singoli[i + 3]);
                    final.push(duepervolta);
                    duepervolta = [];
                }
                duepervolta = singoli[i];
                final.push(duepervolta);
                setFinalState(final);
            }
            else if (singoli.length % 4 == 2) {
                let i = 0;
                for (i = 0; i < singoli.length - 2; i = i + 4) {
                    duepervolta.push(singoli[i]);
                    duepervolta.push(singoli[i + 1]);
                    duepervolta.push(singoli[i + 2]);
                    duepervolta.push(singoli[i + 3]);
                    final.push(duepervolta);
                    duepervolta = [];
                }
                duepervolta.push(singoli[i]);
                duepervolta.push(singoli[i + 1]);
                final.push(duepervolta);
                setFinalState(final);
            }
            else if (singoli.length % 4 == 3) {
                let i = 0;
                for (i = 0; i < singoli.length - 3; i = i + 4) {
                    duepervolta.push(singoli[i]);
                    duepervolta.push(singoli[i + 1]);
                    duepervolta.push(singoli[i + 2]);
                    duepervolta.push(singoli[i + 3]);
                    final.push(duepervolta);
                    duepervolta = [];
                }
                duepervolta.push(singoli[i]);
                duepervolta.push(singoli[i + 1]);
                duepervolta.push(singoli[i + 2]);
                final.push(duepervolta);
                setFinalState(final);
            }
            setDue(false);
        }
    }, [due])

    const quotaPress = (item) => {
        setSingoli(singoli.map((p) => {
            if (p.chiave === item.chiave) {
                return {
                    ...p,
                    selezionato: true,
                }
            }
            else {
                return {
                    ...p,
                    selezionato: false,
                }
            }
        }));
        setQuoteMod(quoteMod.map((p) => {
            if (p.chiave === item.chiave) {
                return {
                    ...p,
                    selezionato: true,
                }
            }
            else {
                return {
                    ...p,
                    selezionato: false,
                }
            }
        }));
        setDue(true);
        setCliccato(item);
    }

    const handleScroll = (event) => {
        const { contentOffset } = event.nativeEvent;
        const currentIndex = Math.round(contentOffset.x / width);
        setActiveIndex(currentIndex);
    };

    const handleDotPress = (index) => {
        setActiveIndex(index);
        scrollViewRef.current.scrollTo({
            x: index * width,
            animated: true,
        });
    };
    
    return (
        <>
            <ScrollView style={{ backgroundColor: '#222222' }}>
                <View style={{ backgroundColor: '#121212', paddingTop: 15 }}>
                    <ScrollView ref={scrollViewRef}
                        onScroll={handleScroll}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollViewContent}
                    >
                        {finalState.map((item) => {
                            if (finalState.length === 1 && item.length === 2 && item[1].soldi === -1) {
                                return (
                                    <View key={item[0].chiave}>
                                        <View style={{ backgroundColor: '#121212', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 29 }}>
                                        { loading1 ? null :<SetupGeneralQuote anima={true} spazio={spazio} item={item[0]} flag={false} totale={route.params.totale} singoli={singoli} setSingoli={setSingoli} quoteMod={quoteMod} setQuoteMod={setQuoteMod} setDue={setDue} persone={route.params.persone} />}
                                        {loading1 ? null : <SetupAggiungiQuote anima={true} spazio={spazio} item={item[1]} quoteMod={quoteMod} setQuoteMod={setQuoteMod} setAddQuota={setAddQuota} setCliccato={setCliccato} singoli={singoli} setSingoli={setSingoli} totale={route.params.totale} persone={route.params.persone}/>}
                                        </View>
                                        <View style={{ backgroundColor: '#121212', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <QuotaVuota spazio={spazio}/>
                                            <QuotaVuota spazio={spazio}/>
                                        </View>
                                    </View>
                                )
                            }
                            else {
                                if (item.length === 1 || item.length === undefined) {
                                    return (
                                        <View key={item.chiave} style={{ backgroundColor: '#121212', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 29 }}>
                                            {item.soldi === -1 ?
                                                <SetupAggiungiQuote anima={false} spazio={spazio} item={item} quoteMod={quoteMod} setQuoteMod={setQuoteMod} setAddQuota={setAddQuota} setCliccato={setCliccato} singoli={singoli} setSingoli={setSingoli} totale={route.params.totale} persone={route.params.persone}/> :
                                                item.chiave === 0 ? <SetupGeneralQuote anima={false} spazio={spazio} item={item} flag={true} totale={route.params.totale} singoli={singoli} setSingoli={setSingoli} quoteMod={quoteMod} setQuoteMod={setQuoteMod} setDue={setDue} persone={route.params.persone} /> :
                                                    <TouchableOpacity disabled={item.selezionato ? true : false} onPress={() => quotaPress(item)} >
                                                        <SetupGeneralQuote anima={false} spazio={spazio} item={item} flag={true} totale={route.params.totale} singoli={singoli} setSingoli={setSingoli} quoteMod={quoteMod} setQuoteMod={setQuoteMod} setDue={setDue} persone={route.params.persone}/>
                                                    </TouchableOpacity>}
                                            <QuotaVuota spazio={spazio}/>
                                        </View>
                                    )
                                }
                                else if (item.length === 2) {
                                    return (
                                        <View key={item[0].chiave}>
                                            <View style={{ backgroundColor: '#121212', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 29 }}>
                                                <TouchableOpacity disabled={item[0].selezionato ? true : false} onPress={() => quotaPress(item[0])} >
                                                    <SetupGeneralQuote anima={false} spazio={spazio} item={item[0]} flag={true} totale={route.params.totale} singoli={singoli} setSingoli={setSingoli} quoteMod={quoteMod} setQuoteMod={setQuoteMod} setDue={setDue} persone={route.params.persone}/>
                                                </TouchableOpacity>
                                                {item[1].soldi === -1 ?
                                                    <SetupAggiungiQuote anima={false} spazio={spazio} item={item[1]} quoteMod={quoteMod} setQuoteMod={setQuoteMod} setAddQuota={setAddQuota} setCliccato={setCliccato} singoli={singoli} setSingoli={setSingoli} totale={route.params.totale} persone={route.params.persone}/> :
                                                    <TouchableOpacity disabled={item[1].selezionato ? true : false} onPress={() => quotaPress(item[1])} >
                                                        <SetupGeneralQuote anima={false} spazio={spazio} item={item[1]} flag={true} totale={route.params.totale} singoli={singoli} setSingoli={setSingoli} quoteMod={quoteMod} setQuoteMod={setQuoteMod} setDue={setDue} persone={route.params.persone}/>
                                                    </TouchableOpacity>}
                                            </View>
                                            {finalState.length<2 ? <View style={{ backgroundColor: '#121212', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 29 }}>
                                                <QuotaVuota spazio={spazio}/>
                                                <QuotaVuota spazio={spazio}/>
                                            </View> : null}
                                        </View>
                                    )
                                }
                                else if (item.length === 3) {
                                    return (
                                        <View key={item[0].chiave}>
                                            <View style={{ backgroundColor: '#121212', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 29 }}>
                                                <TouchableOpacity disabled={item[0].selezionato ? true : false} onPress={() => quotaPress(item[0])} >
                                                    <SetupGeneralQuote anima={false} spazio={spazio} item={item[0]} flag={true} totale={route.params.totale} singoli={singoli} setSingoli={setSingoli} quoteMod={quoteMod} setQuoteMod={setQuoteMod} setDue={setDue} persone={route.params.persone} />
                                                </TouchableOpacity>
                                                <TouchableOpacity disabled={item[1].selezionato ? true : false} onPress={() => quotaPress(item[1])} >
                                                    <SetupGeneralQuote anima={false} spazio={spazio} item={item[1]} flag={true} totale={route.params.totale} singoli={singoli} setSingoli={setSingoli} quoteMod={quoteMod} setQuoteMod={setQuoteMod} setDue={setDue} persone={route.params.persone} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ backgroundColor: '#121212', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 29 }}>
                                                {item[2].soldi === -1 ?
                                                    <SetupAggiungiQuote anima={false} spazio={spazio} item={item[2]} quoteMod={quoteMod} setQuoteMod={setQuoteMod} setAddQuota={setAddQuota} setCliccato={setCliccato} singoli={singoli} setSingoli={setSingoli} totale={route.params.totale} persone={route.params.persone}/> :
                                                    <TouchableOpacity disabled={item[2].selezionato ? true : false} onPress={() => quotaPress(item[2])} >
                                                        <SetupGeneralQuote anima={false} spazio={spazio} item={item[2]} flag={true} totale={route.params.totale} singoli={singoli} setSingoli={setSingoli} quoteMod={quoteMod} setQuoteMod={setQuoteMod} setDue={setDue} persone={route.params.persone} />
                                                    </TouchableOpacity>}
                                                <QuotaVuota spazio={spazio}/>
                                            </View>
                                        </View>
                                    )
                                }
                                else if (item.length === 4) {
                                    return (
                                        <View key={item[0].chiave} style={{ marginBottom: item[3].soldi === -1 ? 0 : 27 }}>
                                            <View style={{ backgroundColor: '#121212', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 29 }}>
                                                <TouchableOpacity disabled={item[0].selezionato ? true : false} onPress={() => quotaPress(item[0])} >
                                                    <SetupGeneralQuote anima={false} spazio={spazio} item={item[0]} flag={true} totale={route.params.totale} singoli={singoli} setSingoli={setSingoli} quoteMod={quoteMod} setQuoteMod={setQuoteMod} setDue={setDue} persone={route.params.persone}/>
                                                </TouchableOpacity>
                                                <TouchableOpacity disabled={item[1].selezionato ? true : false} onPress={() => quotaPress(item[1])} >
                                                    <SetupGeneralQuote anima={false} spazio={spazio} item={item[1]} flag={true} totale={route.params.totale} singoli={singoli} setSingoli={setSingoli} quoteMod={quoteMod} setQuoteMod={setQuoteMod} setDue={setDue} persone={route.params.persone}/>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ backgroundColor: '#121212', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 29 }}>
                                                <TouchableOpacity disabled={item[2].selezionato ? true : false} onPress={() => quotaPress(item[2])} >
                                                    <SetupGeneralQuote anima={false} spazio={spazio} item={item[2]} flag={true} totale={route.params.totale} singoli={singoli} setSingoli={setSingoli} quoteMod={quoteMod} setQuoteMod={setQuoteMod} setDue={setDue} persone={route.params.persone}/>
                                                </TouchableOpacity>
                                                {item[3].soldi === -1 ?
                                                    <SetupAggiungiQuote anima={false} spazio={spazio} item={item[3]} quoteMod={quoteMod} setQuoteMod={setQuoteMod} setAddQuota={setAddQuota} setCliccato={setCliccato} singoli={singoli} setSingoli={setSingoli} totale={route.params.totale} persone={route.params.persone}/> :
                                                    <TouchableOpacity disabled={item[3].selezionato ? true : false} onPress={() => quotaPress(item[3])} >
                                                        <SetupGeneralQuote anima={false} spazio={spazio} item={item[3]} flag={true} totale={route.params.totale} singoli={singoli} setSingoli={setSingoli} quoteMod={quoteMod} setQuoteMod={setQuoteMod} setDue={setDue} persone={route.params.persone}/>
                                                    </TouchableOpacity>}
                                            </View>
                                        </View>
                                    )
                                }
                            }
                        })}
                    </ScrollView>
                    <View style={[styles.pagination, { marginTop: 30 }]}>
                        {finalState.map((_, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.dot,
                                    activeIndex === index && styles.activeDot,
                                ]}
                                onPress={() => handleDotPress(index)}
                            />
                        ))}
                    </View>
                </View>
                
                { finalState[0] !== undefined ? finalState[0][1].soldi===-1 ? <NoQuoteButton/> : <SetupQuoteButton setSingoli={setSingoli} singoli={singoli} setCliccato={setCliccato} cliccato={cliccato} setQuoteMod={setQuoteMod} quoteMod={quoteMod} totale={route.params.totale} persone={route.params.persone} setAddQuota={setAddQuota} setDue={setDue} finalState={finalState} /> : <NoQuoteButton/> }

                { loading1 ? null : <ParametriGenerali conto={parseFloat(route.params.conto).toFixed(2)} persone={route.params.persone} mancia={route.params.mancia} totale={route.params.totale} /> }

            </ScrollView>
            
            <SetupButton conto={parseFloat(route.params.conto).toFixed(2)} persone={route.params.persone} mancia={route.params.mancia} quotaxPers={route.params.quotaxPers} totale={route.params.totale} singoli={singoli} />
        </>
    );
};

const styles = StyleSheet.create({
    pagination: {
        position: 'absolute',
        bottom: 14,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 6,
        backgroundColor: 'white',
        marginHorizontal: 6,
    },
    activeDot: {
        backgroundColor: '#54d169',
    },
    scrollViewContent: {
        flexDirection: 'row',
        marginTop: 30,
    },
    item: {
        width: 169,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        margin: 20,
    }
});

export default SetupScreen;