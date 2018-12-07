var Promise = require('bluebird');

var couchbase = Promise.promisifyAll(require('couchbase'));
var cluster = new couchbase.Cluster('couchbase://localhost/');
cluster.authenticate('Administrator', 'password');
var bucket = cluster.openBucket('QWayDB');
var N1qlQuery = couchbase.N1qlQuery;
var errors = couchbase.errors;



function getAll(queryString) {
    let query = N1qlQuery.fromString(queryString);
    return bucket.queryAsync(query);
    // .then( (rows, meta) => {
    //     for (row in rows) {
    //         // console.log(JSON.stringify(row));
    //         if (row.id != undefined)
    //             console.log(row);
    //     }
    // })
    // .catch( err => {
    //     console.log(err);
    // });
}

function add(key, value) {
    return bucket.insertAsync(key, value);
};

function get(key) {
    return bucket.getAsync(key);
}

function update(key, value, cas, retrieveLastVersion = false) {
    console.log('CAS')
    console.log(cas)
    return bucket.upsertAsync(key, value, { 'cas': cas })
        .catch(err => {
            console.log('### Caught!' + err.code)
            console.log('### Caught! errors.keyAlreadyExists' + errors.keyAlreadyExists)

            if (err.code === errors.keyAlreadyExists && retrieveLastVersion === false ) {
                return new Promise((resolve, reject) => {    
                    return reject(409) /// need to return reject(409)put more generic error
                })                
            }

            // if (err.code === errors.keyAlreadyExists && retrieveLastVersion === true ) {
            //     return new Promise((resolve, reject) => {

            //     })
            // }

            return new Promise((resolve, reject) => {    
                return reject(err) /// need to put more generic error
            })
        }
        );
}

module.exports = {
    add,
    get,
    update,
    getAll
}