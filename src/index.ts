import { createApp } from './app';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    const app = createApp();
    
    app.listen(PORT, () => {
      console.log('🎲 Character Forger API démarrée !');
      console.log(`🚀 Serveur en cours d'exécution sur http://localhost:${PORT}`);
      console.log('📚 Documentation des endpoints :');
      console.log(`   GET  http://localhost:${PORT}/ - Page d'accueil`);
      console.log(`   GET  http://localhost:${PORT}/health - Statut de santé`);
      console.log(`   GET  http://localhost:${PORT}/api/characters - Liste des personnages`);
      console.log(`   POST http://localhost:${PORT}/api/characters - Créer un personnage`);
      console.log(`   GET  http://localhost:${PORT}/api/characters/search?q=nom - Rechercher`);
      console.log('');
      console.log('💡 Exemple de création de personnage :');
      console.log(`   curl -X POST http://localhost:${PORT}/api/characters \\`);
      console.log('   -H "Content-Type: application/json" \\');
      console.log('   -d \'{"name": "Aragorn", "gameSystem": "D&D 5e"}\'');
    });

  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
}

// Gestion de l'arrêt gracieux
process.on('SIGINT', () => {
  console.log('\n🛑 Arrêt du serveur...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Arrêt du serveur...');
  process.exit(0);
});

startServer(); 