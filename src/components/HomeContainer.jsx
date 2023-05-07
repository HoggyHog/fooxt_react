import React, { useEffect } from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";

import { Link } from "react-router-dom";
//import { getKey } from "../services/apis";



const HomeContainer = () => {

  /* useEffect(()=>{
    const run=async()=>{
      
      console.log("key",key)
    }
    run()
  },[]) */
  return (
    <section
      className=" w-screen md:h-[80vh] h-[80vh]"
      id="home"
    >
      <div className=" h-full flex justify-around flex-col bg-fooxtBlack text-center">
        {/* <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={Delivery}
              className="w-full h-full object-contain"
              alt="delivery"
            />
          </div>
        </div> */}
        <div>
        <p className="lg:text-title text-[4.5rem] font-bold tracking-wide text-fooxtYellow">
            Fooxt
          
        </p>
          <span className="text-white  text-[3rem] lg:text-[5rem]">
            as natural as <span className="text-fooxtYellow">YOU</span> are.
          </span>
        </div>
        

        <p className="text-basesm:text-xl text-white text-center w-[80%] mx-auto">
        Fooxt is an upcoming food technology startup comprising a small team committed to delivering health at your doorsteps and integrating sustainable nutrition habits into your lifestyles.
        </p>

       <Link to={'/menu'}>
        <button
          type="button"
          className="bg-fooxtYellow md:w-auto px-4 py-2 text-fooxtBlack rounded-2xl hover:shadow-lg transition-all ease-in-out duration-100"
          onClick={()=>{
           /*  document.querySelector('[id="menu"]').scrollIntoView(); */
          }}
        >
          Order Now
        </button></Link>
      </div>
      
    </section>
  );
};

export default HomeContainer;
