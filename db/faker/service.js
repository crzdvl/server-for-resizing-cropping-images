const faker = require('faker');

const HistoryModel = require('../../src/components/History/model');

async function generateHistoryRecords() {
    const history = [];
    for (let i = 0; i < 100000; i += 1) { // max = 100000
      const email = faker.internet.email();
      const image = faker.random.word();
      const operation = faker.random.arrayElement(['crop', 'resize']);
      const filesize = faker.random.arrayElement([1, 2, 3, 4, 5, 6]);
      const time = faker.date.past();
      const newHistoryRecord = {
        email,
        image,
        operation,
        filesize,
        time,
      };

      history.push(newHistoryRecord);
    }

    return history;
}

function insertHistory(historyRecords) {
    return HistoryModel.insertMany(historyRecords);
}

module.exports = {
    generateHistoryRecords,
    insertHistory,
};
