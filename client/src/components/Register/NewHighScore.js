import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useHistory, Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchGame, registerHighScore } from '../../Redux';
import { ToastContainer } from 'react-toastify';
function NewRegister() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGame());
  }, [dispatch]);

  const game = useSelector((state) => state.game);
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    const gameDat = game.games.map((d) => ({
      value: d._id,
      label: d.title,
    }));
    setGameData(gameDat);
  }, [game.games]);

  const history = useHistory();

  const [newRegister, setNewRegister] = useState({
    game: { id: '', title: '' },
    date: '',
    player: '',
    score: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerHighScore(newRegister));
    setTimeout(() => {
      history.push('/');
    }, 2000);
  };
  return game.loading ? (
    <h2>Loading</h2>
  ) : game.error ? (
    <h2>{game.error}</h2>
  ) : (
    <div>
      <ToastContainer autoClose={2000} />
      <h2>Register highscore</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <Select
            options={gameData}
            placeholder="please select game"
            required
            onChange={(e) =>
              setNewRegister({
                ...newRegister,
                game: { id: e.value, title: e.label },
              })
            }
          />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="date">
            Date
          </label>
          <input
            className="form-control"
            id="date"
            name="date"
            defaultValue="2021-01-01T12:00:00"
            type="datetime-local"
            required
            onChange={(e) =>
              setNewRegister({ ...newRegister, date: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputplayer">Player</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputplayer"
            placeholder="Enter player"
            required
            onChange={(e) =>
              setNewRegister({ ...newRegister, player: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputscore">Score</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputscore"
            placeholder="Enter score"
            required
            onChange={(e) =>
              setNewRegister({ ...newRegister, score: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary m-3">
            Add
          </button>
          <Link to="/" type="button" className="btn btn-secondary m-3">
            Cansel
          </Link>
        </div>

        {/* <div className="form-group">
                    <button type="submit" className="btn btn-outline-secondary">Cansel</button>
                </div> */}
      </form>
    </div>
  );
}

export default NewRegister;
