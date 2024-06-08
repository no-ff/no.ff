import requests
import json
from prediction.roleprediction import predict_role

Champ_data = {
    "266": "Aatrox",
    "103": "Ahri",
    "84": "Akali",
    "166": "Akshan",
    "12": "Alistar",
    "32": "Amumu",
    "34": "Anivia",
    "1": "Annie",
    "523": "Aphelios",
    "22": "Ashe",
    "136": "AurelionSol",
    "268": "Azir",
    "432": "Bard",
    "200": "Belveth",
    "53": "Blitzcrank",
    "63": "Brand",
    "201": "Braum",
    "233": "Briar",
    "51": "Caitlyn",
    "164": "Camille",
    "69": "Cassiopeia",
    "31": "Chogath",
    "42": "Corki",
    "122": "Darius",
    "131": "Diana",
    "119": "Draven",
    "36": "DrMundo",
    "245": "Ekko",
    "60": "Elise",
    "28": "Evelynn",
    "81": "Ezreal",
    "9": "FiddleSticks",
    "114": "Fiora",
    "105": "Fizz",
    "3": "Galio",
    "41": "Gangplank",
    "86": "Garen",
    "150": "Gnar",
    "79": "Gragas",
    "104": "Graves",
    "887": "Gwen",
    "120": "Hecarim",
    "74": "Heimerdinger",
    "910": "Hwei",
    "420": "Illaoi",
    "39": "Irelia",
    "427": "Ivern",
    "40": "Janna",
    "59": "JarvanIV",
    "24": "Jax",
    "126": "Jayce",
    "202": "Jhin",
    "222": "Jinx",
    "145": "Kaisa",
    "429": "Kalista",
    "43": "Karma",
    "30": "Karthus",
    "38": "Kassadin",
    "55": "Katarina",
    "10": "Kayle",
    "141": "Kayn",
    "85": "Kennen",
    "121": "Khazix",
    "203": "Kindred",
    "240": "Kled",
    "96": "KogMaw",
    "897": "KSante",
    "7": "Leblanc",
    "64": "LeeSin",
    "89": "Leona",
    "876": "Lillia",
    "127": "Lissandra",
    "236": "Lucian",
    "117": "Lulu",
    "99": "Lux",
    "54": "Malphite",
    "90": "Malzahar",
    "57": "Maokai",
    "11": "MasterYi",
    "902": "Milio",
    "21": "MissFortune",
    "62": "Wukong",
    "82": "Mordekaiser",
    "25": "Morgana",
    "950": "Naafiri",
    "267": "Nami",
    "75": "Nasus",
    "111": "Nautilus",
    "518": "Neeko",
    "76": "Nidalee",
    "895": "Nilah",
    "56": "Nocturne",
    "20": "Nunu",
    "2": "Olaf",
    "61": "Orianna",
    "516": "Ornn",
    "80": "Pantheon",
    "78": "Poppy",
    "555": "Pyke",
    "246": "Qiyana",
    "133": "Quinn",
    "497": "Rakan",
    "33": "Rammus",
    "421": "RekSai",
    "526": "Rell",
    "888": "Renata",
    "58": "Renekton",
    "107": "Rengar",
    "92": "Riven",
    "68": "Rumble",
    "13": "Ryze",
    "360": "Samira",
    "113": "Sejuani",
    "235": "Senna",
    "147": "Seraphine",
    "875": "Sett",
    "35": "Shaco",
    "98": "Shen",
    "102": "Shyvana",
    "27": "Singed",
    "14": "Sion",
    "15": "Sivir",
    "72": "Skarner",
    "901": "Smolder",
    "37": "Sona",
    "16": "Soraka",
    "50": "Swain",
    "517": "Sylas",
    "134": "Syndra",
    "223": "TahmKench",
    "163": "Taliyah",
    "91": "Talon",
    "44": "Taric",
    "17": "Teemo",
    "412": "Thresh",
    "18": "Tristana",
    "48": "Trundle",
    "23": "Tryndamere",
    "4": "TwistedFate",
    "29": "Twitch",
    "77": "Udyr",
    "6": "Urgot",
    "110": "Varus",
    "67": "Vayne",
    "45": "Veigar",
    "161": "Velkoz",
    "711": "Vex",
    "254": "Vi",
    "234": "Viego",
    "112": "Viktor",
    "8": "Vladimir",
    "106": "Volibear",
    "19": "Warwick",
    "498": "Xayah",
    "101": "Xerath",
    "5": "XinZhao",
    "157": "Yasuo",
    "777": "Yone",
    "83": "Yorick",
    "350": "Yuumi",
    "154": "Zac",
    "238": "Zed",
    "221": "Zeri",
    "115": "Ziggs",
    "26": "Zilean",
    "142": "Zoe",
    "143": "Zyra"
}


def id_to_live_match_comp(GameID: str, Tagline: str) -> list[str]:
    API_KEY = "RGAPI-f0816f16-3444-43d2-80d2-166c6e9a4a77"
    puuid = requests.get(
        f"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{GameID}/{Tagline}?api_key={API_KEY}")
    if puuid.status_code != 200:
        print("something has been unsuccessful")
        return "No account found"
    PUUID = puuid.json()['puuid']
    live_match = requests.get(
        f"https://na1.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/{PUUID}?api_key={API_KEY}")
    if live_match.status_code != 200:
        print(live_match.status_code)
        print(PUUID)
        print("something been unsuccessful, please try again later")
        return "No game found"
    participants = live_match.json()["participants"]

    Comp = []
    for champ in participants:
        Comp.append(Champ_data[str(champ["championId"])])
    result = predict_role(Comp[:5])
    result += predict_role(Comp[5:])
    print(result)
    return result


"""
VERSION_URL = 'https://ddragon.leagueoflegends.com/api/versions.json'
CHAMPION_URL_TEMPLATE = 'https://ddragon.leagueoflegends.com/cdn/{version}/data/en_US/champion.json'

def get_latest_version():
    response = requests.get(VERSION_URL)
    if response.status_code == 200:
        versions = response.json()
        return versions[0]
    else:
        print(f"Failed to fetch versions: {response.status_code}")
        return None

def get_champion_data(version):
    champion_url = CHAMPION_URL_TEMPLATE.format(version=version)
    response = requests.get(champion_url)
    if response.status_code == 200:
        return response.json()['data']
    else:
        return {}

def map_champion_id_to_name(champion_data):
    id_to_name = {}
    for champ_name, champ_info in champion_data.items():
        champ_id = champ_info['key']
        champ_full_name = champ_name
        id_to_name[champ_id] = champ_full_name
    return id_to_name

def write_to_json(data, filename):
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)

def run_conversion():
    latest_version = get_latest_version()
    if latest_version:
        champion_data = get_champion_data(latest_version)
        id_to_name = map_champion_id_to_name(champion_data)
        write_to_json(id_to_name, 'champion_id_to_name.json')
    else:
        print("it did not work")
"""
