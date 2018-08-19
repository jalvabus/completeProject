var express = require('express');
var router = express.Router();

router.get('/login', (req, res) => {
    console.log(req.body);
    res.send("ok");
});

module.exports = router;