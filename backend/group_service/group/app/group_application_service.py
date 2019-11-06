import logging

from backend.group_service.group.domain.group import Group

logger = logging.getLogger(__name__)

class GroupApplicationService:
    def createGroup(self, riders, from_location, to_location):
        return Group.objects.create(riders=riders, driver=None, 
            from_location=from_location, to_location=to_location)

    def updateGroup(self, groupId, driver):
        myGroup = Group.objects.get(id=groupId)
        myGroup.driver = driver
        return myGroup

    
