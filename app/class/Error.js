function ValidationError(property) {
    Error.call(this, property);
    this.name = "ValidationError";

    this.property = property;
    this.message = "Error validating " + property;

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ValidationError);
    } else {
        this.stack = (new Error()).stack;
    }

}
ValidationError.prototype = Object.create(Error.prototype);

function AccessError(property) {
    Error.call(this, property);
    this.name = "AccessError";

    this.property = property;
    this.message = "Access error for " + property;

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, AccessError);
    } else {
        this.stack = (new Error()).stack;
    }

}
AccessError.prototype = Object.create(Error.prototype);

module.exports = {
    ValidationError,
    AccessError
};