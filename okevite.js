#!/usr/bin/env node
const fetch = require('node-fetch');
const fs = require('fs');
const { execSync } = require('child_process');
const prompts = require('prompts');
const path = require('path');
const kolorist = require('kolorist');



// Tableau des options de dossiers
const options = ["THREE", "REACT", "VUE", "R3F", "VANILLA"];

// Afficher le titre "Choisissez le dossier à cloner"
console.log("");
console.log(kolorist.bold("👋 Bienvenue & merci d'utiliser Okévite !"));
console.log("");


// Utiliser prompts pour la sélection du dossier
(async () => {
    const response = await prompts({
        type: 'select',
        name: 'selectedOption',
        message: '⬇️  Sélectionnez un framework :',
        choices: options.map(option => ({ title: option, value: option })),
        initial: 0
    });

    const selectedOption = response.selectedOption;

    // Obtenir le chemin du dossier sélectionné
    const folderPath = selectedOption.toLowerCase();

    // Obtenir le nom du dossier à partir du chemin relatif
    const folderName = path.basename(folderPath);

    // Cloner le contenu du dossier spécifié
    try {
       
            // Effectuer une requête à l'API GitHub pour récupérer le contenu du dossier
            const response = await fetch(`https://api.github.com/repositories/661719329/contents/boilerplate/${folderName}`);
            if (!response.ok) {
              throw new Error(`❌ Erreur lors de la récupération du contenu du dossier : ${response.status} ${response.statusText}`);
            }
        
            // Convertir la réponse en JSON
            const folderContents = await response.json();
        
            // Vérifier si le dossier existe localement
            if (!fs.existsSync(folderName)) {
              fs.mkdirSync(folderName);
            }
        
            // Télécharger chaque fichier du dossier
            for (const item of folderContents) {
              if (item.type === 'file') {
                const fileUrl = item.download_url;
                const fileName = path.join(folderName, item.name);
        
                // Effectuer une requête pour télécharger le fichier
                const fileResponse = await fetch(fileUrl);
                if (!fileResponse.ok) {
                  throw new Error(`❌ Erreur lors du téléchargement du fichier : ${fileResponse.status} ${fileResponse.statusText}`);
                }
        
                // Enregistrer le fichier localement
                const fileStream = fs.createWriteStream(fileName);
                fileResponse.body.pipe(fileStream);
              }
            }
        
          
        console.log(kolorist.green("✅ Le dossier a été cloné avec succès."));
        console.log(kolorist.yellow(`🚀 Lancer avec : cd ${folderName}_template/ && npm install && npm run dev`));
    } catch (error) {
        console.error(kolorist.red("❌ Le dossier n'a pas pu être cloné. Erreur :"), error.message);
        process.exit(1);
    }
})();


