var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({
  	host: '127.0.0.1:9200',
  	// log: 'trace'
});

var pingElastic = () =>
  new Promise((resolve, reject) =>
    elasticClient.ping({
      requestTimeout: 30000,
    }, function (error) {
      if (error) {
        console.log('Elasticsearch Database is down...');
        reject(false);
      } else {
        console.log('Elasticsearch Database connected...\n');
        resolve(true);
      }
    }
  )
);

var createIndex = (indexName) =>
  new Promise((resolve, reject) =>
    elasticClient.indices.create({
      index: indexName
    }).then(function (result) {
      resolve(result);
    }, function (err) {
      reject(err);
    }
  )
);

var checkIndex = (indexName) =>
  new Promise((resolve, reject) =>
    elasticClient.indices.exists({
      index: indexName
    }).then(function (result) {
      resolve(result);
    }, function (err) {
      reject(err);
    }
  )
);

var createDocument = (indexName, id, docType, payload) =>
  new Promise((resolve, reject) =>
    elasticClient.create({
      index: indexName,
      type: docType,
  	  id: id,
  	  body: payload
    }).then(function (result) {
      resolve(result);
    }, function (err) {
      reject(err);
    }
  )
);

var updateDocument = (indexName, id, docType, payload) =>
  new Promise((resolve, reject) =>
    elasticClient.update({
      index: indexName,
      type: docType,
  	  id: id,
  	  body: {
        doc: payload
      }
    }, function (err, result) {
      if(err) reject(err);
      resolve(result);
    }
  )
);

var searchDocument = (indexName, payload) =>
  new Promise((resolve, reject) =>
    elasticClient.search({
      index: indexName,
  	  body: {
        query: {
          match: payload
        }
      }
    }).then(function (result) {
      resolve(result);
    }, function (err) {
      reject(err);
    }
  )
);

var deleteDocument = (indexName, id, docType) =>
  new Promise((resolve, reject) =>
    elasticClient.delete({
      index: indexName,
      type: docType,
  	  id: id
    }, function (err, result) {
      if(err) reject(err);
      resolve(result);
    }
  )
);

module.exports.ping = () => {
  return pingElastic();
}

module.exports.createindex = (indexName) => {
  return createIndex(indexName);
}

module.exports.checkindex = (indexName) => {
  return checkIndex(indexName);
}

module.exports.createdocument = (indexName, id, docType, payload) => {
  return createDocument(indexName, id, docType, payload);
}

module.exports.updatedocument = (indexName, id, docType, payload) => {
  return updateDocument(indexName, id, docType, payload);
}

module.exports.searchdocument = (indexName, payload) => {
  return searchDocument(indexName, payload);
}

module.exports.deletedocument = (indexName, id, docType) => {
  return deleteDocument(indexName, id, docType);
}

module.exports.close = () => {
  console.log('\nAll connections of elasticsearch database have ended');
  elasticClient.close();
}
