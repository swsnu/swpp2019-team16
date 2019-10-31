class AssertionConcern:

    def assert_not_none(self, val, msg):
        if val is None:
            raise TypeError(msg)
