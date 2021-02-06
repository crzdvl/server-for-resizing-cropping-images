module.exports = {
  async up(db, client) {
    await db.collection('history').createIndex(
      { time: 1 },
      { name: 'timeINDEX' },
    );
    console.log('1. time index created');

    await db.collection('history').createIndex(
      { operation: 1 },
      { name: 'operationINDEX' },
    );
    console.log('2. operation index created');

    await db.collection('history').createIndex(
      { email: 1 },
      { name: 'emailINDEX' },
    );
    console.log('3. email index created');
  },

  async down(db, client) {
    await db.collection('history').dropIndex('timeINDEX');
    await db.collection('history').dropIndex('operationINDEX');
    await db.collection('history').dropIndex('emailINDEX');

    console.log('indexes dropped');
  },
};
