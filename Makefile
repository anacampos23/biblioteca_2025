# Biblioteca 2025 Makefile
# Usage: make [target]

# Color definitions
YELLOW := \033[1;33m
GREEN := \033[1;32m
RED := \033[1;31m
NC := \033[0m # No Color

# Docker Compose variables
DOCKER_COMPOSE = docker-compose -f docker-compose-develop.yml
DOCKER_PHP = $(DOCKER_COMPOSE) exec php
DOCKER_ARTISAN = $(DOCKER_PHP) php artisan

# Help command
.PHONY: help
help:
	@echo "$(YELLOW)Biblioteca 2025 Makefile$(NC)"
	@echo "$(YELLOW)---------------------$(NC)"
	@echo "$(GREEN)Docker Commands:$(NC)"
	@echo "  make up              - Start Docker containers"
	@echo "  make down            - Stop Docker containers"
	@echo "  make build           - Build Docker containers"
	@echo "  make restart         - Restart Docker containers"
	@echo "  make logs            - View container logs"
	@echo "  make shell           - Open shell in PHP container"
	@echo "$(GREEN)Laravel Commands:$(NC)"
	@echo "  make install         - Install dependencies"
	@echo "  make migrate         - Run database migrations"
	@echo "  make seed            - Run database seeders"
	@echo "  make fresh           - Refresh database"
	@echo "  make key             - Generate application key"
	@echo "  make cache           - Clear cache"
	@echo "  make npm-dev         - Run npm dev"
	@echo "  make npm-build       - Run npm build"
	@echo "$(GREEN)Test Commands:$(NC)"
	@echo "  make test            - Run Pest tests (Feature and Unit)"
	@echo "  make test-unit       - Run only Unit tests"
	@echo "  make test-feature    - Run only Feature tests"
	@echo "  make test-filter     - Run tests matching pattern (use FILTER="
	@echo "  make dusk            - Run all Dusk tests"
	@echo "  make dusk-filter     - Run Dusk tests matching pattern (use FILTER="
	@echo "  make dusk-fails      - Run only failed Dusk tests"
	@echo "  make test-all        - Run all tests (Pest and Dusk)"
	@echo "  make test-coverage   - Generate test coverage report"
	@echo "$(GREEN)Deployment Commands:$(NC)"
	@echo "  make deploy          - Deploy application"
	@echo "  make deploy-staging  - Deploy to staging"

# Docker commands
.PHONY: up
up:
	@echo "$(GREEN)Starting Docker containers...$(NC)"
	@$(DOCKER_COMPOSE) up -d
	@echo "$(GREEN)Docker containers started.$(NC)"

.PHONY: down
down:
	@echo "$(GREEN)Stopping Docker containers...$(NC)"
	@$(DOCKER_COMPOSE) down
	@echo "$(GREEN)Docker containers stopped.$(NC)"

.PHONY: build
build:
	@echo "$(GREEN)Building Docker containers...$(NC)"
	@$(DOCKER_COMPOSE) build
	@echo "$(GREEN)Docker containers built.$(NC)"

.PHONY: restart
restart: down up
	@echo "$(GREEN)Docker containers restarted.$(NC)"

.PHONY: logs
logs:
	@echo "$(GREEN)Viewing container logs...$(NC)"
	@$(DOCKER_COMPOSE) logs -f

.PHONY: shell
shell:
	@echo "$(GREEN)Opening shell in PHP container...$(NC)"
	@$(DOCKER_PHP) bash

# Laravel commands
.PHONY: install
install:
	@echo "$(GREEN)Installing composer dependencies...$(NC)"
	@$(DOCKER_PHP) composer install
	@echo "$(GREEN)Installing npm dependencies...$(NC)"
	@$(DOCKER_COMPOSE) exec vite npm install
	@echo "$(GREEN)Dependencies installed.$(NC)"

.PHONY: migrate
migrate:
	@echo "$(GREEN)Running database migrations...$(NC)"
	@$(DOCKER_ARTISAN) migrate
	@echo "$(GREEN)Migrations completed.$(NC)"

.PHONY: seed
seed:
	@echo "$(GREEN)Running database seeders...$(NC)"
	@$(DOCKER_ARTISAN) db:seed
	@echo "$(GREEN)Seeding completed.$(NC)"

.PHONY: fresh
fresh:
	@echo "$(GREEN)Refreshing database...$(NC)"
	@$(DOCKER_ARTISAN) migrate:fresh --seed
	@echo "$(GREEN)Database refreshed.$(NC)"

.PHONY: key
key:
	@echo "$(GREEN)Generating application key...$(NC)"
	@$(DOCKER_ARTISAN) key:generate
	@echo "$(GREEN)Application key generated.$(NC)"

.PHONY: cache
cache:
	@echo "$(GREEN)Clearing cache...$(NC)"
	@$(DOCKER_ARTISAN) optimize:clear
	@echo "$(GREEN)Cache cleared.$(NC)"

.PHONY: npm-dev
npm-dev:
	@echo "$(GREEN)Running npm dev...$(NC)"
	@$(DOCKER_COMPOSE) exec vite npm run dev
	@echo "$(GREEN)npm dev completed.$(NC)"

.PHONY: npm-build
npm-build:
	@echo "$(GREEN)Running npm build...$(NC)"
	@$(DOCKER_COMPOSE) exec vite npm run build
	@echo "$(GREEN)npm build completed.$(NC)"

# Test commands
.PHONY: test
test:
	@echo "$(GREEN)Running Pest tests...$(NC)"
	@$(DOCKER_PHP) php artisan test
	@echo "$(GREEN)Pest tests completed.$(NC)"

.PHONY: test-unit
test-unit:
	@echo "$(GREEN)Running Unit tests...$(NC)"
	@$(DOCKER_PHP) php artisan test --testsuite=Unit
	@echo "$(GREEN)Unit tests completed.$(NC)"

.PHONY: test-feature
test-feature:
	@echo "$(GREEN)Running Feature tests...$(NC)"
	@$(DOCKER_PHP) php artisan test --testsuite=Feature
	@echo "$(GREEN)Feature tests completed.$(NC)"

.PHONY: test-filter
test-filter:
	@echo "$(GREEN)Running filtered tests...$(NC)"
	@$(DOCKER_PHP) php artisan test --filter=$(FILTER)
	@echo "$(GREEN)Filtered tests completed.$(NC)"

.PHONY: dusk
dusk: up
	@echo "$(GREEN)Running Dusk tests...$(NC)"
	@$(DOCKER_PHP) php artisan dusk
	@echo "$(GREEN)Dusk tests completed.$(NC)"

.PHONY: dusk-filter
dusk-filter: up
	@echo "$(GREEN)Running filtered Dusk tests...$(NC)"
	@$(DOCKER_PHP) php artisan dusk --filter=$(FILTER)
	@echo "$(GREEN)Filtered Dusk tests completed.$(NC)"

.PHONY: dusk-fails
dusk-fails: up
	@echo "$(GREEN)Running failed Dusk tests...$(NC)"
	@$(DOCKER_PHP) php artisan dusk --fails
	@echo "$(GREEN)Failed Dusk tests completed.$(NC)"

.PHONY: test-all
test-all: test dusk
	@echo "$(GREEN)All tests completed.$(NC)"

.PHONY: test-coverage
test-coverage:
	@echo "$(GREEN)Generating test coverage report...$(NC)"
	@$(DOCKER_PHP) php artisan test --coverage
	@echo "$(GREEN)Test coverage report generated.$(NC)"

# Deployment commands
.PHONY: deploy
deploy: npm-build
	@echo "$(GREEN)Deploying application...$(NC)"
	@$(DOCKER_PHP) composer install --optimize-autoloader --no-dev
	@$(DOCKER_ARTISAN) config:cache
	@$(DOCKER_ARTISAN) route:cache
	@$(DOCKER_ARTISAN) view:cache
	@$(DOCKER_ARTISAN) storage:link
	@$(DOCKER_ARTISAN) migrate --force
	@echo "$(GREEN)Application deployed.$(NC)"

.PHONY: deploy-staging
deploy-staging: npm-build
	@echo "$(GREEN)Deploying to staging...$(NC)"
	@$(DOCKER_PHP) composer install --optimize-autoloader
	@$(DOCKER_ARTISAN) config:cache
	@$(DOCKER_ARTISAN) route:cache
	@$(DOCKER_ARTISAN) view:cache
	@$(DOCKER_ARTISAN) storage:link
	@$(DOCKER_ARTISAN) migrate --force
	@echo "$(GREEN)Application deployed to staging.$(NC)"

# Default target
.DEFAULT_GOAL := help
