import { Alert } from "react-native";
import ProfileClass from "../Class/profileClass";
import React, { useContext } from "react";
import { GlobalContext } from "./Context/update";

export default class QuanLyProfle {
    // constructor() {
    //     this.list = [];
    // }
static list = [];
static  hienThiFullName(email) {
        let a = "";
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].email === email) {
                a += this.list[i].fullName;
            }
        }
        return a;
    }
    static hienThiFullEmail(email) {
        let a = "";
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].email === email) {
                a += this.list[i].email;
            }
        }
        return a;
    }
    static hienThiFullImage(email) {
        let a = "";
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].email === email) {
                a += this.list[i].image;
            }
        }
        return a;
    }
    static addProfile(fullName, userName, email, passWord, confirmPass) {
        let profile = new ProfileClass(fullName, userName, email, passWord, confirmPass);
        // console.log(profile.getFullName());
        // console.log(profile.getUserName());
        // console.log(profile.getEmail());
        // console.log(profile.getPassWord());
        // console.log(profile.getConfirm());
        this.list.push(profile);

    }
    static dkTaiKhoan(fullName, userName, email, passWord, confirmPass) { 
        if (fullName == "" || userName == "" || email == "" || passWord == "" || confirmPass == "") {
            Alert.alert(
                "Thông báo",
                "Vui lòng nhập đầy đủ thông tin"
            )
            return false;
        }else if (passWord != confirmPass) {
            Alert.alert(
                "Thông báo",
                "Mật khẩu không trùng khớp!"
            )
            return false;
        }else if (this.list.some(profile => profile.getEmail() === email)) {
            Alert.alert("Thông báo", "Email đã được sử dụng");
            return false;
        }if (!email.includes("@gmail.com")) {
            Alert.alert("Thông báo", "Email phải có định dạng @gmail.com");
            return false;
        }
        Alert.alert("Thông báo", "Đăng ký thành công");
            this.addProfile(fullName, userName, email, passWord, confirmPass);
        return true;
    }
    static editProfile(email,newFullName, newUserName, newPassWord) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].email === email) {
                this.list[i].fullName = newFullName;
                this.list[i].userName = newUserName;
                this.list[i].passWord = newPassWord;
               
            }
        }
    }
    // checkLogin(email) {
    //     if (email != "" ) {
    //         for (let i = 0; i < this.list.length; i++) {
    //             if (this.list[i].email) {
    //                 return true;
    //             }
    //             return false;
    //         }
    //     }
    // }
    static checkLogin(email, pass) {
        // if (email != "" || pass != "") {
        //     for (let i = 0; i < this.list.length; i++) {
        //         if (this.list[i].email === email && this.list[i].passWord === pass) {
        //             return true;
        //         }
        //     }
        // }
        // return false;
        if (email != "" || pass != "") {
            // console.log(email);
            for (let i = 0; i < this.list.length; i++) {
                // console.log(email);
                if (this.list[i].getEmail() === email) {
                    if (this.list[i].getEmail() == email && this.list[i].getPassWord() == pass) {
                        return true;
                    }

                }
            }
        } else {
            return false;
        }
    }
}

