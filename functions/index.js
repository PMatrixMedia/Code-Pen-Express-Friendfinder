var bodyParser = require("body-parser");
var path = require("path");
const cors = require('cors')({ origin: true });
const functions = require('firebase-functions');
const express = require("express");
const app = express()



const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);




app.get(
    ["/", "/:id"],
    functions.https.onRequest((req, res) => {
        const friendsid = req.params.id;
        let reference = "friends";
        reference += friendsid ? "/" + friendsid : "";

        cors(req, res, () => {
            return admin
                .database()
                .ref(reference)
                .once("value")
                .then((snapshot) => {
                    if (snapshot.val() !== null) {
                        res.status(200).send(JSON.stringify(snapshot));
                    } else {
                        res.status(200).send({});
                    }
                });
        });
    })
);

// sets up data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// loads static files
app.use(express.static("../app/public"));



// List all the posts under the path /posts/
exports.friends = functions.https.onRequest((req, res) => {
    // Handle routing of /posts without a trailing /,
    if (!req.path) {
        // prepending "/" keeps query params, path params intact
        req.url = `/${req.url}`;
    }
    return app(req, res);
});

