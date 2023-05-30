import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../container/ContentWrapper";
import Image from "../lazyImage/Image";
import "./carousel.scss";
import CircularRating from "../circularRating/CircularRating";
import Genre from "../genres/Genre";
import NoPoster from '../../assets/no-poster.png';

const Carousel = ({ data, loading, endPoint, title }) => {
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const carouselContainer = useRef();
  const navigation = (direction) => {
    // this is same as we do in javascript by getElememtBYId or className etc.

    const container = carouselContainer.current;

    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => (
    <div className="skeleton-items">
      <div className="poster-block skeleton"></div>
      <div className="text-block">
        <span className="title"></span>
        <span className="date"></span>
      </div>
    </div>
  );

  return (
    <>
      <div className="carousel-section">
      {title && (
                <div className="carousal-title">{title}</div>
              )}
        <ContentWrapper>
          <BsFillArrowLeftCircleFill
            className="carouselLeftNav arrow"
            onClick={() => navigation("left")}
          />
          <BsFillArrowRightCircleFill
            className="carouselRighttNav arrow"
            onClick={() => navigation("right")}
          />
          {!loading ? (
            <div ref={carouselContainer} className="carousel-items">
              {data?.map((item) => {
                const posterURL = item.poster_path
                  ? url.poster + item.poster_path
                  : NoPoster;
                  
                return (
                  <div key={item.id} className="carousel-item" onClick={() => navigate(`/${item.media_type || endPoint}/${item.id}`)}>
                    <div className="poster-block">
                      <Image src={posterURL} />
                      <CircularRating ratings={item.vote_average.toFixed(1)} />
                      <Genre data={item.genre_ids.slice(0, 2)} />
                    </div>

                    <div className="text-block">
                      <span className="title">{item.title || item.name}</span>
                      <span className="date">
                        {dayjs(item.release_date || item.first_air_date).format(
                          "MMM D, YYYY"
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="loading-skeleton">
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
            </div>
          )}
        </ContentWrapper>
      </div>
    </>
  );
};

export default Carousel;
