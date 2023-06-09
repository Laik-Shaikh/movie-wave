import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { TMDB_API_KEY } from "../../../api/api";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from '../../../components/container/ContentWrapper';
import SwitchTab from "../../../components/switchTab/SwitchTab";
import useFetch from '../../../hooks/useFetch'
import '../home.scss';

const Trending = () => {

  const [endPoint, setEndPoint] = useState('day');


  const onTabChange = (tab, index) => {
    setEndPoint(`${tab === "Day" ? "day" : "week"}`);
  }

  const { data, loading } = useFetch(`trending/all/${endPoint}`, {api_key : TMDB_API_KEY});


  return (
    <>
      <div className="carousel-section">
        <ContentWrapper>
          <span className="carousel-title">Trending</span>
          <SwitchTab data={["Day", "Week"]} onTabChange={onTabChange} />
        </ContentWrapper>

        <Carousel data={data?.results} loading={loading} />
      </div>
    </>
  );
}

export default Trending;