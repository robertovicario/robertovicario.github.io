#!/bin/bash

# =========================
# Configurations
# =========================

# Icons
ICON_START="▶"     # U+25B6
ICON_STOP="■"      # U+25A0
ICON_SETUP="⚙"     # U+2699
ICON_DOWNLOAD="↓"  # U+2193
ICON_CLEAN="♻"     # U+267B
ICON_OK="✓"        # U+2713
ICON_ERR="✗"       # U+2717

# Colors
RESET="\033[0m"
RED="\033[31m"
GREEN="\033[32m"
YELLOW="\033[33m"
BLUE="\033[34m"
MAGENTA="\033[35m"
CYAN="\033[36m"

# =========================
# Methods
# =========================

start() {

    # Operations
    printer -start "Starting the app..."
    cd app || exit 1
    npm run start
    STATUS=$?
    cd - >/dev/null || exit 1

    # Handler
    handler $STATUS
}

setup() {

    # Operations
    printer -setup "Setting up the app..."
    cd app || exit 1
    npm install
    npm run start
    STATUS=$?
    cd - >/dev/null || exit 1

    # Handler
    handler $STATUS
}

deploy() {

    # BUILD
    printer -setup "Deploying the app..."
    cd app || exit 1
    npm install
    npm run build
    STATUS=$?
    cd - >/dev/null || exit 1

    # DEPLOY
    git add .
    git commit -m "Deployed the app"
    git push
    STATUS=$?

    # Handler
    handler $STATUS
}

# =========================
# Handlers
# =========================

usage() {
    cat <<EOF

1. Usage:
    - bash $0 <command>

2. Commands:
    - [${ICON_SETUP}] start
    - [${ICON_START}] setup
    - [${ICON_SETUP}] deploy

EOF
    exit 1
}

printer() {
    local STATUS="$1"
    local MESSAGE="$2"
    local ICON=""
    local COLOR=""
    case "$STATUS" in
        -start)
            ICON="$ICON_START"
            COLOR="$BLUE"
            ;;
        -stop)
            ICON="$ICON_STOP"
            COLOR="$RED"
            ;;
        -debug)
            ICON="$ICON_START"
            COLOR="$CYAN"
            ;;
        -setup)
            ICON="$ICON_SETUP"
            COLOR="$MAGENTA"
            ;;
        -clean)
            ICON="$ICON_CLEAN"
            COLOR="$YELLOW"
            ;;
        -success)
            ICON="$ICON_OK"
            COLOR="$GREEN"
            ;;
        -error)
            ICON="$ICON_ERR"
            COLOR="$RED"
            ;;
        *)
            ICON="$ICON_ERR"
            COLOR="$RED"
            ;;
    esac
    echo ""
    echo -e "${COLOR}[${ICON}] ${MESSAGE}${RESET}"
    echo ""
}

handler() {
    local STATUS=$1
    if [ $STATUS -eq 0 ]; then
        printer -success "Process completed successfully"
    else
        printer -error "An unexpected error occurred"
        exit 1
    fi
}

case $1 in
    start)
        start
        ;;
    setup)
        setup
        ;;
    deploy)
        deploy
        ;;
    *)
        usage
        ;;
esac

# -------------------------
