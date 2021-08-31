const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index (request, reponse) {
        const usuario = await connection('usuario').select('*');
    
        return reponse.json(usuario); 
    
    },

    async create(request, response) {
        const {nome, email} = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('usuario').insert({
            id,
            nome,
            email,
        })
    
        return response.json({ id });
    }

   
}