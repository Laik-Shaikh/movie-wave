import React, { useState, useEffect } from "react";
import ContentWrapper from '../../../components/container/ContentWrapper';
import SwitchTab from "../../../components/switchTab/SwitchTab";

import '../home.scss';

const Trending = () => {


  const onTabChange = () => {
    
  }


  return (
    <>
      <div className="carousel-section">
        <ContentWrapper>
          <span className="carousel-title">Trending</span>
          <SwitchTab data={["Day", "Week"]} onTabChange={onTabChange} />
        </ContentWrapper>
      </div>
    </>
  );
}

export default Trending;