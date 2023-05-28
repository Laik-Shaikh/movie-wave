import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromApi } from './api/api';
import { getApiConfiguration, getGenres } from './slice/homeSlice';
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Header from "./components/Header/Header";
import Explore from "./pages/explore/Explore";
import Footer from "./components/Footer/Footer";

function App() {

  const dispatch = useDispatch();
  const { url }  = useSelector((state) => state.home)
  console.log(url);
  

  useEffect(() => {
    const data = fetchDataFromApi('/configuration', process.env.REACT_APP_API_KEY).then((res) => {
      // console.log(res);
      const imageURL = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(imageURL));
    }).catch((e) => {
      console.log(e);
    })
    
  }, []);


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/search/:query" element={<Search />} />
        <Route exact path="/explore/movie" element={<Explore />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
