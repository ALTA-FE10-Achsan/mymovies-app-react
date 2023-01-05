import React from "react";
import api from "../services/api";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFavorites } from "../utils/reducers/reducer";

function Search() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const title = location?.state?.title;

  function getSearch() {
    api
      .get_Search(title, page)
      .then((ress) => {
        const result = ress.data.results;
        const newPage = page + 1;
        const temp = [...data];
        temp.push(...result);
        console.log("result", result);
        setData(temp);
        setPage(newPage);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  console.log(data);
  useEffect(() => {
    getSearch();
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
      <div className="className= flex w-full flex-col bg-abuTua dark:bg-blackTwo">
        <div className="w-full flex justify-center items-end">
          <h1 className="lg:text-7xl md:text-5xl text-3xl font-rubikDistressed p-5 text-gray-600 dark:text-white">{location.state.title}</h1>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-2 lg:grid-cols-5">
          {loading ? (
            <Loading />
          ) : data ? (
            data.map((item) => <Card title={item.title} image={item.poster_path} tombol={"Add Favorite"} onNavigate={() => handleDetail(item.id)} onClick={() => handleFav(item)} />)
          ) : (
            <div className="w-full flex justify-center items-center mt-20 col-span-5  text-center h-full">
              <h1 className="text-5xl font-rubikDistressed text-slate-300">Sorry, the movie you are looking for does not exist!</h1>
            </div>
          )}
        </div>
        <div className="p-1 items-end">
          <button className="btn w-full" onClick={() => getSearch()}>
            Load More
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Search;
