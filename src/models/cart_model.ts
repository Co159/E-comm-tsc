import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';
import { Product } from './index';
import { User } from './index';

interface CartAttributes {
    id?: number;
    product_id: number;
    createdBy?: number;
}

type CartCreationAttributes = Optional<CartAttributes, 'id'>;

class Cart extends Model<CartAttributes, CartCreationAttributes>
    implements CartAttributes {
    id!: number;
    product_id!: number;
    createdBy?: number;
    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    static associate(models: any) {
        Cart.belongsTo(models.User, { foreignKey: 'createdBy', as: 'user' });
        Cart.belongsTo(models.Product, {
            foreignKey: 'product_id', as: "product_detail"
        })
    };

}

Cart.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'product',
            key: 'id',
        }
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        },
        // onUpdate: 'CASCADE',
        // onDelete: 'SET NULL',
    },
},
    {
        sequelize,
        tableName: 'cart',
        modelName: 'Cart',
        timestamps: true,
    })


export default Cart;