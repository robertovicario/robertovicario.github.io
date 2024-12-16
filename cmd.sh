#!/bin/bash

# Colori
RED='\033[0;31m'; GREEN='\033[0;32m'; BLUE='\033[0;34m'; NC='\033[0m'

# Funzione di aiuto
usage() {
  echo -e "${BLUE}
  Uso: $0 -option${NC}
  ${BLUE}Opzioni:${NC}
  ${GREEN}-b${NC} Build
  ${GREEN}-d${NC} Delete
  ${GREEN}-r${NC} Run
  ${GREEN}-h${NC} Help"
  exit 1
}

# Errore se nessuna opzione
[ $# -eq 0 ] && echo -e "${RED}Error: Invalid option.${NC}" && usage

# Gestione opzioni
# Parsing delle opzioni usando getopts:
# -a: Esegue l'azione A (build e avvia docker-compose)
# -b: Esegue l'azione B (avvia docker-compose senza build)
# -c: Esegue l'azione C (ferma e pulisce docker-compose)
# -h: Mostra il messaggio di aiuto
while getopts ":abc:h" opt; do
  case $opt in
    b) echo -e "${GREEN}Build${NC}"; docker-compose up --build;;
    d) echo -e "${GREEN}Delete${NC}"; docker-compose down --rmi all --volumes --remove-orphans;;
    r) echo -e "${GREEN}Run${NC}"; docker-compose up;;
    h) usage;;
    *) echo -e "${RED}Error: -$OPTARG${NC}" && usage;;
  esac
  exit 0

done

# Messaggio di default se nessuna opzione valida
[ $OPTIND -eq 1 ] && echo -e "${RED}Invalid option.${NC}" && usage
