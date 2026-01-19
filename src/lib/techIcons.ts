export const techIcons: Record<string, string> = {
    "TypeScript": "https://skillicons.dev/icons?i=ts",
    "Node.js": "https://skillicons.dev/icons?i=nodejs",
    "Express": "https://skillicons.dev/icons?i=express",
    "React": "https://skillicons.dev/icons?i=react",
    "React Flow": "https://skillicons.dev/icons?i=react", // Fallback to React or find specific if available
    "Turborepo": "https://skillicons.dev/icons?i=vercel", // Fallback to Vercel (owner of Turborepo) or leave text if preferred
    "Gemini AI": "/gemini-color.svg", // Local asset
    "PostgreSQL": "https://skillicons.dev/icons?i=postgres",
    "Docker": "https://skillicons.dev/icons?i=docker",
    "Redis Streams": "https://skillicons.dev/icons?i=redis",
    "Prisma": "https://skillicons.dev/icons?i=prisma",
    "WebSocket": "/Socket.io.svg", // Using local Socket.io as proxy or just generic? Or skillicons 'ws' doesn't exist? 'socketio' does.
    "Tailwind CSS": "https://skillicons.dev/icons?i=tailwind",
    "Next.js": "https://skillicons.dev/icons?i=nextjs",
    "MongoDB": "https://skillicons.dev/icons?i=mongodb",
    "Git": "https://skillicons.dev/icons?i=git",
    "VS Code": "https://skillicons.dev/icons?i=vscode",
    "Python": "https://skillicons.dev/icons?i=py",
    "CLI": "https://skillicons.dev/icons?i=bash",
    "AI SDK": "https://skillicons.dev/icons?i=openai", // Fallback or generic AI
    "Microservices": "https://skillicons.dev/icons?i=docker", // Representation
    "AI Automation": "https://skillicons.dev/icons?i=tensorflow", // Representation
    "Trading": "https://skillicons.dev/icons?i=d3", // Representation (charts)
    "Vite": "https://skillicons.dev/icons?i=vite",
    "Three.js": "https://skillicons.dev/icons?i=threejs",
    "Nodejs": "https://skillicons.dev/icons?i=nodejs", // Alias
};

// Helper to get icon or return null if not found (to handle fallbacks or text display)
export const getTechIcon = (tech: string): string | null => {
    return techIcons[tech] || null;
};
