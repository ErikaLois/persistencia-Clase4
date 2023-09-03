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

class Client extends Sequelize.Model {}
Client.init({
  firstName: Sequelize.STRING,
  lastName:Sequelize.STRING,
  job: Sequelize.STRING
}, { sequelize, modelName: 'users' });


/* Se inserta un registro*/
sequelize.sync()
  .then(() => Client.create({
    firstName: 'Ana',
    lastName: 'Perez',
    job: 'teacher'
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });

/* Se actualiza el registro */
Client.update({job: 'cook'}, {
    where: {
        lastName: 'Perez'
    }
}). then(() => {
    console.log("Done");
});