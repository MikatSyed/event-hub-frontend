import { decodedToken } from "../../utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/local-storage";
import { authKey } from "../constants/storageKey";


export const storeUserInfo = ({accessToken}:{accessToken:string})=>{
  return  setToLocalStorage(authKey,accessToken as string);
}

export const getUserInfo = () =>{
    const authToken = getFromLocalStorage(authKey);

    if(authToken){
        const decodedData = decodedToken(authToken);
        return decodedData;
    }
    else {
        return ""
    }
}


export const removeUserInfo = (key:string) => {
    return localStorage.removeItem(key)
}

export const isLoggedIn = () =>{
    const authToken = getFromLocalStorage(authKey);
    return !! authToken
}
