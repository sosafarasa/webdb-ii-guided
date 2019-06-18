const router = require('express').Router();
const Roles = require('./roles-model');


router.get('/', (req, res) => {
  // get the roles from the database
  Roles.find()
  .then(roles => res.status(200).json(roles))
  .catch(err => res.status(500).json(err))
  // res.send('Write code to retrieve all roles');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Roles.findById(id)
  .then(role => {
    if(role){
      res.status(200).json(role)
    } else {
      res.status(404).json({ message: 'There is no role with this ID'})
    }
  })
  .catch(err => res.status(500).json(err))
  // retrieve a role by id
  // res.send('Write code to retrieve a role by id');
});

router.post('/', (req, res) => {
  Roles.add(req.body)
  .then(role => {
    res.status(201).json(role)
  })
  .catch( err => { res.status(500).json(err)})
  // add a role to the database
  // res.send('Write code to add a role');
 /* db('roles').insert(req.body)
 //.then(ids => res.status(201).json(ids[0]))
  .then(ids => {
    const [ id ] = ids;
    db('roles').where({ id })
               .first()
               .then(role => res.status(201).json(role))
  })
  .catch(err => res.status(500).json(err))*/
});

router.put('/:id', (req, res) => {
  Roles.update(req.params.id, req.body)
  .then( role => {
    if(role){
      res.status(200).json(role)
    } else {
      res.status(404).json({ message: 'There is no role with this ID'})
    }
  })
  // update roles
  // res.send('Write code to modify a role');
  /*db('roles').where({ id: req.params.id })
             .update(req.body)
             .then(count => {
              if( !count ){
                res.status(404).json({ message: 'There is no role with this ID'})
              } else {
               db('roles').where({ id : req.params.id }).first().then( role => res.status(200).json(role))
              }
             })
             .catch(err => res.status(500).json(err))*/

});

router.delete('/:id', (req, res) => {
  Roles.remove(req.params.id)
  .then( role => {
    if(role){
      res.status(201).json(role)
    } else {
      res.status(404).json({ message: 'There is no role with this ID'})
    }
  })
  // remove roles (inactivate the role)
  // res.send('Write code to remove a role');
 /* db('roles').where({ id: req.params.id })
             .del()
             .then(count => {
               if(count) {
                 res.status(204).end()
               } else {
                 res.status(404).json({ message: 'There is no role with this ID' })
               }
             })
             .catch(err => res.status(500).json(err))*/

});

module.exports = router;
