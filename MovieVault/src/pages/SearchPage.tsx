import React from "react";
import LoadingAnimation from "../components/LoadingAnimation";

import SearchMovie from "../components/SearchMovie";

function SearchPage({ searchData }) {
  return (
    <div className="search-container">
      {searchData.Search ? (
        <div className="search-page">
          {searchData.Search.map((movie) => {
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
