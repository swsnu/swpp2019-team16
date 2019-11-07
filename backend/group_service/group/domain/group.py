from django.db import models


class Group(models.Model):

    class Meta:
        app_label = 'group'

    driver = models.ForeignKey(
        'user.Driver',
        blank=True,
        null=True,
        on_delete=models.CASCADE,
        related_name='group_of_driver'
    )
    from_location = models.CharField(max_length=255, default="")
    to_location = models.CharField(max_length=255, default="")    
    cost = models.IntegerField(default=0)
    departure = models.BooleanField(default=False)

    def __str__(self):
        return 'driver={},from_location={},to_location={},cost={},departure={}'\
            .format(self.driver, self.from_location, self.to_location, self.cost, self.departure)    

