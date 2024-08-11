import React from "react";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";

const Banner = ({  query, query2, handleInputChange2, handleInputChange  }) => {
  return (
    <div className="md:ml-14 ml-3 mt-14 pt-3">
      <h1 className="text-4xl font-semibold">
        Find your <span className="text-blue ">new job</span> today
      </h1>
      <p className="text-slate-500 mt-3">
        Thousends of jobs in the computer,engineering and technology are waiting
        for you.
      </p>
      <form>
        <div className="mr-14 md:flex w-10/12 ">
          <div className="mt-7 flex border rounded md:w-9/12 h-8 w-full   ">
            <CiSearch className=" absolute h-6 w-6 pt-2 mx-1 text-slate-500" />
            <input
              type="text"
              value={query}
              placeholder=" What position are you looking for ? "
              onChange={handleInputChange}
              className="w-full px-7 text-sm border-l-0 focus:border-sky-600  focus:outline-none focus:ring-1 "
            ></input>
          </div>

          <div className="md:mt-7 mt-4 flex border rounded md:w-3/6 h-8 w-full  ">
            <CiLocationOn className=" absolute h-6 w-6 pt-2 mx-1 text-slate-500" />
            <input
              type="text"
             value={query2}
              placeholder=" Location ? "
              onChange={handleInputChange2}
              className="w-full px-7 text-sm border-l-0 focus:border-sky-600  focus:outline-none focus:ring-1 "
            ></input>
          </div>

          <button
            disabled
            className="py-1 px-8 bg-blue text-white md:mt-7 mt-4 border h-9  rounded"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Banner;
