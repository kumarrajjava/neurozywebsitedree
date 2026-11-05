export interface CapabilityItem {
  id: string;
  title: string;
  category: string;
  metric: string;
  image: string;
  summary: string;
  deepDive: {
    overview: string;
    keyModules: string[];
    outcomes: string;
    readinessTime: string;
  };
}

export const CAPABILITIES_DATA: CapabilityItem[] = [
  {
    id: 'cloud-architecture',
    title: 'Cloud & Infrastructure Architecture',
    category: 'Distributed Systems',
    metric: '26 modules',
    image: '/src/assets/images/project_cloud_arch_1790448404237.jpg',
    summary: 'Robust, self-healing cloud topologies with multi-region failover and infrastructure-as-code deployments.',
    deepDive: {
      overview: 'We build enterprise-grade cloud foundations capable of handling massive spikes in traffic without manual intervention. Utilizing Google Cloud Platform, AWS, and modern container orchestration.',
      keyModules: [
        'Multi-Region VPC & Global Load Balancing',
        'Automated CI/CD Blue/Green Deployments',
        'PostgreSQL High-Availability Clusters',
        'Edge Caching & Global CDN Acceleration'
      ],
      outcomes: '99.99% availability SLA, 40% reduction in cloud server costs, and automated disaster recovery.',
      readinessTime: '2-4 weeks'
    }
  },
  {
    id: 'ai-dual-brain',
    title: 'AI Dual-Brain Assistant',
    category: 'Neural Reasoning',
    metric: '34 models',
    image: '/src/assets/images/hero_team_lab_1790448345228.jpg',
    summary: 'Next-generation Gemini neural core coupled with a native Python sandbox for live code execution and deep reasoning.',
    deepDive: {
      overview: 'Neurozy’s proprietary Dual-Brain pattern routes analytical requests through Gemini models while delegating heavy algorithmic tasks to sandboxed Python child processes.',
      keyModules: [
        'Gemini 2.5 Multi-Modal Reasoning Layer',
        'Isolated Python Computational Workers',
        'Dynamic Vector Memory & Long-term Context',
        'Safety Guardrails & Sensitive Data Masking'
      ],
      outcomes: 'Zero hallucination on factual queries, 10x faster complex calculations, and enterprise governance.',
      readinessTime: '3-5 weeks'
    }
  },
  {
    id: 'web-mobile-engineering',
    title: 'Modern Web & Native Apps',
    category: 'Product Engineering',
    metric: '16 frameworks',
    image: '/src/assets/images/mobile_app_preview_1790448390677.jpg',
    summary: 'Responsive, fluid web interfaces and cross-platform mobile apps tuned for 60fps interactivity and high conversion.',
    deepDive: {
      overview: 'Delivering delightful digital experiences built with React 19, TypeScript, and Tailwind CSS. Every interaction is calculated for tactile responsiveness and instant visual feedback.',
      keyModules: [
        'Fluid Responsive Viewports & Touch Physics',
        'Optimistic UI State & Background Sync',
        'Full Accessibility (WCAG 2.1 AA Compliance)',
        'Native iOS & Android Shared Codebases'
      ],
      outcomes: 'Under 1.2s Largest Contentful Paint, 45% increase in user retention, and universal device support.',
      readinessTime: '4-6 weeks'
    }
  },
  {
    id: 'document-intelligence',
    title: 'Cognitive Document Automation',
    category: 'Computer Vision',
    metric: '56 pipelines',
    image: '/src/assets/images/office_lab_room_1790448377845.jpg',
    summary: 'Automate ingestion of unstructured invoices, contracts, legal briefs, and health records with 99.4% accuracy.',
    deepDive: {
      overview: 'Transform paper-heavy and PDF bottlenecks into structured JSON datasets in real time using multimodal OCR, semantic entity matching, and automated verification loops.',
      keyModules: [
        'Multimodal Document OCR & Table Parsing',
        'Automated Schema Verification & Anomaly Flagging',
        'Human-in-the-Loop Review Dashboard',
        'Export to ERPs, CRMs, and Cloud Warehouses'
      ],
      outcomes: '85% reduction in manual verification time and instant audit trail generation.',
      readinessTime: '2-3 weeks'
    }
  },
  {
    id: 'neural-hardware',
    title: 'Hardware & Edge Optimization',
    category: 'Edge Computing',
    metric: '18 benchmarks',
    image: '/src/assets/images/project_ai_brain_1790448425635.jpg',
    summary: 'Quantized neural models and ultra-efficient inference servers optimized for on-device and edge appliances.',
    deepDive: {
      overview: 'Deploy intelligent models directly on customer devices and edge gateways with INT8 quantization, TensorRT, and WebAssembly to safeguard privacy and eliminate network latency.',
      keyModules: [
        'INT8 / FP8 Neural Quantization & Pruning',
        'ONNX & WebAssembly Client-Side Execution',
        'Zero-Data-Exfiltration Local Processing',
        'Thermal & Battery-Efficient Computation'
      ],
      outcomes: 'Sub-25ms inference with zero cloud dependency and strict compliance guarantees.',
      readinessTime: '3-6 weeks'
    }
  },
  {
    id: 'security-compliance',
    title: 'Security, RBAC & Data Vaults',
    category: 'Enterprise Protection',
    metric: '42 protocols',
    image: '/src/assets/images/cta_architect_contact_1790448438367.jpg',
    summary: 'End-to-end cryptographic encryption, granular role-based access control, and automated compliance auditing.',
    deepDive: {
      overview: 'Security is not an afterthought at Neurozy. We implement military-grade AES-256 data vaults, JWT/OAuth2 token rotation, continuous vulnerability scanning, and SOC2/HIPAA compliance controls.',
      keyModules: [
        'Zero-Trust Identity & Granular RBAC Permissions',
        'Automated Penetration Testing & Threat Hunting',
        'Cryptographic Key Management (HSM / KMS)',
        'Comprehensive Audit Logging & Tamper-Proof Storage'
      ],
      outcomes: '100% audit pass rate, zero critical vulnerabilities, and airtight client data segregation.',
      readinessTime: '1-3 weeks'
    }
  }
];
