import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import Frame from "../components/Frame";
import Card from "../components/Card";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ModalDetail from "../components/ModalDetail";
import { useDispatch } from "react-redux";
import { setFavorites } from "../utils/reducers/reducer";

function Detail() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [videosTwo, setVideosTwo] = useState([]);
  const dispatch = useDispatch();

  const id = location?.state?.id;

  function getDetail() {
    api
      .get_detail(id)
      .then((ress) => {
        const result = ress.data;
        setVideos(result);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function getSimilar() {
    api
      .similar_movie(id, page)
      .then((ress) => {
        const result = ress.data.results;
        setData(result);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getDetail();
    getSimilar();
  }, []);

  function handleFav(movie) {
    const getMovies = localStorage.getItem("favMovies");
    if (getMovies) {
      const parsedMovies = JSON.parse(getMovies);

      const favMovies = parsedMovies.find((obj) => obj.title === movie.title);
      if (favMovies) return alert("Film sudah ditambahkan");

      parsedMovies.push(movie);
      const temp = JSON.stringify(parsedMovies);
      dispatch(setFavorites(parsedMovies));
      localStorage.setItem("favMovies", temp);
    } else {
      const temp = JSON.stringify([movie]);
      dispatch(setFavorites([movie]));
      localStorage.setItem("favMovies", temp);
    }
  }

  return (
    <Layout>
      <div className="lg:mt-0  w-full h-full">
        <div className="w-full lg:h-full ">
          {loading ? (
            <Loading />
          ) : (
            <Frame
              background={`${videos.backdrop_path}`}
              image={videos.poster_path}
              runtime={videos.runtime}
              title={videos.title}
              release={videos.release_date}
              overview={videos.overview}
              genre={videos?.genres?.map((x) => x.name)}
              language={videos.original_language}
              id={videos.id}
            />
          )}
        </div>
        <div className="w-full ">
          <h1 className="w-full text-center lg:text-7xl md:text-5xl text-3xl font-rubikDistressed pt-5 dark:text-white ">Similar movie</h1>
          <div className="w-full grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2">
            {data ? (
              data.map((item) => <Card labeHtml={"my-modal-3"} key={item.id} title={item.title} image={item.poster_path} tombol={"Add Favorite"} onNavigate={() => [setVideosTwo(item)]} onClick={() => handleFav(item)} />)
            ) : (
              <div>
                <h1>Loading mase</h1>
              </div>
            )}
          </div>
        </div>
        {videosTwo ? <ModalDetail image={videosTwo.poster_path} title={videosTwo.title} release={videosTwo.release_date} language={videosTwo.original_language} overview={videosTwo.overview} id={videosTwo.id} /> : <Loading />}
      </div>
    </Layout>
  );
}

export default Detail;
