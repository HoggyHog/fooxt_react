import axios from "axios";
import {BASE_URL,FRONTEND_URL} from "./helper"



export const commonrequest = async(methods,url,body,header)=>{
   
    let config = {
        method:methods,
        url,
        headers:header ? 
        header
        :{
            "Content-Type":"application/json",
        },
        data:body
    }

    //axios instance
    return axios(config).then((data)=>{
        return data
    }).catch((error)=>{
        return error
    })
}


export const registerfunc = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/user/register`,data,header);
}

export const usergetfunc = async(search,gender,status,sort,page)=>{
    return await commonrequest("GET",`${BASE_URL}/user/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`,"");
}

export const singleUsergetfunc = async(id)=>{
    return await commonrequest("GET",`${BASE_URL}/user/${id}`,"");
}

export const editfunc = async(id,data,header)=>{
    return await commonrequest("PUT",`${BASE_URL}/user/edit/${id}`,data,header);
}

export const deletfunc = async(id)=>{
    return await commonrequest("DELETE",`${BASE_URL}/user/delete/${id}`,{});
}

export const statuschangefunc = async(id,data)=>{
    return await commonrequest("PUT",`${BASE_URL}/user/status/${id}`,{data})
}

export const getKey= async()=>{
    return await commonrequest("GET",`${BASE_URL}/api/getKey`,"");
}

export const checkout= async(data)=>{
    let header={
        "Content-Type":"application/json",
        Authorization: `Bearer sk_test_51MwlngSB3Cy1xTtxxCEceA2X0w8Q5EmQqnjzwGfyJSD55p3hZWjy85MjjUIJAMRFJSkqhHeyCqHZEebN5B72RWV500nvAH98Yz`,
        'Access-Control-Allow-Origin': FRONTEND_URL
    }

    console.log("checkout api",header)
    return await commonrequest("POST",`${BASE_URL}/checkout`,data,header)
}

export const sendSmsApi = async(data)=>{
    return await commonrequest("POST",`${BASE_URL}/sendSMS`,data)
}

export const transactionDets = async (order_id)=>{

    /* const header={
        "Content-Type":"application/json",
        'x-api-version': '2022-01-01',
        'x-client-id': appId,
        'x-client-secret':secret,
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "content-type",
        "Access-Control-Allow-Methods": "GET"
    } */
    const body={
        'order_id':order_id
    }
    return await commonrequest("POST",`${BASE_URL}/getOrder`,body)
}

export const checkoutCF = async (body)=>{
    return await commonrequest("POST",`${BASE_URL}/checkoutCF`,body)
}

export const whatsappBackend = async (body)=>{
    return await commonrequest("POST",`${BASE_URL}/whatsapp`,body)
}