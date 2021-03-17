const Highscore = require('../models/highscores');

const highscore_index = (req, res) => {
  Highscore.find()
    .sort('field -score')
    .then((result) => {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
const getGamewithFirstHighScore = (req, res) => {
  // Highscore.aggregate()
  //   .group({
  //     _id: '$game.id',
  //     maxValue: { $max: '$score' },
  //     docs: { $first: '$$ROOT' },
  //     // game: { $first: '$game' },
  //     // date: { $first: '$date' },
  //     // player: { $first: '$player' },
  //     // score: { $first: '$score' },
  //     // _id: '$_id',
  //     // _id: '$game.id',
  //   })
  //   .then((result) => {
  //     res.send(result);
  //   });

  // Highscore.find({})
  //   .sort('game.title')
  //   .sort({ score: -1 })
  //   .then((result) => {
  //     res.send(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  Highscore.aggregate([
    { $sort: { score: -1 } },
    {
      $group: {
        _id: '$game',
        score: { $max: '$score' },
        doc: { $first: '$$ROOT' },
      },
    },
    { $replaceRoot: { newRoot: '$doc' } },
  ])
    .sort('game.title')
    .then((response) => res.send(response))
    .catch((err) => {
      console.log(err);
    });
};

const highscore_details = (req, res) => {
  const id = req.params.id;
  Highscore.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
const highscore_firstten = (req, res) => {
  const id = req.params.id;
  Highscore.find({ 'game.title': id })
    .sort('field -score')
    .limit(10)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
const highscore_create = (req, res) => {
  const highscore = new Highscore(req.body);

  highscore
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
const highscore_update = (req, res) => {
  const id = req.params.id;
  Highscore.findByIdAndUpdate(id, req.body, { new: true }, (err, ev) => {
    // Handle any possible database errors
    if (err) return res.sendStatus(500).send(err);
    return res.send(ev);
  });
};
const highscore_delete = (req, res) => {
  const id = req.params.id;
  Highscore.findByIdAndDelete(id)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(200).json(err, "Can't found this highscore");
    });
};

module.exports = {
  highscore_index,
  getGamewithFirstHighScore,
  highscore_details,
  highscore_create,
  highscore_update,
  highscore_delete,
  highscore_firstten,
};
