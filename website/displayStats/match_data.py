import requests
import json
import time

from .models import Matches as MatchData

def handle_riot_api_error(riot_object):
    """
    This function handles the error codes returned by the Riot API.
    :param riot_object: The object returned by the Riot API.
    :return: True if the error code is handled, False otherwise.
    """
    if riot_object.status_code == 429:
        print(f"The following error code has been invoked:{riot_object.status_code} sleeping for 2 minutes")
        time.sleep(120)
        return True

    if riot_object.status_code == 400 or \
            riot_object.status_code == 403 or \
            riot_object.status_code == 401 or \
            riot_object.status_code == 404 or \
            riot_object.status_code == 405 or \
            riot_object.status_code == 415:
        print(f"The following error code has been invoked:{riot_object.status_code}")
        return True

    if riot_object.status_code == 500 or \
            riot_object.status_code == 502 or \
            riot_object.status_code == 503 or \
            riot_object.status_code == 504:
        print(f"The following error code has been invoked:{riot_object.status_code} sleeping for 2 minutes")
        time.sleep(10)
        return True

    return False


def get_puuid(name, tagline, key):
    puuid_data = requests.get(f"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{name}/{tagline}?api_key={key}")
    # need to check errors
    puuid_data = puuid_data.json()
    puuid = puuid_data['puuid']
    return puuid

def get_matches(puuid, key, count):
    match_data = requests.get(f"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count={count}&api_key={key}")
    # need to check errors
    match_data = match_data.json()
    return match_data

def get_match_data(match_id, key):
    match_data = requests.get(f"https://americas.api.riotgames.com/lol/match/v5/matches/{match_id}?api_key={key}")
    # need to check errors
    match_data = match_data.json()
    return match_data

def get_match_player_data(player_json, game_length):
    """For each player, need sums, items, kda, cs (cs per m), runes, rank, champ, wards damage, player name, """
    player_data = {}
    player_data['username'] = player_json['summonerName']
    player_data['champion'] = player_json['championName']
    player_data['kda'] = f"{player_json['kills']}/{player_json['deaths']}/{player_json['assists']}"
    player_data['cs'] = player_json['totalMinionsKilled'] + player_json['neutralMinionsKilled']
    player_data['cs_per_min'] = round(((float) (player_json['goldEarned'] / game_length)),1)
    player_data['wards'] = player_json['wardsPlaced']
    player_data['damage'] = player_json['totalDamageDealtToChampions']
    player_data['damageTaken'] = player_json['totalDamageTaken']
    player_data['items'] = [player_json['item0'], player_json['item1'], player_json['item2'], player_json['item3'], player_json['item4'], player_json['item5'], player_json['item6']]
    player_data['runes'] = get_runes(player_json['perks'])
    player_data['spells'] = [player_json['summoner1Id'], player_json['summoner2Id']]
    player_data['win'] = player_json['win']
    return player_data

def decoding_runes(runes):
    runeFile = open("runesReforged.json", "r")
    runeFile = json.load(runeFile)
    runesDir = {}
    for runes in runeFile:

        runesDir[runes['id']] = runes['key']
        for category in runes['slots']:
            for rune in category['runes']:
                runesDir[rune['id']] = rune['name']
    print(runesDir)
    outputRunes = open("runes.json", "w")
    outputRunes.write(json.dumps(runesDir))

def get_runes(runeset):
    primary_keystone = (runeset['styles'][0]['style'])
    sec_keystone = (runeset['styles'][1]['style'])
    prim_runes = []
    sec_runes = []
    for x in runeset['styles'][0]['selections']:
        prim_runes.append(x['perk'])
    for x in runeset['styles'][1]['selections']:
        sec_runes.append(x['perk'])
    new_runes = {primary_keystone: prim_runes, sec_keystone: sec_runes}
    return new_runes

def convert_match_to_player_data(match_id, key):
    match_data = get_match_data(match_id, key)
    game_length = match_data['info']['gameDuration']
    players=(match_data['info']['participants'])
    player_data = []
    for player in players:
        player_data.append(get_match_player_data(player, game_length))
    return {match_id: player_data}


def insert_matchdata_to_database(match_id, api_key):
    to_insert = convert_match_to_player_data(match_id, api_key)
    # insert to database
    MatchData.objects.create(
            match_id = match_id, \
            player_data = to_insert, \
            game_length = to_insert['match_id']['info']['gameDuration'], \
            game_mode = to_insert['match_id']['info']['queueType'])



if __name__ == "__main__":

    api = 'RGAPI-61b2aecf-da19-4d68-b273-bae69dd6a000'
    match = 'NA1_5012873300'
    match_data = requests.get(f'https://americas.api.riotgames.com/lol/match/v5/matches/{match}?api_key={api}').json()
    players = convert_match_to_player_data(match, api)
    print(players)