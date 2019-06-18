const router = require('express').Router();
const roles = require('./roles-model');

const knex = require('knex');

const config = {
  client: 'sqlite3',
  connection: {
    filename: './data/rolex.db3'
  },
  useNullAsDefault: true // this is only required with sqlite3 ** DONT'T FORGET OR IT WON'T WORK **
}

const db = knex(config);

router.get('/', (req, res) => {
  // get the roles from the database
  db('roles')
  .then(roles => res.status(200).json(roles))
  .catch(err => res.status(500).json(err))
  // res.send('Write code to retrieve all roles');
});

router.get('/:id', (req, res) => {
  // retrieve a role by id
  const { id } = req.params;
  db('roles').where({id })// = ({ id: id })
  .first()
  .then(role => res.status(200).json(role))
  .catch(err => res.status(500).json(err))
  // res.send('Write code to retrieve a role by id');
});

router.post('/', (req, res) => {
  // add a role to the database
  // res.send('Write code to add a role');
  db('roles').insert(req.body)
 //.then(ids => res.status(201).json(ids[0]))
  .then(ids => {
    const [ id ] = ids;
    db('roles').where({ id })
               .first()
               .then(role => res.status(201).json(role))
  })
  .catch(err => res.status(500).json(err))

});

router.put('/:id', (req, res) => {
  // update roles
  // res.send('Write code to modify a role');
  db('roles').where({ id: req.params.id })
             .update(req.body)
             .then(count => {
              if( !count ){
                res.status(404).json({ message: 'There is no role with this ID'})
              } else {
               db('roles').where({ id : req.params.id }).first().then( role => res.status(200).json(role))
              }
             })
             .catch(err => res.status(500).json(err))

});

router.delete('/:id', (req, res) => {
  // remove roles (inactivate the role)
  // res.send('Write code to remove a role');
  db('roles').where({ id: req.params.id })
             .del()
             .then(count => {
               if(count) {
                 res.status(204).end()
               } else {
                 res.status(404).json({ message: 'There is no role with this ID' })
               }
             })
             .catch(err => res.status(500).json(err))

});

module.exports = router;
