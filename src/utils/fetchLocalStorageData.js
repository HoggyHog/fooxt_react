const logout_minutes=20 //minutes after which on page reload we shd logout the person
const logout_milliseconds=logout_minutes*60*1000

export const fetchUser = () => {
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

    const userLogin =
      localStorage.getItem("user_login") !== "undefined"
        ? JSON.parse(localStorage.getItem("user_login"))
        : null;

    //console.log((Date.now()-userLogin)/1000)

    //console.log(Date.now(),Number(userInfo.uid),logout_milliseconds)

    
  if ((userInfo) && (Date.now()-userLogin>logout_milliseconds)){
      console.log(userLogin,Date.now())
      console.log('timeout')
      localStorage.clear()
      return null
    }
  return userInfo;
};

export const fetchCart = () => {
  console.log('fetch Cart')
  const cartInfo =
    localStorage.getItem("cartItems") !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItems"))
      : localStorage.clear();

  return cartInfo ? cartInfo : [];
};
