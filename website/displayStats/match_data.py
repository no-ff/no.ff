import requests
import json
import time
from time import gmtime, strftime
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
def decode_sums(sumId):
    sums = {
  1: "Boost",
  3: "Exhaust",
  4: "Flash",
  6: "Haste",
  7: "Heal",
  11: "Smite",
  12: "Teleport",
  13: "Mana",
  14: "Dot",
  21: "Barrier",
  30: "Snowball",
  31: "Snowball",
  32: "Snowball",
  39: "Snowball",
  2201: "Snowball",
  2202: "Flash"
}
    return sums[sumId]
def get_match_player_data(player_json, game_length):
    """For each player, need sums, items, kda, cs (cs per m), runes, rank, champ, wards damage, player name, """
    player_data = {}
    print(player_json)
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
    player_data['spells'] = [decode_sums(player_json['summoner1Id']), decode_sums(player_json['summoner2Id'])]
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
9923: "Hail Of Blades",
8126: "Cheap Shot",
8139: "Taste Of Blood",
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
8005: "Press The Attack",
8021: "Fleet Footwork",
8010: "Conqueror",
9101: "Absorb Life",
9111: "Triumph",
8009: "Presence Of Mind",
9104: "Legend: Alacrity",
9105: "Legend: Haste",
9103: "Legend: Bloodline",
8014: "Coup De Grace",
8017: "Cut Down",
8299: "Last Stand",
8400: "Resolve",
8437: "Grasp Of The Undying",
8439: "VeteranAftershock",
8465: "Guardian",
8446: "Demolish",
8463: "Font Of Life",
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
def get_queue_type(queue_id):
    return queue_dict[queue_id]
def get_time(unix_time):
    print(unix_time)
    return time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(unix_time/1000))
def convert_match_to_player_data(match_id, key):
    match_data = get_match_data(match_id, key)
    game_length = match_data['info']['gameDuration']
    time_in_mins = strftime("%M:%S", gmtime(game_length))
    queueId = match_data['info']['queueId']
    game_time = match_data['info']['gameStartTimestamp']
    new_time = get_time(game_time)
    players=(match_data['info']['participants'])
    # game_mode = match_data['info']['queueType']
    player_data = []
    kills = 0
    print("")
    print(players)
    print("")
    for player in players:
        player_data.append(get_match_player_data(player, game_length))
        kills += player['kills']
    return {'match': player_data, "game_length": str(time_in_mins), "game_mode": get_queue_type(queueId), "time": str(new_time), "kills": kills}


def insert_matchdata_to_database(match_id, api_key):
    to_insert = convert_match_to_player_data(match_id, api_key)
    print(to_insert)
    # insert to database
    MatchData.objects.create(
            match_id = match_id, \
            player_data = to_insert, \
            game_length = to_insert['game_length'], \
            game_mode = to_insert['game_mode'], \
            game_time = to_insert['time']
            )
    


queue_dict = {
    0: "Custom",
    2: "5v5 Blind Pick",
    4: "5v5 Ranked Solo",
    6: "5v5 Ranked Premade",
    7: "Co-op vs AI",
    8: "3v3 Normal",
    9: "3v3 Ranked Flex",
    14: "5v5 Draft Pick",
    16: "5v5 Dominion Blind Pick",
    17: "5v5 Dominion Draft Pick",
    25: "Dominion Co-op vs AI",
    31: "Co-op vs AI Intro Bot",
    32: "Co-op vs AI Beginner Bot",
    33: "Co-op vs AI Intermediate Bot",
    41: "3v3 Ranked Team",
    42: "5v5 Ranked Team",
    52: "Co-op vs AI",
    61: "5v5 Team Builder",
    65: "5v5 ARAM",
    67: "ARAM Co-op vs AI",
    70: "One for All",
    72: "1v1 Snowdown Showdown",
    73: "2v2 Snowdown Showdown",
    75: "6v6 Hexakill",
    76: "Ultra Rapid Fire",
    78: "One For All: Mirror Mode",
    83: "Co-op vs AI Ultra Rapid Fire",
    91: "Doom Bots Rank 1",
    92: "Doom Bots Rank 2",
    93: "Doom Bots Rank 5",
    96: "Ascension",
    98: "6v6 Hexakill",
    100: "5v5 ARAM",
    300: "Legend of the Poro King",
    310: "Nemesis",
    313: "Black Market Brawlers",
    315: "Nexus Siege",
    317: "Definitely Not Dominion",
    318: "ARURF",
    325: "All Random",
    400: "5v5 Draft Pick",
    410: "5v5 Ranked Dynamic",
    420: "5v5 Ranked Solo",
    430: "5v5 Blind Pick",
    440: "5v5 Ranked Flex",
    450: "5v5 ARAM",
    460: "3v3 Blind Pick",
    470: "3v3 Ranked Flex",
    490: "Normal (Quickplay)",
    600: "Blood Hunt Assassin",
    610: "Dark Star: Singularity",
    700: "Summoner's Rift Clash",
    720: "ARAM Clash",
    800: "Co-op vs. AI Intermediate Bot",
    810: "Co-op vs. AI Intro Bot",
    820: "Co-op vs. AI Beginner Bot",
    830: "Co-op vs. AI Intro Bot",
    840: "Co-op vs. AI Beginner Bot",
    850: "Co-op vs. AI Intermediate Bot",
    900: "ARURF",
    910: "Ascension",
    920: "Legend of the Poro King",
    940: "Nexus Siege",
    950: "Doom Bots Voting",
    960: "Doom Bots Standard",
    980: "Star Guardian Invasion: Normal",
    990: "Star Guardian Invasion: Onslaught",
    1000: "PROJECT: Hunters",
    1010: "Snow ARURF",
    1020: "One for All",
    1030: "Odyssey Extraction: Intro",
    1040: "Odyssey Extraction: Cadet",
    1050: "Odyssey Extraction: Crewmember",
    1060: "Odyssey Extraction: Captain",
    1070: "Odyssey Extraction: Onslaught",
    1090: "Teamfight Tactics",
    1100: "Ranked Teamfight Tactics",
    1110: "Teamfight Tactics Tutorial",
    1111: "Teamfight Tactics test",
    1200: "Nexus Blitz",
    1300: "Nexus Blitz",
    1400: "Ultimate Spellbook",
    1700: "Arena",
    1710: "Arena",
    1900: "Pick URF",
    2000: "Tutorial 1",
    2010: "Tutorial 2",
    2020: "Tutorial 3"
}
