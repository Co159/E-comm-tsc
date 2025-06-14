import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';

interface UserAttributes {
    id: number;
    email: string;
    password: string;
    role?: string;
    otp?: string | null;
    otpExpireAt?: Date | null;
    isverified?: boolean;
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'role' | 'otp' | 'otpExpireAt' | 'isverified'>;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id!: number;
    email!: string;
    password!: string;
    role?: string;
    otp?: string | null;
    otpExpireAt?: Date | null;
    isverified?: boolean;
    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    static associate(models: any) {
        User.hasMany(models.Cart, { foreignKey: 'createdBy', as: 'user_cart' });
        User.hasMany(models.Order, { foreignKey: 'createdBy', as: 'user_order' });
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING(120),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"user",
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    otpExpireAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    isverified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
});

export default User;
