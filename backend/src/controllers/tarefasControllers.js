const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const tarefas = await connection('tarefas').select('*');

        return response.json(tarefas);

    },
    async create(request, response) {
        const { tarefa, data } = request.body;
        const usuario_id = request.headers.authorization;

        const [id] = await connection('tarefas').insert({
            tarefa,
            data,
            usuario_id,
        })

        return response.json({ id })
    },

    async update(request, response){
        const { tarefa , data} = request.body;
        const { id } = request.params;

        await connection("tarefas").update({
            tarefa,
            data
        }).where({ id });

        return response.send();
    },

    async delete(request, response) {
        const { id } = request.params;
        const usuario_id = request.headers.authorization;

        const tarefas = await connection("tarefas")
        .where('id', id)
        .select('usuario_id')
        .first();

        if(tarefas.usuario_id != usuario_id){
            return response.status(401).json({ erro: 'Operation not permitted. ' });
        }

        await connection("tarefas").where('id', id).delete();

        return response.status(204).send();


    }
}
