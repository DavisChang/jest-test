'use strict';

jest.dontMock('nock');
var nock = require('nock');

var superagent = require('superagent');
var agent = require('superagent-promise')(superagent, Promise);
jest.dontMock('superagent');
jest.dontMock('superagent-promise');

describe('china review actions', function () {

  beforeEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();

    console.log('agent');
    console.log(agent);
  });

  it('test /todos api', () => {
    const scope = nock('http://localhost:3000')
      .get('/todos')
      .reply(200, {
        body: { todos: ['do something'] },
      });

    return agent
      .get('http://localhost:3000/todos')
      .end()
      .then((response) => {
        console.log('response:', response.status);
      }, (error) => {
        console.log('error:', error.status);
        throw error;
      }).then(
        () => {
          expect(scope.isDone()).toBeTruthy();
        }, (error) => {
          console.log('error:', error);
          throw error;
        }
      );
  });
});
