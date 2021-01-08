/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const faker = require('faker');
const _ = require('lodash');

const service = require('./service');

(async function () {
    try {
        const history = await service.generateHistoryRecords();
        const floatHistory = _.chunk(history, 25000);

        for (const chunk of floatHistory) {
          await service.insertHistory(chunk);
          console.log('added 25000 records');
        }

        process.exit(1);
    } catch (error) {
        console.error(error);
    }
}());
