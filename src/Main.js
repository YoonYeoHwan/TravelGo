import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

let title="TITLE"

export default class App extends Component {
    render() {
        return (
            <View>
                <Text>{title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
});
