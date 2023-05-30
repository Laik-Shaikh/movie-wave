import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { TMDB_API_KEY } from "../../../api/api";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from '../../../components/container/ContentWrapper';
import SwitchTab from "../../../components/switchTab/SwitchTab";
import useFetch from '../../../hooks/useFetch'
import '../home.scss';

const TopRated = () => {

  const [endPoint, setEndPoint] = useState('movie');


  const onTabChange = (tab, index) => {
    setEndPoint(`${tab === "Movies" ? "movie" : "tv"}`);
  }

  const { data, loading } = useFetch(`${endPoint}/top_rated`, {api_key : TMDB_API_KEY});


  return (
    <>
      <div className="carousel-section">
        <ContentWrapper>
          <span className="carousel-title">Top Rated</span>
          <SwitchTab data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
        </ContentWrapper>

        <Carousel endPoint={endPoint} data={data?.results} loading={loading} />
      </div>
    </>
  );
}

export default TopRated;