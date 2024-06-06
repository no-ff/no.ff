from django.db import models

# Create your models here.
class Accounts(models.Model):
    riotId = models.CharField(max_length=100)
    puuid = models.CharField(max_length=100)
    past_matches = 