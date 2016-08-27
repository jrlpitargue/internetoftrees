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
            lat: '3.145',
            lng: '0.31415'
        });
        ref.push({
            name: 'Narra',
            familyName: 'Fabaceae',
            endangered: 'True',
            lat: '3.14',
            lng: '0.31415'
        })
        ref.push({
            name: 'Pili',
            familyName: 'Burseraceae',
            endangered: 'True',
            lat: '3.14',
            lng: '0.31415'
        })
        ref.push({
            name: 'Coconut',
            familyName: 'Arecaceae',
            endangered: 'False',
            lat: '3.14',
            lng: '0.31415',
            _disease: 'Cocolisap'
        })
    }
});

module.exports = db;
