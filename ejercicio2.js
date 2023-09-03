const Sequelize = require('sequelize');

const sequelize = new Sequelize('clase4', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  }) 
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const Model = Sequelize.Model;
class Client extends Model{}

Client.init({
    firstName:{
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    job: {
        type: Sequelize.STRING
    }}, {
        sequelize,
        modelName: 'user'
    });
/*Se inserta otro registro */

sequelize.sync()
  .then(() => Client.create({
    firstName: 'Juan',
    lastName: 'Gomez',
    job: 'nurse'
  }) ).then (jane => {
    console.log(jane.toJSON());
  });

/*Se elimina un registro*/

Client.destroy({
    where: {
        lastName: 'Perez'
    }
}).then(() => {
    console.log("Registro eliminado");
});