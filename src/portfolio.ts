import profilePhoto from './assets/brian-profile.jpg'
import highlandFreshScreenshot from './assets/highland-fresh.png'
import itEventManagementScreenshot from './assets/it-event-management.png'
import dotaScreenshot from './assets/dota-draft-predictor.png'
import dotaTrackerScreenshot from './assets/dota-tracker.png'
import minecraftScreenshot from './assets/minecraft-game.png'
import capstoneBaiScreenshot from './assets/capstone-bai.png'

export const profile = {
  name: 'Brian',
  photo: profilePhoto,
  role: 'Full-stack developer & IT student',
  location: 'Philippines',
  status: 'Open to internships and collaborations',
  intro:
    'I build practical systems, thoughtful interfaces, and reliable server setups. I enjoy turning real workflow problems into software that feels simple to use.',
  email: 'ragasibrian2@gmail.com',
  github: 'https://github.com/brianragasi/',
  linkedin: 'https://www.linkedin.com/in/brian-ragasi-08467241b/',
}

export const projects = [
  {
    title: 'Highland Fresh Management System',
    kicker: 'Featured case study',
    description:
      'An end-to-end operations platform that replaces scattered manual workflows with one clear system for inventory, orders, and reporting.',
    contribution: 'Full-stack application development, interface design, authentication flows, and relational data modeling.',
    tags: ['React', 'TypeScript', 'Node.js', 'MySQL'],
    accent: 'green',
    metric: 'Staff sign-in portal',
    image: highlandFreshScreenshot,
    imageWidth: 1903,
    imageHeight: 961,
    imageAlt: 'Highland Fresh Dairy Operations System staff sign-in page with role-based access for plant operations',
  },
  {
    title: 'ITEventManagement — CITE Events',
    kicker: 'Campus event platform',
    description:
      'A campus event system for publishing activities and coordinating student, faculty, officer, and adviser workflows across attendance, scoring, and leaderboards.',
    contribution: 'Role-specific interfaces and APIs, QR attendance workflows, scoring, MySQL data modeling, and responsive UI.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'Tailwind CSS'],
    accent: 'teal',
    metric: 'CITE events portal',
    image: itEventManagementScreenshot,
    imageWidth: 1440,
    imageHeight: 900,
    imageAlt: 'CITE campus events homepage with event discovery and upcoming activity calendar',
    url: 'https://cite-events.duckdns.org/ITEventManagement/',
  },
  {
    title: 'Aegis Signal — Dota 2 Match Tracker',
    kicker: 'Cloud analytics platform',
    description:
      'A Cloudflare-native system for live match tracking, schedules, transparent winner probabilities, roster continuity, trends, and paper-mode evaluation.',
    contribution: 'End-to-end architecture, Worker APIs, D1 data modeling, provider integrations, prediction logic, automated ingestion, testing, and responsive product design.',
    tags: ['Cloudflare Workers', 'D1', 'JavaScript', 'Vitest'],
    accent: 'lime',
    metric: 'Live match intelligence',
    image: dotaTrackerScreenshot,
    imageWidth: 1800,
    imageHeight: 1375,
    imageAlt: 'Aegis Signal live board for professional Dota 2 match tracking and probability analysis',
  },
  {
    title: 'Dota 2 Analytics',
    kicker: 'Data product',
    description:
      'A match-analysis experience that turns dense game data into useful trends, comparisons, and player-level insights.',
    contribution: 'Data-oriented interface design, application logic, API integration, and analytics presentation.',
    tags: ['API', 'Data Viz', 'React', 'Python'],
    accent: 'red',
    metric: 'Draft prediction interface',
    image: dotaScreenshot,
    imageWidth: 1919,
    imageHeight: 903,
    imageAlt: 'Dota 2 DraftPredictor interface with Radiant and Dire team names, five hero roles per team, and a Predict Winner button',
  },
  {
    title: 'Minecraft Server Infrastructure',
    kicker: 'Infrastructure',
    description:
      'A performance-minded multiplayer server setup with automated backups, service monitoring, access controls, and clear operating docs.',
    contribution: 'Server administration, performance monitoring, permissions, networking, and operational automation.',
    tags: ['Linux', 'Docker', 'Networking', 'Automation'],
    accent: 'blue',
    metric: 'In-game server overview',
    image: minecraftScreenshot,
    imageWidth: 1919,
    imageHeight: 1079,
    imageAlt: 'Minecraft multiplayer server gameplay with a player scoreboard, connection status, and server tick-time metrics',
  },
  {
    title: 'CapstoneBai',
    kicker: 'Student tool',
    description:
      'A capstone title generator for Cagayan de Oro City, with programming language and database selections to guide project ideas.',
    contribution: 'Product concept, user interface, input workflow, and title-generation experience.',
    tags: ['Title generation', 'Language selection', 'Database selection'],
    accent: 'purple',
    metric: 'Capstone title generator',
    image: capstoneBaiScreenshot,
    imageWidth: 1895,
    imageHeight: 911,
    imageAlt: 'CapstoneBai capstone title generator with programming language and database selectors and a Generate Title button',
  },
]

export const skills = [
  { group: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Responsive UI'] },
  { group: 'Backend', items: ['Node.js', 'PHP', 'Python', 'REST APIs', 'Authentication'] },
  { group: 'Data', items: ['MySQL', 'PostgreSQL', 'Data modeling', 'Reporting'] },
  { group: 'Systems', items: ['Linux', 'Docker', 'Networking', 'Server administration'] },
  { group: 'Workflow', items: ['Git & GitHub', 'Figma', 'Testing', 'Technical documentation'] },
]
