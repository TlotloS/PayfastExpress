import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!')
    // console.log('Time:', Date.now())
});

router.get('/:name', (req, res) => {
    res.send(`Hello ${req.params.name}`)
    // console.log(req.params);
});

export default router;