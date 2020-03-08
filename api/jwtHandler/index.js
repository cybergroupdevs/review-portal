const tokenGenerator = require("./tokenGenerator");
const tokenVerifier = require("./tokenVerifier");
const tokenDecoder = require("./tokenDecoder");
const authenticator = require("./authenticator")

module.exports = {
    tokenGenerator: tokenGenerator,
    tokenVerifier: tokenVerifier,
    tokenDecoder: tokenDecoder,
    authenticator: authenticator
}