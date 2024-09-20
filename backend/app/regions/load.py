"load script for region"
from tqdm import tqdm

from .models import Region

regions = {
    "Paris": {"lat": 48.8566, "lng": 2.3522},
    "Marseille": {"lat": 43.2965, "lng": 5.3698},
    "Lyon": {"lat": 45.764, "lng": 4.8357},
    "Toulouse": {"lat": 43.6044, "lng": 1.4442},
    "Nice": {"lat": 43.7031, "lng": 7.2661},
    "Nantes": {"lat": 47.2184, "lng": -1.5536},
    "Strasbourg": {"lat": 48.5734, "lng": 7.7521},
    "Montpellier": {"lat": 43.6107, "lng": 3.8767},
    "Bordeaux": {"lat": 44.8378, "lng": -0.5792},
    "Lille": {"lat": 50.6292, "lng": 3.0635},
    "Rennes": {"lat": 48.1113, "lng": -1.68},
    "Reims": {"lat": 49.2583, "lng": 4.0322},
    "Le Havre": {"lat": 49.4938, "lng": 0.1076},
    "Saint-Etienne": {"lat": 45.4395, "lng": 4.3871},
    "Toulon": {"lat": 43.1242, "lng": 5.9281},
    "Grenoble": {"lat": 45.1875, "lng": 5.7257},
    "Angers": {"lat": 47.4711, "lng": -0.5538},
    "Dijon": {"lat": 47.3215, "lng": 5.0424},
    "Brest": {"lat": 48.3905, "lng": -4.4867},
    "Le Mans": {"lat": 48.0061, "lng": 0.1996},
    "Nîmes": {"lat": 43.8367, "lng": 4.3603},
    "Clermont-Ferrand": {"lat": 45.7784, "lng": 3.0873},
    "Tours": {"lat": 47.3924, "lng": 0.6891},
    "Amiens": {"lat": 49.8944, "lng": 2.2957},
    "Limoges": {"lat": 45.8333, "lng": 1.25},
    "Metz": {"lat": 49.12, "lng": 6.1756},
    "Perpignan": {"lat": 42.6959, "lng": 2.8906},
    "Besançon": {"lat": 47.2382, "lng": 6.0242},
    "Boulogne-Billancourt": {"lat": 48.8341, "lng": 2.2388},
    "Orléans": {"lat": 47.9024, "lng": 1.9105},
    "Mulhouse": {"lat": 47.75, "lng": 7.3333},
    "Rouen": {"lat": 49.4431, "lng": 1.0993},
    "Caen": {"lat": 49.1829, "lng": -0.3674},
    "Nancy": {"lat": 48.6933, "lng": 6.1833},
    "Montreuil": {"lat": 48.8642, "lng": 2.4444},
    "Avignon": {"lat": 43.9492, "lng": 4.8056},
    "Vitry-sur-Seine": {"lat": 48.7894, "lng": 2.3889},
    "Créteil": {"lat": 48.7904, "lng": 2.44},
    "Dunkirk": {"lat": 51.037, "lng": 2.3769},
    "Aix-en-Provence": {"lat": 43.5283, "lng": 5.4474},
    "Nanterre": {"lat": 48.8923, "lng": 2.2142},
    "Aubervilliers": {"lat": 48.9131, "lng": 2.3816},
}


def run():
    "function to run the script"
    for region in tqdm(regions.items()):
        Region.objects.get_or_create(
            name=region[0],
            lat=region[1]["lat"],
            lng=region[1]["lng"],
        )
