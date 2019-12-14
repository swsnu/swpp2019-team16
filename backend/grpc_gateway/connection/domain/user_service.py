from interface import Interface


class UserService(Interface):
    def get_user_id_list_from_group_id(self, group_id):
        pass

    def get_user_id_list_from_rider_id_list(self, rider_id_list):
        pass

    def get_all_driver_user_id_list(self):
        pass

