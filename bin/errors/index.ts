class CustomValidationError extends Error {
    constructor(message: string | undefined) {
        super(message);
        this.name = "ValidationError";
    }
}

class SchemaMigrationGenerationError extends Error {
    constructor(message: string | undefined) {
        super(message);
        this.name = "SchemaCreationError";
    }
}

export {
    CustomValidationError,
    SchemaMigrationGenerationError
}

