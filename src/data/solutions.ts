export interface SolutionItem {
  id: string;
  name: string;
  badge: string;
  headline: string;
  description: string;
  stats: { label: string; value: string };
  techStack: string[];
  deliverables: string[];
}

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: 'full-stack',
    name: 'Full-Stack Web & Mobile',
    badge: 'Core Engineering',
    headline: 'Modern, Scalable Web & Native Mobile Apps',
    description: 'We architect and build lightning-fast web applications and responsive cross-platform mobile apps with sub-second rendering, modular components, and bulletproof offline-first capabilities.',
    stats: { label: 'Average Lighthouse Score', value: '99/100' },
    techStack: ['React 19', 'Next.js', 'React Native', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
    deliverables: ['Responsive Web App', 'iOS & Android App', 'Design System & Storybook', 'CI/CD Pipeline']
  },
  {
    id: 'ai-gemini',
    name: 'Custom AI & Gemini Integration',
    badge: 'Neural Innovation',
    headline: 'Dual-Brain AI Assistants & Reasoning Engines',
    description: 'Transform user experiences with customized Gemini models, retrieval-augmented generation (RAG), autonomous agent loops, and high-performance Python sandboxes for real-time computation.',
    stats: { label: 'Inference Latency', value: '<120ms' },
    techStack: ['Gemini 2.5 Flash', '@google/genai', 'Python FastAPI', 'Vector DB', 'LangChain'],
    deliverables: ['Intelligent Copilot', 'Contextual RAG Pipeline', 'Agentic Workflows', 'Model Fine-tuning']
  },
  {
    id: 'cloud-arch',
    name: 'Enterprise Cloud Architecture',
    badge: 'Infrastructure',
    headline: 'Resilient Multi-Region Cloud & Kubernetes',
    description: 'Automated infrastructure-as-code, zero-trust security postures, autoscaling container workloads, and distributed databases built to handle millions of daily active users effortlessly.',
    stats: { label: 'Historical Uptime', value: '99.99%' },
    techStack: ['GCP Cloud Run', 'AWS ECS/EKS', 'Terraform', 'PostgreSQL', 'Redis', 'Docker'],
    deliverables: ['Zero-Trust Architecture', 'Terraform IaC', 'Disaster Recovery Plan', '24/7 Health Monitoring']
  },
  {
    id: 'apis',
    name: 'High-Performance APIs',
    badge: 'Data Layer',
    headline: 'Sub-Millisecond Microservices & Gateways',
    description: 'Clean, type-safe RESTful and gRPC API layers designed for high concurrency, robust rate limiting, real-time WebSockets, and seamless third-party partner integrations.',
    stats: { label: 'Concurrent Req/Sec', value: '50,000+' },
    techStack: ['Node.js TS', 'Go / Rust', 'Python 3.12', 'Kafka / RabbitMQ', 'Kong API Gateway'],
    deliverables: ['OpenAPI 3.1 Spec', 'SDK Generation', 'Rate-Limiting & Caching', 'Telemetry Dashboard']
  },
  {
    id: 'automation',
    name: 'Cognitive Automation',
    badge: 'Efficiency',
    headline: 'Autonomous Document & Workflow Pipelines',
    description: 'Automate high-friction back-office operations, OCR ingestion, multi-stage approval routing, and predictive business analytics with intelligent human-in-the-loop controls.',
    stats: { label: 'Hours Saved Monthly', value: '450+ hrs' },
    techStack: ['Vision AI', 'OCR Engines', 'Temporal.io', 'Zapier / n8n', 'Python Asyncio'],
    deliverables: ['Automated Intake Pipeline', 'Audit Trail Vault', 'Human-in-the-Loop UI', 'Executive Reports']
  }
];
