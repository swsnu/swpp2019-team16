from django.test import TestCase

from common.assertion_concern import AssertionConcern


class AssertionConcernImpl(AssertionConcern):

    def __init__(self):
        super().__init__()


class AssertionConcernTestCase(TestCase):

    def test_assert_not_none_when_value_is_not_none_then_do_nothing(self):
        aci = AssertionConcernImpl()
        aci.assert_not_none("NOT_NONE", "if this None raise exception")

    def test_assert_not_none_when_value_is_none_then_raise_exception(self):
        aci = AssertionConcernImpl()
        with self.assertRaisesMessage(TypeError, "if this None raise exception"):
            aci.assert_not_none(None, "if this None raise exception")
