import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>Welcome</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'yellow',
    paddingTop: 10,
    paddingBottom: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontStyle: 'italic'
  },
});

export default Footer;
