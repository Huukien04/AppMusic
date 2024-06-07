import React, { createContext, useState } from 'react';
import QuanLyProfle from '../qlProfile';
import ProfileClass from '../../Class/profileClass';
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

  const [globalState, setGlobalState] = useState("");
  const [globalEmail, setGlobalEmail] = useState("");
  const [imgUrl, setImageUrl] = useState('../../asset/images/dia_nhac_trong.png');

  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const [confrimPass, setConfrimPass] = useState("");

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState 
    ,imgUrl, setImageUrl
    ,userName, setUserName
    ,fullName, setFullName
    ,email, setEmail
    ,passWord, setPassWord
    ,confrimPass, setConfrimPass

    ,globalEmail, setGlobalEmail
    }}>
      {children}
    </GlobalContext.Provider>
  );
};