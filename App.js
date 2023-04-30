import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,FlatList, TouchableOpacity, Image, Modal, SectionList  } from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer';
const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
      .then(response => response.json())
      .then(data => setPokemonList(data.pokemon))
      .catch(error => console.error(error));
  }, []);



//////////////////////////////////////////////


const groupedPokemon = pokemonList.reduce((result, pokemon) => {
  const type = pokemon.type[0]; // use the first type for grouping
  const existingGroup = result.find(group => group.title === type);
  if (existingGroup) {
    existingGroup.data.push(pokemon);
  } else {
    result.push({ title: type, data: [pokemon] });
  }
  return result;
}, []);



  const handlePress = (pokemon) => {
    setSelectedPokemon(pokemon);
    setModalVisible(true);
  };


////////////////////////////////


const renderSectionHeader = ({ section }) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );
};


  const renderItem = ({ item, index }) => {
    if (index % 2 !== 0) return null; // hide odd-indexed items
    const nextIndex = index + 1;
    const nextItem = pokemonList[nextIndex];
  
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center' , alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity onPress={() => handlePress(item)}>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Image source={{ uri: item.img }} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
  
        {nextItem && (
          <TouchableOpacity onPress={() => handlePress(nextItem)}>
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <Image source={{ uri: nextItem.img }} style={styles.image} />
                <Text style={styles.name}>{nextItem.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };





  ////////////////////////////////////////
  const styles = StyleSheet.create({
    cardContainer: {
      alignItems: 'center',
      marginHorizontal: 10,
    },
    card: {
      width: 150,
      height: 200,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    image: {
      width: '100%',
      height: 120,
      resizeMode: 'contain',
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      textAlign: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      elevation: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 10,
    },
    text: {
      fontSize: 16,
      marginBottom: 5,
    },
    buttonContainer: {
      marginTop: 20,
    },
    button: {
      backgroundColor: '#E5E5E5',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    buttonText: {
      fontSize: 18,
    },
    sectionHeader: {
      backgroundColor: '#000',
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    sectionHeaderText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center',
    },    
  });
  

/////////////////////////////////////////////


const renderModalContent = () => (
  <View style={styles.container}>
    <View style={styles.modal}>
      <Text style={styles.title}>{selectedPokemon.name}</Text>
      <Image source={{ uri: selectedPokemon.img }} style={styles.image} />
      <Text style={styles.text}>Type: {selectedPokemon.type.join(', ')}</Text>
      <Text style={styles.text}>Height: {selectedPokemon.height}</Text>
      <Text style={styles.text}>Weight: {selectedPokemon.weight}</Text>
      <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.buttonContainer}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Back to Pokemons</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);



  
  ////////////////////////////////////
return (
  <>
    <Header />

    <View style={{ flex: 1 }}>
    <SectionList
          sections={groupedPokemon}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={(item, index) => item.num.toString() + index}
        />
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        {selectedPokemon && renderModalContent()}
      </Modal>
    </View>
    <Footer />
  </>
);

};

export default App;