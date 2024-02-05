import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('new_schema', 'root', 'cocacola', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3307
});

export default sequelize;