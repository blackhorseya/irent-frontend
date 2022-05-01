APP_NAME=irent-frontend
VERSION=latest
PROJECT_ID=sean-side
NS=side
DEPLOY_TO=uat
REGISTRY=gcr.io
IMAGE_NAME=$(REGISTRY)/$(PROJECT_ID)/$(APP_NAME)
HELM_REPO_NAME = blackhorseya

check_defined = $(if $(value $1),,$(error Undefined $1))

.PHONY: clean
clean:
	@rm -rf build
	@echo Successfully removed artifacts

.PHONY: build-image
build-image:
	$(call check_defined,VERSION)
	$(call check_defined,DEPLOY_TO)
	@docker build -t $(IMAGE_NAME):$(VERSION) \
	--label "app.name=$(APP_NAME)" \
	--label "app.version=$(VERSION)" \
	--build-arg APP_NAME=$(APP_NAME) \
	--build-arg BUILD=$(DEPLOY_TO) \
	--pull --cache-from=$(IMAGE_NAME):latest \
	-f Dockerfile .

.PHONY: list-images
list-images:
	@docker images --filter=label=app.name=$(APP_NAME)

.PHONY: prune-images
prune-images:
	@docker rmi -f `docker images --filter=label=app.name=$(APP_NAME) -q`

.PHONY: push-image
push-image:
	$(call check_defined,VERSION)
	@docker tag $(IMAGE_NAME):$(VERSION) $(IMAGE_NAME):latest
	@docker push $(IMAGE_NAME):$(VERSION)
	@docker push $(IMAGE_NAME):latest

.PHONY: deploy
deploy:
	$(call check_defined,VERSION)
	$(call check_defined,DEPLOY_TO)
	@helm --namespace $(NS) \
	upgrade --install $(APP_NAME) $(HELM_REPO_NAME)/$(APP_NAME) \
	--values ./deployments/values/$(DEPLOY_TO)/$(APP_NAME).yaml \
	--set image.tag=$(VERSION)
