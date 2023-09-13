#!/usr/bin/env node
const fetch = require('node-fetch');
const fs = require('fs');
const { execSync } = require('child_process');
const prompts = require('prompts');
const path = require('path');
const kolorist = require('kolorist');



// Tableau des options de dossiers
const options = ["REACT", "R3F", "VIEWER_360", "VIEWER_3D"];

// Afficher le titre "Choisissez le dossier à cloner"
console.log("");
console.log('________  ___  __    _______   ___      ___ ___  _________  _______      \r\n|\\   __  \\|\\  \\|\\  \\ |\\  ___ \\ |\\  \\    \/  \/|\\  \\|\\___   ___\\\\  ___ \\     \r\n\\ \\  \\|\\  \\ \\  \\\/  \/|\\ \\   __\/|\\ \\  \\  \/  \/ | \\  \\|___ \\  \\_\\ \\   __\/|    \r\n \\ \\  \\\\\\  \\ \\   ___  \\ \\  \\_|\/_\\ \\  \\\/  \/ \/ \\ \\  \\   \\ \\  \\ \\ \\  \\_|\/__  \r\n  \\ \\  \\\\\\  \\ \\  \\\\ \\  \\ \\  \\_|\\ \\ \\    \/ \/   \\ \\  \\   \\ \\  \\ \\ \\  \\_|\\ \\ \r\n   \\ \\_______\\ \\__\\\\ \\__\\ \\_______\\ \\__\/ \/     \\ \\__\\   \\ \\__\\ \\ \\_______\\\r\n    \\|_______|\\|__| \\|__|\\|_______|\\|__|\/       \\|__|    \\|__|  \\|_______|\r\n      ');
console.log("");

          
async function downloadFolder(githubPath, localPath) {
  // Effectuer une requête à l'API GitHub pour récupérer le contenu du dossier
  const response = await fetch(`https://api.github.com/repositories/661719329/contents/${githubPath}`);
  if (!response.ok) {
      throw new Error(`❌ Erreur lors de la récupération du contenu du dossier : ${response.status} ${response.statusText}`);
  }

  // Convertir la réponse en JSON
  const folderContents = await response.json();

  // Vérifier si le dossier existe localement
  if (!fs.existsSync(localPath)) {
      fs.mkdirSync(localPath);
  }

  // Télécharger chaque fichier du dossier ou parcourir les sous-dossiers
  for (const item of folderContents) {
      const localItemPath = path.join(localPath, item.name);
      if (item.type === 'file') {
          const fileUrl = item.download_url;
          
          // Effectuer une requête pour télécharger le fichier
          const fileResponse = await fetch(fileUrl);
          if (!fileResponse.ok) {
              throw new Error(`❌ Erreur lors du téléchargement du fichier : ${fileResponse.status} ${fileResponse.statusText}`);
          }

          // Enregistrer le fichier localement
          const fileStream = fs.createWriteStream(localItemPath);
          fileResponse.body.pipe(fileStream);
      } else if (item.type === 'dir') {
          await downloadFolder(path.join(githubPath, item.name), localItemPath);
      }
  }
}                                                            
                                                                          
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
    console.log(kolorist.cyan(`🔄 Le dossier ${selectedOption} est en cours de téléchargement...`));

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
        
          
            
              await downloadFolder(`boilerplate/${folderName}`, folderName);
      
              console.log(kolorist.green("✅ Le dossier a été cloné avec succès."));
              console.log(kolorist.yellow(`🚀 Lancer avec : cd ${folderName}/ && npm install && npm run dev`));
          } catch (error) {
              console.error(kolorist.red("❌ Le dossier n'a pas pu être cloné. Erreur :"), error.message);
              process.exit(1);
          }
})();


