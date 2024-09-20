app_name = <app_name>
path = <path>

ogrinspect:
	docker compose exec backend python manage.py ogrinspect $(path)  Regions --srid=4326 --mapping --multi
superuser:
	docker compose exec backend bash -c "python manage.py createsuperuser"
python:
	docker compose exec backend bash -c "python"
startapp:
	docker compose exec backend bash -c "python manage.py startapp $(app_name)"
migrate:
	docker compose exec backend bash -c "python manage.py makemigrations $(app_name) && python manage.py migrate $(app_name)"

shell:
	docker compose exec backend bash -c "python manage.py shell"

