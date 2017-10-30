/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import AlphabetList from './AlphabetList'
import contactsList from './contacts.json'

export default class App extends Component<{}> {
    constructor(props) {
        super(props)

        this.scrollToLocation = () => {}

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.body}>

                    <AlphabetList data={contactsList} />

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    body: {
        flex: 1,
    },
});
