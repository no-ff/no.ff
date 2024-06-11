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
        return True

    if riot_object.status_code == 400 or \
            riot_object.status_code == 403 or \
            riot_object.status_code == 401 or \
            riot_object.status_code == 404 or \
            riot_object.status_code == 405 or \
            riot_object.status_code == 415:
        return True

    if riot_object.status_code == 500 or \
            riot_object.status_code == 502 or \
            riot_object.status_code == 503 or \
            riot_object.status_code == 504:
            
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
    player_data['riotId'] = player_json['riotIdGameName'] + "#" + player_json['riotIdTagline'] 
    player_data['champion'] = player_json['championName']
    player_data['kda'] = f"{player_json['kills']}/{player_json['deaths']}/{player_json['assists']}"
    player_data['cs'] = player_json['totalMinionsKilled'] + player_json['neutralMinionsKilled']
    player_data['cs_per_min'] = round(((float) (player_json['goldEarned'] / game_length)),1)
    player_data['wards'] = player_json['wardsPlaced']
    player_data['damage'] = player_json['totalDamageDealtToChampions']
    player_data['damageTaken'] = player_json['totalDamageTaken']
    player_data['items'] = [player_json['item0'], player_json['item1'], player_json['item2'], player_json['item3'], player_json['item4'], player_json['item5'], player_json['item6']]
    player_data['runes'] = decode_acutal_runes(get_runes(player_json['perks']))
    player_data['spells'] = [player_json['summoner1Id'], player_json['summoner2Id']]
    player_data['win'] = player_json['win']
    return player_data

def decoding_runes():
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

def decode_acutal_runes(runes):
    print(runes)
    runeFile = {
    8100: "Domination",
    8112: "Electrocute",
    8128: "Dark Harvest",
    9923: "Hail of Blades",
    8126: "Cheap Shot",
    8139: "Taste of Blood",
    8143: "Sudden Impact",
    8136: "Zombie Ward",
    8120: "Ghost Poro",
    8138: "Eyeball Collection",
    8135: "Treasure Hunter",
    8105: "Relentless Hunter",
    8106: "Ultimate Hunter",
    8300: "Inspiration",
    8351: "Glacial Augment",
    8360: "Unsealed Spellbook",
    8369: "First Strike",
    8306: "Hextech Flashtraption",
    8304: "Magical Footwear",
    8321: "Cash Back",
    8313: "Triple Tonic",
    8352: "Time Warp Tonic",
    8345: "Biscuit Delivery",
    8347: "Cosmic Insight",
    8410: "Approach Velocity",
    8316: "Jack Of All Trades",
    8000: "Precision",
    8005: "Press the Attack",
    8021: "Fleet Footwork",
    8010: "Conqueror",
    9101: "Absorb Life",
    9111: "Triumph",
    8009: "Presence of Mind",
    9104: "Legend: Alacrity",
    9105: "Legend: Haste",
    9103: "Legend: Bloodline",
    8014: "Coup de Grace",
    8017: "Cut Down",
    8299: "Last Stand",
    8400: "Resolve",
    8437: "Grasp of the Undying",
    8439: "Aftershock",
    8465: "Guardian",
    8446: "Demolish",
    8463: "Font of Life",
    8401: "Shield Bash",
    8429: "Conditioning",
    8444: "Second Wind",
    8473: "Bone Plating",
    8451: "Overgrowth",
    8453: "Revitalize",
    8242: "Unflinching",
    8200: "Sorcery",
    8214: "Summon Aery",
    8229: "Arcane Comet",
    8230: "Phase Rush",
    8224: "Nullifying Orb",
    8226: "Manaflow Band",
    8275: "Nimbus Cloak",
    8210: "Transcendence",
    8234: "Celerity",
    8233: "Absolute Focus",
    8237: "Scorch",
    8232: "Waterwalking",
    8236: "Gathering Storm"
}

    decoded_runes = {}
    for key in runes:
        decoded_runes[runeFile[key]] = []
        for rune in runes[key]:
            decoded_runes[runeFile[key]].append(runeFile[(rune)])
    return decoded_runes


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
    print(new_runes)
    return new_runes

def convert_match_to_player_data(match_id, key):
    match_data = get_match_data(match_id, key)
    game_length = match_data['info']['gameDuration']
    players=(match_data['info']['participants'])
    # game_mode = match_data['info']['queueType']
    player_data = []
    for player in players:
        player_data.append(get_match_player_data(player, game_length))
    return {'match': player_data, "game_length": game_length, "game_mode": 420}


def insert_matchdata_to_database(match_id, api_key):
    to_insert = convert_match_to_player_data(match_id, api_key)
    print(to_insert)
    # insert to database
    MatchData.objects.create(
            match_id = match_id, \
            player_data = to_insert, \
            game_length = to_insert['game_length'], \
            game_mode = to_insert['game_mode'])


