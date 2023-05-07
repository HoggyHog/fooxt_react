import { getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    
  
  
  } from "firebase/auth";
import { app } from "../firebase.config";
//auth imports
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

import { RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";

const provider= new GoogleAuthProvider()
const auth=getAuth(app)

export const GoogleAuth = async() =>{
    
    
}

export const setUpRecaptcha = async(phone) =>{
    const recaptchaVerifier=await new RecaptchaVerifier(
        'recaptcha-container',
        {},
        auth
    )
    recaptchaVerifier.render()
    return recaptchaVerifier
    return signInWithPhoneNumber(auth,phone,recaptchaVerifier)
}

