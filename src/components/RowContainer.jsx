import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket, MdCancel } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";


const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();

  const[openCard,setOpenCard]=useState(null)
  const[cardData,setCardData]=useState({})
  const[prevData,setPrevData]=useState(data)
  
  console.log(openCard)
  const [items, setItems] = useState([]);
  const [updateItems, setUpdateItems] = useState(false)
  //point of this is to not let the cart Item to be null on changing screens
  //so the add to cart function is run only when we mention it particularly

  const [{ cartItems,foodItems }, dispatch] = useStateValue();
  console.log(cartItems)
  console.log("foodItems",foodItems)

  const addtocart = (new_cart) => {
    console.log('row container')
    console.log('items',new_cart)
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: new_cart,
    });
    localStorage.setItem("cartItems", JSON.stringify(new_cart));
    
  };

  useEffect(()=>{
    if(prevData!=data){
      setOpenCard(null)
      setPrevData(data)
    }
})


  useEffect(()=>{
    if(openCard!=null){
      console.log('oof')
      let i,cardItem

    for (i in data){
      if(data[i]['id']==openCard){
        console.log("whatye",i)
        cardItem=data[i]
      }
    }
    let cardInfo={
      "calories":cardItem['calories'],
      "category":cardItem['category'],
      "imageURL":cardItem['imageURL'],
      "price":cardItem['price'],
      "qty":cardItem['qty'],
      "title":cardItem['title'],
      "desc":cardItem['desc']
    }

    setCardData(cardItem)
    }
    

  },[openCard])
  

  useEffect(()=>{
    console.log('food item changed')
  },[foodItems])

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  const updateCart = (item)=>{
    console.log(item.qty)
    let cart_copy=[]
    if(cartItems.includes(item)){
      cart_copy=cartItems
      for(let i in cart_copy){
        console.log(cart_copy[i])
        if(cart_copy[i]==item){
          cart_copy[i].qty+=1
          console.log(cart_copy[i].qty)
        }
      }
    }
    else{
      cart_copy=[...cartItems,item]
    }

    addtocart(cart_copy)
  
  }

 /*  useEffect(() => {
    //so that whole cart being set to null was because on changing screens, the state value of items was becoming
    //null, so I just made an update to run the function only when i specify to, and not on changing screens
    /* if(updateItems){
      addtocart();
      setUpdateItems(false)
    }
    console.log('add to cart')
  }, [items]); */ 

  return (
    <>
    <div className={`w-screen ${
      openCard
          ? "h-[60vh]"
          : ""
      }`}>
    
      {openCard!=null?(
        <motion.div      
         className="md:h-[40vh] md:w-[40vw] w-[90vw] h-[50vh]  md:min-w-[300px] z-2 bg-fooxtBlack rounded-lg py-2 px-4 my-20 mx-[5vw] md:mx-[30vw] backdrop-blur-lg hover:drop-shadow-lg flex flex-col  justify-evenly absolute "
         initial={{ scale: 0.6 }}
         animate={{scale:1}}
         transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="">
          <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-10 h-10 rounded-full bg-fooxtYellow flex items-center justify-center cursor-pointer hover:shadow-md -mt-0  text-fooxtBlack -mx-[4%] md:-mx-[0%]"
              onClick={() => {
                setOpenCard(null)
                  
                }}
            >
              <MdCancel className="text-fooxtBlack w-5 h-5"/>
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-10 h-10 rounded-full bg-fooxtYellow flex items-center justify-center cursor-pointer hover:shadow-md -mt-10 md:mx-[93%] mx-[90%]"
              onClick={() => {
                setUpdateItems(true)
                updateCart(cardData) 
                }}
            >
              <MdShoppingBasket className="text-fooxtBlack h-5 w-5" />
            </motion.div>
           
          </div>
          <p className="text-white font-semibold text-sm md:text-lg text-center">
             {cardData.title}
          </p>
          
          <div className="w-full h-52 flex items-center bg-fooxtBlack">
         
           <motion.div
             className="w-52 h-52  drop-shadow-2xl"
           >
             <img
               src={cardData.imageURL}
               alt=""
               className="w-full h-full object-contain"
             />
           </motion.div>

          <div className="w-1 h-full bg-fooxtYellow mx-5"></div>

          <div className="flex items-center gap-8">
              <div>
                <p className="mt-1 text-sm text-white">
                  {cardData.calories} Calories
                </p>
                <p className="text-lg text-white font-semibold">
                  <span className="text-sm text-fooxtYellow">₹</span> {cardData.price}
                </p>
                <p className="text-lg text-white font-semibold">
                   {cardData.desc}
                </p>
              </div>
          </div>
            
           
         </div>

         {/* <div className="w-full flex flex-col items-end justify-end -mt-8">
           
          
           
         </div> */}
       </motion.div>

      ):(
        <div>
        </div>
      )}

      </div>
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3  my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }
      ${
        openCard
          ? "hidden"
          : ""
      }`}
    >
      
      {data && data.length > 0 ? (
        data.map((item) => (
          
          <motion.div 
            key={item?.id}
            className={`w-[175px] h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-fooxtBlack rounded-lg py-2 px-4  my-12 mx-6 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative`}
            whileHover={{ scale: 1.2 }}
            onClick={()=>{
              if(item?.status!='coming'){
                setOpenCard(item?.id)
              }
            }}
          >
            {item?.status=='coming'?(
              <div className="text-white absolute z-5">
                COMING SOON
              </div>
            ):
            (
              <>
                <div className="w-full flex items-center justify-between">
              <motion.div
                className="w-32 h-36 -mt-8 drop-shadow-2xl rounded-lg object-contain"
               
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className="w-full h-full object-contain rounded-lg"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-fooxtYellow flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                onClick={() => {
                  setUpdateItems(true)
                  updateCart(item)
                  }}
              >
                <MdShoppingBasket className="text-fooxtBlack " />
              </motion.div>
                </div>

                <div className="w-full flex flex-col items-end justify-end -mt-8">
                  <p className="text-white font-semibold text-sm p-2">
                    {item?.title}
                  </p>
                  <p className="mt-1 text-sm text-white">
                    {item?.calories} Calories
                  </p>
                  <div className="flex items-center gap-8">
                    <p className="text-lg text-white font-semibold">
                      <span className="text-sm text-fooxtYellow" >₹</span> {item?.price}
                    </p>
                  </div>
                </div>
              </>
            )}
            
          </motion.div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
    </>
  );
};

export default RowContainer;
