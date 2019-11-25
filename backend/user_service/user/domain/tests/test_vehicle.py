from django.test import TestCase

from ..vehicle import Vehicle


class VehicleTestCase(TestCase):

    def test_str(self):
        vehicle = Vehicle(car_type='benz', plate_no=1234)
        self.assertEqual(str(vehicle), 'car_type=benz,plate_no=1234')

    def test_eq_when_type_is_not_vehicle(self):
        vehicle = Vehicle(car_type='benz', plate_no=1234)
        self.assertTrue(vehicle != {'car_type': 'benz', 'plate_no': 1234})

    def test_eq_when_field_is_not_equal(self):
        vehicle = Vehicle(car_type='benz', plate_no=1234)
        vehicle2 = Vehicle(car_type='benz2', plate_no=1234)
        self.assertTrue(vehicle != vehicle2)
