'use strict';

import Firebase from 'firebase';


let db = Firebase.initializeApp({
    databaseURL: 'https://teampec2-internetoftrees.firebaseio.com/'
});

let ref = db.database().ref('trees');

ref.once('value', function(data) {
    if(!data.val()) {
        ref.push({
            name: 'Acacia',
            familyName: 'Fabaceae',
            endangered: 'False',
            lat: '14.15983764',
            lng: '121.24256036'
        });
        ref.push({
            name: 'Narra',
            familyName: 'Fabaceae',
            endangered: 'True',
            lat: '14.16129404',
            lng: '121.24247453'
        })
        ref.push({
            name: 'Mango',
            familyName: 'Anacardiaceae',
            endangered: 'True',
            lat: '14.16911681',
            lng: '121.24560199'
        })
        ref.push({
            name: 'Coconut',
            familyName: 'Arecaceae',
            endangered: 'False',
            lat: '14.16634974',
            lng: '121.24273002'
        })
    }
});

module.exports = db;
