import React from 'react';
import { Header, Left, Button, Icon, Body, Right, Title } from 'native-base';

export default function AppHeader(props) {
    return (
        <Header style={{backgroundColor:'#ef6c00'}}>
            <Left>
                <Button transparent>
                    {/* <Icon name='arrow-back' /> */}
                    <Icon name="home-city" type="MaterialCommunityIcons" />
                </Button>
            </Left>
            <Body>
    <Title>{props.title}</Title>
            </Body>
            <Right>
                <Button transparent onPress={ props.openModel()}>
                    <Icon name='addfile' type="AntDesign" />
                </Button>
            </Right>
        </Header>
    );
}