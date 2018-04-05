const auth        = require('../service/auth');
const logging     = require('../service/logging');
//
const Facility    = require('../schema/facility');
const User        = require('../schema/user');
const Detainee    = require('../schema/detainee');
const DetaineePHI = require('../schema/detaineePHI');

// facilities -------------------------------------------------------------------

module.exports.facilities = () => {
  const facilities = [
    {
      facilityID: '100',
      name      : 'Florence State Prison',
      address   : '1305 E Butte Ave',
      city      : 'Florence',
      state     : 'AZ',
      zip       : '85132',
    },
    {
      facilityID: '101',
      name      : 'Phoenix State Prison',
      address   : '2500 E Van Buren St',
      city      : 'Phoenix',
      state     : 'AZ',
      zip       : '85008',
    },
    {
      facilityID: '102',
      name      : 'Tuscon State Prison',
      address   : '10000 South Wilmot',
      city      : 'Tuscon',
      state     : 'AZ',
      zip       : '85734',
    },
  ];

  Facility.remove({}, () => {
    for (let i = 0; i < facilities.length; i++) {
      Facility.create(facilities[i], (error, facility) => {
        if (error) {
          console.log('Error creating facility', error)
        } else {
          console.log('Success creating facility', facility.id)
        }
      });
    }
  })
};

// detainees -------------------------------------------------------------------

module.exports.detainees = () => {
  const url         = 'https://randomuser.me/api/?results=600&nat=us';
  const facilityIDs = ['100', '101', '102'];
  const fetch       = require('node-fetch');
  fetch(url)
  .then(response => {
    response.json()
    .then(json => {
      Detainee.remove({}, () => {
        DetaineePHI.remove({}, () => {
          for (let i = 0; i < json.results.length; i++) {
            const index        = Math.floor(Math.random() * 3);
            const detaineeID   = Math.ceil(Math.random() * 1000000);
            const data         = json.results[i];
            const facilityID   = facilityIDs[index];
            const detaineeData = {
              facilityID: facilityID,
              detaineeID: detaineeID,
              gender    : data.gender,
              firstName : data.name.first,
              lastName  : data.name.last,
            };
            Detainee.create(detaineeData, (error, detainee) => {
              const detaineePHIData = {
                _id   : detainee.id,
                gender: data.gender,
              };
              DetaineePHI.create(detaineePHIData);
              Facility.findOne({facilityID: facilityID}, (error, facility) => {
                console.log(facilityID, facility)
                facility.detainees.push(detainee);
                facility.save();
              })

            });
          }
        });
      });
    });
  })
};

// users -------------------------------------------------------------------

module.exports.users = () => {
  const users = [
    {
      firstName : 'Ian',
      lastName  : 'Greenough',
      email     : 'one@admin.com',
      username  : 'indigo',
      password  : 'password',
      facilityID: '100',
      admin     : true,
      counselor : null,
    },
    {
      firstName : 'Bertha',
      lastName  : 'Martinez',
      email     : 'one@counselor.com',
      username  : 'berthaMartinez',
      password  : 'password',
      facilityID: '100',
      admin     : null,
      counselor : true,
    },
    {
      firstName : 'Andrew',
      lastName  : 'Lord',
      email     : 'one@user.com',
      username  : 'andrewLord',
      password  : 'password',
      facilityID: '100',
      admin     : null,
      counselor : null,
    },
    {
      firstName : 'Bella',
      lastName  : 'Bailey',
      email     : 'two@admin.com',
      username  : 'bellaBailey',
      password  : 'password',
      facilityID: '101',
      admin     : true,
      counselor : null,
    },
    {
      firstName : 'Dan',
      lastName  : 'Lawson',
      email     : 'two@counselor.com',
      username  : 'danLawson',
      password  : 'password',
      facilityID: '101',
      admin     : null,
      counselor : true,
    },
    {
      firstName : 'Irma',
      lastName  : 'Williams',
      email     : 'three@admin.com',
      username  : 'irmaWilliams',
      password  : 'password',
      facilityID: '102',
      admin     : true,
      counselor : null,
    },
    {
      firstName : 'Armando',
      lastName  : 'Harper',
      email     : 'three@couselor.com',
      username  : 'armandoHarper',
      password  : 'password',
      facilityID: '102',
      admin     : null,
      counselor : true,
    },
  ];

  const url         = 'https://randomuser.me/api/?results=30&nat=us';
  const facilityIDs = ['100', '101', '102'];
  const fetch       = require('node-fetch');

  fetch(url)
  .then(response => {
    response.json().then(json => {
      User.remove({}, () => {
        for (let i = 0; i < json.results.length; i++) {
          const result        = json.results[i];
          const facilityIndex = Math.floor(Math.random() * facilityIDs.length);
          const admin         = Math.floor(Math.random() * 10) === 0;
          const counselor     = admin ? false : Math.floor(Math.random() * 5) === 0;
          const facilityID    = facilityIDs[facilityIndex];
          users.push({
            firstName : result.name.first,
            lastName  : result.name.last,
            email     : result.email,
            username  : result.login.username,
            password  : 'password',
            facilityID: facilityID,
            admin,
            counselor,
          })
        }
        for (let j = 0; j < users.length; j++) {
          const user     = users[j];
          const userData = {
            firstName : user.firstName,
            lastName  : user.lastName,
            email     : user.email,
            username  : user.username,
            password  : user.password,
            facilityID: user.facilityID,
            userID    : auth.generateID(6),
            admin     : user.admin,
            counselor : user.counselor,
          };
          User.create(userData, (error, user) => {
            Facility.findOne({facilityID: user.facilityID}, (error, facility) => {
              if (user.admin){
                facility.admins.push(user);
              } else if (user.counselor){
                facility.counselors.push(user);
              } else {
                facility.users.push(user);
              }
              facility.save();
            })
          });
        }
      });
    });
  })
  .catch(error => {
    console.log(error);
  });
};