#!/bin/bash

# Vérifier si svn est installé
if ! command -v svn &> /dev/null; then
    echo "svn n'est pas installé. Veuillez l'installer pour utiliser ce script."
    exit 1
fi

# Tableau des options de dossiers
options=("THREE" "REACT" "NODEJS" "VUE" "R3F" "NEXTJS" "SVELTE" "VITE" "VANILLA")

# Afficher le titre "Choisissez le dossier à cloner"
echo "📂 Selectioner un framework :"
echo ""

# Afficher les options de dossiers à l'utilisateur et sélectionner le dossier avec fzf
selected_option=$(printf "%s\n" "${options[@]}" | fzf --height=8 --color=16  --pointer="▶"  )

# Vérifier la sélection de l'utilisateur
if [[ -n $selected_option ]]; then
    case $selected_option in
        "THREE")
            folder_path="three"
            ;;
        "REACT")
            folder_path="react"
            ;;
        "VUE")
            folder_path="vue"
            ;;
        *)
            echo "Choix invalide."
            exit 1
            ;;
    esac
else
    echo "😨 Aucun dossier sélectionné."
    exit 1
fi

# Obtenir le nom du dossier à partir du chemin relatif
folder_name=$(basename "$folder_path")

# Cloner le contenu du dossier spécifié
svn export "https://github.com/OkeniteAnimation/OkanVite/trunk/$folder_path" "$folder_name"_template

# Vérifier si le clonage a réussi
if [ $? -eq 0 ]; then
    echo "✅ Le dossier a été cloné avec succès."
    echo "🔄 Lancer avec : cd "$folder_name"_template/ && npm install && npm run dev"

else
    echo "❌ Le dossier n'a pas pu être cloné."
fi
