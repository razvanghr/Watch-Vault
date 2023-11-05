import React, { useState, useEffect } from "react";
import axios from "axios";

function TopPage() {
  const [movieData, setMovieData] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [alreadyFetched, setAlreadyFetched] = useState(false);
  const AuthToken = localStorage.getItem("JWTtoken");

  useEffect(() => {
    if (!alreadyFetched) {
      const getScrapeData = async () => {
        try {
          const res = await axios.get(
            "https://watchvaultapi.netlify.app/.netlify/functions/api/scrape",
            {
              headers: {
                Authorization: `Bearer ${AuthToken}`,
              },
            }
          );
          setMovieData(res.data);
          setIsMounted(true);
          setAlreadyFetched(true);
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      getScrapeData();
    } else {
      setIsMounted(true);
    }
  }, [alreadyFetched, AuthToken]);

  if (!isMounted) {
    return (
      <div>
        <p>Loading....</p>
      </div>
    );
  }

  return (
    <div>
      {Array.isArray(movieData) && movieData.length > 0 ? (
        movieData.map((movie) => <p key={movie.info}>{movie.title}</p>)
      ) : (
        <p>No movie data available</p>
      )}
    </div>
  );
}

export default TopPage;
