// const add = require('../../src/model/couchbaseUtil').add;
// const get = require('../../src/model/couchbaseUtil').get;
// const update = require('../../src/model/couchbaseUtil').update;
// const getAll = require('../../src/model/couchbaseUtil').getAll;


const CB = require('../../src/model/couchbaseUtil');


// CB.add('4', {x:1,y:3})
// .then( result => console.log(result))
// .catch( err => console.log(err));


// CB.update('COMPANY::1', {
//     "id": "COMPANY::1",
//     "type": "company",
//     "subType": "restaurant",
//     "name": "Blue River Restaurant",
//     "email": "leo@blue_river.com",
//     "phone": "780-710-2550",
//     "address": {
//         "suite": "900",
//         "streetNumber": "214",
//         "streetName": "11 Avenue SW",
//         "city": "Calgary",
//         "province": "Alberta",
//         "country": "Canada",
//         "geo": {
//             "lat": "-9.117047399999999",
//             "lng": "38.7626105"
//         }
//     },
//     "users": [
//         {
//             "firstName": "Leo",
//             "lastName": "LeoLastName",
//             "role": "Owner",
//             "userName": "loganwolverine",
//             "email": "loganwolverine@xmen.org",
//             "password": "******"
//         },
//         {
//             "firstName": "Wonder",
//             "lastName": "Wolverine",
//             "role": "User",
//             "userName": "wonderwolverine",
//             "email": "wonderwolverine@xmen.org",
//             "password": "******"
//         }
//     ],
//     "products": []
// })
// .then( result => console.log(result))
// .catch( err => console.log(err));


CB.get('COMPANY::1')
    .then(result => {

        console.log("=====First CAS:")
        let firstCas = result.cas;
        console.log(firstCas);
        console.log("===== ===== =====")
        console.log(result);


        // CB.update('4', { 'x': 90, 'y': 270, 'z': 4500 }, firstCas)
        //     .then(() => {
        //         CB.get('4')
        //             .then(result => {
        //                 console.log("=====Second CAS:")
        //                 let secondCas = result.cas;
        //                 console.log(secondCas);
        //                 console.log("===== ===== =====")
        //                 console.log(result)
        //             })

        //         CB.update('4', { 'x': 9, 'y': 27, 'z': 45 }, firstCas)
        //             .then(() => {
        //                 CB.get('4')
        //                     .then(result => {
        //                         console.log(result);
        //                     })
        //             })
        //             .catch( err => console.log(err))
        //     });
    })



// let query = 'SELECT * FROM QWayDB LIMIT 10';
// CB.getAll(query)
// .then( rows => console.log(rows))
// .catch( err => console.log(err));