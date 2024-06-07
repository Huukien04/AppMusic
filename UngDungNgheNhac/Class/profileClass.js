
export default class ProfileClass{
    constructor(fullName = '' ,userName = '',email = '',passWord = '', confirmPass = '',avatar = ''){
        this.fullName = fullName;
        this.userName = userName;
        this.email = email;
        this.passWord = passWord;
        this.confirmPass = confirmPass;
        this.avatar = avatar;
    }

    getFullName(){
        return this.fullName;
    }
    setFullName(fullName){
       this.fullName = fullName;
    }
    getUserName(){
        return this.userName;
    }
    setUserName(userName){
       this.userName = userName;
    }
    getEmail(){
        return this.email;
    }
    setEmail(email){
       this.email = email;
    }
    getPassWord(){
        return this.passWord;
    }
    setPassWord(passWord){
       this.passWord = passWord;
    }
    getConfirm(){
        return this.confirmPass;
    }
    setConfirmPass(confirmPass){
       this.confirmPass = confirmPass;
    }
    getAvatar(){
        return this.confirmPass;
    }
    setAvatar(confirmPass){
       this.confirmPass = confirmPass;
    }
}