const yup = require('./yup');

const registerUserSchema = yup.object().shape({
    nome: yup
        .string()
        .required(),
    email: yup
        .string()
        .required()
        .email(),
    senha: yup
        .string()
        .required()
})

module.exports = {
    registerUserSchema
}