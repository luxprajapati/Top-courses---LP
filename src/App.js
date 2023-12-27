import "./App.css";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import { apiUrl, filterData } from "./data";
import Cards from "./components/Cards";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import React from "react";
import Spinner from "./components/Spinner";

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(apiUrl);
  //     const resdata = await response.json();
  //     // Save the data into variable
  //     setCourses(resdata.data);
  //   } catch (error) {
  //     toast.error("Something went wrong!");
  //   }
  //   setLoading(false);
  // };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);

      // Check if the request was successful
      if (!response.ok) {
        // You can customize the error message based on the status code
        if (response.status === 404) {
          throw new Error("The requested resource was not found.");
        } else {
          throw new Error("Something went wrong!");
        }
      }

      const resdata = await response.json();
      setCourses(resdata.data);
    } catch (error) {
      // Display the error message to the user
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App min-h-screen flex flex-col bg-slate-600">
      <div>
        <Navbar></Navbar>
      </div>

      <div>
        <div>
          <Filter
            filterData={filterData}
            category={category}
            setCategory={setCategory}
          ></Filter>
        </div>

        <div className="w-11/12 max-w-[1200px] min-h-[50vh] mx-auto flex flex-wrap justify-center items-center">
          {loading ? (
            <Spinner></Spinner>
          ) : (
            <Cards courses={courses} category={category}></Cards>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
