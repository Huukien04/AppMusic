import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { GlobalContext } from "./ProfileTab/Context/update";
import QuanLyProfle from "./ProfileTab/qlProfile";
import ProfileClass from "./Class/profileClass";

export default function LoginScreen({ navigation }) {

  const { email, setEmail } = useContext(GlobalContext);
  const { passWord, setPassWord } = useContext(GlobalContext);
  QuanLyProfle.addProfile("1", "1", "1", "1")


  // qlProfile.addProfile('Quan Tuan', 'tuans', 'haha', '123');
  // qlProfile.addProfile('Trung Truong', 'meos', 'hihi', '123');
  // qlProfile.addProfile('Thanh Nguyen', 'thanhng', 'huh', '123');

  // const [email, setEmail] = useState('');
  // const [passWord, setPassWord] = useState('');

  const RememberMeAndForgotPassword: React.FC<RememberMeAndForgotPasswordProps> = ({
    rememberMeLabel,
    forgotPasswordLabel,
  }) => (
    <View style={styles.rememberForgotContainer}>
      <View style={styles.rememberMeContainer}>
        <View style={styles.rememberMeCheckbox} />
        <Text style={styles.rememberMeText}>{rememberMeLabel}</Text>
      </View>
      <Text style={styles.forgotPasswordText}>{forgotPasswordLabel}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>YOUR LOGO</Text>

      <View style={styles.inputContainer}>
        <Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}

          placeholderTextColor="#9CA3AF"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassWord}
          value={passWord}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <RememberMeAndForgotPassword
        rememberMeLabel="Remember me"
        forgotPasswordLabel="Forgot Password?"
      />

      {/* <TouchableOpacity style={styles.loginButton} onPress={() => {
        navigation.navigate('Home')
      }
      }
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.loginButton} onPress={() => {
        navigation.navigate('HomeScreen')
      }
      }
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
        <View style={{ borderBottomWidth: 1, borderBottomColor: 'white', width: '35%', marginVertical: 5 }} />
        <Text style={{ marginHorizontal: 10, color: 'white' }}>Or</Text>
        <View style={{ borderBottomWidth: 1, borderBottomColor: 'white', width: '35%', marginVertical: 5 }} />
      </View>

      <View style={styles.signUpSection}>
        <Text style={{ color: "rgba(163, 157, 157, 1)" }}>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#0C0415",
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
    backgroundColor: "#0C0415",
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    fontSize: 16,
    borderColor: '#A307CA',
    borderWidth: 2,
    fontStyle: 'italic',
    marginBottom: 30
  },
  rememberForgotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%',
    marginVertical: 20,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeCheckbox: {
    height: 20,
    width: 20,
    borderColor: "#A307CA",
    borderWidth: 2,
    borderRadius: 5,
    marginRight: 10,
  },
  rememberMeText: {
    color: "rgba(163, 157, 157, 1)",
  },
  forgotPasswordText: {
    color: "rgba(163, 157, 157, 1)",
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
    color: "rgba(163, 157, 157, 1)",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});