import Sneakers from '../models/Sneakers.js';

function getDate() {
    const date = new Date();
    return date.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }); 
}

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
            createdAt: getDate(),
            likes: [],
            owner: userId,
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
        return Sneakers.find({
            where: {
                userId,
            },
        });
    },
    getLatest() {
        return Sneakers.find({
            order: [['createdAt', 'DESC']],
            limit: 3,
        });
    },
}