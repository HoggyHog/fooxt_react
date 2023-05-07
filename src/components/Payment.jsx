import React, { useEffect,useState } from 'react'
import { useSearchParams,useNavigate } from 'react-router-dom'
import { useStateValue } from '../context/StateProvider'
import { actionType } from "../context/reducer";
import { getTransactionByRef, saveTransaction } from '../utils/firebaseFunctions';
import emailjs from '@emailjs/browser';
import axios from 'axios'
import { transactionDets, whatsappBackend } from '../services/apis';

const Payment = () => {
    const navigate=useNavigate()
    const searchQuery=  useSearchParams()[0]
    const refNum= searchQuery.get("reference")
    const [{transaction},dispatch]=useStateValue()
    const [success,setSuccess]=useState(null)
    const [ref_Id,setRef_Id]=useState(null)
    const [tr_Id,setTr_Id]=useState(null)

    async function update_State(){
        console.log(transaction)
        //let updated_transaction=transaction

        let updated_transaction=JSON.parse(localStorage.getItem('transaction'))


        updated_transaction['status']='confirmed'
        updated_transaction['reference']=refNum
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
        setTr_Id(updated_transaction.id)
        await saveTransaction(updated_transaction)
        console.log(transaction)   
    }

    const sendMail=()=>{
        try{
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
                chef:"Diksha",
                message:message,
                line1:address_del['line1'],
                line2:address_del['line2'],
                pin:address_del['pin']
            };
            
            emailjs.send('service_spvysjr', 'template_lu5qpt4', templateParams,'-vhOihcUUGYFtqbx9')
                .then(function(response) {
                console.log('SUCCESS! mail sent');
                }/* function(error) {
                console.log('FAILED... mail not sent', error);
                } */);

            localStorage.setItem("transaction", JSON.stringify([]));
        }
        catch(e){
            console.log('error mail',e)
        }
    }

    const sendWs=async(body)=>{
        const response=await whatsappBackend(body)
    }

    useEffect(()=>{
        

        const queryParameters = new URLSearchParams(window.location.search)
        const order_id = queryParameters.get("order_id")
        console.log('orderid',order_id)
        const run=async()=>{
            const response=await transactionDets(order_id)
            if(response.data.msg=='PAID'){
                setSuccess(true)
                setRef_Id(response.data.data.cf_order_id)

                
                update_State()
                sendMail()

            }
            else{
                setSuccess(false)
            }
        }
        run()
    },[])

   



    setTimeout(()=>{
        
        navigate('/')
    },5000)
  
  return (
    <div className='w-screen md:-mt-15 md:-ml-10 -mt-16 -ml-4 h-screen flex flex-col align-center justify-center items-center'>
    {success&&(
        <>

            <div>Payment Successful</div>
            <div>Payment Reference Number : {ref_Id}</div>
            <div>Order Reference Number : {tr_Id}</div>
            <div>Details of the transaction will be mailed shortly</div>
        
            <div className='mt-5'>Redirecting to home page in a few seconds</div>
        </>
    )}
    {!success&&(
        <>

            <div>Payment Failed</div>
           
            <div>Please Try Again</div>
        
            <div className='mt-5'>Redirecting to home page in a few seconds</div>
        </>
    )}
    </div>
    
  
  )
}

export default Payment