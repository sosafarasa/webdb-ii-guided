module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

const knex = require('knex');

const config = {
  client: 'sqlite3',
  connection: {
    filename: './data/rolex.db3'
  },
  useNullAsDefault: true // this is only required with sqlite3 ** DONT'T FORGET OR IT WON'T WORK **
}

const db = knex(config);

function find(){
    return db('roles');
}

function findById(id){
    return db('roles').where({ id }).first();
}

function add(role){
    return db('roles').insert(role, 'id') // sqlite3 will ignore the id, but it's function is to return the ID when a new object is added
                      .then(ids => {
                          const [id] = ids;
                          return findById(id)
                      })
}

function update(id, changes){
    return db('roles').where({ id })// = ({ id: id})
                      .update(changes)
                      .then( count => {
                          if(count > 0) {
                              return findById(id)
                          } else {
                              return null;
                          }
                      })
}

function remove(id){
    return findById(id).then(role => {
        if(role) {
            return db('roles').where({ id })
                              .del()
                              .then( () => role )
        } else {
            return null;
        }
    })
}
