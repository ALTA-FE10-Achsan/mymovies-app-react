import "../styles/App.css";
import Layout from "../components/Layout";
import Card from "../components/Card";
import api from "../services/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { setFavorites } from "../utils/reducers/reducer";
import Slider from "../components/Slider";

function Home() {
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function getNowPlaying() {
    api
      .now_playing(page)
      .then((ress) => {
        const { results } = ress.data;
        const newPage = page + 1;
        const temp = [...datas];
        temp.push(...results);
        setData(temp);
        setPage(newPage);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    getNowPlaying();
  }, []);

  function handleDetail(id) {
    navigate(`/detail/${id}`, {
      state: {
        id: id,
      },
    });
  }

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
      <div className="carousel w-full rounded-sm ">
        {loading ? <Loading /> : datas ? datas.map((item) => <Slider length={datas.length} image={item.backdrop_path} alt={item.title} id={datas.map((datum) => datum.id).indexOf(item.id) + 1} key={item.id} />) : <p>noting</p>}
      </div>
      <div className="flex w-full flex-col bg-abuTua dark:bg-blackTwo">
        <div className=" w-full flex justify-center items-end">
          <h1 className="lg:text-7xl md:text-5xl text-3xl font-rubikDistressed p-5 text-gray-600 dark:text-white">NOW PLAYING</h1>
        </div>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 ">
          {loading ? <Loading /> : datas.map((item) => <Card key={item.id} image={item.poster_path} tombol={"Add Favorite"} title={item.title} onNavigate={() => handleDetail(item.id)} onClick={() => handleFav(item)} />)}
        </div>
        <div className="p-1">
          <button className="btn w-full" onClick={() => getNowPlaying()}>
            Load More
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
