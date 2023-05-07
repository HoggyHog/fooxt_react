

import React,{useState,useEffect} from 'react'

import { useStateValue } from "../context/StateProvider";

import CartItem from "./CartItem";


import { actionType } from "../context/reducer";

import { MdAccountCircle,MdCall,
    MdEmail, MdHouse, MdLocationSearching} from 'react-icons/md';
import { getUserByPhone, updateUserByPhone , getTransactionsByPhone } from '../utils/firebaseFunctions';
import { getKey,checkout } from '../services/apis';
import { useNavigate } from 'react-router-dom';
import CartContainer from "./CartContainer";


const Checkout =() => {

    const BASE_URL=process.env.BASE_URL
    console.log("base",BASE_URL)
    const [{ cartShow, cartItems, user }, dispatch] = useStateValue();

    const [tot, setTot] = useState(0);
    const [flag, setFlag] = useState(1);
    
   
    const {name,phone,mail,address}=user
    
    
    const [currentField,setCurrentField] = useState(true)
    const [previousField,setPreviousField] = useState(false)
    const [transactions,setTransactions]=useState(null)

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

    const previousOrders=[]
    const currentOrders =[]

    const OrdersDict={} //to store the display string for the orders
    

    console.log(addressClicked)

    const navigate=useNavigate()

    useEffect(()=>{

        const getTData =async()=>{
            const get_transactions= await getTransactionsByPhone(phone)
            setTransactions(get_transactions)
        }
        getTData()

    },[])

    for (let i in transactions){
        let j=transactions[i]
        // status CODES -> 'received' -> gone to chef
        //'prepared' -> on the way to delivery
        //'reached' -> order completed
        if(j.status=='reached'){
            previousOrders.push(j)
            
        }
        else{
            currentOrders.push(j)
            
        }
        //OrdersDict[j.id]=order_string(j.order)
    }
    

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
      }, []);

    const order_string= (list)=>{
        var orderString=''
        list.map((item)=>{
            console.log(item.title)
            orderString=orderString.concat(`Item: ${item.title} \t Qty: ${item.qty} \n`)
        })
        console.log(list)
        console.log(orderString)
        return orderString
    }
    
    

    const checkOutHandler = async () =>{

        try{

            //DO THIS WHEN PAYMENT GATEWAY IS UP
            /* const trial=await checkout()
            console.log(trial) */

        console.log(address)
        console.log(addressClicked)
        var currentdate = new Date(); 
        var datetime = "Last Sync: " + currentdate.getDate() + "/"
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
            'status':'awaiting',
            'reference':null,
            'id':`TR-${Date.now()}`,
            'order-time':datetime,
            'Scheduled-Time':null

        }

        console.log(transaction_data)
        
        await dispatch({
            type:actionType.SET_TRANSACTION,
            transaction:transaction_data
        })
        localStorage.setItem('transaction',JSON.stringify(transaction_data))

        navigate('/orderPlaced')
    
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
        <div className='w-[25vw] md:w-[20%] h-full bg-layoutBg flex flex-col justify-around items-center px-10 py-20 '> {/* buttons */}
        <button
            type="button"
            className={` md:w-[100%] border-none outline-none  ${currentField?'bg-layoutHeading':'bg-unselectButton'} rounded-lg p-2 text-lg text-black text-center`}
            onClick={()=>{
                setCurrentField(true)
                setPreviousField(false)
               
            }}
          >
            CURRENT ORDERS
          </button>
          <button
            type="button"
            className={` md:w-[100%] border-none outline-none  ${!currentField?'bg-layoutHeading':'bg-unselectButton'} rounded-lg p-2 text-lg text-black text-center`}
            onClick={()=>{
                setCurrentField(false)
                setPreviousField(true)
               
            }}
          >
            PREVIOUS ORDERS
          </button>
         
        </div>

        


        <div className='min-w-[70vw] md:w-[70%] h-full bg-layoutBg mr-10 py-10'> {/* actual form stuff */}
            {currentField && (
                <>
                    <div className='w-auto h-[7vh] bg-layoutHeading rounded-lg mx-10 text-center flex justify-center items-center text-black font-semibold tracking-wide'>Current Orders</div>
                    <div className='w-full h-[1vh] bg-orange-1000 my-4'></div>
                    <div className='w-[90%] h-[80%] bg-white m-auto rounded-lg'>
                    <div className='flex flex-col h-full  align-middle items-center overflow-y-scroll scrollbar-none'>
                      {
                        currentOrders.length>0?(
                            
                            currentOrders.map((item)=>(
                                
                                <div
                                key={item?.id} 
                                className={`w-full h-auto md:h-[25vh]  flex flex-row  rounded-lg  bg-transBody p-5 border-4 border-transOut`}
                                >
                                    <div className='w-[40%] h-full bg-transBody'>
                                        <div className='font-bold text-sm'>
                                            ORDER PLACED ON:  
                                        </div>
                                        <span className='decoration-neutral'>{item.order_time}</span>
                                        <div className='font-bold text-sm'>
                                            ORDER :  
                                        </div>
                                        <span className='text-sm'>{order_string(item.order)}</span>
                                    </div>
                                    <div className='w-[60%] h-full bg-transBody flex flex-col justify-start md:justify-center items-center text-center mx-4 md:mx-0'>
                                        <div className='h-12 w-32 bg-transBody rounded-lg border-4 border-transOut py-2'>
                                            {`${(item.status=='received')? 'PREPARING ORDER':'ON DELIVERY'}`}
                                        </div>
                                        
                                    </div>
                                </div>
                        )))
                        :
                        (
                            <></>
                        )
                      }  
                      
                      </div>
                    </div>
                </>
            )}

            {previousField && (
                <>
                    <div className='w-auto h-[7vh] bg-layoutHeading rounded-lg mx-10 text-center flex justify-center items-center text-black font-semibold tracking-wide p-2'>Previous Orders</div>
                    <div className='w-full h-[1vh] bg-orangw-100 my-4'></div>
                    <div className='w-[90%] h-[80%] bg-white m-auto rounded-lg'>
                    <div className='flex flex-col h-full  align-middle items-center overflow-y-scroll scrollbar-none'>
                      {
                        previousOrders.length>0?(
                            
                            previousOrders.map((item)=>(
                                
                                <div
                                key={item?.id} 
                                className={`w-full h-auto md:h-[25vh]  flex flex-row  bg-transBody p-5 border-4 border-transOut  my-5`}
                                >
                                    <div className='w-[40%] h-full bg-transBody'>
                                        <div className='font-bold'>
                                            ORDER PLACED ON:  
                                        </div>
                                        <span className='decoration-neutral'>{item.order_time}</span>
                                        <div className='font-bold'>
                                            ORDER:  
                                        </div>
                                        <span className='text-sm'>{order_string(item.order)}</span>
                                    </div>
                                    
                                </div>
                        )))
                        :
                        (
                            <></>
                        )
                      }  
                      
                    </div>
                    </div>                  
                </>
            )}

        </div>
        {cartShow && <CartContainer />}
    </div>
  )
}

export default Checkout