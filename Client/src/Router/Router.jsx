import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJob from "../Pages/UpdateJob";
import JobDetail from "../Pages/JobDetail";

const router = createBrowserRouter([S
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/post-job", element: <CreateJob /> },
      { path: "/my-job", element: <MyJobs /> },
      { path: "/salary", element: <SalaryPage /> },
      {
        path: "/edit-job/:id",
        element: <UpdateJob />,
        loader: async ({ params }) => {
  try {
    const response = await fetch(
      `https://job-portal-server-delta-flax.vercel.app/edit-job/${params.id}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching job data:", error);
    throw error;
  }
};
      },
      { path: "/job/:id", element: <JobDetail /> },
    ],
  },
]);

export default router;
