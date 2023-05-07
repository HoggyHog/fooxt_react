import React, { useState } from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";





import Logo from "../img/logo.png";
import Avatar from "../img/account.png";
import { Link,useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
 
  //for google login

  const navigate=useNavigate()
  //for the navigation in the logout screen (to come back to the main screen on logout)

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);
  //toggle state for the options to open up on clicking the user icon

  const login = async () => {
    if (!user)  //if not logged in yet, then we prompt the login modal, and then store the user data into the state 
    //and also the local storage so that the user doesnt log out on reload (if we had it in the state variable, then it gets removed on reload)
      {
      /* const {
        user: { refreshToken, providerData }, //just taking the providerData from the response, that user thing is just open up the dictionary
      } = await signInWithPopup(firebaseAuth, provider);
      //update the context with the user data
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      //also put it up on localStorage
      localStorage.setItem("user", JSON.stringify(providerData[0])); */

      /* SO AT LEAST AT INSTI LEVEL, MAKES SENSE TO NOT GO FOR GOOGLE AUTH, BUT JUST NORMAL FORM SIGN IN SHOULD DO */

      navigate('/user')


    } else {

      //if the user is logged in and the icon is clicked, this button just toggles the showMenu which is to show the options for the user
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    console.log('logout')
    
    navigate('/')
    //to get back to the main screen on login [cos there was an issue on going to createItem and then logging off]

    //hides the user options
    setIsMenu(false);
    //removes all the things we stored about the user
    localStorage.clear();

    //removing all data from the context about the user
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  
  const showCart = (cond) => {
    if(cond){   //cond=true if we want to hide it
      dispatch({
        type: actionType.SET_CART_SHOW,
        cartShow: false,
      });
    }          
    else{      //if cond=false -> we want to toggle it
      dispatch({
        type: actionType.SET_CART_SHOW,
        cartShow: !cartShow,
      });
    }
    
    //toggle functionality for the showCart
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-fooxtBlack">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between" >
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-24 object-cover" alt="logo" />
          
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-24 "
          >
            <Link to={'/'} onClick={()=>showCart(true)}>
              <span className="text-lg text-white hover:text-fooxtYellow duration-100 transition-all ease-in-out cursor-pointer">
                Home
              </span>
            </Link>
            <Link to={'/menu'} onClick={()=>showCart(true)}>
              <span className="text-lg text-white hover:text-fooxtYellow duration-100 transition-all ease-in-out cursor-pointer">
                Menu
              </span>
            </Link>
            {/* <Link to={'/aboutUs'}>
            <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li></Link> */}
            <Link to={'/wallet'}>
            <li className="text-lg text-white hover:text-fooxtYellow duration-100 transition-all ease-in-out cursor-pointer">
              Wallet
            </li></Link>
          </motion.ul>

          <div
            className="relative flex items-center justify-center"
            onClick={()=>showCart(false)}
          > {/* button to toggle with the cart div , the cart however comes in the MainContainer.jsx with this as a conditional jsx*/}

            <MdShoppingBasket className="text-white text-2xl  cursor-pointer" />
            {/* to display the number of items in the cart */}
            {cartItems && cartItems.length > 0 && (
              <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>

          <div className="relative">

            <motion.img
              whileTap={{ scale: 0.8 }}
              src={Avatar}
              //if logged in, show the gmail photo
              className={`w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full ${user?"bg-fooxtYellow":"bg-white"}`}
              alt="userprofile"
              onClick={login}
              //check out the login function
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {/* shows this option only if the user is the auth, and to go to a screen where we can put in food items to the firebase */}
                {user && user.mail === "connectfooxt@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <Link to={"/myOrders"}>
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={() => setIsMenu(false)}
                >
                  My Orders 
                </p></Link>

                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full ">
        <div
          className="relative flex items-center justify-center"
          onClick={()=>showCart(false)} 
        >
          <MdShoppingBasket className="text-white text-2xl  cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>

        <Link to={"/"} className="flex items-center gap-2" >
          <img src={Logo} className="w-20 object-cover" alt="logo" />
       
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={Avatar}
            className={`w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full ${user?"bg-yellow-400":"bg-white"} `}
            alt="userprofile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
            >
              {user && user.mail === "connectfooxt@gmail.com" && (
                <Link to={"/createItem"}>
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col ">
                <Link to={'/'}>
                <span
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2 mt-2"
                  onClick={() => {
                    setIsMenu(false)
                    showCart(true)
                  }}
                >
                  Home
                </span></Link>
                <Link to={'/menu'}>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => {
                    setIsMenu(false)
                    showCart(true)
                  }}
                >
                  Menu
                </li></Link>
                {/* <Link to={'/aboutUs'}>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  About Us
                </li></Link> */}
                <Link to={'/myOrders'}>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  My Orders
                </li></Link>
              </ul>

              <p
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-fooxtYellow transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
