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

const updateTransactionSchema = yup.object().shape({
    descricao: yup
        .string(),
    valor: yup
        .number(),
    data: yup
        .string(),
    categoria_id: yup
        .number(),
    tipo: yup
        .string()
});

module.exports = {
    registerTransactionSchema,
    updateTransactionSchema
}