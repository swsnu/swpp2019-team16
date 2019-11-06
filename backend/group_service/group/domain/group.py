from django.db import models


class Group(models.Model):

    class Meta:
        app_label = 'group'

    driver = models.ForeignKey(
        'user.Driver',
        blank=True,
        null=True,
        on_delete=models.CASCADE,
    )
    from_location = models.CharField(max_length=255)
    to_location = models.CharField(max_length=255)    
    cost = models.IntegerField(default=0)
    departure = models.BooleanField(default=False)

    def __str__(self):
        return 'cost={},departure={}'\
            .format(self.cost, self.departure)    

