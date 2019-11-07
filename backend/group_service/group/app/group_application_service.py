import logging

from backend.group_service.group.domain.group import Group

logger = logging.getLogger(__name__)

class GroupApplicationService:
    def create_group(self, from_location, to_location):
        return Group.objects.create(from_location=from_location, to_location=to_location)

    def update_group(self, group_id, driver_id):
        myGroup = Group.objects.get(id=group_id)
        myGroup.driver_id = driver_id
        return myGroup

    
