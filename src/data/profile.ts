// Single source of truth for the profile shown on the site and on /cv.

export interface Role {
  title: string;
  company: string;
  // 'YYYY-MM'; omit `end` for the current role.
  start: string;
  end?: string;
  summary?: string;
  highlights?: string[];
  engagements?: { name: string; start: string; end?: string; highlights: string[] }[];
}

export const profile = {
  name: 'Alexander Rondón',
  title: 'Software Engineer',
  tagline: 'Software engineer building scalable backend systems, with a soft spot for home labs, AI, and hardware.',
  summary:
    'Software engineer with 15+ years in IT, building scalable, high-quality software for backend, web, and mobile. ' +
    'Co-founded and ran two small software companies, leading teams of 4–6 developers while staying hands-on as a full-stack engineer. ' +
    'Today works mainly with Node.js and TypeScript on microservices running on AWS Kubernetes, with a strong focus on testing, reliability, and observability.',
  email: 'me@alexkander.dev',
  links: {
    github: 'https://github.com/alexkander',
    linkedin: 'https://www.linkedin.com/in/arondn2/',
  },

  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'intive',
      start: '2022-07',
      engagements: [
        {
          name: 'W. W. Norton — new ebook reader',
          start: '2023-07',
          highlights: [
            'Optimized and extended NestJS, MongoDB, and PostgreSQL modules, increasing scalability in an AWS Kubernetes microservices architecture.',
            'Achieved 99% unit test coverage.',
            'Automated report generation, testing, and code quality metrics with GitLab pipelines.',
            'Integrated observability with Sentry and OpenTelemetry (Grafana, Prometheus, Zipkin).',
            'Investigated and resolved issues across interconnected applications to keep the system stable.',
          ],
        },
        {
          name: 'Madison Square Garden — MSG+ streaming app',
          start: '2022-08',
          end: '2023-07',
          highlights: [
            'Developed and maintained the MSG+ streaming web application for smart TVs with React and TypeScript.',
            'Integrated payment modules, video player libraries, and analytics vendors.',
            'Owned the cross-vendor authorization integration.',
          ],
        },
      ],
    },
    {
      title: 'Freelance Software Developer',
      company: 'Uppersky',
      start: '2018-11',
      end: '2022-07',
      highlights: ['Built mobile applications with React Native and Firebase.'],
    },
    {
      title: 'Manager and Software Developer',
      company: 'MedAndSoft',
      start: '2017-11',
      end: '2022-07',
      highlights: [
        'Built Angular applications with consistent cross-device performance.',
        'Designed and maintained APIs with LoopBack (Express/Node.js) and Firebase.',
        'Implemented CI/CD with Docker and Jenkins.',
        'Practiced TDD with Jest and Mocha.',
        'Led the development team and ran planning, project execution, and company administration.',
      ],
    },
    {
      title: 'Co-founder, Manager and Software Developer',
      company: 'Sir Ideas',
      start: '2013-01',
      end: '2017-11',
      highlights: [
        'Built AngularJS and Ionic applications for web, Android, and iOS.',
        'Created APIs with Laravel and LoopBack (Express/Node.js).',
        'Managed the Linux servers used for client deployments.',
        'Mentored and coordinated the development team, and ran planning and project execution.',
      ],
    },
    {
      title: 'Web Developer',
      company: 'Hostienda',
      start: '2011-11',
      end: '2012-12',
      highlights: ['Built online stores with WordPress.'],
    },
    {
      title: 'Software Developer and Database Manager',
      company: 'TecnoAp',
      start: '2010-10',
      end: '2011-07',
      highlights: [
        'Built Ruby on Rails modules for an internal recruitment system.',
        'Built PHP Symfony modules for a purchasing and inventory management system.',
      ],
    },
  ] satisfies Role[],

  education: [
    {
      degree: "Bachelor's Degree in Computer Engineering",
      school: 'Universidad Nacional Experimental de Guayana',
      start: '2007',
      end: '2015',
    },
  ],

  teaching: [
    {
      title: 'Assistant Professor — Database Systems I, Programming I and II',
      school: 'Universidad Nacional Experimental de Guayana',
      start: '2009-01',
      end: '2012-07',
    },
  ],

  openSource: [
    'Contributions to LoopBack 4, the open-source Node.js API framework.',
    'Small libraries published as npm packages.',
  ],

  skills: [
    { group: 'Languages', items: ['TypeScript', 'JavaScript', 'SQL'] },
    { group: 'Backend', items: ['Node.js', 'NestJS', 'Express', 'LoopBack'] },
    { group: 'Frontend & mobile', items: ['React', 'React Native', 'Angular'] },
    { group: 'Data', items: ['PostgreSQL', 'MongoDB', 'Firebase'] },
    { group: 'Infrastructure', items: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Linux servers'] },
    { group: 'CI/CD', items: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'Git'] },
    { group: 'Quality & observability', items: ['TDD', 'Jest', 'Mocha', 'Sentry', 'OpenTelemetry', 'Grafana', 'Prometheus', 'Zipkin'] },
  ],

  interests: ['Hardware development', 'DIY projects', 'CAD modeling and 3D printing', 'Woodworking', 'Learning music', 'Astrophotography'],
};

export function formatMonth(value: string): string {
  const [year, month] = value.split('-').map(Number);
  if (!month) return `${year}`;
  return new Date(Date.UTC(year, month - 1)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', timeZone: 'UTC' });
}

export function formatRange(start: string, end?: string): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`;
}
