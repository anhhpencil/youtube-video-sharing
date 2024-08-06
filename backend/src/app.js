const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const git = require('git-last-commit');
const expressWinston = require('express-winston');
const winston = require('winston');


const app = express();


// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

app.use(
    expressWinston.logger({
        // use logger to log every requests
        // transports: [logger],
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            })
        ],
        meta: false,
        expressFormat: false,
        colorize: true,
    })
);
app.use('/ping', (req, res) => {
    git.getLastCommit((err, commit) => {
        res.send({
            message: 'Connected To Youtube Video Sharing Backend',
            lastCommit: {
                hash: commit && commit.hash,
                committedOn: commit && commit.committedOn,
                shortHash: commit && commit.shortHash,
                branch: commit && commit.branch,
            },
        });
    });
});





module.exports = app;
