const router = require('express').Router();
const controllers = require('./controllers.js');

router.get('/points', controllers.get); // return all payer point balances
router.post('/points', controllers.post); // add transactions for specific payer and date
router.patch('/points', controllers.patch); // spend points and return a list of points deducted from each payer

module.exports = router;