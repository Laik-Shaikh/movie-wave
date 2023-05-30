import React from "react";
import { useParams } from "react-router-dom";
import { TMDB_API_KEY } from "../../api/api";
import useFetch from "../../hooks/useFetch";
import Recommendation from "./carousals/Recommendation";
import Similar from "./carousals/Similar";
import Cast from "./cast/Cast";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import VideosSection from "./videosSection/VideosSection";

const DetailsPage = () => {

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`, { api_key: TMDB_API_KEY });
  const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`, { api_key: TMDB_API_KEY });

  return (
    <>
      <DetailsBanner video={data?.results?.[data.results.length - `${mediaType === 'movie' ? 3 : 1}`]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </>
  );
}

export default DetailsPage