

export default class ForbbidenError extends Error{
    constructor(
        public message: string,
        public error?: any,
    ){
        super(message);

        this.error = error;
    }
}
