import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../../../components/container/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Image from "../../../components/lazyImage/Image";

import './heroBanner.scss';

const HeroBanner = () => {
  const navigate = useNavigate();

  const { url } = useSelector((state) => state.home);
  const [search, setSearch] = useState("");
  const [bgImage, setBgImage] = useState("");

  const { data, loading } = useFetch(
    "/movie/upcoming",
    process.env.REACT_APP_API_KEY
  );

  useEffect(() => {
    const image =
      url?.backdrop +
      data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBgImage(image);
  }, [data]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.length > 0) {
      navigate(`/search/${search}`);
    }
  };

  return (
    <>
      <div className="hero-banner">
        {!loading && (
          <div className="backdrop-img">
            <Image src={bgImage} />
          </div>
        )}

        <div className="opacity-layer"></div>

        <ContentWrapper>
          <div className="hero-banner-container">
            <span className="title">Welcome.</span>
            <span className="sub-title">
              Millions of movies, TV shows and people to discover. Explore Now.
            </span>
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search for a movies or TV show..."
                
                onKeyUp={handleSearch}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button>Search</button>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </>
  );
};

export default HeroBanner;
