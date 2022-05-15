start:
	npm start
dev:
	npm run start:dev
dstart:
	docker-compose up
dstop:
	docker-compose down
ddbuild:
	docker-compose build; docker-compose up;
