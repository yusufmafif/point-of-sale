import { Items } from "../models/ItemModel.js";
import User from "../models/UserModel.js";
import { Categories } from "../models/ItemModel.js";
import { Op } from "sequelize";

export const getItem = async (req, res) => {
    try {
        let response;
        {
            response = await Items.findAll({
                include: [
                    {
                        model: Categories
                    }
                ]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const getItemByInput = async (req, res) => {
    try {
        let response;
        response = await Items.findAll({
            where: {
                [Op.or]: [
                    { item_nama: { [Op.like]: `%${req.params.input}%` } },
                    { item_barcode: { [Op.like]: `%${req.params.input}%` } }
                ]
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}




export const getItemById = async (req, res) => {
    try {
        const Item = await Items.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!Item) return res.status(404).json({ msg: "Data not found" });
        let response;
        if (req.role === "admin") {
            response = await Items.findOne({
                attributes: ["item_barcode", "item_nama", "item_satuan", "item_harga", "category_id"],
                where: {
                    id: Item.id
                },
                // include: [
                //     {
                //         model: User,
                //         attributes: ["name", "email"]
                //     }
                // ]
            });
        } else {
            response = await Items.findOne({
                attributes: ["item_barcode", "item_nama", "item_satuan", "item_harga", "category_id"],
                where: {
                    [Op.and]: [{ id: Item.id }, { userId: req.userId }]
                },
                // include: [
                //     {
                //         model: User,
                //         attributes: ["name", "email"]
                //     }
                // ]
            })
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createItem = (req, res) => {
    const { item_barcode, item_nama, item_satuan, item_harga, category_id } = req.body;
    try {
        const Item = Items.create({
            item_barcode: item_barcode,
            item_nama: item_nama,
            item_satuan: item_satuan,
            item_harga: item_harga,
            category_id: category_id,
            // userId: req.userId
        });
        res.status(201).json("Data created");
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}



export const updateItem = async (req, res) => {
    try {
        const Item = await Items.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!Item) return res.status(404).json({ msg: "Data not found" });
        const { item_barcode, item_nama, item_satuan, item_harga, category_id } = req.body;
        if (req.role === "admin") {
            await Items.update({ item_barcode, item_nama, item_satuan, item_harga, category_id }, {
                where: {
                    id: Item.id
                }
            });
        } else {
            if (Item.userId !== req.userId) return res.status(403).json({ msg: "forbidden" });
            await Items.update({ name, birth }, {
                where: {
                    [Op.and]: [{ id: Item.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json("Data updated");
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteItem = async (req, res) => {
    try {
        const Item = await Items.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!Item) return res.status(404).json({ msg: "Data not found" });
        if (req.role === "admin") {
            await Items.destroy({
                where: {
                    id: Item.id
                }
            });
        } else {
            if (Item.userId !== req.userId) return res.status(403).json({ msg: "forbidden" });
            await Items.destroy({
                where: {
                    [Op.and]: [{ id: Item.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Data deleted" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

