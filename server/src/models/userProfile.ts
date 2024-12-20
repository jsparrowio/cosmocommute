import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class UserProfile
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public password!: string;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
  // Hash the password before saving the user

export function UserFactory(sequelize: Sequelize): typeof UserProfile {
  UserProfile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'users',
      sequelize,
      hooks: {
      },
    }
  );

  return UserProfile;
}
