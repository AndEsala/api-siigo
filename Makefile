CONTAINER_NAME=clev-siigo
MAIN_BRANCH=main

.PHONY: upd upi down ps build

upd:
	docker compose up --build -d

upi:
	docker compose up --build

down:
	docker compose down

ps:
	docker compose ps

build:
	git checkout $(MAIN_BRANCH)
	git pull origin $(MAIN_BRANCH)
	docker compose build

clean:
	docker compose down
	docker compose rm -f
	docker compose build --no-cache

prune:
	docker container prune -f
	docker image prune -a -f
	docker volume prune -f
	docker builder prune -a -f

restart:
	make down
	make upd

