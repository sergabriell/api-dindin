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
});

const updateUserSchema = yup.object().shape({
    nome: yup
        .string(),
    email: yup
        .string()
        .email(),
    senha: yup
        .string()
})

module.exports = {
    registerUserSchema,
    updateUserSchema
}