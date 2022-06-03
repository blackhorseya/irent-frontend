APP_NAME=irent-frontend
VERSION=latest
PROJECT_ID=sean-side
NS=side
DEPLOY_TO=uat
REGISTRY=gcr.io
IMAGE_NAME=$(REGISTRY)/$(PROJECT_ID)/$(APP_NAME)
HELM_REPO_NAME = blackhorseya

check_defined = $(if $(value $1),,$(error Undefined $1))

.PHONY: help
help: ## show help
	@grep -hE '^[ a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-17s\033[0m %s\n", $$1, $$2}'

.PHONY: clean
clean: ## remove artifacts
	@rm -rf build
	@echo Successfully removed artifacts

.PHONY: build-image
build-image: ## build docker image
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
list-images: ## list image
	@docker images --filter=label=app.name=$(APP_NAME)

.PHONY: prune-images
prune-images: ## prune images
	@docker rmi -f `docker images --filter=label=app.name=$(APP_NAME) -q`

.PHONY: push-image
push-image: ## publish image
	$(call check_defined,VERSION)
	@docker tag $(IMAGE_NAME):$(VERSION) $(IMAGE_NAME):latest
	@docker push $(IMAGE_NAME):$(VERSION)
	@docker push $(IMAGE_NAME):latest

.PHONY: deploy
deploy: ## deploy application
	$(call check_defined,VERSION)
	$(call check_defined,DEPLOY_TO)
	@helm --namespace $(NS) \
	upgrade --install $(APP_NAME) $(HELM_REPO_NAME)/$(APP_NAME) \
	--values ./deployments/values/$(DEPLOY_TO)/$(APP_NAME).yaml \
	--set image.tag=$(VERSION)
