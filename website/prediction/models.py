from django.db import models


class RoleDistribution(models.Model):
    championName = models.CharField(max_length=100)
    championId = models.IntegerField()
    Top = models.IntegerField()
    Jungle = models.IntegerField()
    Mid = models.IntegerField()
    Adc = models.IntegerField()
    Support = models.IntegerField()
    Total = models.IntegerField()
