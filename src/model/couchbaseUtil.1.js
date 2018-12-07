var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://localhost/');
cluster.authenticate('Administrator', 'nimda!');
var bucket = cluster.openBucket('testBucket');
var N1qlQuery = couchbase.N1qlQuery;

// bucket.manager().createPrimaryIndex(function() {
//   bucket.upsert('user:king_arthur', {
//     'email': 'kingarthur@couchbase.com', 'interests': ['Holy Grail', 'African Swallows']
//   },
//   function (err, result) {
//     bucket.get('user:king_arthur', function (err, result) {
//       console.log('Got result: %j', result.value);
//       bucket.query(
//       N1qlQuery.fromString('SELECT * FROM bucketname WHERE $1 in interests LIMIT 1'),
//       ['African Swallows'],
//       function (err, rows) {
//         console.log("Got rows: %j", rows);
//       });
//     });
//   });
// });
function getAll(){
   let query = N1qlQuery.fromString('SELECT * FROM testBucket LIMIT 10');
bucket.query(query, function(err, rows, meta) {
  for (row in rows) {
    // console.log(JSON.stringify(row));
    if(row.id !=undefined)
        console.log(row);
  }
});
}

function add(key, value, callback){
    bucket.insert(key, value, 
        function(err, result){
            if (!err){
                console.log("Stored document successfully. CAS is %j", result.cas);
                callback(result);
            } else {
                console.error("Couldn't store document %j", err);
            }
        }
    );
};

function get(key, callback){
    bucket.get(key, function(err, result) {
        if (err) {
            if (err.code == couchbase.errors.keyNotFound) {
                console.log('Key does not exist');
            } else {
                console.log('Some other error occurred: %j', err);
            }
        } else {
            console.log('Retrieved document with value: %j', result.value);
            console.log('CAS is %j', result.cas);
            callback(result.value);
        }
    });
}

function update(key, value, callback){
    bucket.upsert(key, value, /*{'expiry': 1},*/ function(err){
        if (err) {
            console.log(err);
        } else {
           callback(value);
        }
    });
}

module.exports = {
    add,
    get,
    update,
    getAll
}