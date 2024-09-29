import React from "react";

import { MovieType } from "../types/MovieType";
import SearchMovie from "../components/SearchMovie";
import LoadingAnimation from "../components/LoadingAnimation";

type SearchPageProps = {
  searchData: string;
};

function SearchPage({ searchData }: SearchPageProps) {
  return (
    <div className="search-container">
      {searchData.Search ? (
        <div className="search-page">
          {searchData.Search.map((movie: MovieType) => {
            return <SearchMovie movieData={movie} />;
          })}
        </div>
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
}

export default SearchPage;
