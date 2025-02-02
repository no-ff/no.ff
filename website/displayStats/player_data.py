import requests
import json
from displayStats.models import Accounts

def get_puuid(gamename, tag, key):
    player = requests.get(f'https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gamename}/{tag}?api_key={key}')
    player = player.json()
    print("please: ", player)
    return player['puuid']


def get_summ_id(puuid, key):
    summoner = requests.get(f'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}?api_key={key}')
    summoner = json.loads(summoner.text)
    return {'sumId': summoner['id'], 'puuid': summoner['puuid'], 'level': summoner['summonerLevel'], 'icon':summoner['profileIconId']}


def get_player_data(summ_id, key):
    #list of match ids
    # rank, wr, role, champs, total games, icon, 
    player_data = {}
    summ_data = requests.get(f'https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/{summ_id}?api_key={key}').json()
    x=0
    print(summ_data)
    for types in summ_data:
        if types['queueType'] == 'RANKED_SOLO_5x5':
            break
        x+=1

    player_data['rank'] = [(summ_data[int(x)])['tier'], (summ_data[int(x)])['rank'], (summ_data[int(x)])['leaguePoints']]
    player_data['wr'] = [summ_data[x]['wins'], summ_data[x]['losses']]

    return player_data


def get_match_list(puuid, key):
    match_list = []
    empty = False
    start = 0
    while not empty:
        matches = requests.get(f'https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start={start}&count=100&api_key={key}').json()
        if len(matches) < 100:
            match_list += matches
            empty = True
            return match_list
        match_list += matches
        start += 100
    return match_list


def write_player_data(api_key, name, tagline):
    puuid = get_puuid(name, tagline, api_key)
    print("puuid:"+ puuid)
    sum_id = (get_summ_id(puuid, api_key))
    print("sum_id:" + sum_id['sumId'])
    play = (get_player_data(sum_id['sumId'], api_key))
    print(sum_id)
    print(play)
    play.update(sum_id)
    print(play)
    riotid = name + "#" + tagline
    player_data = Accounts()
    player_data.riotID = riotid
    player_data.summonerName = play['sumId']
    player_data.puuid = play['puuid']
    player_data.tier = play['rank'][0]
    player_data.rank = play['rank'][1]
    player_data.leaguePoints = play['rank'][2]
    player_data.wins = play['wr'][0]
    player_data.losses = play['wr'][1]
    player_data.level = play['level']
    player_data.icon = play['icon']
    player_data.past_matches = get_match_list(puuid, api_key)
    player_data.save()


"""
puuid = '_numZ7P_3tZlzeC8lkHSBsY5MIKVje1kvHNJlt7_Wp9fKEhwJss6VMAc0HfVsdFLlm6oYXwqvdE27Q'
api = 'RGAPI-e3d577b6-1f0a-4842-888a-8c7ba7c24864' 
sum_id = '1VKY_8bB6g7agYYO_pZcieSe-Npy5iuV_t7L4jaZVquOC4k'
sum = (get_summ_id(puuid, api))
play = (get_player_data(sum_id, api))
print(sum)
print(play)
play.update(sum)
print(play)
player_data = Accounts()
player_data.summonerName = play['sumId']
player_data.puuid = play['puuid']
player_data.tier = play['rank'][0]
player_data.rank = play['rank'][1]
player_data.leaguePoints = play['rank'][2]
player_data.wins = play['wr'][0]
player_data.losses = play['wr'][1]
player_data.level = play['level']
player_data.icon = play['icon']
player_data.past_matches = []
player_data.save()
player_data.id
"""