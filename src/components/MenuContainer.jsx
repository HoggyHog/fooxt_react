import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";

import CartContainer from "./CartContainer";

const MenuContainer = () => {
  const [filter, setFilter] = useState("fresh");

  const [{ foodItems ,cartShow}, dispatch] = useStateValue();

  return (
    <section className="w-full h-auto min-h-[100vh]  bg-fooxtYellow -mb-4" id="menu">
      <div className="w-full  flex flex-col items-center justify-center">
        {/* <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Our Hot Dishes
        </p> */}

        <div className="w-auto flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar scrollbar-fooxtYellow m-auto">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                className={`group ${
                  filter === category.urlParamName ? "bg-fooxtBlack hover:bg-white" : "bg-card hover:bg-fooxtBlack"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center  `}
                onClick={() => setFilter(category.urlParamName)}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === category.urlParamName
                      ? "bg-white group-hover:bg-fooxtBlack "
                      : "bg-fooxtBlack group-hover:bg-white"
                  } flex items-center justify-center`}
                >
                  <IoFastFood
                    className={`${
                      filter === category.urlParamName
                        ? "text-fooxtBlack group-hover:text-white"
                        : "text-white group-hover:text-fooxtBlack "
                    }    text-lg`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === category.urlParamName
                      ? " text-white group-hover:text-fooxtBlack"
                      : "text-fooxtBlack group-hover:text-white"
                  } `}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full">
          <RowContainer
            flag={false}
            data={foodItems?.filter((n) => n.category == filter)}
          />
        </div>
      </div>

      {cartShow && <CartContainer />}
    </section>


  );
};

export default MenuContainer;
