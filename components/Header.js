import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Pokemon App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'yellow',
        paddingTop: 20,
        paddingBottom: 10,
        alignItems: 'center',
      },
      
      title: {
        fontSize: 20,
        color: 'black',
        fontStyle: 'italic'
      },
});

export default Header;
