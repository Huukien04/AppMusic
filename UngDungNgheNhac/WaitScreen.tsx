import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function WaitScreen({ navigation }) {
  const Button = ({ onPress, title, color = 'black', backgroundColor = 'white', marginTop = '5', fontSize = 18 }) => (
    <TouchableOpacity onPress={onPress} style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 44, marginTop: parseInt(marginTop, 10), backgroundColor: backgroundColor, borderRadius: 50 }}>
      <Text style={{ color: color, fontSize: fontSize }}>{title}</Text>
    </TouchableOpacity>
  );

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#080C0F' }}>
        <View style={{ marginBottom: 150 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', letterSpacing: 2.25, color: 'white' }}>LOGO</Text>
        </View>
        <Button title="Login" color="white" backgroundColor="#A307CA" fontSize={20} onPress={() => navigation.navigate('LoginScreen')}/>
        <Button title="Sign Up" marginTop="5" onPress={() => navigation.navigate('SignUpScreen')}/>
      </View>
    );
}