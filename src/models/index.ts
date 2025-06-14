import sequelize from '../config/db';
import Cart from './cart_model';
import Product from './product_model';
import User from './user_model';
import Order from './order_model';

Cart?.associate?.({ Product, User });
Order?.associate?.({ Product, User });
Product?.associate?.({ Cart,Order });
User?.associate?.({ Cart,Order });


export {
    sequelize,
    Cart,
    Product,
    User,
    Order,
};
