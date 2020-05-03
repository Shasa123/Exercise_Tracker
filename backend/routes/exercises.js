const router = require('express').Router();
const Exercise = require('../model/excercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const NewExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    NewExercise.save()
        .then(() => res.json('Exercise added'))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted'))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.duration = Number(req.body.duration);
            exercise.description = req.body.description;
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise Updated'))
                .catch(err => res.json('Error ' + err));
        })
        .catch(err => res.json('Error ' + err));
});

module.exports = router;