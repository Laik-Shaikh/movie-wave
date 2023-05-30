import React from "react";
import { TMDB_API_KEY } from "../../../api/api";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Recommendation = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(
    `/${mediaType}/${id}/recommendations`,
    { api_key: TMDB_API_KEY }
  );

  return (
    <Carousel
      title="Recommendations"
      data={data?.results}
      loading={loading}
      endPoint={mediaType}
    />
  );
};

export default Recommendation;
