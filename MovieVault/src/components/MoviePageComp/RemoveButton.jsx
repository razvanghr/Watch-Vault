import axios from "axios";

import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function MovieButton({ title, route, movieData, AuthToken, method }) {
  const navigate = useNavigate("/login");
  const sendRequest = async () => {
    try {
      const res = await axios({
        url: `https://watchvaultapi.netlify.app/.netlify/functions/api/movie/${route}`, // ! Modify later
        headers: { Authorization: `Bearer ${AuthToken}` },
        data: {
          userId: localStorage.getItem("UserId"),
          movieId: movieData.imdbID,
        },
        method: "DELETE",
      });
      toast.success(res.data, {
        theme: "dark",
        autoClose: 1500,
      });

      console.log("request sent");
      console.log(res);
    } catch (error) {
      toast.error(error.response.data, {
        theme: "dark",
        position: "top-center",
        autoClose: 1500,
      });

      if (error.response.status === 401) {
        return navigate("/login");
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
