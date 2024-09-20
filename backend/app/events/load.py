"load"
import os
import random

import pandas as pd
import requests
from accounts.models import Account
from regions.models import Region
from tqdm import tqdm
from utils.date import extract_date_time

from .models import Categorie, Event, Tag

image_dir = "images"

events = [
    {
        "name": "Festival de Musique de Besançon",
        "description": "Un festival en plein air sur un week-end mettant en vedette des musiciens locaux et internationaux sur plusieurs scènes.",
        "date": "2023-07-15",
        "time": "12:00:00",
        "lat": 47.2412,
        "lng": 6.0188,
    },
    {
        "name": "Concert de Bienfaisance Contre le Cancer",
        "description": "Un concert pour collecter des fonds pour la recherche sur le cancer avec des performances de groupes locaux et de DJ.",
        "date": "2023-10-07",
        "time": "19:00:00",
        "lat": 47.2295,
        "lng": 6.0321,
    },
    {
        "name": "Nuit Électronique",
        "description": "Une soirée de musique électronique et de sets de DJ dans un club local.",
        "date": "2023-09-02",
        "time": "22:00:00",
        "lat": 47.2516,
        "lng": 6.0078,
    },
    {
        "name": "Foire aux Vinyles de Besançon",
        "description": "Achetez, vendez et échangez des vinyles, plus des sets de DJ en live et des performances musicales.",
        "date": "2023-08-20",
        "time": "11:00:00",
        "lat": 47.2247,
        "lng": 6.0432,
    },
    {
        "name": "Bataille des Groupes",
        "description": "Les groupes locaux s'affrontent pour gagner des prix et l'opportunité d'ouvrir pour un grand artiste.",
        "date": "2023-06-17",
        "time": "19:00:00",
        "lat": 47.2621,
        "lng": 6.0195,
    },
    {
        "name": "Marathon Musical Relais pour la Vie",
        "description": "Un événement musical de 24 heures pour collecter des fonds et sensibiliser à la recherche sur le cancer.",
        "date": "2023-09-16",
        "time": "12:00:00",
        "lat": 47.2158,
        "lng": 6.0098,
    },
    {
        "name": "Soirée Open Mic",
        "description": "Une soirée open mic mensuelle pour les musiciens et artistes locaux dans un lieu chaleureux.",
        "date": "2023-07-08",
        "time": "20:00:00",
        "lat": 47.2477,
        "lng": 6.0387,
    },
    {
        "name": "Besançon Unplugged",
        "description": "Une série de concerts intimes mettant en vedette des performances acoustiques d'artistes en tournée et locaux.",
        "date": "2023-10-21",
        "time": "19:30:00",
        "lat": 47.2333,
        "lng": 5.9895,
    },
    {
        "name": "Bataille de DJ",
        "description": "Les DJ s'affrontent dans une bataille tête-à-tête pour le vote du public et des prix en espèces.",
        "date": "2023-08-05",
        "time": "21:00:00",
        "lat": 47.2589,
        "lng": 6.0325,
    },
    {
        "name": "Concert des Survivants du Cancer",
        "description": "Un concert spécial célébrant les survivants du cancer avec de la musique et des histoires inspirantes.",
        "date": "2023-06-03",
        "time": "18:00:00",
        "lat": 47.2115,
        "lng": 6.0481,
    },
]

cats = [
    "Musique",
    "Sports",
    "Art",
    "Cuisine et Boissons",
    "Plein Air",
    "Famille",
    "Affaires",
    "Éducation",
    "Technologie",
    "Santé et Bien-être",
    "Charité",
    "Comédie",
    "Théâtre",
    "Danse",
    "Cinéma",
    "Mode",
    "Jeux Vidéo",
    "Livres",
    "Artisanat",
    "Vie Nocturne",
]

tags = [
    "Rock",
    "Pop",
    "Classique",
    "Jazz",
    "Électronique",
    "Hip-Hop",
    "Football",
    "Basket-ball",
    "Course à Pied",
    "Cyclisme",
    "Peinture",
    "Sculpture",
    "Photographie",
    "Dégustation de Vins",
    "Festival de Bières",
    "Cours de Cuisine",
    "Randonnée",
    "Camping",
    "Activités pour Enfants",
    "Atelier pour Parents",
    "Réseautage",
    "Marketing",
    "Conférence Tech",
    "Atelier de Codage",
    "Yoga",
    "Méditation",
    "Fitness",
    "Sensibilisation au Cancer",
    "Cause Environnementale",
    "Stand-up",
    "Impro",
    "Comédie Musicale",
    "Ballet",
    "Danse Contemporaine",
    "Film Indépendant",
    "Blockbuster",
    "Défilé de Mode",
    "Cosplay",
    "Jeux Vidéo",
    "Jeux de Société",
    "Club de Lecture",
    "Lecture d'Auteur",
    "Tricot",
    "Travail du Bois",
    "Cours de Peinture",
    "Soirée DJ",
    "Musique Live",
    "Club de Comédie",
    "Karaoké",
    "Pub Crawl",
]


def feed_events():
    "function to run the script"
    for index, event in tqdm(enumerate(events)):
        i = min(index + 1, 8)
        try:
            e = Event(
            name=event["name"],
            description=event["description"],
            date=event["date"],
            time=event["time"],
            lat=event["lat"],
            lng=event["lng"],
            region=Region.objects.get(name="Besançon"),
            creator=Account.objects.get(username="admin"),
            votes=0,
            cat=Categorie.objects.get(name=random.choice(cats)),
            image=os.path.join("images", str(i) + ".jpg"),
        )
        except Exception as e:
            print(f"error : {e}")
        e.save()
        selected_tag_ids = random.sample(list(Tag.objects.all()), 3)
        for tag in selected_tag_ids:
            e.tags.add(tag)
        e.save()


def feed_cats():
    "function to run the script"
    for cat in tqdm(cats):
        Categorie.objects.get_or_create(name=cat)


def feed_tags():
    "function to run the script"
    for tag in tqdm(tags):
        Tag.objects.get_or_create(name=tag)


def sortir_events():
    events = pd.read_csv("events.modified.csv")
    events.rename(columns={"Venue": "lieu"}, inplace=True)

    # Convert column names to lowercase and replace spaces with underscores
    columns = events.columns.tolist()
    columns = [c.lower().replace(" ", "_") for c in columns]
    events.columns = columns

    events["title"] = events["title"].str.replace(r"(\s)\s+", r"\1")
    events["desc2"] = events["desc2"].str.replace(r"(\s)\s+", r"\1")

    events = events.drop_duplicates(subset=["title", "image_url"])

    to_del = Event.objects.all()
    for event in tqdm(to_del):
        event.delete()

    resume = input("resume")


    for index, row in tqdm(events.iterrows()):

        date, time = extract_date_time(row["start_date"])

        # Get or create the region
        region, _ = Region.objects.get_or_create(name=row["city"])
        creator = Account.objects.get(username="admin")

        response = requests.get(row["image_url"])
        image_name= f"image_{index}.jpg"

        if response.status_code == 200:
            with open(os.path.join(f"media/{image_dir}", image_name), "wb") as f:
                f.write(response.content)
        else:
            print(f"Failed to download image: {row["image_url"]}")

        try:
            Event.objects.get_or_create(
                id=index,
                name=row["title"],
                description=row["desc2"],
                date=date,
                time=time,
                address=row["address"],
                lieu=row["lieu"],
                region=region,
                image = os.path.join(image_dir, image_name),
                url=row["source_url"],
                votes=0,
                creator=creator,
            )
        except Exception as e:
            print(e)
            break
