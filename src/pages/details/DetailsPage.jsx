import React from "react";
import { useParams } from "react-router-dom";
import { TMDB_API_KEY } from "../../api/api";
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";

const DetailsPage = () => {

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`, { api_key: TMDB_API_KEY });
  const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`, { api_key: TMDB_API_KEY });


  return (
    <>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
    </>
  );
}

export default DetailsPage