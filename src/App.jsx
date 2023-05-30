import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromApi, TMDB_API_KEY } from './api/api';
import { getApiConfiguration, getGenres } from './slice/homeSlice';
import Home from "./pages/home/Home";
import SearchResult from "./pages/search/SearchResult";
import Header from "./components/Header/Header";
import Explore from "./pages/explore/Explore";
import Footer from "./components/Footer/Footer";
import DetailsPage from "./pages/details/DetailsPage";

function App() {

  const dispatch = useDispatch();
  const { url }  = useSelector((state) => state.home);  

  useEffect(() => {
    const data = fetchDataFromApi('/configuration', {api_key : TMDB_API_KEY}).then((res) => {
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

  useEffect(() => {
    getGenreFromApi();
  }, [])

  const getGenreFromApi = async () => {
    let endPoints = ['movie', 'tv'];
    let allGenres = {};

    const promises = endPoints.map(endPoint => {
      return fetchDataFromApi(`/genre/${endPoint}/list`, { api_key : TMDB_API_KEY });
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path='/:mediaType/:id' element={<DetailsPage />} />
        <Route exact path="/search/:query" element={<SearchResult />} />
        <Route exact path="/explore/:mediaType" element={<Explore />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
