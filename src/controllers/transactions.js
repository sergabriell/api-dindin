const knex = require('../db/connection');
const { registerTransactionSchema, updateTransactionSchema } = require('../validations/transactionsSchema');

const registerTransaction = async (req, res) => {
    const user = req.user;

    const { descricao, valor, data, categoria_id, tipo } = req.body;

    if (tipo !== 'entrada' && tipo !== 'saida') {
        return res.status(400).json('O tipo deverá receber (entrada) ou (saida)!');
    }

    try {
        await registerTransactionSchema.validate(req.body);

        const verifyCategory = await knex('categorias')
            .where({ id: categoria_id })
            .first();

        if (!verifyCategory) {
            return res.status(404).json('Categoria não encontrada');
        }

        const registerCurrentTransaction = await knex('transacoes')
            .insert({
                descricao,
                valor,
                data,
                usuario_id: user.id,
                categoria_id,
                tipo
            })
            .returning('*');

        if (!registerCurrentTransaction) {
            return res.status(400).json('Não foi possível realizar a transação.')
        }

        return res.status(201).json(registerCurrentTransaction[0]);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const listAllTransactions = async (req, res) => {
    const user = req.user;

    try {
        const transactions = await knex('transacoes')
            .select({
                id: 'transacoes.id', tipo: 'transacoes.tipo', descricao: 'transacoes.descricao', valor: 'transacoes.valor',
                data: 'data', usuario_id: 'transacoes.usuario_id', categoria_id: 'categoria_id', categoria_nome: 'categorias.descricao'
            })
            .leftJoin('categorias', 'categorias.id', 'transacoes.categoria_id')
            .where({ usuario_id: user.id })

        return res.status(200).json(transactions);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const listATransaction = async (req, res) => {
    const user = req.user;
    const idTransaction = req.params.id;

    if (isNaN(idTransaction)) {
        return res.status(400).json('Infome um id válido de transação.');
    }

    try {
        const transaction = await knex('transacoes')
            .select({
                id: 'transacoes.id', tipo: 'transacoes.tipo', descricao: 'transacoes.descricao', valor: 'transacoes.valor',
                data: 'data', usuario_id: 'transacoes.usuario_id', categoria_id: 'categoria_id', categoria_nome: 'categorias.descricao'
            })
            .leftJoin('categorias', 'categorias.id', 'transacoes.categoria_id')
            .where({ 'transacoes.id': idTransaction, 'transacoes.usuario_id': user.id })
            .first()

        if (!transaction) {
            return res.status(404).json('Transação não encontrada.');
        }

        return res.status(200).json(transaction);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const updateTransaction = async (req, res) => {
    const user = req.user;
    const idTransaction = req.params.id;
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    if (isNaN(idTransaction)) {
        return res.status(400).json('Infome um id válido de transação.');
    }

    if (!descricao && !valor && !data && !categoria_id && !tipo) {
        return res.status(400).json('É obrigatório informar ao menos um campo para atualização');
    }

    if (tipo) {
        if (tipo !== 'entrada' && tipo !== 'saida') {
            return res.status(400).json('O tipo deverá receber (entrada) ou (saida)!');
        }
    }

    try {
        await updateTransactionSchema.validate(req.body);

        const verifyTransaction = await knex('transacoes')
            .where({ id: idTransaction })
            .first()

        if (!verifyTransaction) {
            return res.status(404).json('Transação não encontrada.');
        }

        if (categoria_id) {
            const verifyCategory = await knex('categorias')
                .where({ id: categoria_id })
                .first();

            if (!verifyCategory) {
                return res.status(404).json('Categoria não encontrada');
            }
        }

        const updatedTransaction = await knex('transacoes')
            .update({
                descricao,
                valor,
                data,
                categoria_id,
                tipo
            })
            .where({ id: idTransaction, usuario_id: user.id })

        if (!updatedTransaction) {
            return res.status(400).json('Não foi possível atualizar a transação.');
        }

        return res.status(204).json();
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const deleteTransaction = async (req, res) => {
    const user = req.user;
    const idTransaction = req.params.id;

    if (isNaN(idTransaction)) {
        return res.status(400).json('Infome um id válido de transação.');
    }

    try {
        const verifyTransaction = await knex('transacoes')
            .where({ id: idTransaction, usuario_id: user.id })
            .first()

        if (!verifyTransaction) {
            return res.status(404).json('Transação não encontrada.');
        }

        const deletedTransaction = await knex('transacoes')
            .del()
            .where({ id: idTransaction, usuario_id: user.id });

        if (!deletedTransaction) {
            return res.status(400).json('Não foi possível excluir a transação.');
        }

        return res.status(204).json();
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const extractTransaction = async (req, res) => {
    const user = req.user;

    try {
        const inputValue = await knex('transacoes')
            .sum('valor')
            .where({ tipo: 'entrada', usuario_id: user.id })
            .first();

        const outputValue = await knex('transacoes')
            .sum('valor')
            .where({ tipo: 'saida', usuario_id: user.id })
            .first();

        let input = 0;
        let output = 0;

        const inputCounter = inputValue.sum;
        const outputCounter = outputValue.sum;

        if (inputCounter) {
            input = inputCounter;
        }

        if (outputCounter) {
            output = outputCounter;
        }

        return res.status(200).json({ entrada: input, saida: output });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    registerTransaction,
    listAllTransactions,
    listATransaction,
    updateTransaction,
    deleteTransaction,
    extractTransaction
}