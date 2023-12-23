import { Items, Transactions, TransactionsDetail, Customers } from "../models/ItemModel.js";
import User from "../models/UserModel.js";
import { Categories } from "../models/ItemModel.js";


export const createTransaction = async (req, res) => {
    const { sell_date, total_price, payment_method, discount, customer_id, transaction_details, user_id } = req.body;
    try {
        const Transaction = await Transactions.create({
            sell_date: sell_date,
            total_price: total_price,
            payment_method: payment_method,
            discount: discount,
            customer_id: customer_id,
            user_id: user_id
        })
        for (const detail of transaction_details)
            await TransactionsDetail.create({
                item_qty: detail.item_qty,
                item_price: detail.item_price,
                subtotal_price: detail.subtotal_price,
                item_id: detail.item_id,
                transaction_id: Transaction.id
            })
        res.status(201).json("Transaction created");
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getTransaction = async (req, res) => {
    try {
        let response;
        {
            response = await Transactions.findAll({
                include: [
                    {
                        model: Customers
                    },
                    {
                        model: User
                    }
                ]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const getTransactionById = async (req, res) => {
    try {
        const TransactionDetail = await TransactionsDetail.findAll({
            where: {
                transaction_id: req.params.id
            },
            attributes: ["item_qty", "item_price", "subtotal_price", "item_id", "transaction_id"],
            include: [
                {
                    model: Transactions
                }
            ]
        });
        if (!TransactionDetail) {
            return res.status(404).json({ msg: "Data not found" });
        }
        res.status(200).json(TransactionDetail);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const deleteTransaction = async (req, res) => {
    const transaction = await Transactions.findOne({
        where: {
            id: req.params.id
        }
    })

    if (!transaction) return res.status(404).json({ msg: "Transaksi tidak ditemukan" });
    
    try {
        await Transactions.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}