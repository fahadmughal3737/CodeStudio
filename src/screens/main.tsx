import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native'
import { colors } from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../utils/icons';
import Geolocation from '@react-native-community/geolocation';
import { GetLocation } from '../api/geoLocation';
import { GetCurrentLocation } from '../api/currentLocation';
import { GetSearchedLocation } from '../api/searchLocation';
import { useSelector, useDispatch } from 'react-redux'
import { addWeatherStatus } from '../store/configure/counterSlice';

const Main = () => {
    const [value, setValue] = useState('')
    const [load, setLoad] = useState(true)
    const weatherStatus = useSelector((state:any) => state.weatherStatus.data)
    const dispatch = useDispatch()
    useEffect(() => {
        Geolocation.getCurrentPosition((info: any) => {
            let _lat = info.coords.latitude
            let _long = info.coords.longitude
            GetLocation(_lat, _long)
                .then((response: any) => response.json())
                .then((result: any) => {
                    setValue((result.plus_code.compound_code).split(' ')[1] + (result.plus_code.compound_code).split(' ')[2])
                })
                .catch((error: any) => console.log('error', error));
            GetCurrentLocation(_lat, _long)
                .then((response: any) => response.json())
                .then((result: any) => {
                    let _temp = {
                        main: result.main,
                        wind: result.wind,
                        weather: result.weather,
                    }
                    dispatch(addWeatherStatus(_temp))
                    // setWeatherStatus(_temp)
                    
                    setLoad(false)
                })
                .catch((error: any) => console.log('error', error));
        });

    }, [])
    const GetData = () => {
        GetSearchedLocation(value)
            .then((response: any) => response.json())
            .then((result: any) => {
                if (result.cod===400|| result.cod===404) {
                    Alert.alert('Validation', result.message)
                }
                else {
                    let _temp = {
                        main: result.main,
                        wind: result.wind,
                        weather: result.weather,
                    }
                    dispatch(addWeatherStatus(_temp))

                }
            })
            .catch((error: any) => Alert.alert('Error', error.message));
    }
    return (

        <View style={styles.container}>

            <LinearGradient colors={[colors.WHITE, colors.GREYISHWHITE, colors.LIGHTGREY]} style={styles.linearGradient}>
                {load ?
                    <View style={{ flex: 1, justifyContent: 'center', }}>
                        <ActivityIndicator size={'large'} color={colors.DARKBLUE} />
                    </View>
                    :
                    <>
                        <View style={styles.search}>
                            <Icon type='ionicon' name='md-location-sharp' size={25} color={colors.DARKBLUE} />
                            <TextInput onChangeText={(text: string) => setValue(text)} value={value} style={styles.input} />
                            <TouchableOpacity onPress={() => GetData()} style={styles.btnIcon}>
                                <Icon type='feather' name='search' size={22} color={colors.DARKBLUE} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.body}>
                            <Image style={styles.weatherIcon} source={{ uri: "http://openweathermap.org/img/wn/" + weatherStatus?.weather[0]?.icon + "@4x.png" }} />
                            <View style={{}}>
                                <View style={{ justifyContent: 'center', marginLeft: '7%', flexDirection: 'row' }}>
                                    <Text style={styles.temperatureText}>{(weatherStatus?.main?.temp - 273.15).toFixed(0)}</Text>
                                    <Text style={styles.temperatureIcon}>o</Text>
                                    <Text style={styles.c}>C</Text>
                                </View>
                                <Text style={styles.descriptionText} >{weatherStatus?.weather[0].main}</Text>
                            </View>
                        </View>
                        <View style={styles.footer}>
                            <View style={styles.footerDetail}>
                                <Icon type='fa5' name='wind' size={22} color={colors.DARKBLUE} />
                                <View style={styles.smallGap}>
                                    <Text style={styles.smallText}>{weatherStatus?.main?.humidity + '%'}</Text>
                                    <Text style={styles.smallText}>Humidity</Text>
                                </View>
                            </View>
                            <View style={styles.footerDetail}>
                                <Icon type='fa5' name='wind' size={22} color={colors.DARKBLUE} />
                                <View style={styles.smallGap}>
                                    <Text style={styles.smallText}>{weatherStatus?.wind?.speed + ' Km/h'}</Text>
                                    <Text style={styles.smallText}>Wind Speed</Text>
                                </View>
                            </View>
                        </View>
                    </>
                }

            </LinearGradient>
        </View>
    )
}
export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%',
        backgroundColor: colors.DARKBLUE,
        justifyContent: 'center',
    },
    temperatureText: { fontSize: 60, fontWeight: '500', color: colors.DARKBLUE, textAlign: 'center' },
    temperatureIcon: { color: colors.DARKBLUE, fontSize: 18 },
    c: { color: colors.DARKBLUE, fontSize: 22, marginLeft: '0.5%', },
    descriptionText: { fontSize: 25, fontWeight: '500', color: colors.DARKBLUE, textAlign: 'center' },
    body: {
        flex: 0.8,
    },
    weatherIcon: {
        marginTop: '5%',
        flex: 0.5,

    },
    footer: { flex: 0.1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '5%', alignItems: 'center', },
    smallText: {
        color: colors.DARKBLUE,
        fontSize: 16,
        fontWeight: '400'
    },
    smallGap: { marginLeft: 10, },
    footerDetail: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    linearGradient: {
        flex: 0.85,
        borderRadius: 15,
        padding: '5%'
    },
    search: {
        flex: 0.1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        marginHorizontal: '2.5%',
        flex: 0.9,
        color: colors.DARKBLUE,
        fontSize: 18
    },
    btnIcon: {
        flex: 0.15,
        backgroundColor: colors.LIGHTBLUE,
        height: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60
    }
})
