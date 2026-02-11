/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertTriangle } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../redux/Features/Auth/authSlice";

const Unauthorized = () => {
  const user = useSelector(useCurrentUser) as any;

  const route = user?.assignedPages[0];



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-center px-4">
      <div className="flex flex-col items-center space-y-4">
        <AlertTriangle className="w-16 h-16 text-red-500" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Unauthorized
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          You are not authorized to access this route.
        </p>
        <Link to={route}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
