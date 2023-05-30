import React, { useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./searchResult.scss";

import { fetchDataFromApi, TMDB_API_KEY } from "../../api/api";
import ContentWrapper from "../../components/container/ContentWrapper";
import NoResult from "../../assets/no-results.png";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import { useEffect } from "react";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);

  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`, {
      api_key: TMDB_API_KEY,
    })
      .then((res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("Something Went Wrong!");
      });
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  const fetchNextPageData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`, {
      api_key: TMDB_API_KEY,
    })
      .then((res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }

        setPageNum((prev) => prev + 1);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="search-results-page">
      {loading && <Spinner initial={true} />}
      {!loading && data && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="page-title">
                {`Search ${
                  data?.results?.length > 1 ? "results" : "result"
                } of '${query}'`}
              </div>

              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {
                  data?.results.map((item, index) => {
                    if(item.media_type === "person") return;
                    return (
                      <MovieCard
                        key={index}
                        data={item}
                        fromSearch={true}
                      />
                    )
                  })
                }
              </InfiniteScroll>
            </>
          ) : (
            <span className="result-not-found">
              Sorry, Results not found!
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
