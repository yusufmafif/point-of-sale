import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

export const Items = db.define('items', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    item_barcode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        } 
    },
    item_nama: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        } 
    },
    item_satuan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    item_harga: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
}, {
    freezeTableName: true
});

export const Categories = db.define('categories', {
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    }
}, {
    freezeTableName: true
});

export const Transactions = db.define('transactions', {
    sell_date: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    payment_method: {
        type: DataTypes.STRING,
        allowNull: false
    },
    discount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    freezeTableName: true
});

export const TransactionsDetail = db.define('transaction_details', {
    item_qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 100]
        }
    },
    item_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    subtotal_price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    freezeTableName: true
});

export const Customers = db.define('customers', {
    customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    customer_address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    customer_phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    customer_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    }
})



// Set up associations

Transactions.belongsTo(Users, { foreignKey: 'user_id' });
Transactions.belongsTo(Customers, { foreignKey: 'customer_id' });


TransactionsDetail.belongsTo(Items, { foreignKey: 'item_id' });
TransactionsDetail.belongsTo(Transactions, { foreignKey: 'transaction_id' });

Items.belongsTo(Categories, { foreignKey: 'category_id' });





