import { Model, DataTypes, Optional } from "sequelize";
import sequelize from '../config/db';

interface OrderAttributes {
    id?: number;
    product_id: number;
    quantity: number;
    price?: number;
    createdBy?: number;
}

type OrderCreationAttributes = Optional<OrderAttributes, 'id' | 'price'>;

class Order extends Model<OrderAttributes, OrderCreationAttributes>
    implements OrderAttributes {
    id?: number;
    product_id!: number;
    quantity!: number;
    price!: number;
    createdBy?: number;
    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    static associate(models: any) {
        Order.belongsTo(models.User, { foreignKey: 'createdBy', as: 'user' });
        Order.belongsTo(models.Product, {
            foreignKey: 'product_id', as: "product_detail"
        })
    }
}

Order.init({
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
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
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

}, {

    sequelize,
    tableName: 'orders',
    modelName: 'Order',
    timestamps: true,

})

export default Order;