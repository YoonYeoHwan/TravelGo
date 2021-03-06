import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import MapView from 'react-native-maps';
import geolib from 'geolib';
import StopOnImg from '../images/travelstop(on).png';
import StopOffImg from '../images/travelstop(off).png';
import Geocoder from 'react-native-geocoding';


let title="TITLE"

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 1,
                longitudeDelta: 1,
            },
            stops: [],
            findgps : true,
            camera: {
              center:{
                latitude: 38.611026,
                longitude: 126.996917,
              },
              heading:90,
              pitch:45,
              zoom:10,
              altitude:1000,

            },
        };


    }

    import_json_url(latitude, longitude) {
        return fetch('http://35.231.168.105/travelstop/' + this.state.camera.center.latitude + '/' + this.state.camera.center.longitude)
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    stops: responseJson,
                });
                this.props.setStops(responseJson)
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {

        setInterval(() => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setGeocoding(position.coords.latitude, position.coords.longitude);
                    this.setState({
                        camera: {
                            center:{
                              latitude: position.coords.latitude,
                              longitude: position.coords.longitude,
                            },
                            heading:0,
                            pitch:30,
                            zoom:17,
                            altitude:1000,
                        },
                    });
                    this.setState({findgps: true});
                },
                (error) => {console.log(JSON.stringify(error));
                 this.setState({findgps: false});
               },
                { enableHighAccuracy: true, timeout: 1500}
            )
            this.import_json_url()
        }, 2000);

        setInterval(() => {
            this.setGeocoding()
        }, 60000);
    }

    setGeocoding(latitude=0, longitude=0) {
        if(latitude === 0 && longitude === 0) {
            latitude = this.state.camera.center.latitude;
            longitude = this.state.camera.center.latitude;
        }
        fetch("https://maps.google.com/maps/api/geocode/json?language=ko&latlng=" + this.state.camera.center.latitude + "," + this.state.camera.center.longitude + "&key=AIzaSyC-wh2GZ92W7jsNjtHD1JUDoMl1nNLRJgo")
        .then(res => res.json())
        .then(json => {
            const addressComponent = json.results[0].formatted_address.split(' ');
            this.setState({
              userloc : addressComponent[1] + ' ' +  addressComponent[2] + ' ' + addressComponent[3]
            })
              this.props.changeCurrentLocation(this.state.userloc);
        });
    }

    render() {
        return (
            <View style={styles.view}>
              {this.state.findgps ?
                (<MapView style={styles.mapview}
                    showsUserLocation = {true}
                    initialCamera={{
                      center:{
                        latitude: 38.611026,
                        longitude: 126.996917,
                      },
                      heading:90,
                      pitch:45,
                      zoom:10,
                      altitude:1000,
                    }}
                    camera={this.state.camera}
                    loadingEnabled={true}
                    rotateEnabled={false}
                    scrollEnabled={false}
                    pitchEnabled={false}
                    zoomEnabled={false}

                >
{
                // <MapView.Marker coordinate={this.state.user}>
                //     <Image source={require('../images/point.png')} style={{ width: 25, height: 25 }}/>
                // </MapView.Marker>
}



                    {
                        this.state.stops.map((contact, i) =>
                            geolib.getDistance(contact.location, this.state.camera.center) <= 50 ? (
                                <MapView.Marker coordinate={contact.location} key={i}
                                    onPress={e => {
                                        this.props.travelStop(contact._id)
                                    }
                                }>
                                    <Image source={StopOnImg} style={{ width: 40, height: 40 }}/>
                                </MapView.Marker>
                            ) : (
                                <MapView.Marker coordinate={contact.location} key={i}>
                                    <Image source={StopOffImg} style={{ width: 40, height: 40 }}/>
                                </MapView.Marker>
                            )
                        )
                    }

                </MapView>) :
                (<View style={{flex:1, justifyContent:'space-between', alignItems:'center'}}>
                  <Text>    </Text>
                  <Text style={{fontSize:30}}>GPS가 잘 동작하지 않습니다</Text>
                  <Text>    </Text>
                </View>)
              }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1
    },
    mapview: {
        flex: 1,
    },
    tile: {
        height: 30,
        justifyContent: 'center',
        marginHorizontal: 15,
        fontSize: 40,
        borderBottomColor: '#000',
        borderBottomWidth: 1
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
});
