const Facility = require('../schema/facility');

module.exports.seed = () => {
  const facilities = [
    {
      id     : '100',
      name   : 'Florence State Prison',
      address: '1305 E Butte Ave',
      city   : 'Florence',
      state  : 'AZ',
      zip    : '85132',
    },
    {
      id     : '101',
      name   : 'Phoenix State Prison',
      address: '2500 E Van Buren St',
      city   : 'Phoenix',
      state  : 'AZ',
      zip    : '85008',
    },
    {
      id     : '102',
      name   : 'Tuscon State Prison',
      address: '10000 South Wilmot',
      city   : 'Tuscon',
      state  : 'AZ',
      zip    : '85734',
    },
  ];

  Facility.remove({}, () => {
    for (let i = 0; i < facilities.length; i++) {
      const data         = facilities[i];
      const facilityData = {
        id     : data.id,
        name   : data.name,
        address: data.address,
        city   : data.city,
        state  : data.state,
        zip    : data.zip,
      };
      Facility.create(facilityData, (err, facility) => {
        if (err) {
          console.log('Error creating facility', err);
        } else {
          //console.log('Facility created!', facility);
        }
      });
    }
  })
  .catch(error => {
    console.log(error);
  });
};

module.exports.get = (req, res) => {
  console.log('get site');
};

module.exports.post = (req, res) => {
  console.log('post site');
};

module.exports.patch = (req, res) => {
  console.log('patch site');
};

module.exports.delete = (req, res) => {
  console.log('delete site');
};

module.exports.all = (req, res) => {
  console.log('get all sites');
};
