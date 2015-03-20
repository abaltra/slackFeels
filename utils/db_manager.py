import redis
import json
from pymongo import MongoClient
from collections import namedtuple

DB_TYPES = namedtuple('DB_TYPES', ['REDIS', 'MONGO'])('REDIS', 'MONGO')

class DBManager(object):

    def __init__(self, config, db_type):
        self._config = config
        self._currentDB = db_type

        if db_type == 'MONGO':
            self._db = self._setupMongo(config)
        elif db_type == 'REDIS':
            self._db = self._setupRedis(config)

    def _setupMongo(self, config):
        return MongoManager(config)

    def _setupRedis(self, config):
        return RedisManager(config)

    def save_channel_data(self, data_pack):
        key = self._config.get('organization', 'name') + ':' + data_pack.get('channel_id', 'fail_channel') + ':aggregated'
        if self._currentDB == DB_TYPES.MONGO:
            self._db.update({ 'key': key },
                {'$inc': {'total_messages': 1, 'polarity': data_pack.get('polarity', 0.0)}},
                collection_name='channels',
                upsert=True)

        elif self._currentDB == DB_TYPES.REDIS:
            pol_key = key + ':polarity'
            self._db.floatIncr(pol_key, amount=float(data_pack.get('polarity', 0.0)))
            tot_key = key + ':total_messages'
            self._db.incr(tot_key)

    def save_message_info(self, data_pack):
        key = self._config.get('organization', 'name') + ':' + data_pack.get('channel_id', 'fail_channel')
        if self._currentDB == DB_TYPES.MONGO:
            self._db.insert({'key': key, 
                'polarity': data_pack.get('polarity', 0.0), 
                'timestamp': data_pack.get('timestamp', 0.0)},
                collection_name='channels')

        elif self._currentDB == DB_TYPES.REDIS:
            key += ':messages'
            self._db.rpush(key, json.dumps(data_pack))

class RedisManager(object):

    def __init__(self, config):
        self._config = config
        self._db = redis.StrictRedis(host=config.get('redis', 'host'), 
            port=int(config.get('redis', 'port')), 
            db=int(config.get('redis', 'db')))

    def get(self, key):
        return self._db.get(key)

    def set(self, key, data):
        return self._db.set(key, data)

    def floatIncr(self, key, amount=1.0):
        return self._db.incrbyfloat(key, amount)

    def incr(self, key, amount=1):
        return self._db.incr(key, amount)

    def rpush(self, key, data):
        return self._db.rpush(key, data)

class MongoManager(object):

    def __init__(self, config):
        self._config = config
        self._db = MongoClient(config.get('mongo', 'host'), 
            int(config.get('mongo', 'port')))[config.get('mongo', 'name')]

    def update(self, key, query, collection_name, multi=False, upsert=True):
        coll = self._db[collection_name]
        return coll.update(key, query, multi=multi, upsert=True)

    def insert(self, query, collection_name):
        coll = self._db[collection_name]
        return coll.insert(query)

    def find(self, query, collection_name):
        coll = self._db[collection_name]
        return coll.find(query)


