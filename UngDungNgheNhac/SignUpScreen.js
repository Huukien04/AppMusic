import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { GlobalContext } from "./ProfileTab/Context/update";
import QuanLyProfle from "./ProfileTab/qlProfile";
import ProfileClass from "./Class/profileClass";
export default function SignUpScreen({ navigation }) {

  // const {userName, setUserName} = useContext(GlobalContext);
  // const {fullName, setFullName} = useContext(GlobalContext);
  // const { email, setEmail } = useContext(GlobalContext);
  // const { passWord, setPassWord } = useContext(GlobalContext);
  // const {confrimPass, setConfrimPass} = useContext(GlobalContext);

  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const [confrimPass, setConfrimPass] = useState('');

  QuanLyProfle.addProfile('a', 'a', 'a@gmail.com', 'a','a');
  QuanLyProfle.addProfile('a', 'a', 'b@gmail.com', 'a','a');
  // QuanLyProfle.addProfile('Trung Truong', 'meos', 'hihi', '123', '1');
  // QuanLyProfle.addProfile('Thanh Nguyen', 'thanhng', 'huh', '123', '1');
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SIGN UP</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}></Text>
        <TextInput
          value={fullName}
          style={styles.input}
          placeholder="FullName"
          onChangeText={setFullName}
          placeholderTextColor="#9CA3AF"
        />
        <TextInput
          value={userName}
          style={styles.input}
          placeholder="UserName"
          // onChangeText={setUserName}
          onChangeText={text => setUserName(text)}
          placeholderTextColor="#9CA3AF"
        />
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          onChangeText={setEmail}
          placeholderTextColor="#9CA3AF"
        />
        <TextInput
          style={styles.input}
          value={passWord}
          placeholder="PassWord"
          onChangeText={setPassWord}
          placeholderTextColor="#9CA3AF"
        />
        <TextInput
          style={styles.input}
          value={confrimPass}
          placeholder="Confrim Password"
          onChangeText={setConfrimPass}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={() => {

        if (QuanLyProfle.dkTaiKhoan(fullName, userName, email, passWord, confrimPass)) {
          navigation.navigate('LoginScreen')
        }

      }}>
        <Text style={styles.loginButtonText}>SignUp</Text>
      </TouchableOpacity>

      <View style={styles.signUpSection}>
        <Text style={{ color: 'white' }}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.signUpText}>Login</Text>

        </TouchableOpacity>
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#080C0F",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  inputLabel: {
    color: "white",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#080C0F",
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    fontSize: 16,
    borderColor: '#A307CA',
    borderWidth: 2,
    fontStyle: 'italic',
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: "#A307CA",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 25,
    marginVertical: 10,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpSection: {
    marginTop: 30,
    alignItems: "center",
  },
  signUpText: {
    color: "#B714DF",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});