const ctrl = {};

ctrl.home = (req, res) => {
    res.render('index');
}

module.exports = ctrl;