export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  status: "Completed" | "In Development";
  githubOwner?: string;
  githubRepo?: string;
  liveUrl?: string;
  demo?: string;
  technologies?: string[];
}

export const projects: Project[] = [
  {
    slug: "vxness",
    title: "Vxness 2.0",
    description:
      "A high-performance cryptocurrency trading platform with real-time order matching, live market data streaming via WebSocket, and microservices architecture. Features in-memory order book, leverage trading, interactive TradingView-like charts, and production-ready Docker deployment.",
    image: "/Screenshot (1).png",
    status: "Completed",
    githubOwner: "vasantkr97",
    githubRepo: "vxness-2.0",
    liveUrl: "#",
    technologies: [
      "TypeScript",
      "Node.js",
      "Express",
      "WebSocket",
      "Redis",
      "Postgres",
      "Prisma",
      "React",
      "Docker",
      "Turborepo",
    ],
  },
  {
    slug: "orch8",
    title: "Orch8",
    description:
      "A modern, open-source workflow automation platform for building intelligent, visual pipelines. Features AI-native Gemini integration, visual drag-and-drop editor, multiple trigger types (webhook, cron, manual), multi-channel messaging, secure credential vault, and detailed execution observability.",
    image: "/Screenshot (7).png",
    status: "Completed",
    githubOwner: "vasantkr97",
    githubRepo: "Orch8",
    liveUrl: "#",
    technologies: [
      "TypeScript",
      "Node.js",
      "Express",
      "React",
      "React Flow",
      "Turborepo",
      "Gemini AI",
      "PostgreSQL",
      "Docker",
    ],
  },
  {
    slug: "codev-cli",
    title: "Codev CLI",
    description:
      "An AI-powered CLI tool for developers to chat with intelligent agents and streamline coding projects. Features interactive chat with AI, tool calling capabilities, and agent mode for autonomous task execution.",
    image: "/image.png",
    status: "Completed",
    githubOwner: "vasantkr97",
    githubRepo: "codev-cli",
    liveUrl: "#",
    demo: "#",
    technologies: [
      "TypeScript",
      "Node.js",
      "CLI",
      "AI SDK",
      "Gemini AI",
    ],
  },
  {
    slug: "tiktok-trading",
    title: "TikTok Trading",
    description: "Coming Soon",
    image: "/tapTrading.png",
    status: "In Development",
    githubOwner: "vasantkr97",
    githubRepo: "tiktok-trading",
    liveUrl: "#",
    technologies: ["TypeScript", "Node.js", "Express", "React", "Docker"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
