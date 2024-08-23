import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment';
import { Button } from 'react-native-paper';
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';

const UserTripList = ({ userTrips }) => {
    const userSelection = JSON.parse(userTrips[0]?.userSelection);
    const router = useRouter()
    return (
        <ScrollView>
            <View style={{ margin: 12, marginTop: 20 }}>
                <Image style={{ width: "100%", height: 240, borderRadius: 15 }} source={{uri:`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${userSelection?.locationInfo?.photo}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}`}} />
                <View>
                    <Text
                        style={{
                            fontSize: 24,
                            marginLeft: 12,
                            marginTop: 12,
                            fontFamily: "roundedBold",
                            color: "black",
                        }}
                    >{userSelection?.locationInfo?.name}</Text>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Text
                            style={{
                                fontSize: 17,
                                marginLeft: 12,
                                fontFamily: "roundedBold",
                                color: "black",
                            }}
                        >{moment(userSelection?.startDate).format('DD MMM yyyy')}</Text>
                        <Text
                            style={{
                                fontSize: 17,
                                marginLeft: 12,
                                fontFamily: "roundedBold",
                                color: "black",
                            }}
                        >{userSelection?.travelerCount}</Text>
                    </View>
                </View>
                <Button
                    mode="elevated"
                    textColor="#000000"
                    maxFontSizeMultiplier={30}
                    style={{ backgroundColor: "#bb4d00", marginTop: 5, padding: 5 }}
                    onPress={() => router.push({pathname:'details/Index',params:{trip:JSON.stringify(userTrips[0])}})}
                >
                    See Your Plan
                </Button>
            </View>
            {userTrips.map((trip, index) => (
                <View key={index}>
                    <TouchableOpacity onPress={() => router.push({pathname:'details/Index',params:{trip:JSON.stringify(trip)}})}>

                    <UserTripCard tripInfo={trip} key={index} />
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
}

export default UserTripList;
