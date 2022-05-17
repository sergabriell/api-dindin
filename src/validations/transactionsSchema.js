const yup = require('./yup');

const registerTransactionSchema = yup.object().shape({
    descricao: yup
        .string()
        .required(),
    valor: yup
        .number()
        .required(),
    data: yup
        .string()
        .required(),
    categoria_id: yup
        .number()
        .required(),
    tipo: yup
        .string()
        .required()
});

module.exports = {
    registerTransactionSchema
}