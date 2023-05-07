import React, { useState ,useEffect} from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
  MdAccountCircle,
  MdCall,
  MdEmail,
  MdHouse,
  MdLocationSearching
} from "react-icons/md";
import { categories } from "../utils/data";
import Loader from "./Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { getAllFoodItems, saveItem,saveUser,getUserByPhone,checkIfNumberExists } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

import { getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    initializeAuth,browserSessionPersistence, browserPopupRedirectResolver
  } from "firebase/auth";
import { app } from "../firebase.config";

import { GoogleAuth } from "../utils/userAuth";

import { setUpRecaptcha } from "../utils/userAuth";
import CartContainer from './CartContainer'


const User = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ user,foodItems,cartShow }, dispatch] = useStateValue();
  
  const[loginHighLight,setLoginHighLight]=useState(true)
  const[nameField,setNameField]=useState(true)
  const[emailField,setEmailField]=useState(false)
  const[phoneField,setPhoneField]=useState(false)
  const[addressField,setAddressField]=useState(false)
  const[otpField,setOtpField]=useState(false)

  const[name,setName]=useState("")
  const[phone,setPhone]=useState("")
  const[mail,setMail]=useState("")
 const [googleAuthMail,setGoogleAuthMail]=useState("")
  const[addressSelect,setAddressSelect]=useState(1)
  const [address1,setAddress1]=useState("")
  const [address2,setAddress2]=useState("")
  const [address3,setAddress3]=useState("")
  const [Landmark1,setLandmark1]=useState("")
  const [Landmark2,setLandmark2]=useState("")
  const [Landmark3,setLandmark3]=useState("")
  const [otp,setOtp]=useState("")
  const [otpVerified,setOtpVerified]=useState(false)
  
  const [fields, setFields] = useState(false);
  const [recaptchaVerifier,setRecaptchaVerifier] =useState({})
  

  const auth=getAuth(app)

  const navigate=useNavigate()
  
  
 

  


  const verifyOtp = async ()=>{
    if(!loginHighLight){
      window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setPhoneField(false)
        setEmailField(true)
        setFields(true)
        setMsg("Phone number verified!!")
        setAlertStatus("success")
        setTimeout(()=>{
            setFields(false)
        },4000)
        
      })
      .catch((err) => {
        console.log(err);
        setFields(true);
        setMsg("wrong otp")
        setAlertStatus("danger")
        setTimeout(()=>{
            setFields(false)
        },4000)
      });
    }
    else{
      window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        
        const login_user=await getUserByPhone(phone)
        console.log(login_user)
        const login_user_cred=login_user[0]
        localStorage.setItem("user", JSON.stringify(login_user_cred));
        localStorage.setItem("user_login",JSON.stringify(Date.now()))

        dispatch({
            type: actionType.SET_USER,
            user: login_user_cred,
        });

        setFields(true)
        setMsg("OTP verified and Logged in (Redirecting)!!")
        setAlertStatus("success")
        setTimeout(()=>{
            setFields(false)
            navigate('/')
           
        },1000)
        
      })
      .catch((err) => {
        console.log(err);
        setFields(true);
        setMsg("wrong otp")
        setAlertStatus("danger")
        setTimeout(()=>{
            setFields(false)
        },4000)
      });
    }
    
  }

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            
            console.log('callback')
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  const sendOtp = async() =>{
    if(!loginHighLight){
      onCaptchVerify()
      console.log('sendotp')
      const appVerifier = window.recaptchaVerifier;
      const formatPh = "+91" + phone;
      signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        //setLoading(false);
        //setShowOTP(true);
        setOtpField(true)
        console.log("OTP sent successfully!",confirmationResult);
      })
      .catch((error) => {
        console.log(error);
        ///setLoading(false);
      });
        
      }
      
      
    
    else{
      const users=await getUserByPhone(phone)
     
      console.log('sendotp')
      
      
      if(users.length!==0){
        onCaptchVerify()
        const appVerifier = window.recaptchaVerifier;
        const formatPh = "+91" + phone;
        signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          //setLoading(false);
          //setShowOTP(true);
          setOtpField(true)
          console.log("OTP sent successfully!",confirmationResult);
        })
        .catch((error) => {
        console.log(error);
        ///setLoading(false);
      })
      }
      
      else{
        setFields(true)
        setMsg("Phone number does not exist!!")
        setAlertStatus("danger")
        setTimeout(()=>{
            setFields(false)
        },4000)
      }

      
      
      

    }
      
  }

 

  const loginWithGoogle = async() =>{
    const provider= new GoogleAuthProvider()
        
    const {
        user: { refreshToken, providerData }, //just taking the providerData from the response, that user thing is just open up the dictionary
      } = await signInWithPopup(auth, provider);
     
    setGoogleAuthMail(providerData[0].email)
    
  }

  useEffect(()=>{
    if(googleAuthMail!==''){
        console.log('useEffect')
        submit()
    }
  },[googleAuthMail]) 

  const submit = ()=>{
    console.log('submit')
    var data={}
    if(googleAuthMail!==''){
        data={
            id: `${Date.now()}`,
            name:name,
            phone:phone,
            mail:googleAuthMail,
        }
        console.log(name,phone,googleAuthMail)
    }
    else{
        data = {
            id: `${Date.now()}`,
            name:name,
            phone:phone,
            mail:mail
        }
        console.log(name,phone,mail)
    }
    
    try{
    
        saveUser(data)
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("user_login",JSON.stringify(Date.now()))
        dispatch({
            type: actionType.SET_USER,
            user: data,
        });
        setFields(true);
        setMsg("Account Created Successfully 😊 (Redirecting in a few seconds)")
        setAlertStatus("success")
        setTimeout(() => {
            setFields(false);
            clearData();
            navigate('/')
            
        }, 4000);
    
    }
    catch(err){
        console.log(err);
        setFields(true);
        setMsg("Error while uploading : Try AGain 🙇 (Redirecting in a few seconds)");
        setAlertStatus("danger");
        setTimeout(() => {
            setFields(false);
            clearData();
            navigate('/user')
        }, 4000);
    }

  }

  const clearData = () => {
    setName("");
    setPhone("");
    setMail("");
  };

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading : Try AGain 🙇");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Image uploaded successfully 😊");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted successfully 😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!name || !phone ||!address1 || Landmark1 ) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          name: name,
          phone: phone,
          mail: mail,
          address1: address1,
          Landmark1:Landmark1,
          address2: address2,
          Landmark2:Landmark2,
          address3: address3,
          Landmark3:Landmark3,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data Uploaded successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try AGain 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchData();
  };

 

  const fetchData = async () => {
    console.log('fetch food data in user.jx')
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };



  return (
    
    
    <div className="w-full min-h-screen flex items-center justify-center bg-fooxtYellow">
      
      <div className="w-[90%] md:w-[50%] h-[60vh] border border-fooxtYellow bg-fooxtBlack rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

      
        

        
        <div className="w-full h-full bg-fooxtYellow  rounded-lg flex flex-col justify-around items-center">
        {!loginHighLight && nameField && (<>
            <div className="w-90% py-2  flex justify-center items-center gap-2 mx-auto">
                Please enter your name
            </div>
            <div className="w-[70%] py-2 flex justify-center items-center gap-2 mx-auto">
                <MdAccountCircle className="text-xl text-fooxtYellow" />
                <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full h-full text-lg bg-transparent outline-none border-b-2 border-fooxtBlack placeholder:text-fooxtBlack text-fooxtBlack"
                />
            </div>
            
            <button
            type="button"
            className={` w-[30vw] md:w-[30%] border-none outline-none bg-fooxtBlack px-auto py-2 rounded-lg text-lg text-white font-semibold`}
            onClick={()=>{
                setNameField(false)
                setPhoneField(true)
            }}
          >
            NEXT
          </button>
            
            </>
            
        )}

        {!loginHighLight && phoneField && !otpField &&(<>
            <div className="w-90% py-2  flex justify-center items-center gap-2 mx-auto">
                Please enter your phone number
            </div>
            <div className="w-[70%] py-2 border-b border-fooxtYellow flex items-center gap-2">
                <MdCall className="text-xl text-fooxtYellow" />
                <input
                type="number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Mobile Number"
                className="w-full h-full text-lg bg-transparent outline-none border-b-2 border-fooxtBlack placeholder:text-fooxtBlack text-fooxtBlack"
                />
            </div>
            <div id='recaptcha-container'></div>

            <button
            type="button"
            className={` w-[30vw] md:w-[30%] border-none outline-none bg-fooxtBlack px-auto py-2 rounded-lg text-lg text-white font-semibold`}
            onClick={async()=>{
                await sendOtp()
                
            }}>
            SEND OTP
            </button>
            </>)}

        {!loginHighLight && phoneField && otpField && (
        <> 
            <div className="w-90% py-2  flex justify-center items-center gap-2 mx-auto">
                Please enter your OTP
            </div>
            <div className="w-[70%] py-2 border-b border-fooxtYellow flex items-center gap-2">
                
                <input
                type="number"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP"
                className="w-full h-full text-lg bg-transparent outline-none border-b-2 border-fooxtBlack placeholder:text-fooxtBlack text-fooxtBlack"
            />
            </div>
            <button
            type="button"
            className={`w-[30vw] md:w-[30%] border-none outline-none ${!otpVerified?'bg-fooxtBlack':'bg-slate-300'} px-auto md:px-0 py-2 rounded-lg text-lg text-white font-semibold`}
            onClick={()=>{
                verifyOtp()
              
                }}
                >
            VERIFY OTP
          </button>
         
          
           </>) }
            
            

        {!loginHighLight && emailField && (<>
            <div className="w-90% py-2  flex justify-center items-center gap-2 mx-auto">
                Please enter your email
            </div>
            <div className="w-[70%] py-2 border-b border-fooxtYellow flex items-center gap-2">
                <MdEmail className="text-xl text-fooxtYellow" />
                <input
                type="text"
                required
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                placeholder="Email"
                className="w-full h-full text-lg bg-transparent outline-none border-b-2 border-fooxtBlack placeholder:text-fooxtBlack text-fooxtBlack"
                />
            </div>

           {/*  <div className="w-90% py-2  flex justify-center items-center gap-2 mx-auto">
                OR
            </div>

            <button
            type="button"
            className={` md:w-[30%] border-none outline-none bg-white  px-12 py-2 rounded-lg text-lg text-textColor font-semibold`}
            onClick=
            {loginWithGoogle}
                >
            Login with Google

          </button> */}

          <button
            type="button"
            className={`w-[30vw] md:w-[30%] border-none outline-none bg-fooxtBlack px-auto py-2 rounded-lg text-lg text-white font-semibold`}
            onClick={()=>{
                submit()
            }}>
            FINISH
            </button>
            
            </>)}

        {!loginHighLight && addressField && (<>
            <div className="w-full flex flex-col md:flex-row justify-around">
                <button
                    type="button"
                    className={`ml-0  md:w-auto border-none outline-none ${addressSelect===1?'bg-red-600':'bg-red-300'} px-12 py-2 rounded-lg text-lg text-white font-semibold`}
                    onClick={()=>setAddressSelect(1)}
                >
                    ADDRESS 1
                </button>
                <button
                    type="button"
                    className={`ml-0  md:w-auto border-none outline-none ${addressSelect===2?'bg-red-600':'bg-red-300'} px-12 py-2 rounded-lg text-lg text-white font-semibold`}
                    onClick={()=>setAddressSelect(2)}
                >
                    ADDRESS 2
                </button>
                <button
                    type="button"
                    className={`ml-0  md:w-auto border-none outline-none ${addressSelect===3?'bg-red-600':'bg-red-300' } px-12 py-2 rounded-lg text-lg text-white font-semibold`}
                    onClick={()=>setAddressSelect(3)}
                >
                    ADDRESS 3
                </button>
            </div>  
            { addressSelect===1 && (
                <>
                <div className="w-full py-2 border-b bg-slate-200 flex items-center gap-2">

                <MdHouse className="text-xl text-fooxtYellow" />
                <input
                type="text"
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                placeholder="Address"
                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                />
                
            </div>
            <div className="w-full py-2 border-b bg-slate-200 flex items-center gap-2">

                
            <MdLocationSearching className="text-xl text-fooxtYellow" />
                <input
                type="text"
                required
                value={Landmark1}
                onChange={(e) => setLandmark1(e.target.value)}
                placeholder="Landmark"
                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                />
                
            </div>
            </>
            )}
            { addressSelect===2 && (
                <>
                <div className="w-full py-2 border-b bg-slate-200 flex items-center gap-2">

                <MdHouse className="text-xl text-fooxtYellow" />
                <input
                type="text"
                required
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                placeholder="Address"
                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                />
                
            </div>
            <div className="w-full py-2 border-b bg-slate-200 flex items-center gap-2">

                
                <MdLocationSearching className="text-xl text-fooxtYellow" />
                <input
                type="text"
                required
                value={Landmark2}
                onChange={(e) => setLandmark2(e.target.value)}
                placeholder="Landmark"
                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                />
                
            </div>
            </>
            )}
            { addressSelect===3 && (
                <>
                <div className="w-full py-2 border-b bg-slate-200 flex items-center gap-2">

                <MdHouse className="text-xl text-fooxtYellow" />
                <input
                type="text"
                required
                value={address3}
                onChange={(e) => setAddress3(e.target.value)}
                placeholder="Address"
                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                />
                
            </div>
            <div className="w-full py-2 border-b bg-slate-200 flex items-center gap-2">

                
            <MdLocationSearching className="text-xl text-fooxtYellow" />
                <input
                type="text"
                required
                value={Landmark3}
                onChange={(e) => setLandmark3(e.target.value)}
                placeholder="Landmark"
                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                />
                
            </div>
            </>
            )}
                FILL AT LEAST 1ST ADDRESS
            
            </>)}
            
        {loginHighLight && !otpField &&(<>
          <div className="w-90% py-2  flex justify-center items-center gap-2 mx-auto">
                Please enter your phone number
            </div>
            <div className="w-[70%] py-2 border-b border-fooxtYellow flex items-center gap-2">
                <MdCall className="text-xl text-fooxtYellow" />
                <input
                type="number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Mobile Number"
                className="w-full h-full text-lg bg-transparent outline-none border-b-2 border-fooxtBlack placeholder:text-fooxtBlack text-fooxtBlack"
                />
            </div>
            <div id='recaptcha-container'></div>

            <button
            type="button"
            className={` w-[30vw] md:w-[30%] border-none outline-none bg-fooxtBlack px-auto py-2 rounded-lg text-lg text-white font-semibold`}
            onClick={async()=>{
                await sendOtp()
    
            }}>
            SEND OTP
            </button>
           

          </>)}

        {loginHighLight && otpField && (
        <> 
            <div className="w-90% py-2  flex justify-center items-center gap-2 mx-auto">
                Please enter your OTP
            </div>
            <div className="w-[70%] py-2 border-b border-fooxtYellow flex items-center gap-2">
                
                <input
                type="number"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP"
                className="w-full h-full text-lg bg-transparent outline-none border-b-2 border-fooxtBlack placeholder:text-fooxtBlack text-fooxtBlack"
            />
            </div>
            <button
            type="button"
            className={` w-[30vw] md:w-[30%] border-none outline-none ${!otpVerified?'bg-fooxtBlack':'bg-slate-300'} px-auto md:px-0 py-2 rounded-lg text-lg text-white font-semibold`}
            onClick={()=>{
                verifyOtp()
              
                }}
                >
            VERIFY OTP
          </button>
         
          
          </>) }
            

       
          
       </div>
        
      

       <div className="flex items-center w-full justify-around ">
        

        <button
          type="button"
          className={` w-[30vw] md:w-[10vw] border-none outline-none ${loginHighLight?'bg-fooxtYellow':'bg-slate-300'} px-auto py-2 rounded-lg text-lg text-fooxtBlack font-semibold`}
          onClick={()=>setLoginHighLight(true)}
        >
          LOG IN
        </button>
        <button
          type="button"
          className={` w-[30vw] md:w-[10vw] border-none outline-none ${!loginHighLight?'bg-fooxtYellow':'bg-slate-300'} px-auto py-2 rounded-lg text-lg text-fooxtBlack font-semibold`}
          onClick={()=>setLoginHighLight(false)}
        >
          SIGN UP
        </button>
      </div>
        

       

       
      </div>

     
      {cartShow && <CartContainer/>}
    </div>
    
    
  );
};

export default User;
