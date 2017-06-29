exports.checkforUser = function(req, res, next) {


    if (req.session.user != undefined) {
        if (req.session.passport) {
            next()
        }
        if (req.session.user.type == 'user')
            next();
        else {

            res.json({"notLoggedIn":true})


        }

    } else {

        res.json({"notLoggedIn":true})
    }

}

exports.checkforAdmin = function(req, res, next) {
    if(req.session.user != undefined) {
        
        if (req.session.user.type == 'admin')
            next();
        else {

            res.json({"notLoggedIn":true})

        }

    } else {

        res.json({"notLoggedIn":true})
    }
}
