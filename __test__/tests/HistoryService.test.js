const chai = require('chai');

const UtilService = require('../../src/components/History/service');

const { expect } = chai;

describe('HistoryComponent -> service', () => {
    it('HistoryComponent -> service -> getAllHistory', (done) => {
        UtilService.getAllHistory()
            .then((body) => {
                const expectBody = expect(body);
                expectBody.to.be.an('array');
                done();
            })
            .catch(done);
    });

    it('HistoryComponent -> service -> createRecord', (done) => {
        UtilService.createRecord({
            email: 'cat@email.com',
            operation: 'history request',
        })
            .then((body) => {
                const expectBody = expect(body);
                expectBody.to.be.an('object');
                expectBody.to.have.property('_id');
                done();
            })
            .catch(done);
    });

    it('HistoryComponent -> service -> getCsvHistory', (done) => {
        const fileData = UtilService.getCsvHistory([{
                _id: '5ff88772e2efe5761093754f',
                email: 'Dejuan48@yahoo.com',
                image: 'magnetic',
                operation: 'resize',
                filesize: 4,
                time: '2020-03-30T21:37:27.976Z',
        }]);

        const expectBody = expect(fileData);
        expectBody.to.be.an('number');
        done();
    });

    it('HistoryComponent -> service -> getHistoryByDateAndEmail', (done) => {
        UtilService.getHistoryByDateAndEmail(
            1,
            {
                dateStart: '2020-08-10',
                dateFinish: '2020-10-01',
            },
            'cat@email.com',
        )
            .then((body) => {
                const expectBody = expect(body);
                expectBody.to.be.an('object');
                done();
            })
            .catch(done);
    });

    it('HistoryComponent -> service -> getAverageStatisticOfFileSize', (done) => {
        UtilService.getAverageStatisticOfFileSize()
            .then((body) => {
                const expectBody = expect(body[0]);
                expectBody.to.be.an('object');
                expectBody.to.have.all.keys('CropTotal', 'ResizeTotal', 'SizeAvg');

                done();
            })
            .catch(done);
    });

    it('HistoryComponent -> service -> getSumOperationsStatistic', (done) => {
        UtilService.getSumOperationsStatistic()
            .then((body) => {
                const expectBody = expect(body);
                expectBody.to.have.all.keys('history', 'pages');

                done();
            })
        .catch(done);
    });

    it('HistoryComponent -> service -> getAvgOperationsStatisticByDayByEmail', (done) => {
        UtilService.getAvgOperationsStatisticByDayByEmail('Floy.Bartell66@gmail.com')
            .then((body) => {
                const expectBody = expect(body[0]);
                expectBody.to.have.all.keys('_id', 'cropSum', 'resizeSum');

                done();
            })
        .catch(done);
    });
});
