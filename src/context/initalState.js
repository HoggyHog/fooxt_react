import { fetchCart, fetchUser } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();
const cartInfo = fetchCart();

export const initialState = {
  user: userInfo,
  foodItems: null,
  cartShow: false,
   //condition to check if to show the cart (gets toggled with the cart button)
   
  cartItems: cartInfo,
  transaction:null
   // is from the localStorage, stored and updated through the plus marks in each item on row containers and retrieved to show on the cartMenu
};
