import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
  } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Vehicle = ({navigation}) => {
    const [loading,setLoading] = useState(true)
    const [data,setData] = useState([])
    
    
    useEffect(()=>{
    
    const getData = async () => {
        try {
            setLoading(true)
        const value = await AsyncStorage.getItem('token')
        if(value !== null) {
            const fetchVehicle =async()=>{
            const resp = await fetch("https://staging-api.tracknerd.io/v1/vehicle-groups/vehicles", {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + value
              },
                })
                const user = await resp.json()
                setData(user.data)
            }
            fetchVehicle()
            setLoading(false)
            
        }
        } catch(e) {
            setLoading(false)
            navigation.navigate('Login')
        }
    }
    getData()        
    },[])

  return (
    <View style={styles.mainContainer}>
        {!loading&& <View>
        {data?.map((item) => {
        return (
          <View style={styles.itemContainer}>
            <Text key={item.key} style={styles.itemText}>{item.name}</Text>
            <View>
                {item?.vehicles.map((vehicle) =>{
                    return(
                        <View style={styles.vehicleContainer}>
                            <Text key={vehicle.key}>{`Type: ${vehicle.type}`}</Text>
                            <Text key={vehicle.key}>{`Reg NO: ${vehicle.registrationNumber}`}</Text>
                        </View>
                    )
                })}
            </View>
          </View>
        );
      })}
    </View>}    
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer:{
        display: 'flex',
        flexDirection: 'column',        
    },
    itemContainer:{
        display: 'flex',
        direction: 'column',
        backgroundColor:'white',
        marginBottom:20,
        padding: 10,
    },
    itemText:{
        color:"#0b1f9e",
    },
    vehicleContainer:{
        padding:10,
        display: 'flex',
        direction: 'column',

    }
})
