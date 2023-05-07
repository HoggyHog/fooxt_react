//inbuilt functions
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
  deleteDoc,
  updateDoc
} from "firebase/firestore";





import { firestore } from "../firebase.config"; //the firestore instance for our project

// Saving new Item
export const saveItem = async (data) => {
  //so the first entry in the setDoc is of the format doc(<firestore instance>,<name of db>,<name of entry>) 
  //and since we're going with time, itll def be quite unique. Then the 2nd entry is the data itself
  await setDoc(doc(firestore, "foodItems", data['id']), data, {
    merge: true,
    //this merge just combines the two documents if its got the same name (highly unlikely tho)
  });
};

export const saveUser = async (data) => {
  await setDoc(doc(firestore, "users", `${data['id']}`), data, {
    merge: true, 
  });
};

// getall food items
export const getAllFoodItems = async () => {
  //p intuitive, but just some formatting required tho
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
  //returning an array of only the doc data for the items 
};

export const getUserByPhone = async (phone)=>{
  const users=await getDocs(
    query(collection(firestore,'users'),where("phone","==",phone))
  )
  return users.docs.map((doc) => doc.data())
}

export const updateUserByPhone = async (phone,new_address)=>{
  const users=await getUserByPhone(phone)
  console.log(users[0])
  let id=users[0]['id']
  console.log(id)
  let userRef= doc(firestore,"users",id)
  await updateDoc(userRef,{
    address:new_address
  })
  const users_new=await getUserByPhone(phone)
  let id_new=users_new[0]['id']
  console.log(id_new)
}

export const saveTransaction = async(transaction)=>{
  await setDoc(doc(firestore, "transactions", transaction['id']), transaction, {
    merge: true, 
  });
}

export const saveCollab = async(collab)=>{
  await setDoc(doc(firestore, "collaborations", collab.id), collab, {
    merge: true, 
  });
}

export const saveFeedback = async(fb)=>{
  await setDoc(doc(firestore, "feedback", fb.id), fb , {
    merge: true, 
  });
}

export const getTransactionByRef = async (ref)=>{
  const users=await getDocs(
    query(collection(firestore,'transactions'),where("reference","==",ref))
  )
  return users.docs.map((doc) => doc.data())
}

export const checkIfNumberExists = async (number)=>{
  const users=await getDocs(
    query(collection(firestore,'users'),where("phone","==",number))
  )
  console.log('function',users)
  if (!users){
    return false
  }
  else{
    return true
  }
}

export const getTransactionsByPhone = async (number) =>{
  const transactions=await getDocs(
    query(collection(firestore,'transactions'),where("user.phone","==",number))
  )
  return transactions.docs.map((doc) => doc.data())
}



