const Handlebars = require("handlebars");

const ifEquals = (arg1: string, arg2: string, options: { fn: (arg0: unknown) => string; inverse: (arg0: unknown) => string; }) => {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
}

const registerCustomHelpers = () => {
    Handlebars.registerHelper('ifEquals', ifEquals);
}

export { registerCustomHelpers }
