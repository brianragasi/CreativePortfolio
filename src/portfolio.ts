import profilePhoto from './assets/brian-profile.jpg'
import highlandFreshScreenshot from './assets/highland-fresh.png'
import itEventManagementScreenshot from './assets/it-event-management.png'
import dotaScreenshot from './assets/dota-draft-predictor.png'
import dotaTrackerScreenshot from './assets/dota-tracker.png'
import minecraftScreenshot from './assets/minecraft-game.png'
import capstoneBaiScreenshot from './assets/capstone-bai.png'

export const profile = {
  name: 'Brian Ragasi',
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
      'A role-based dairy operations system spanning purchasing, stock, production, quality control, deliveries, sales, and payments.',
    contribution: 'Staff workflows, role-based access, operational APIs, and MySQL-backed records for plant operations.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'Tailwind CSS'],
    accent: 'green',
    metric: 'Staff sign-in portal',
    image: highlandFreshScreenshot,
    imageWidth: 1903,
    imageHeight: 961,
    imageAlt: 'Highland Fresh Dairy Operations System staff sign-in page with role-based access for plant operations',
    links: [{ label: 'Source code', url: 'https://github.com/brianragasi/HighlandFreshAppV5' }],
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
    links: [{ label: 'Live site', url: 'https://cite-events.duckdns.org/ITEventManagement/' }],
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
    links: [{ label: 'Live site', url: 'https://dota-ti-dashboard.ragasibrian2.workers.dev/' }],
  },
  {
    title: 'Dota 2 Draft Predictor',
    kicker: 'Match prediction',
    description:
      'A draft-analysis app that compares Radiant and Dire teams, hero picks, matchup statistics, and saved match history to estimate a winner.',
    contribution: 'PHP/MySQL prediction API and JavaScript interface for hero selection, team comparison, match history, and statistics.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'PDO'],
    accent: 'red',
    metric: 'Draft prediction interface',
    image: dotaScreenshot,
    imageWidth: 1919,
    imageHeight: 903,
    imageAlt: 'Dota 2 DraftPredictor interface with Radiant and Dire team names, five hero roles per team, and a Predict Winner button',
    links: [{ label: 'Source code', url: 'https://github.com/brianragasi/Dota2' }],
  },
  {
    title: 'Minecraft Server Infrastructure',
    kicker: 'Infrastructure',
    description:
      'A multiplayer Minecraft server project centered on player access, in-game systems, and server performance.',
    contribution: 'Server configuration, player permissions, and monitoring of connection and performance metrics.',
    tags: ['Server Administration', 'Permissions', 'Monitoring', 'Networking'],
    accent: 'blue',
    metric: 'In-game server overview',
    image: minecraftScreenshot,
    imageWidth: 1919,
    imageHeight: 1079,
    imageAlt: 'Minecraft multiplayer server gameplay with a player scoreboard, connection status, and server tick-time metrics',
    links: [],
  },
  {
    title: 'CapstoneBai',
    kicker: 'Student tool',
    description:
      'A Cagayan de Oro-focused title generator that combines programming language and database selections with a curated JSON title collection.',
    contribution: 'PHP title-generation logic, input validation, and a responsive interface for exploring and saving ideas.',
    tags: ['PHP', 'Bootstrap', 'JavaScript', 'JSON'],
    accent: 'purple',
    metric: 'Capstone title generator',
    image: capstoneBaiScreenshot,
    imageWidth: 1895,
    imageHeight: 911,
    imageAlt: 'CapstoneBai capstone title generator with programming language and database selectors and a Generate Title button',
    links: [],
  },
]

export const skills = [
  { group: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Responsive UI'] },
  { group: 'Backend', items: ['Node.js', 'PHP', 'Python', 'REST APIs', 'Authentication'] },
  { group: 'Data', items: ['MySQL', 'PostgreSQL', 'Data modeling', 'Reporting'] },
  { group: 'Systems', items: ['Linux', 'Docker', 'Networking', 'Server administration'] },
  { group: 'Workflow', items: ['Git & GitHub', 'Figma', 'Testing', 'Technical documentation'] },
]
