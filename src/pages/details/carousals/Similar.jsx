import React from "react";
import { TMDB_API_KEY } from "../../../api/api";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Similar = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`, { api_key: TMDB_API_KEY });

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";
    
    console.log("n", mediaType);

    return (
        <Carousel
            title={title}
            data={data?.results}
            loading={loading}
            endPoint={mediaType}
        />
    );
};

export default Similar;