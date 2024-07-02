import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL,token } from "../../config";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

    const fetchToken = async () => {
      try {
        // Make an HTTP GET request to fetch the token from the API endpoint
        const response = await axios.get("http://localhost:5000/userdata");
        console.log("Tokem222",response);
        // Update the token state with the received token
        setToken(response.data.token);
      } catch (error) {
        // Handle errors if any
        console.error("Error fetching token:", error);
        setError("Error fetching token");
      }
    };

    fetchToken();

    console.log("Tokem",token);

  useEffect(() => {
    
    if (token) {
      const fetchData = async () => {
        try {
          const res = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const result = await res.json();

          if (!res.ok) {
            throw new Error(result.message + " 🤢");
          }

          setData(result.data);
          setLoading(false); // Set loading to false after data is fetched
        } catch (err) {
          setError(err.message);
          setLoading(false); // Set loading to false in case of error
        }
      };

      fetchData();
    }
  }, [url, token]); // Add token as a dependency

  return {
    data,
    loading,
    error,
  };
};

export default useFetchData;
