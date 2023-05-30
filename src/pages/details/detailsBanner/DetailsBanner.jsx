import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import { TMDB_API_KEY } from "../../../api/api";
import useFetch from "../../../hooks/useFetch";
import Image from "../../../components/lazyImage/Image";
import ContentWrapper from "../../../components/container/ContentWrapper";
import Genre from "../../../components/genres/Genre";
import { PlayIcon } from "../PlayIcon";

import "./detailsBanner.scss";
import CircularRating from "../../../components/circularRating/CircularRating";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();

  const { data, loading } = useFetch(`/${mediaType}/${id}`, {
    api_key: TMDB_API_KEY,
  });
  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <>
      <div className="details-banner">
        {!loading ? (
          <>
            {!!data && (
              <>
                <div className="backdrop-img">
                  <Image src={url.backdrop + data.backdrop_path} />
                </div>
                <div className="opacity-layer"></div>
                <ContentWrapper>
                  <div className="content">
                    <div className="left">
                      {data.poster_path ? (
                        <Image
                          src={url.poster + data.poster_path}
                          className="poster-img"
                        />
                      ) : (
                        <Image
                          src="./images/no-poster.png"
                          className="poster-img"
                        />
                      )}
                    </div>
                    <div className="right">
                      <div className="title">
                        {`${data.name || data.title} (${dayjs(
                          data?.release_date
                        ).format("YYYY")})`}
                      </div>
                      <div className="sub-title">{data.tagline}</div>

                      <Genre data={_genres} />

                      <div className="row">
                        <CircularRating
                          ratings={data.vote_average.toFixed(1)}
                        />
                        <div
                          className="play-btn"
                          onClick={() => {
                            setShow(true);
                            setVideoId(video?.key);
                          }}
                        >
                          <PlayIcon />
                          <span className="text">Watch Trailer</span>
                        </div>
                      </div>

                      <div className="overview">
                        <div className="heading">Overview</div>
                        <div className="description">{data.overview}</div>
                      </div>

                      <div className="info">
                        {data.status && (
                          <div className="info-item">
                            <span className="text bold">Status: </span>
                            <span className="text">{data.status}</span>
                          </div>
                        )}
                        {data.release_date && (
                          <div className="info-item">
                            <span className="text bold">Release Date: </span>
                            <span className="text">
                              {dayjs(data.release_date).format("MMM D, YYYY")}
                            </span>
                          </div>
                        )}
                        {data.runtime && (
                          <div className="info-item">
                            <span className="text bold">Runtime: </span>
                            <span className="text">
                              {toHoursAndMinutes(data.runtime)}
                            </span>
                          </div>
                        )}
                      </div>
                      {director?.length > 0 && (
                        <div className="info">
                          <span className="text bold">Director: </span>
                          <span className="text">
                            {director?.map((d, i) => (
                              <span key={i}>
                                {d.name}
                                {director.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}

                      {writer?.length > 0 && (
                        <div className="info">
                          <span className="text bold">Writer: </span>
                          <span className="text">
                            {writer?.map((d, i) => (
                              <span key={i}>
                                {d.name}
                                {writer.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}

                      {data?.created_by?.length > 0 && (
                        <div className="info">
                          <span className="text bold">Creator: </span>
                          <span className="text">
                            {data?.created_by?.map((d, i) => (
                              <span key={i}>
                                {d.name}
                                {data?.created_by.length - 1 !== i && ", "}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <VideoPopup
                    show={show}
                    setShow={setShow}
                    videoId={videoId}
                    setVideoId={setVideoId}
                  />
                </ContentWrapper>
              </>
            )}
          </>
        ) : (
          <div className="detailsBannerSkeleton">
            <ContentWrapper>
              <div className="left skeleton"></div>
              <div className="right">
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
              </div>
            </ContentWrapper>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailsBanner;
