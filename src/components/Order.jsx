import React, { useEffect } from 'react'
import { useSearchParams,useNavigate } from 'react-router-dom'
import { useStateValue } from '../context/StateProvider'
import { actionType } from "../context/reducer";
import { getTransactionByRef, saveTransaction } from '../utils/firebaseFunctions';
import emailjs from '@emailjs/browser';
import { sendSmsApi } from '../services/apis';

const Order = () => {
    const navigate=useNavigate()
    const searchQuery=  useSearchParams()[0]
    //const refNum= searchQuery.get("reference")
    const [{transaction},dispatch]=useStateValue()

    useEffect(()=>{
        async function update_State(){
            console.log(transaction)
         
    
            let updated_transaction=JSON.parse(localStorage.getItem('transaction'))
    
    
            updated_transaction['status']='confirmed'
            //updated_transaction['reference']=refNum
            console.log(updated_transaction)
            dispatch({
                type:actionType.SET_TRANSACTION,
                transaction:updated_transaction
            })
            dispatch({
                type: actionType.SET_CARTITEMS,
                cartItems: [],
              });
            localStorage.setItem("cartItems", JSON.stringify([]));
            localStorage.setItem('transaction',JSON.stringify(updated_transaction))
            await saveTransaction(updated_transaction)
            console.log(transaction)
            //sendMail()
        }
        update_State()
        //sendMail()
    },[])

    const sendMail=()=>{
        let local_transaction=JSON.parse(localStorage.getItem('transaction'))
        let ref=local_transaction['id']

        let order=local_transaction['order']
        let address_del=local_transaction['address']

        let message=""
        
        for(let i in order){
            message+=`${order[i].title} \t Qty: ${order[i].qty} \n`
        }

        var templateParams = {
            tr_id: ref,
            chef:"Uma",
            message:message,
            line1:address_del['line1'],
            line2:address_del['line2'],
            pin:address_del['pin']
        };
         
        emailjs.send('service_spvysjr', 'template_lu5qpt4', templateParams,'-vhOihcUUGYFtqbx9')
            .then(function(response) {
               console.log('SUCCESS! mail sent');
            }, function(error) {
               console.log('FAILED... mail not sent', error);
            });

        localStorage.setItem("transaction", JSON.stringify([]));
    }

    const sendSms=()=>{
        console.log('sms    ')
        const order=(transaction['order'])
        let order_string="{\n"
        order.map((item)=>{
            order_string+=`ITEM - ${item.title}, QTY -${item.qty} \n`
        })
        order_string+='}'
        //console.log(order_string)
        const data={
            'message':`FOOXT-ORDER PLACED \n Items-[${order_string}] \n Scheduled Time - ${transaction['Scheduled-Time']}`
        }
        
        sendSmsApi(data)
    }

    setTimeout(()=>{
        
        navigate('/')
    },5000)
  
  return (
  <div className='w-screen md:-mt-15 md:-ml-10 -mt-16 -ml-4 h-screen flex flex-col align-center justify-center items-center'>
    <div>Order Placed Successfully</div>
    <div>{`Reference Number : ${transaction['id']}`}</div>
    <div className='text-center'>You can check for the status of the order in My Orders Tab</div>

    <div className='mt-5'>Redirecting to home page in a few seconds</div>
  </div>
  
  )
}

export default Order