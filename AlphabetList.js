import React, { Component } from 'react';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'
import AlphaList from 'react-native-vertical-alphabet'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    SectionList,
    TouchableOpacity,
} from 'react-native';

export default class AlphabetList extends Component<{}> {

    constructor(props) {
        super(props)

        this.state = {
            list: _alphabetizeList(props.data)
        }

        this.getItemLayout = sectionListGetItemLayout({
            getItemHeight: (rowData, sectionIndex, rowIndex) => 38,
            getSectionHeaderHeight: () => 27
        })

        this.scrollToLocation = () => {}

    }

    componentWillReceiveProps(props) {

        this.setState({ list: _alphabetizeList(props.data) })

    }

    onTapLetter(letter) {

        const letterIndex = this.state.list.findIndex(i => i.title === letter.toLowerCase())
        if(letterIndex > -1) {
            this.listRef.scrollToLocation({animated: false, viewOffset: 25, itemIndex: 0, sectionIndex: letterIndex})
        }

    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.header}><Text>AlphabetListDemo</Text></View>

                <AlphaList style={styles.alphaList} onTapLetter={(letter) => this.onTapLetter(letter)} />

                <SectionList 
                    ref={(ref) => {
                        this.listRef= ref
                    }}
                    maxToRenderPerBatch={100}
                    renderItem={({item}) => <Text style={styles.item}>{item.firstName} {item.lastName}</Text>}
                    renderSectionHeader={({section}) => <Text style={styles.section}>{section.title.toUpperCase()}</Text>}
                    sections={this.state.list}
                    keyExtractor={(item) => item.id}
                    getItemLayout={this.getItemLayout}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({

    header: {
        flex: 0,
        height: 64,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },

    alphaList: {
        position: 'absolute',
        right: 0,
        top: 150,
        zIndex: 1
    },

    section: {
        backgroundColor: '#eee',
        padding: 5
    },

    item: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderWidth: 0.5,
        borderColor: '#eee'
    }

});

function _alphabetizeList(data) {

    let alphabet = []

    const sortedData = data.sort(function(a, b){
        if(a.lastName< b.lastName) return -1
        if(a.lastName> b.lastName) return 1
        return 0
    })

    sortedData.forEach((item) => {

        const firstLetter = item.lastName[0].toLowerCase()

        const alphabetIndex = alphabet.findIndex(i => i.title === firstLetter)

        if(alphabetIndex > -1) {

            alphabet[alphabetIndex].data.push(item)

        }
        else {

            alphabet.push({
                title: firstLetter,
                data: [item]
            })

        }

    })

    return alphabet 

}
