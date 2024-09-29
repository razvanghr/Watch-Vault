import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { MovieType } from "../../types/MovieType";

type MovieButtonProps = {
  title: string;
  route: string;
  movieData: MovieType;
  AuthToken: string;
  method: string;
};

function MovieButton({
  title,
  route,
  movieData,
  AuthToken,
  method,
}: MovieButtonProps) {
  const navigate = useNavigate();
  const sendRequest = async () => {
    try {
      const res = await axios({
        url: `https://watchvaultapi.netlify.app/.netlify/functions/api/movie/${route}`,
        method: method,
        headers: { Authorization: `Bearer ${AuthToken}` },
        data: {
          userId: localStorage.getItem("UserId"),
          movieId: movieData.imdId,
          movieTitle: movieData.title,
          movieYear: movieData.year,
          movieType: movieData.type,
          moviePoster: movieData.poster,
        },
      });
      toast.success(res.data, {
        theme: "dark",
        autoClose: 1500,
      });

      console.log("request sent");
    } catch (error) {
      toast.error(error.response.data, {
        theme: "dark",
        position: "top-center",
        autoClose: 1500,
      });
      if (error.response.status === 401) {
        navigate("/login");
      }
    }
  };
  return (
    <>
      <motion.button
        onClick={sendRequest}
        className="add-movie"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {title}
      </motion.button>
      <ToastContainer />
    </>
  );
}

export default MovieButton;
