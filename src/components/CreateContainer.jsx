import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
//icons

import { categories } from "../utils/data";
//categories of food

import Loader from "./Loader";
//loading animation

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
//inbuilt functions

import { storage } from "../firebase.config";
//taking in only the storage instance

import { getAllFoodItems, saveItem } from "../utils/firebaseFunctions";
//functions to save items and retrieve items

import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
//few context stuff

const CreateContainer = () => {
  const [title, setTitle] = useState("");  
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  //state variables for the form inputs

  const [fields, setFields] = useState(false);  //variable to display the div showing the message on uploadImage
 
  const [alertStatus, setAlertStatus] = useState("danger"); //color grading for the message to be shown
  
  const [msg, setMsg] = useState(null); //message to be shown at that time

  const [isLoading, setIsLoading] = useState(false); //toggle for the loading gif

  const [{ user,foodItems }, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true); //sets the loading gif on inside the image area
    const imageFile = e.target.files[0]; //the file itself comes in as the parameter
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`); //prolly just the name
    const uploadTask = uploadBytesResumable(storageRef, imageFile); //putting in both the name and the file

    uploadTask.on(
      "state_changed",
      //this code runs anyway
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },

      //this code runs on error
      (error) => {
        console.log(error);
        setFields(true); //to make the div visible for 4 seconds
        setMsg("Error while uploading : Try AGain 🙇");
        setAlertStatus("danger");
        //these 2 mentions the type of content (check the first div in the return)
        setTimeout(() => {
          setFields(false); //stop display of the message
          setIsLoading(false);  //stop the spinning
        }, 4000);
      },

      //this code tuns on success
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        
          setImageAsset(downloadURL);//state variable to store the image address
          
          //similar logic as the error code
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

  //this function kinda does similar stuff to the previous one
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
      //to make sure no field is empty
      if (!title || !calories || !imageAsset || !price || !category) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } //if not then save it 
      else {
        const data = {
          id: `IT-${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };
        saveItem(data);  //from the firebaseFunctions
        setIsLoading(false);
        setFields(true);
        setMsg("Data Uploaded successfully 😊");
        setAlertStatus("success");
        //all the same message details
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData(); //data is cleared out on successful saving
      }
    } catch (error) //any error in this whole try block
     {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try AGain 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchData(); //just to update the context with the latest food items
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory("Select Category");
  };

  const fetchData = async () => {
    console.log("food item dispatch")
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  return (
    
    <div className="w-full min-h-screen flex items-center justify-center">
     {/*  Authentication to make sure that the page is accessible only to the admin */}
      { user.email === 'connectfooxt@gmail.com' && (
      <div className="w-[90%] md:w-[50%] border border-fooxtYellow rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {/* so basically on uplaoding the image, this is to either show if it was a success or failure, so the fields state is set 
        on for 4 seconds showing the message (check uploadImage function)  */}
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

    {/*     Title field, using some simple type in logic, as it changes, the state also does, and the placeholder gets updated just like that */}
        <div className="w-full py-2 border-b border-fooxtYellow flex items-center gap-2">
          <MdFastfood className="text-xl text-fooxtYellow" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full">
          <select
          //just slightly different change in state value
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {/* mapping out all the category values as options */}
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        {/* For the image field */}
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-fooxtYellow w-full h-225 md:h-340 cursor-pointer rounded-lg">
          {/* this gif comes up when the isLoading is set True on the uploadImage function */}
          {isLoading ? (
            <Loader />
          ) : (
            <>
            {/* untill the isLoader becomes true, we got this boi which checks if the imageAsset state variable is null, so that we can accept an image */}
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-fooxtYellow" />
                      <p className="text-gray-500 hover:text-fooxtYellow">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      //so finally this function gets run on putting in an image
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                /* this is if the imageAsset isnt null, (basically meaning that it got some value, as some pic got into the storage (thats how itll have a url)) */
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded image"
                      className="w-full h-full object-cover"
                    />
                    {/* Triggers the deleteImage function */}
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          {/* Calories field  (Kinda the same as the name field) */}
          <div className="w-full py-2 border-b border-fooxtYellow flex items-center gap-2">
            <MdFoodBank className="text-fooxtYellow text-2xl" />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          {/* Price field  (Kinda the same as the name field) */}
          <div className="w-full py-2 border-b border-fooxtYellow flex items-center gap-2">
            <MdAttachMoney className="text-fooxtYellow text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>

       {/*  Finally the save button */}
        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>)}

     {/*  Error message to login with admin email */}
      { user.email !== 'connectfooxt@gmail.com' && (
      <div>
        Authentication required <br/> Login from admin Email
      </div>)}
    </div>
  );
};

export default CreateContainer;
