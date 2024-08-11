import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState([]);

  const content = {
    benefits: [
      "$50k - $80k annual salary",
      "Health insurance",
      "Dental insurance",
      "Vision insurance",
      "Paid time off",
      "401(k) with company match",
      "Flexible work hours",
      "Remote work options",
      "Professional development opportunities",
    ],
    outline: `
      This position involves working closely with a talented team to design and develop innovative web applications.
      You will be responsible for creating high-quality code, participating in design discussions, and collaborating with cross-functional teams.
      We are looking for someone with a passion for technology and a strong desire to learn and grow within the company.
    `,
    futureGrowth: `
      Our company is committed to your long-term success. As we continue to expand our product offerings and client base, 
      there will be numerous opportunities for career advancement and professional growth. We provide regular training 
      sessions, mentoring programs, and opportunities to attend industry conferences. We value innovation and encourage our 
      employees to bring new ideas to the table.
    `,
  };

  useEffect(() => {
    axios
      .get(`https://job-portal-server-delta-flax.vercel.app/edit-job/${id}`)
      .then((res) => setJob(res.data[0]));
  }, []);
  console.log(job);
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg mt-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Job details</h1>
        <p className="text-gray-600 mt-2">
          Here's how the job details align with your job preferences. Manage job
          preferences anytime in your profile.
        </p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <div className="text-gray-800 text-xl font-semibold flex items-center">
            <i className="fa fa-briefcase mr-2"></i>
            Job type : {job.employmentType}
          </div>
        </div>

        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200">
            Full-time
          </button>
          <button className="bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition duration-200">
            Apply Now
          </button>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-4">{job.jobTitle}</h1>
      <p className="text-gray-600 mb-6">{job.companyName}</p>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Overview</h2>
        <p className="text-gray-600">{job.description}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Location</h2>
        <p className="text-gray-600">{job.jobLocation}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Salary</h2>
        <p className="text-gray-600">
          ${job.minPrice} - {job.maxPrice}k
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Posted Date
        </h2>
        <p className="text-gray-600">
          {new Date(job.postingDate).toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Benefits</h2>

          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            {content.benefits?.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>

        <div className="col-span-1">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Outline</h2>
          <p className="text-gray-700">{content.outline}</p>
        </div>

        <div className="col-span-1">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Future Growth
          </h2>
          <p className="text-gray-700">{content.futureGrowth}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
