import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';

interface ProductAttributes {
    id?: number;
    name: string;
    price: number;
    type: string;
    rating: number;
    createdby?: number;

}

type ProductCreationAttributes = Optional<ProductAttributes, 'id' | 'createdby'>;

class Product extends Model<ProductAttributes, ProductCreationAttributes>
    implements ProductAttributes {
    id!: number;
    name!: string;
    price!: number;
    type!: string;
    rating!: number;
    readonly createdAt!: Date;
    readonly updatedAt!: Date;
    static associate(models: any) {
        Product.hasMany(models.Cart, { foreignKey: 'product_id', as: 'cart' });
        Product.hasMany(models.Order, { foreignKey: 'product_id', as: 'orders' });
    }
}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(120),
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    rating: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
    },
    createdby: {
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
    tableName: 'product',
    modelName: 'Product',
    timestamps: true,
});

export default Product;
