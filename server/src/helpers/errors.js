class CustomError extends Error {
    constructor(error) {
        super(error.message);
        this.statusCode = error.statusCode;
    }
}


// DATABASE ERROR
const databaseErrors = {
    operation: {
        message: "Erreur en effectuant une opération avec la base de données"
    },
    save: {
        message: "Erreur de sauvegarde avec la base de données"
    }
};

class DatabaseError extends CustomError {
    constructor(error) {
        super(error);
        this.name = "DatabaseError";
    }
}


// VALIDATION ERROR
const validationErrors = {
    quantityLowerThanZero: {
        message: "La quantité ne peut pas être inférieur à 0",
        statusCode: 400
    },
    authValidationFailed: {
        message: "Les informations d'authentification saisies ne sont pas valides",
        statusCode: 400
    },
};

class ValidationError extends CustomError {
    constructor(error, ...details) {
        super(error);
        this.name = "ValidationError";
        this.details = details;
    }
}

// AUTH ERROR
const authErrors = {
    userAlreadyExists: {
        message: "Il existe déjà un utilisateur avec cette adresse mail",
        statusCode: 400
    },
    userNotFound: {
        message: "Il n'existe aucun utilisateur avec cette adresse mail",
        statusCode: 401
    },
    invalidPassword: {
        message: "Le mot de passe est incorrect",
        statusCode: 401
    },
    invalidToken: {
        message: "Authentification refusée",
        statusCode: 401
    }
};

class AuthError extends CustomError {
    constructor(error) {
        super(error);
        this.name = "AuthError";
    }
}

// OPEN FOOD FACTS ERROR
const openFoodFactsErrors = {
    noProductFound: {
        message: "Le produit n'existe pas dans la source de données OFF",
        statusCode: 404
    },
    communication: {
        message: "La communication avec la source des données OFF a échoué",
    },
};

class OpenFoodFactsError extends CustomError {
    constructor(error) {
        super(error);
        this.name = "OpenFoodFactsError";
    }
}


module.exports = {
    databaseErrors,
    DatabaseError,
    validationErrors,
    ValidationError,
    openFoodFactsErrors,
    OpenFoodFactsError,
    authErrors,
    AuthError
};

