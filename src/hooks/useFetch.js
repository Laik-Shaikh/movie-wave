import React, { useState, useEffect } from "react";
import { fetchDataFromApi } from "../api/api";

const useFetch = (url, params) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    fetchDataFromApi(url, params)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError("Something Went Wrong...");
      });
    
  }, [url]);

  return { loading, data, error };
};

export default useFetch;
