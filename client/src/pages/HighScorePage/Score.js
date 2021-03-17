import { Link } from 'react-router-dom';
// import './Score.css';

function Score({ highscore }) {
  // const scoresContext = useContext(ScoresContext);
  const { game, date, player, score } = highscore;

  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col m-4">
          <div className="card-block px-2">
            <Link to={`/gamedetails/${game.title}`} className="title-game">
              <h3 className="item_game">{game.title}</h3>
            </Link>
            <p className="card-text">{player}</p>
            <p className="card-text">{date}</p>
          </div>
        </div>
        <div className="col m-4 text-center  ">
          <div className="card-block px-4">
            <p className="card-text ">{score}</p>
          </div>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between w-100 ">
        <Link
          to={`/gamedetails/${game.title}`}
          className="btn btn-outline-success m-1"
        >
          Details
        </Link>
      </div>
    </div>
  );
}

export default Score;
