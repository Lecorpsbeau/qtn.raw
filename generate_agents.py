import os

def create_agents_md():
    print("--- Générateur de fichier AGENTS.md pour IA ---")
    
    project_name = input("Nom du projet : ")
    tech_stack = input("Stack technique (ex: Python, FastAPI, React) : ")
    goal = input("Objectif principal de l'IA (ex: Refactor, Debug, Dev) : ")
    style = input("Style de code (ex: propre, modulaire, typage strict) : ")

    content = f"""# Instructions pour l'Agent IA - {project_name}

## Rôle
Tu es un expert développeur senior spécialisé en {tech_stack}.

## Objectif
{goal}

## Directives de Codage
- **Style :** {style}
- **Architecture :** Privilégie le découpage en modules et une séparation claire des responsabilités.
- **Typage :** Utilise systématiquement le typage statique (Type Hinting).
- **Documentation :** Ajoute des docstrings pour chaque fonction/classe.
- **Gestion des erreurs :** Préfère les exceptions explicites plutôt que le mode silencieux.

## Contraintes de Contexte
- Ne répète pas tout le code à chaque réponse.
- Si le fichier est trop long, propose des modifications ciblées.
- En cas d'ambiguïté, pose des questions avant de modifier la structure globale.
"""

    with open("AGENTS.md", "w", encoding="utf-8") as f:
        f.write(content)
    
    print("\n✅ Le fichier AGENTS.md a été généré avec succès !")

if __name__ == "__main__":
    create_agents_md()