import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    fetch("https://job-portal-server-delta-flax.vercel.app/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, [searchText]);

  const itemPerPage = 4;
  const lastIndexOfPage = currentPage * itemPerPage;
  const startingIndex = lastIndexOfPage - itemPerPage;

  const currentJobs = jobs.slice(startingIndex, lastIndexOfPage);

  const nextPage = () => {
    if (lastIndexOfPage < jobs.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = (id) => {
    fetch(`https://job-portal-server-delta-flax.vercel.app/delete/${id}`, {
      method: "DELETE",
    })
       .then((result) => {
      alert("Job is deleted");
      // Update state to remove the deleted job
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
    })
    .catch((err) => console.log(err));
  };

  const handleSearch = () => {
    setIsLoading(true);
    const filter = jobs.filter(
      (job) =>
        job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    setJobs(filter);
    setIsLoading(false);
  };

  return (
    <div>
      <div className="text-center w-6/12 mt-12 mx-auto">
        <h1 className="text-gray-800 my-8">All My Jobs</h1>
        <div className="w-full flex">
          <input
            type="text"
            name="search"
            id="search"
            onChange={(e) => setSearchText(e.target.value)}
            className="h-9 w-full text-sm border placeholder:text-gray-400 pl-2"
          />
          <button
            onClick={handleSearch}
            className=" px-5 w-1/5 h-9 bg-blue text-white font-semibold"
          >
            Search
          </button>
        </div>
      </div>

      <div className=" w-8/12 mt-12 mx-auto  shadow-lg">
        <div className="w-full">
          <div className="flex justify-between my-3 mx-8">
            <h1 className="font-semibold ">All Jobs</h1>
            <Link
              to={"/post-job"}
              className="border text-white text-sm rounded px-2 bg-violet-800"
            >
              POST A NEW JOB
            </Link>
          </div>

          <table className="w-full">
            <thead>
              <tr className="grid grid-cols-6 h-9 py-2 border text-sm">
                <th className="font-semibold">NO.</th>
                <th className="font-semibold">TITLE</th>
                <th className="font-semibold">COMPANY NAME</th>
                <th className="font-semibold">SALARY</th>
                <th className="font-semibold">EDIT</th>
                <th className="font-semibold">DELETE</th>
              </tr>
            </thead>
            {isLoading ? (
              <p className="flex justify-center align-center">Loading...</p>
            ) : (
              <tbody>
                {currentJobs.map((job, i) => {
                  return (
                    <tr
                      className="grid grid-cols-6 h-9 py-1 text-center text-sm text-gray-700 my-7"
                      key={i}
                    >
                      <td>{i + 1}</td>
                      <td>{job.jobTitle}</td>
                      <td>{job.companyName}</td>
                      <td>
                        ${job.minPrice} - {job.maxPrice}k
                      </td>
                      <td>
                        <Link to={`/edit-job/${job._id}`}>edit</Link>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="border bg-red-700 px-4 py-1 text-white"
                        >
                          Delete
                        </button>{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
      {/* pagination */}
      <div className="flex justify-center text-black space-x-8 mt-4">
        {currentPage > 1 && (
          <button onClick={prevPage} className="hover:underline">
            Previous
          </button>
        )}
        {lastIndexOfPage < jobs.length && (
          <button onClick={nextPage} className="hover:underline">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
