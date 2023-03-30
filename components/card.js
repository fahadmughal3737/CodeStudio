import React from "react";
import { View, Text, Image } from 'react-native'

const Card = (props) => {
    return (
        <View style={{ padding: '2.5%', width: '100%', backgroundColor:'red', flexDirection: 'row' }}>
            <View style={{ flex: 0.25 }}>
                <Image style={{}} source={{uri:props.image}} />
            </View>
            <View style={{ flex: 0.75 }}>
                <View>
                    <Text>Gender</Text>
                    <Text>{props.gender}</Text>

                </View>
                <View>
                    <Text>Name</Text>
                    <Text>{props.name}</Text>

                </View>
                <View>
                    <Text>Location</Text>
                    <Text>{props.location}</Text>

                </View>
                <View>
                    <Text>Email</Text>
                    <Text>{props.email}</Text>

                </View>
            </View>

        </View>
    )
}
export default Card