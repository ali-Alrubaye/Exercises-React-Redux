import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GameDetails from './components/Details/GameDetails';
import NewRegister from './components/Register/NewHighScore';
import ScoresGrid from './pages/HighScorePage/ScoresGrid';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/">
            <ScoresGrid />
          </Route>
          <Route path="/new">
            <NewRegister />
          </Route>
          <Route path="/gamedetails/:slug">
            <GameDetails />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
