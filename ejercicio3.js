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

sequelize.sync().then(async() => {
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

    /*Se insertan varios registros */
    const clients = await Client.bulkCreate([
        {firstName: 'José', lastName: 'Lopez', job: 'mechanic'},
        {firstName: 'María', lastName: 'Gimenez', job: 'doctor'},
        {firstName: 'Rosa', lastName: 'Gonzalez', job: 'scientist'},
        {firstName: 'Joaquín', lastName: 'Gomez', job: 'nurse'}
    ]);

    /*Se actualizan varios registros */

    await Client.update({ lastName: 'sinNombre'}, {
        where: {
            lastName: 'Gomez',
        },
    });

})


