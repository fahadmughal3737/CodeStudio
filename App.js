import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { GetData } from './api/getData';
import Card from './components/card';

export default function App() {
  const [data, setData] = useState({})
  const [load, setLoad] = useState(true)
  const [value, setValue] = useState('')
  useEffect(() => {
    GetData()
      .then(response => response.json())
      .then(result => {
        console.log('api call', result)
        setData(result)
        setLoad(false)
      })
      .catch(error => console.log('error', error));


  }, [])
  return (
    <View style={{ padding: '5%', flex: 1 }}>
      {load ?
        <View style={styles.main}>
          <ActivityIndicator />
        </View> :
        <View style={styles.main}>
          <View style={{ }}>
            <TextInput style={{ width: '85%', backgroundColor: 'lightgrey' }} value={value} onChangeText={(text) => setValue(text)} />
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => {
              for (let i = 0; i < data?.results.length; i++) {
                if (data?.results[i].name?.first.includes(value) || data?.results[i].name?.last.includes(value)) {
                  setSearched(data?.results[i])
                }
              }
            }}  >
              <Text>
                Search
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList data={data?.results}
            renderItem={(item) => <Card gender={item.gender} />}
          />
        </View>
      }
    </View>
  );
}



const styles = StyleSheet.create({
  main:
    { flex: 1, justifyContent: 'center', alignItems: 'center', }
  ,
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
