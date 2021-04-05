import { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { getGameBytitle, gethightenScore } from '../../services/Service';
import { useDispatch } from 'react-redux';
import { deleteHighScore } from '../../Redux';

function GameDetails() {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({});
  const [loadingGame, setLoadingGame] = useState(true);
  const [data, setData] = useState([]);
  const [loadHig, setLoadHig] = useState(true);

  const history = useHistory();
  let { slug } = useParams();

  useEffect(() => {
    gethightenScore(slug)
      .then((response) => {
        setData(response.data);
      })
      .then(() => setLoadHig(false))
      .catch((error) => {
        console.log('not found');
      });
  }, [slug]);

  useEffect(() => {
    getGameBytitle(slug)
      .then((response) => {
        setFilters(response.data);
      })
      .then(() => setLoadingGame(false))
      .catch((error) => {
        console.log('not found');
      });
  }, [slug]);

  const handleDelete = (id) => {
    dispatch(deleteHighScore(id));

    history.push('/');
  };
  return (
    <div className="container">
      <div className="row">
        <h1 className="col-12 text-center m-2">Highscores</h1>
      </div>
      <div className="">
        {loadingGame ? (
          <h3 className="">Not found</h3>
        ) : (
          <div className="card">
            <div className="row no-gutters">
              <div className="col m-4">
                <div className="card-block px-2">
                  <h4 className="card-title">{filters.title}</h4>
                  <p className="card-text">{filters.description}</p>
                  <p className="card-text">Genre: {filters.genre}</p>
                  <p className="card-text">
                    Release year: {filters.releaseYear}
                  </p>
                </div>
              </div>
              <div className="col-auto">
                <img
                  src={filters.imageUrl}
                  className="img-fluid"
                  alt={filters.title}
                />
              </div>
            </div>
            <div className="card-footer w-100 text-muted">
              <Link to="#" className="btn btn-primary">
                Mor..
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="row mt-3">
        {loadHig ? (
          <h3>don't have score</h3>
        ) : (
          data.map((game) => (
            <div key={game._id} className="card mb-3">
              <h3>{game.title}</h3>
              <div className="row no-gutters">
                <div className="col m-4">
                  <div className="card-block px-2">
                    <h3 className="item_game">{game.title}</h3>
                    <p className="card-text">{game.player}</p>
                    <p className="card-text">{game.date}</p>
                  </div>
                </div>
                <div className="col m-4 text-center  ">
                  <div className="card-block px-4">
                    <p className="card-text ">{game.score}</p>
                  </div>
                </div>
              </div>
              <div className="btn-group">
                <button
                  className="btn btn-outline-danger m-2 w-10"
                  onClick={() => handleDelete(game._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GameDetails;
