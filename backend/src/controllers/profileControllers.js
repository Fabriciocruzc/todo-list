const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const usuario_id = request.headers.authorization;

        const tarefas = await connection('tarefas')
        .where('usuario_id', usuario_id)
        .select('*')

        return response.json(tarefas);
    }
}