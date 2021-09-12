const PrettyError = require("pretty-error");
const prettyError = new PrettyError();


function errorsManagerMiddleware() {
    return (error, req, res, next) => {

        console.log(prettyError.render(error));

        if (error.message)
            return res.status(error.statusCode || 500).json({
                errorMessage: error.message,
                details: error.details
            });

        return res.status(500).json({errorMessage: "Une erreur inconnue s'est produite"});

    };
}

module.exports = errorsManagerMiddleware;