from prediction.models import RoleDistribution


def initialize(champ_data):
    RoleDistribution.objects.all().delete()
    for champ_id, champ_name in champ_data.items():
        RoleDistribution.objects.create(championName=champ_name, championId=champ_id, Top=0, Jungle=0, Mid=0, Adc=0, Support=0, Total=0)
  

def enter_row(row):
    champs = row.split(',')[:10]
    for i in range(10):
        print(champs[i])
        if champs[i] == 'MonkeyKing':
            ro = RoleDistribution.objects.get(championName='Wukong')
        else:
            ro = RoleDistribution.objects.get(championName=champs[i])
        if i % 5 == 0:
            ro.Top += 1
        elif i % 5 == 1:
            ro.Jungle += 1
        elif i % 5 == 2:
            ro.Mid += 1
        elif i % 5 == 3:
            ro.Adc += 1
        elif i % 5 == 4:
            ro.Support += 1 
        ro.Total += 1
        ro.save()
"""
initialize(Champ_data)
data = open("prediction/matches.csv", "r")     
input = data.readlines()
for j in input:
    enter_row(j)
"""


def predict_role(champs):
    result = []
    for role in range(5):
        if role == 0:
            max = 0
            max_champ = ''
            for champ in champs:
                if champ == 'MonkeyKing':
                    champ = 'Wukong'
                ro = RoleDistribution.objects.get(championName=champ)
                if ro.Top/ro.Total > max:
                    max = ro.Top/ro.Total
                    max_champ = champ
            result.append(max_champ)
            champs.remove(max_champ)
            print(f"Top: {max_champ}")
        elif role == 1:
            max = 0
            max_champ = ''
            for champ in champs:
                if champ == 'MonkeyKing':
                    champ = 'Wukong'
                ro = RoleDistribution.objects.get(championName=champ)
                if ro.Jungle/ro.Total > max:
                    max = ro.Jungle/ro.Total
                    max_champ = champ
            result.append(max_champ)
            champs.remove(max_champ)
            print(f"Jungle: {max_champ}")
        elif role == 2:
            max = 0
            max_champ = ''
            for champ in champs:
                if champ == 'MonkeyKing':
                    champ = 'Wukong'
                ro = RoleDistribution.objects.get(championName=champ)
                if ro.Mid/ro.Total > max:
                    max = ro.Mid/ro.Total
                    max_champ = champ
            result.append(max_champ)            
            champs.remove(max_champ)
            print(f"Mid: {max_champ}")
        elif role == 3:
            max = 0
            max_champ = ''
            for champ in champs:
                if champ == 'MonkeyKing':
                    champ = 'Wukong'
                ro = RoleDistribution.objects.get(championName=champ)
                if ro.Adc/ro.Total > max:
                    max = ro.Adc/ro.Total
                    max_champ = champ
            result.append(max_champ)
            champs.remove(max_champ)
            print(f"Adc: {max_champ}")
        elif role == 4:
            max = 0
            max_champ = ''
            for champ in champs:
                if champ == 'MonkeyKing':
                    champ = 'Wukong'
                ro = RoleDistribution.objects.get(championName=champ)
                if ro.Support/ro.Total > max:
                    max = ro.Support/ro.Total
                    max_champ = champ
            result.append(max_champ)
            champs.remove(max_champ)
            print(f"Support: {max_champ}")
    return result

print(predict_role(['Akali', 'Nocturne', 'Volibear', 'Alistar', 'Ezreal']))