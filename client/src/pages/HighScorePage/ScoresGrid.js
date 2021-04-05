import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSortScoreByGame } from '../../Redux';
import Score from './Score';

function ScoresGrid() {
  const dispatch = useDispatch();
  const { highscores, loading, error } = useSelector(
    (state) => state.highscores
  );

  const groupByGame = (score) => {
    let group = score.reduce((r, a) => {
      r[a.game.title] = [...(r[a.game.title] || []), a];
      return r;
    }, []);
    let result = Object.values(group.sort((a, b) => b.score - a.score));
    return result;
  };

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
      {groupByGame(highscores).map((score, index) => (
        <Score key={index} highscore={score[0]} />
      ))}
    </div>
  );
}

export default ScoresGrid;
