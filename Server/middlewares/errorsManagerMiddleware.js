const PrettyError = require("pretty-error");
const {ValidationError} = require("../helpers/errors");
const {AuthError} = require("../helpers/errors");

const prettyError = new PrettyError();


function errorsManagerMiddleware() {
    return (error, req, res) => {
        if (!(error instanceof AuthError) && !(error instanceof ValidationError))
            console.log(prettyError.render(error));

        if (error.message)
            return res.status(error.statusCode || 500)
                .json({
                    message: error.message,
                    details: error.details
                });

        return res.status(500).json({message: "une erreur inconnue s'est produite"});

    };
}

module.exports = errorsManagerMiddleware;