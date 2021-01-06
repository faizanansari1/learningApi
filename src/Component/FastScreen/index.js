import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import { Container, Content, Card, CardItem, Body, Button, Item, Input } from 'native-base';
import AppHeader from '../Header';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Axios from 'axios';
import { connect } from 'react-redux';
import { fetchOrganizations } from '../../actions/actionCreator';

const mapStateToProps = state => {
    return {
        organizations: state.organizations
    };
};
const mapDispatchToProps = dispatch => ({
    fetchOrganizations: () => dispatch(fetchOrganizations())
})
class FastScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            editModal: false,
            org: [],
            name: '',
            numberOfCompanies: '',
            address: ''
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        this.props.fetchOrganizations();
    }
    componentWillReceiveProps(nextProps) {
        console.log('nextProps ==> ', nextProps.organizations)
        if(!nextProps.organizations.isLoading){
            console.log("okaaay")
            this.setState({org: nextProps.organizations.organizations.uses_profile}, () => {
                console.log('state ==> ', this.state.org)
            })
        }
    }
    getAll() {
        // Axios.get('http://apiwrdserp.widerangedigital.com/api/Organization/GetOrganization').then((response) => {
        //     console.log("response ", response.data)
        //     this.setState({ organizations: response.data })
        // }).catch(err => console.log(err))
    }
    modelFunction = () => {
        this.setState({ modalVisible: true })
    }
    onSubmit = () => {

    }
    onDelete(id) {
        console.log("ID: " + id);
        Axios.post('http://apiwrdserp.widerangedigital.com/api/Organization/DeleteOrganization/' + id).then((response) => {
            console.log("delete res: ", response.data);
            this.getAll()
        })
    }
    render() {
        return (
            <Container>
                <AppHeader
                    title="Fast Screen"
                    openModel={() => this.modelFunction}
                />
                <Content contentContainerStyle={{ minHeight: '100%' }}>
                    <View style={styles.container}>
                        {/* {this.state.organizations.map((item) => {
                            return (
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <View style={styles.content}>
                                                <View style={{ alignItems: 'center' }}><Text style={styles.heading}>Details</Text></View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={styles.leftRow}><Text style={styles.leftRowText}>ID</Text></View>
                                                    <View style={styles.rightRow}><Text style={styles.rightRowText}>{item.ID}</Text></View>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={styles.leftRow}><Text style={styles.leftRowText}>Name</Text></View>
                                                    <View style={styles.rightRow}><Text style={styles.rightRowText}>{item.Name}</Text></View>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={styles.leftRow}><Text style={styles.leftRowText}># of Companies</Text></View>
                                                    <View style={styles.rightRow}><Text style={styles.rightRowText}>{item.NoOfCompanies}</Text></View>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={[styles.leftRow, { borderBottomWidth: 1, }]}><Text style={styles.leftRowText}>Address</Text></View>
                                                    <View style={[styles.rightRow, { borderBottomWidth: 1, }]}><Text style={styles.rightRowText}>{item.Address}</Text></View>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                                <Button style={styles.saveButton} primary onPress={() => this.setState({ editModal: true })}><Text> Edite </Text></Button>
                                                <Button style={styles.CancleButton} danger onPress={() => this.onDelete(item.ID)}><Text> Delete </Text></Button>
                                            </View>
                                        </Body>
                                    </CardItem>
                                </Card>
                            );
                        })} */}
                        {this.props.organizations.isLoading ? <Text>Loading ...</Text> : null}
                        {this.state.org.map((item) => {
                            return (
                                <Text>{item.name}</Text>
                            );
                        })}
                    </View>

                    {/* <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}

                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={{ marginBottom: 20, }}><Text>Add Categories</Text></View>
                                <Item regular style={styles.input}>
                                    <Input
                                        placeholder='Name'
                                        value={this.state.name}
                                        onChangeText={(val) => this.setState({ name: val })}
                                    />
                                </Item>
                                <Item regular style={styles.input}>
                                    <Input
                                        placeholder='Number of Companies'
                                        value={this.state.numberOfCompanies}
                                        onChangeText={(val) => this.setState({ numberOfCompanies: val })}
                                    />
                                </Item>
                                <Item regular style={styles.input}>
                                    <Input
                                        placeholder='Address'
                                        value={this.state.address}
                                        onChangeText={(val) => this.setState({ address: val })}
                                    />
                                </Item>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Button primary style={styles.saveButton} onPress={this.onSubmit}>
                                        <Text> Save </Text>
                                    </Button>

                                    <Button light style={styles.CancleButton} onPress={() => this.setState({ modalVisible: false })}>
                                        <Text> Cancle </Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.editModal}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={{ marginBottom: 20, }}><Text>Edit Categories</Text></View>
                                <Item regular style={styles.input}>
                                    <Input placeholder='Name' />
                                </Item>
                                <Item regular style={styles.input}>
                                    <Input placeholder='Companies' />
                                </Item>
                                <Item regular style={styles.input}>
                                    <Input placeholder='Address' />
                                </Item>
                                <Item regular style={styles.input}>
                                    <Input placeholder='Number' />
                                </Item>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Button primary style={styles.saveButton}><Text> Save </Text></Button>
                                    <Button light style={styles.CancleButton} onPress={() => this.setState({ editModal: false })}><Text> Cancle </Text></Button>
                                </View>
                            </View>
                        </View>
                    </Modal> */}

                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,

    },
    content: {
        flexDirection: 'column',
        marginBottom: 30,
    },
    heading: {
        fontSize: 25,
        marginBottom: 10,
    },
    leftRow: {
        width: '50%',
        borderWidth: 1,
        borderColor: 'grey',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 0,
        justifyContent: 'center',
    },
    leftRowText: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    rightRow: {
        width: '50%',
        borderWidth: 1,
        borderColor: 'grey',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
    },
    rightRowText: {
        color: 'grey'
    },


    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        width: '80%',
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#ef6c00",
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        elevation: 2,

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    input: {
        marginBottom: 10,
    },

    saveButton: {
        borderRadius: 10,
    },

    CancleButton: {
        borderRadius: 10,
    },
});



export default connect(mapStateToProps, mapDispatchToProps)(FastScreen);