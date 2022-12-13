import { useState } from "react";

import axios from "axios";
// axios.defaults.baseURL = `http://localhost:5000`;

export const useFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const generateImageRequest = async (prompt, size, n) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/openai/generateimage", {
        prompt,
        size,
        n,
      });
      setData(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        if (error.response.status === 404) {
          setError("Page not found!");
          return;
        }
        setError(JSON.stringify(error.response.data));
      } else {
        console.log(error.message);
        setError(error.message);
      }
    }
  };
  return { loading, data, generateImageRequest, error };
};
