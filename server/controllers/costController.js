const Cost = require('../models/costModel');
const mongoose = require('mongoose');

const getCosts = async (req, res) => {
    const costs = await Cost.find({}).sort({createdAt: -1});

    res.status(200).json(costs);
}

const getCost = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: 'Cost not found'});
    }

    const cost = await Cost.findById(id)

    if (!cost) return res.status(404).json({error: "Cost not found"})

    res.status(200).json(cost)
}

const createCost = async (req, res) => {
    const {title, amount, description} = req.body;

    try {
        const cost = await Cost.create({title, amount, description})
        res.status(200).json({cost})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteCost = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: 'Cost not found'});
    }

    const cost = await Cost.findOneAndDelete({_id: id})

    if (!cost) return res.status(404).json({error: "Cost not found"})

    res.status(200).json(cost)
}

const updateCost = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: 'Cost not found'});
    }

    const cost = await Cost.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!cost) return res.status(404).json({error: "Cost not found"})

    res.status(200).json(cost)
}

module.exports = {getCosts, getCost, createCost, deleteCost , updateCost}