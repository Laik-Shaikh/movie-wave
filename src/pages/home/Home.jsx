import React, { useState } from "react";
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trendings/Trending";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <Trending />
    </>
  );
};

export default Home;
