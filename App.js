import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Page = styled.View`
  flex:1;
  background-color: #fff;
`;

const Header = styled.View`
height:40px;
width: 100%;
background-color: #0c95fe;
align-items: center;
justify-content: center;
`;

const TextoHeader = styled.Text`
  font-size: 22px;
  color: #fff;
  font-weight: bold
`;

const TextoDigimon = styled.Text`
  font-size: 18px;
  color: #fff
`;

const ViewDigimon = styled.View`
  margin-bottom: 30px;
  justify-content:center;
`;

const TextNomeDigimon = styled.Text`
  font-size: 18px;
  background-color: #0c95fe;
  color: #fff;
  padding-left: 10px;
`;

const TextLevelDigimon = styled.Text`
  font-size: 18px;
  background-color: #fea400;
  color: #fff;
  border-radius: 5px;

`;

const Bottom = styled.View`
  height:50;
  width:100%;
  background-color: #131313;
  align-items: center;
  justify-content:space-around;
  flex-direction: row;

`;

const App = () => {

  const [loading, setLoading] = useState(false);
  const [digimon, setDigimon] = useState([]);


  useEffect(() => {
    const requestDigimon = async () => {
      setLoading(true);
      const req = await fetch("https://digimon-api.vercel.app/api/digimon");
      const json = await req.json();

      if (json) {
        setDigimon(json);
      }

      setLoading(false);

    }

    requestDigimon();

  }, [])

  return (
    <Page>
      <Header>
        <TextoHeader>Lista de Digimons</TextoHeader>
      </Header>

      <FlatList
        style={styles.list}
        data={digimon}
        renderItem={({ item }) => (
          <ViewDigimon>
            <TextNomeDigimon>{'Nome '+item.name}<Image source={require('./src/assets/kamiya.png')} style={{width:26, height:26}}/></TextNomeDigimon>       
              <Image source={{ uri: item.img }}
                style={styles.digimonImage}
                resizeMode="center"
              />    
            <View style={{ alignItems: 'center' }}>
              <TextLevelDigimon>{'Nivel '+item.level}</TextLevelDigimon>
            </View>
          </ViewDigimon>
        )}

      />
      <Bottom>
        <TouchableOpacity>
          <Image
            source={require('./src/assets/home.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require('./src/assets/backpack.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require('./src/assets/smartphone.png')}
          />
        </TouchableOpacity>

      </Bottom>
    </Page>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    
  },
  digimonImage: {
    height: 100,
    marginTop:10,
    backgroundColor: '#fff'
  },

})


export default App;