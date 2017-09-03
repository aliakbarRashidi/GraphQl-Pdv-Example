import schema from '../schema'
import graphql from 'graphql';
import request from 'supertest';

import { MongoClient } from 'mongodb';
import { ObjectId as ObjID } from 'mongodb';
import addModelsToContext from '../model';
import Pdv from '../model/Pdv';
import { pubsub, subscriptionManager } from '../server/subscriptions';

var context = {}

const {
    PORT = 3000,
    WS_PORT = parseInt(PORT, 10) + 1,
    MONGO_PORT = parseInt(PORT, 10) + 2,
    MONGO_URL = `mongodb://localhost:${MONGO_PORT}/tests`,
} = process.env;

function setup ()  {
    const db = MongoClient.connect(MONGO_URL);
    context = addModelsToContext({ db, pubsub });

    const pdv = new Pdv(context);
    pdv.insert({
        id: ObjID(),
        tradingName: 'Test Business',
        ownerName: 'Test Owner',
    });
}

describe('Graph API - PDV', () => {
      let server;
    
    beforeEach(async () => {
        server = require('../index').default;
        //setup();
    });

    afterEach((done) => {
        server.close();
        done();
    });

    it('returns the id and tradingName for all PDVs', done => {
        const query = `
            query Q {
                pdvs{
                    id
                    tradingName
                }
            }
        `;
        request(server)
        .post('/graphql')
        .send(query)
        .end((err, res) => {
            if (err) { 
                return done(err); 
            }
            assert.equal(JSON.parse(res.text)).length, 0);
            done();
        });
    });
});
