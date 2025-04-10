import Sneakers from '../models/Sneakers.js';

export default {
    getAll() {
        return Sneakers.findAll();
    },
    getOne(id) {
        return Sneakers.findOne({
            where: {
                id,
            },
        });
    },
    create(sneakersData, userId) {
        const sneaker = {
            ...sneakersData,
            userId,
        };

        return Sneakers.create(sneaker);
    },
    update(id, sneakersData) {
        return Sneakers.findByIdAndUpdate(id, sneakersData, { runValidators: true });
    },
    delete(id) {
        return Sneakers.findByIdAndDelete(id);
    },
    getAllByUserId(userId) {
        return Sneakers.findAll({
            where: {
                userId,
            },
        });
    },
}