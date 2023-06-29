

import React,{useState,useEffect} from 'react'

import { useStateValue } from "../context/StateProvider";
import Logo from '../img/logo.png'
import CartItem from "./CartItem";


import { actionType } from "../context/reducer";

import { MdAccountCircle,MdCall,
    MdEmail, MdHouse, MdLocationSearching, MdCancel, MdArrowCircleLeft} from 'react-icons/md';
import { getUserByPhone, updateUserByPhone } from '../utils/firebaseFunctions';
import { getKey,checkout, checkoutCF } from '../services/apis';
import { useNavigate } from 'react-router-dom';

import CartContainer from './CartContainer'
import axios from 'axios'



const Checkout = () => {
    const BASE_URL=process.env.BASE_URL
    console.log("base",BASE_URL)
    const [{ cartShow, cartItems, user }, dispatch] = useStateValue();

    const [tot, setTot] = useState(0);
    const [flag, setFlag] = useState(1);

    //const axios_instance=axios.create({baseURL: 'http://localhost:3001'})
    
   
    const {name,phone,mail,address,id}=user
    console.log("user context",phone)
    console.log("address context",address)

    const [personalField,setPersonalField] = useState(true)
    const [addressField,setAddressField] = useState(false)
    const [orderField,setOrderField] = useState(false)

    const [addAddressField,setAddAddressField] = useState(false)

    const[address1Line1,setAddress1Line1]=useState("")
    const[address2Line1,setAddress2Line1]=useState("")
    const[address3Line1,setAddress3Line1]=useState("")

    const[address1Line2,setAddress1Line2]=useState("")
    const[address2Line2,setAddress2Line2]=useState("")
    const[address3Line2,setAddress3Line2]=useState("")

    const[address1Pin,setAddress1Pin]=useState("")
    const[address2Pin,setAddress2Pin]=useState("")
    const[address3Pin,setAddress3Pin]=useState("")

    const addressLine1=[address1Line1,address2Line1,address3Line1]
    const setAddressLine1=[setAddress1Line1,setAddress2Line1,setAddress3Line1]

    const addressLine2=[address1Line2,address2Line2,address3Line2]
    const setAddressLine2=[setAddress1Line2,setAddress2Line2,setAddress3Line2]

    const addressPin=[address1Pin,address2Pin,address3Pin]
    const setAddressPin=[setAddress1Pin,setAddress2Pin,setAddress3Pin]

    const[addressNo,setAddressNo]=useState(0)

    const [addressClicked,setAddressClicked]=useState(0)

    console.log(addressClicked)

    const navigate=useNavigate()

    useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator, item) {
          return accumulator + item.qty * item.price;
        }, 0);
        setTot(totalPrice);
        console.log(tot);
      }, [tot, flag]);

    const updateAddress=async()=>{
        let new_address=[]
        if(address){
            new_address=[
                ...address,
                {
                    "no":addressNo,
                    "line1":addressLine1[addressNo-1],
                    "line2":addressLine2[addressNo-1],
                    "pin":addressPin[addressNo-1]
                }
            ]
        }
        else{
            new_address=[
                {
                    "no":addressNo,
                    "line1":addressLine1[addressNo-1],
                    "line2":addressLine2[addressNo-1],
                    "pin":addressPin[addressNo-1]
                }
            ]
        }
        
        let updated_user={
            'name':name,
            'phone':phone,
            'mail':mail,
            'address':new_address
        }

        await updateUserByPhone(phone,new_address)   
        setAddAddressField(false) 
        await fetchData()
        localStorage.setItem('user',JSON.stringify(updated_user))
        
    }

    const fetchData = async () => {
        await getUserByPhone(phone).then((data) => {
            console.log("fetch data",data)
          dispatch({
            type: actionType.SET_USER,
            user: data[0],
          });
        });
       
      };

    const addAddress = ()=>{
        
        if(!address){
            console.log(0)
            setAddressNo(1)
        }
        else{
            setAddressNo(address.length+1)
            console.log("updated no",addressNo)
        }

        const users=getUserByPhone(phone)

        setAddAddressField(true)
    }


    useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator, item) {
          return accumulator + item.qty * item.price;
        }, 0);
        setTot(totalPrice);
        console.log(tot);

        if(address && address.length>0){
            setAddressClicked(1)
        }
      }, []);
    

    const checkOutHandler = async () =>{

        try{

            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

            let transaction_data={
                'user':{
                    'name':name,
                    'phone':phone,
                    'email':mail
                },
                'address':address[addressClicked-1],
                'order':cartItems,
                'amount':tot,
                'status':'received',
                'reference':null,
                'id':`TR-${Date.now()}`,
                'order_time':datetime.slice(11),
                'Scheduled-Time':null

            }

            console.log(transaction_data)
            
            await dispatch({
                type:actionType.SET_TRANSACTION,
                transaction:transaction_data
            })
            localStorage.setItem('transaction',JSON.stringify(transaction_data))

            navigate('/orderPlaced')

            /* const {data:{session_id}}=await axios_instance.post('api/checkoutCF')*/
            

            //cashfree part
            
            /* const checkoutData={
                customer_id:id,
                customer_email:mail,
                customer_phone:phone,
                amt:tot
            } 
            const {data:{session_id}}=await checkoutCF(checkoutData)
           

             console.log('sI',session_id)
            const cashfree1 = new window.Cashfree(session_id);
            cashfree1.redirect(); */


            //DO THIS WHEN PAYMENT GATEWAY IS UP
            /* const trial=await checkout()
            console.log(trial) */

            /* console.log(address)
            console.log(addressClicked)
        
            
        */
            /*  const {data:{key}}=await getKey()
            console.log("key",key)
            //const {data:{key}} = await axios.get(`api/getKey`,{}) //to get the key
            
            const checkoutData={
                data:{
                    amount:tot
                }
            }
            const {data:{order}}=await checkout(checkoutData) */
            
            /* const {data:{order}}=await axios.post(`api/checkout`,{
                data:{
                amount:tot
                }
            })
            console.log("order frontend",order) */
            
        
            /*  var options = {
                key: key, // Enter the Key ID generated from the Dashboard
                amount: order.amount*100, 
                currency: "INR",
                name: "FOOXT", //your business name
                description: "Test Transaction", 
                image: Logo,
                order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                callback_url: `${BASE_URL}/api/paymentVerification`,
                prefill: {
                    "name": name, //your customer's name
                    "email": mail,
                    "contact": phone
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#121212"
                }
            };
            var razor = await new window.Razorpay(options);
            razor.open();
            */
        }
        catch(err){
          console.log(err)
        }
      }

  return (
    <div className='w-screen h-[85vh] mt-4 bg-fooxtYellow flex flex-row justify-around p-10 '>
        <div className='w-[40vw] sm:w-[30vw] md:w-[20%] h-full bg-layoutBg flex flex-col justify-around items-center px-20 md:px-10 py-20 text-base  '> {/* buttons */}
        <button
            type="button"
            className={` md:w-[100%] border-none outline-none ${personalField?'bg-layoutHeading':'bg-unselectButton'} rounded-lg p-1  text-black text-center`}
            onClick={()=>{
                setPersonalField(true)
                setAddressField(false)
                setOrderField(false)
            }}
          >
            PERSONAL INFORMATION
          </button>
          <button
            type="button"
            className={` md:w-[100%] border-none outline-none ${addressField?'bg-layoutHeading':'bg-unselectButton'}  p-2 rounded-lg text-black`}
            onClick={()=>{
                setPersonalField(false)
                setAddressField(true)
                setOrderField(false)
            }}
          >
            ADDRESSES
          </button>
          <button
            type="button"
            className={` md:w-[100%] border-none outline-none ${orderField?'bg-layoutHeading':'bg-unselectButton'} p-2 rounded-lg text-black`}
            onClick={()=>{
                setPersonalField(false)
                setAddressField(false)
                setOrderField(true)
            }}
          >
            PAYMENT
          </button>
        </div>

       

        <div className='sm:min-w-[65vw] h-full bg-layoutBg md:mr-10 py-10 flex flex-col justify-center'> {/* actual form stuff */}
            {personalField && (
                <>
                    <div className="w-[60vw] md:w-[70%] py-2  flex justify-center items-center gap-2 mx-auto">
                        <MdAccountCircle className="text-xl text-fooxtYellow" />
                        <div className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-fooxtYellow">
                            Name
                        </div>
                    </div>
                    <div className="w-[60vw] md:w-[70%] py-2  flex justify-center items-center gap-2 mx-auto">
             
                        <div className="w-full h-full text-base bg-slate-200 rounded-lg outline-none border-none placeholder:text-gray-400 text-slate-500 p-5">
                            {name}
                        </div>
                    </div>

                    <div className="w-[60vw] md:w-[70%] py-2  flex justify-center items-center gap-2 mx-auto">
                        <MdCall className="text-xl text-fooxtYellow" />
                        <div className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-fooxtYellow">
                            Phone
                        </div>
                    </div>
                    <div className="w-[60vw] md:w-[70%] py-2  flex justify-center items-center gap-2 mx-auto">
             
                        <div className="w-full h-full text-base bg-slate-200 rounded-lg outline-none border-none placeholder:text-gray-400 text-slate-500 p-5">
                            {phone}
                        </div>
                    </div>

                    <div className="w-[60vw] md:w-[70%] py-2  flex justify-center items-center gap-2 mx-auto">
                        <MdEmail className="text-xl text-fooxtYellow" />
                        <div className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-fooxtYellow">
                            Email
                        </div>
                    </div>
                    <div className="w-[60vw] md:w-[70%] py-2  flex justify-center items-center gap-2 mx-auto">
             
                        <div className="w-full min-h-[10vh] text-base bg-slate-200 rounded-lg outline-none border-none placeholder:text-gray-400 text-slate-500 p-5">
                            {mail}
                        </div>
                    </div>
                </>
            )}

            {addressField && (
                <>
                    <div className={`w-auto md:w-[40%] h-[7vh] bg-layoutHeading rounded-lg mx-10 text-center flex justify-center items-center text-black ${addAddressField?'hidden':''}`}
                    onClick={()=>addAddress()}>
                        Add Address
                    </div>
                    <div className='w-full h-[1vh] bg-layoutBg my-4'></div>
                    <div className='w-[60vw] md:w-[90%] h-[85%] bg-layoutBg m-auto  border-layoutHeading md:border-0'>
                        {addAddressField && (
                        <div className='flex h-full flex-col justify-around p-4'>
                            <MdArrowCircleLeft className='text-fooxtYellow w-8 h-8 mx-full' onClick={()=>setAddAddressField(false)}/>

                            <div className='text-center text-white'>
                                ADDRESS-{addressNo}
                            </div>

                            <div className="w-[70%] py-2 border-b border-fooxtYellow flex justify-center items-center gap-2 mx-auto">
                                <MdHouse className="text-xl text-fooxtYellow" />
                                <input
                                type="text"
                                required
                                value={addressLine1[addressNo-1]}
                                onChange={(e) => {
                                    setAddressLine1[addressNo-1](e.target.value)
                                }}
                                placeholder="Line 1"
                                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-white text-white"
                                />
                            </div>

                            <div className="w-[70%] py-2 border-b border-fooxtYellow flex justify-center items-center gap-2 mx-auto">
                                <MdHouse className="text-xl text-fooxtYellow" />
                                <input
                                type="text"
                                required
                                value={addressLine2[addressNo-1]}
                                onChange={(e) => {
                                    setAddressLine2[addressNo-1](e.target.value)
                                }}
                                placeholder="Line 2"
                                className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-white text-white"
                                />
                            </div>

                            <div className="w-[70%] py-2  flex justify-center items-center gap-2 mx-auto">
                                <MdLocationSearching className="text-xl text-fooxtYellow" />
                                <input
                                type="number"
                                required
                                value={addressPin[addressNo-1]}
                                onChange={(e) => {
                                    setAddressPin[addressNo-1](e.target.value)
                                }}
                                placeholder="Pincode"
                                className="w-full h-full text-lg bg-transparent outline-none border-2 placeholder:text-white text-white"
                                />
                            </div>
                           {/*  <div className="w-[70%] py-2  flex justify-center items-center gap-2 mx-auto">
                               
                                <input
                                type="number"
                                required
                                value={address1Pin}
                                onChange={(e) => setAddress1Pin(e.target.value)}
                                placeholder="Pincode"
                                className="w-full h-full text-lg bg-transparent outline-none border-2 placeholder:text-gray-400 text-textColor"
                                />
                              
                                <input
                                type="number"
                                required
                                value={address1Pin}
                                onChange={(e) => setAddress1Pin(e.target.value)}
                                placeholder="Pincode"
                                className="w-full h-full text-lg bg-transparent outline-none border-2 placeholder:text-gray-400 text-textColor"
                                />
                            </div> */}
                            
                           {/*  So we can work on the city and state later on */}

                        <button
                        type="button"
                        className={` md:w-[30%] border-none outline-none bg-emerald-400 px-12 py-2 rounded-lg text-lg text-white font-semibold mx-auto ${(address && address.length==3)? 'hidden':""}`}
                        onClick={async()=>{
                            updateAddress()
                            
                        }}>
                            ADD ADDRESS
                        </button>
                        </div>


                        )}


                        <div className='flex flex-row flex-wrap h-full justify-around align-middle items-center'>

                        

                    {!addAddressField && address && address.length > 0 ? (
                      
                            address.map((item) => (
                           
                               

                                <div 
                                key={item?.no} 
                                className={`w-[40vw] h-auto md:w-[25vh] md:h-[25vh] flex flex-col justify-around  text-center rounded-lg p-1 ${(addressClicked==item?.no) ? ' bg-layoutHeading':'bg-slate-200'}`}
                                onClick={()=>setAddressClicked(item?.no)}
                                >
                                    
                                <p className="text-textColor font-semibold text-base md:text-lg">
                                    Address - {item?.no}
                                </p>
                                <p className="text-textColor font-semibold text-base md:text-lg">
                                    {item?.line1}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    {item?.line2} 
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    {item?.pin} 
                                </p>
                                </div>
                               
                          
                            ))
                          
                            )
                        
                         : (
                            <></>
                        )}
                        </div>
                    </div>
                    
                </>
            )}

            {orderField && (
                <>
                <div className=' w-auto md:w-[30%] h-[5vh] bg-layoutHeading rounded-lg mx-10 text-center flex justify-center items-center text-black' >
                        ORDER DETAILS
                </div>
                <div className="w-full h-300 md:h-42 md:px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none text-sm">
                {/* cart Item */}
                {cartItems &&
                cartItems.length > 0 &&
                cartItems.map((item) => (
                    <CartItem
                    key={item.id}
                    item={item}
                    setFlag={setFlag}
                    flag={flag}
                    />
                ))}
            </div>
            <div className="w-[90%] m-auto flex items-center justify-between">
              <p className="text-white text-lg">Sub Total</p>
              <p className="text-white text-lg">₹ {tot}</p>
            </div>
            <div className="w-[90%] m-auto flex items-center justify-between">
              <p className="text-white text-lg">Delivery</p>
              <p className="text-white text-lg">₹ 2.5</p>
            </div>

            <div className="w-[90%] m-auto border-b border-gray-600 my-2"></div>

            <div className="w-[90%] m-auto flex items-center justify-between">
              <p className="text-white text-xl font-semibold">Total</p>
              <p className="text-white text-xl font-semibold">
                ₹{tot + 2.5}
              </p>
            </div>

            <button
            type="button"
            className="my-[2vh] mx-auto  w-[60vw]  border-none outline-none bg-fooxtYellow px-12 py-2 rounded-lg text-lg text-fooxtBlack font-semibold"
            onClick={()=>{
                checkOutHandler()
            }}
          >
            CONFIRM
          </button>
                </>
            )}
        </div>

    {cartShow && <CartContainer/>}
    </div>
  )
}

export default Checkout