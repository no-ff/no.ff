from django.db import models
import jsonfield

# Create your models here.
class Accounts(models.Model):
    riotID = models.CharField(max_length=100, default='')
    summonerName = models.CharField(max_length=100)
    puuid = models.CharField(max_length=100)
    tier = models.CharField(max_length=100)
    rank = models.CharField(max_length=100)
    leaguePoints = models.IntegerField()
    wins = models.IntegerField()
    losses = models.IntegerField()
    level = models.IntegerField()
    icon = models.IntegerField()
    past_matches = jsonfield.JSONField()

class Matches(models.Model):
    match_id = models.CharField(max_length=100)
    game_length = models.CharField(max_length=100)
    game_mode = models.CharField(max_length=100)
    player_data = jsonfield.JSONField()
    game_time = models.CharField(max_length=100)

