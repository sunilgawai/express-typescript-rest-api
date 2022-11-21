
class CustomErrorHandler extends Error {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        super();
        this.status = status;
        this.message = message;
    }

    // Server Error
    static serverError(message: string = "Internal Server Error") {
        return new CustomErrorHandler(500, message);
    }

    // Not Found Error
    static notFound(message: string = "404 Not Found") {
        return new CustomErrorHandler(404, message);
    }

    static alreadyExists(message: string = "Credentials already exists") {
        return new CustomErrorHandler(422, message);
    }

    // Define other errors here...
    static wrongCredentials(message: string = "Credentials does not match") {
        return new CustomErrorHandler(422, message);
    }
}

export default CustomErrorHandler;