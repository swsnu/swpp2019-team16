import PropTypes from 'prop-types';

export const LocationPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  coordinate: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
});

export class Location {
  /*
   * args
   *   name: name is name of the location
   *   location: location is object type which has @lat @lng as key
   * */
  constructor({ name, coordinate }) {
    this.name = name;
    this.coordinate = coordinate;
  }
}

export const fromLocationList = [
  new Location({
    name: 'SNU station',
    coordinate: {
      lat: 37.480126,
      lng: 126.952436,
    },
  }),
  new Location({
    name: 'Nakseongdae station',
    coordinate: {
      lat: 37.477023,
      lng: 126.961957,
    },
  }),
  new Location({
    name: 'Nokdu Street',
    coordinate: {
      lat: 37.470463,
      lng: 126.940765,
    },
  }),
];

export const toLocationList = [
  new Location({
    name: '301 building',
    coordinate: {
      lat: 37.448475,
      lng: 126.95203,
    },
  }),
  new Location({
    name: 'Student Center',
    coordinate: {
      lat: 37.46046,
      lng: 126.949621,
    },
  }),
  new Location({
    name: 'Dormitory three-way',
    coordinate: {
      lat: 37.46046,
      lng: 126.949621,
    },
  }),
];
