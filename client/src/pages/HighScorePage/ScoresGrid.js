import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSortScoreByGame } from '../../Redux';
import Score from './Score';

function ScoresGrid() {
  const dispatch = useDispatch();
  const { highscores, loading, error } = useSelector(
    (state) => state.highScore
  );
  useEffect(() => {
    dispatch(getSortScoreByGame());
  }, [dispatch]);

  return loading ? (
    <h2>Loading</h2>
  ) : error ? (
    <h2>{error}</h2>
  ) : (
    <div>
      <h1>Highscores</h1>
      <Link to={'/new'} className="btn btn-outline-primary mb-3">
        Registrera event
      </Link>
      {highscores.map((score, index) => (
        <Score key={index} highscore={score} />
      ))}
    </div>
  );
}

export default ScoresGrid;
