import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, Header, MainContainer, MenuContainer,User,Payment,Checkout,Order, Footer, Orders, AboutUs, Animation, Wallet} from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";



const App = () => {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    console.log("food item dispatch")
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence mode='wait'>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-14 md:mt-20 pt-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/menu" element={<MenuContainer />} />
            <Route path="/user" element={<User/>} />
           {/*  <Route path="/aboutUs" element={<AboutUs/>} /> */}
            <Route path='/wallet' element={<Wallet/>} />
            <Route path='/paymentSuccess' element={<Payment/>} />
            <Route path='/checkout' element={<Checkout/>} />
            <Route path='/orderPlaced' element={<Order/>} />
            <Route path='/myOrders' element={<Orders/>} />
            <Route path='/animate' element={<Animation/>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </AnimatePresence>
  );
};

export default App;
