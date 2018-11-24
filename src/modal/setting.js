import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Switch, TouchableOpacity, Image, Dimensions, ScrollView, ImageBackground } from 'react-native';

export default class App extends Component {

    constructor(props) {
        super(props);
        const { width, height } = Dimensions.get("window")
        this.state = {
            window: {
                width: width,
                height: height
            },
            userInfo: {
            }

        }
    }

    render() {
        var visited = [];
        for (i = 1; i < 5; i++) {
            visited.push(
                <View style={{ width: this.state.window.width / 2, height: 100 }}>
                    <Image source={require('../../images/tropical.jpg')} style={{ width: null, height: 100, borderWidth: 1.5, borderColor: 'white' }} />
                </View>
            )
            visited.push(
                <View style={{ width: this.state.window.width / 2, height: 100 }}>
                    <Image source={require('../../images/forest.jpg')} style={{ width: null, height: 100, borderWidth: 1.5, borderColor: 'white' }} />
                </View>
            )
            visited.push(
                <View style={{ width: this.state.window.width / 2, height: 100 }}>
                    <Image source={require('../../images/island.jpg')} style={{ width: null, height: 100, borderWidth: 1.5, borderColor: 'white' }} />
                </View>
            )
        }



        return (
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: this.state.window.width, height: this.state.window.width / 2 }}>
                    <ImageBackground source={require('../../images/kookmin.jpeg')} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ borderRadius: 100, borderWidth: 15, borderColor: 'rgba(255,255,255, 0.5)', width: this.state.window.width / 2 - 20, height: this.state.window.width / 2 - 20, justifyContent: 'center' }}>
                            <Image source={require('../../images/ddobuck.png')} style={{ flex: 1, alignSelf: 'stretch', borderColor: 'white', borderWidth: 5, borderRadius: 100, width: null }}></Image>
                        </View>
                    </ImageBackground>
                </View>

                <TouchableOpacity onPress={() => alert("방문 확인")}>
                    <View style={styles.settingview1}>
                        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#00AFFF', height: 40, justifyContent: 'center'}}>
                            <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold' }}>jtjisgod 님의 마이페이지</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <ScrollView>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {visited}
                    </View>
                </ScrollView>
                <View style={styles.settingview3}>
                    <TouchableOpacity onPress={() => { this.props.change('license'); }}>
                        <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 15 }}>Open Source</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#4dc3ff',
    },
    view: {
        flex: 1
    },
    settingview1: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 40,
        marginBottom: 1.5,
    },
    settingview3: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
