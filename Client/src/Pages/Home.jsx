import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import Card from "../Components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../Components/Newsletter";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch("https://job-portal-server-delta-flax.vercel.app/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  // console.log(jobs);
  //handle input change
  const [query, setQuery] = useState("");
  const [query2, setQuery2] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleInputChange2 = (event) => {
    setQuery2(event.target.value);
  };

  //filter jobs by title
  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // radio button based filtering
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  // handle buutton based filtering
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return { startIndex, endIndex };
  };

  // function for next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // function for prev page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // -----------main function-------
  const filterData = (selectedCategory, jobs, query) => {
    let filteredJobs = filteredItems;

    // filtering input items
    if (query) {
      filteredJobs = filteredItems;
    }

     if (query2) {
      filteredJobs = filteredItems.filter(
        (job) =>
          job.jobLocation.toLowerCase().indexOf(query2.toLowerCase()) !== -1
      );
    }


    //category filtering
    if (selectedCategory) {
      filteredJobs = filteredJobs.filter(
        ({
          salaryType,
          maxPrice,
          jobLocation,
          employmentType,
          experienceLevel,
          postingDate,
        }) =>
          selectedCategory.toLowerCase() === salaryType.toLowerCase() ||
          parseInt(selectedCategory) >= parseInt(maxPrice) ||
          selectedCategory.toLowerCase() === jobLocation.toLowerCase() ||
          selectedCategory.toLowerCase() === employmentType.toLowerCase() ||
          selectedCategory.toLowerCase() === experienceLevel.toLowerCase() ||
          postingDate >= selectedCategory
      );
    }

    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);
    return filteredJobs.map((data, i) => <Card key={data._id} data={data} />);
  };

  const result = filterData(selectedCategory, jobs, query);

  return (
    <div>
      <Banner  query={query}
        query2={query2}
        handleInputChange2={handleInputChange2}
        handleInputChange={handleInputChange} />

      {/* Sidebar */}
      <div className="md:flex bg-[#FAFAFA] my-12">
        {/* Left Sidebar */}
        <div className="bg-white md:w-3/12 md:ml-16 ml-4 my-10">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        <div className="bg-white md:w-6/12  mx-6 my-10">
          {isLoading ? (
            <p className="pl-72">Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h1 className="text-slate-500 font-semibold text-lg ">0 Jobs</h1>
              <p>No data found!</p>
            </>
          )}

          {/* pages interchange */}
          {result.length > 0 ? (
            <div className="flex justify-center space-x-7 my-5">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="hover:underline"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems.length / itemPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems.length / itemPerPage)
                }
                className="hover:underline"
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Right sidebar */}
        <div className="bg-white md:w-3/12  mr-16 my-10">
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Home;
