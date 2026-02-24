# Chat Groq - Interface Web

Une interface web moderne pour communiquer avec l'API Groq.

## Caractéristiques

- ✨ Interface utilisateur élégante et réactive
- 💬 Chat en temps réel avec l'IA Groq
- 🔒 Sécurité: La clé API est stockée côté serveur (pas exposée dans le navigateur)
- 📱 Design responsive (mobile, tablette, desktop)
- 🚀 Backend Express.js avec gestion d'erreurs
- 💾 Historique de conversation persistant pendant la session

## Installation

1. **Installer les dépendances:**
   ```bash
   npm install
   ```

2. **Vérifier le fichier .env:**
   Assurez-vous que la clé API Groq est correctement définie

3. **Démarrer le serveur:**
   ```bash
   npm start
   ```

4. **Ouvrir dans votre navigateur:**
   ```
   http://localhost:3000
   ```

## Architecture

```
groq-test/
├── server.js           # Serveur Express.js
├── .env               # Variables d'environnement (clé API)
├── package.json       # Dépendances du projet
└── public/
    ├── index.html     # Interface utilisateur
    ├── style.css      # Styles CSS
    └── script.js      # Logique JavaScript du client
```

## Modèle Utilisé

- **Modèle:** `llama-3.1-70b-versatile`
- **Température:** 0.7
- **Max tokens:** 1024

## API Endpoint

**POST** `/api/chat`

### Requête:
```json
{
  "message": "Votre question ici",
  "conversationHistory": [
    {"role": "user", "content": "Message antérieur"},
    {"role": "assistant", "content": "Réponse antérieure"}
  ]
}
```

### Réponse:
```json
{
  "success": true,
  "reply": "Réponse de Groq"
}
```

## Technologies Utilisées

- **Backend:** Node.js, Express.js, Axios
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **API:** Groq (mixtral-8x7b-32768)

## Sécurité

- La clé API Groq est stockée dans une variable d'environnement `.env`
- La clé n'est jamais exposée au client (navigateur)
- Toutes les requêtes API passent par le serveur backend
- CORS est activé pour permettre les requêtes du frontend

## Troubleshooting

**Erreur: "Clé API Groq non configurée"**
- Vérifiez que la variable d'environnement `GROQ_API_KEY` est définie dans `.env`

**Erreur: "Erreur lors de la communication avec Groq"**
- Vérifiez que votre clé API est valide
- Vérifiez votre connexion Internet
- Les serveurs Groq peuvent être temporairement indisponibles

**Le chat ne fonctionne pas**
- Assurez-vous que le serveur est démarré sur le port 3000
- Vérifiez la console du navigateur pour les erreurs
- Vérifiez les logs du serveur dans le terminal

## Améliorations Futures

- [ ] Sauvegarde de la conversation en base de données
- [ ] Authentification utilisateur
- [ ] Historique de conversations
- [ ] Sélection du modèle Groq
- [ ] Paramètres ajustables (température, max tokens)
- [ ] Export des conversations
- [ ] Mode sombre

## License

MIT