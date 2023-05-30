import React, { useState } from "react";
import HeroBanner from "./heroBanner/HeroBanner";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import Trending from "./trendings/Trending";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </>
  );
};

export default Home;
