import {
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Code2,
  ExternalLink,
  FileText,
  FolderOpen,
  HardDrive,
  Mail,
  MapPin,
  MessageSquareText,
  Monitor,
  MousePointer2,
  Power,
  Printer,
  Recycle,
  Server,
  Sparkles,
  UserRound,
  Wifi,
  Wrench,
  X,
} from 'lucide-react'
import { PointerEvent as ReactPointerEvent, useCallback, useEffect, useRef, useState } from 'react'
import ContactContent from './ContactContent'
import { profile, projects, skills } from './portfolio'
import type { WindowId, WindowState } from './types'

const appDefinitions: Record<WindowId, { title: string; icon: string }> = {
  welcome: { title: `Welcome, I'm ${profile.name}`, icon: 'computer' },
  about: { title: 'About Me', icon: 'user' },
  projects: { title: 'My Projects', icon: 'folder' },
  skills: { title: 'Skills & Tools', icon: 'tools' },
  resume: { title: 'Resume', icon: 'document' },
  contact: { title: 'Contact Brian', icon: 'mail' },
  recycle: { title: 'Recycle Bin', icon: 'recycle' },
}

const initialWindows: WindowState[] = [
  { id: 'welcome', ...appDefinitions.welcome, open: true, minimized: false, maximized: false, z: 2, x: 210, y: 72, width: 720, height: 520 },
  { id: 'about', ...appDefinitions.about, open: false, minimized: false, maximized: false, z: 1, x: 150, y: 90, width: 650, height: 510 },
  { id: 'projects', ...appDefinitions.projects, open: false, minimized: false, maximized: false, z: 1, x: 250, y: 54, width: 810, height: 590 },
  { id: 'skills', ...appDefinitions.skills, open: false, minimized: false, maximized: false, z: 1, x: 310, y: 105, width: 700, height: 510 },
  { id: 'resume', ...appDefinitions.resume, open: false, minimized: false, maximized: false, z: 1, x: 230, y: 62, width: 720, height: 570 },
  { id: 'contact', ...appDefinitions.contact, open: false, minimized: false, maximized: false, z: 1, x: 350, y: 86, width: 650, height: 530 },
  { id: 'recycle', ...appDefinitions.recycle, open: false, minimized: false, maximized: false, z: 1, x: 420, y: 120, width: 520, height: 390 },
]

const desktopApps: { id: WindowId; label: string; icon: string }[] = [
  { id: 'about', label: 'About Me', icon: 'user' },
  { id: 'projects', label: 'My Projects', icon: 'folder' },
  { id: 'skills', label: 'Skills', icon: 'tools' },
  { id: 'resume', label: 'Resume', icon: 'document' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
  { id: 'recycle', label: 'Recycle Bin', icon: 'recycle' },
]

function AppIcon({ name, size = 32 }: { name: string; size?: number }) {
  const props = { size, strokeWidth: 1.75, 'aria-hidden': true }
  if (name === 'computer') return <Monitor {...props} />
  if (name === 'user') return <CircleUserRound {...props} />
  if (name === 'folder') return <FolderOpen {...props} />
  if (name === 'tools') return <Wrench {...props} />
  if (name === 'document') return <FileText {...props} />
  if (name === 'mail') return <Mail {...props} />
  return <Recycle {...props} />
}

function BootScreen({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const first = window.setTimeout(() => setLeaving(true), 1450)
    const second = window.setTimeout(onDone, 1850)
    return () => {
      window.clearTimeout(first)
      window.clearTimeout(second)
    }
  }, [onDone])

  return (
    <div className={`boot-screen ${leaving ? 'boot-screen--leaving' : ''}`}>
      <button className="boot-skip" onClick={onDone}>Skip intro</button>
      <div className="boot-mark" aria-hidden="true">
        <span className="boot-pane boot-pane--red" />
        <span className="boot-pane boot-pane--green" />
        <span className="boot-pane boot-pane--blue" />
        <span className="boot-pane boot-pane--yellow" />
      </div>
      <div className="boot-name">Brian<span>OS</span></div>
      <p>Professional edition</p>
      <div className="boot-loader"><i /><i /><i /></div>
      <small>Portfolio loading…</small>
    </div>
  )
}

function WelcomeContent({ openApp }: { openApp: (id: WindowId) => void }) {
  return (
    <div className="welcome-view">
      <aside className="welcome-sidebar">
        <div className="avatar profile-photo"><img src={profile.photo} alt={`${profile.name}'s profile photo`} /></div>
        <p className="eyebrow">HELLO, WORLD</p>
        <h1>{profile.name}<span className="cursor" /></h1>
        <p>{profile.role}</p>
        <div className="availability"><span />{profile.status}</div>
        <div className="location"><MapPin size={14} /> {profile.location}</div>
      </aside>
      <div className="welcome-main">
        <p className="eyebrow blue-text">WELCOME TO MY DESKTOP</p>
        <h2>I make useful things for the web — and keep the systems behind them running.</h2>
        <p className="welcome-copy">{profile.intro}</p>
        <div className="quick-actions">
          <button onClick={() => openApp('projects')}>
            <span className="action-icon action-icon--folder"><FolderOpen size={24} /></span>
            <span><b>Explore my work</b><small>Selected projects & case studies</small></span>
            <ChevronRight size={18} />
          </button>
          <button onClick={() => openApp('about')}>
            <span className="action-icon action-icon--user"><CircleUserRound size={24} /></span>
            <span><b>Get to know me</b><small>Background, interests & approach</small></span>
            <ChevronRight size={18} />
          </button>
          <button onClick={() => openApp('contact')}>
            <span className="action-icon action-icon--mail"><Mail size={24} /></span>
            <span><b>Start a conversation</b><small>Let's build something worthwhile</small></span>
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="welcome-hint"><MousePointer2 size={14} /> Click a desktop icon to explore.</div>
      </div>
    </div>
  )
}

function AboutContent() {
  return (
    <div className="content-pad about-view">
      <div className="section-heading">
        <div className="large-app-icon user-bg profile-photo"><img src={profile.photo} alt={`${profile.name}'s profile photo`} /></div>
        <div><p className="eyebrow blue-text">ABOUT_ME.TXT</p><h2>Curious by default.<br />Practical by design.</h2></div>
      </div>
      <div className="about-grid">
        <div>
          <p>I’m {profile.name}, an IT student and full-stack developer interested in the complete life of a product: how it looks, how it works, and how reliably it runs.</p>
          <p>I’m happiest when a project sits at the intersection of <strong>clear interface design</strong>, <strong>useful data</strong>, and <strong>solid infrastructure</strong>.</p>
        </div>
        <div className="fact-card">
          <p><MapPin size={16} /> Based in {profile.location}</p>
          <p><BriefcaseBusiness size={16} /> {profile.status}</p>
          <p><Sparkles size={16} /> Always learning by building</p>
        </div>
      </div>
      <div className="approach-row">
        <article><span>01</span><h3>Understand</h3><p>Start with the real user and the actual constraint.</p></article>
        <article><span>02</span><h3>Build</h3><p>Turn the idea into a clear, dependable system.</p></article>
        <article><span>03</span><h3>Improve</h3><p>Test, listen, refine, and document the result.</p></article>
      </div>
    </div>
  )
}

function ProjectsContent() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  return (
    <div className="projects-view">
      <div className="explorer-address"><span>Address</span><div><FolderOpen size={15} /> C:\Brian\Portfolio\Projects</div><button>Go</button></div>
      <div className="project-intro"><div><p className="eyebrow blue-text">SELECTED WORK</p><h2>Projects built around real problems.</h2></div><span>{projects.length} items</span></div>
      <div className="project-list">
        {projects.map((project, index) => (
          <article className="project-card" key={project.title}>
            <div className={`project-visual project-visual--${project.accent} ${project.image ? 'project-visual--screenshot' : ''}`}>
              {project.image ? (
                <a className="project-thumbnail" href={project.image} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} screenshot in a new tab`}>
                  <img src={project.image} alt={project.imageAlt} loading="lazy" width={project.imageWidth} height={project.imageHeight} />
                </a>
              ) : (
                <div className="mini-window">
                  <div className="mini-title"><i /><i /><i /></div>
                  <div className="mini-content"><span /><span /><span /></div>
                </div>
              )}
              <small>{project.metric}</small>
            </div>
            <div className="project-details">
              <p className="eyebrow">{String(index + 1).padStart(2, '0')} · {project.kicker}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="project-actions">
                <button className="text-button" aria-expanded={expandedProject === project.title} onClick={() => setExpandedProject(expandedProject === project.title ? null : project.title)}>{expandedProject === project.title ? 'Close case study' : 'View case study'} <ChevronRight size={15} /></button>
                {project.links.map((link) => <a className="project-external-link" key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label} <ExternalLink size={12} /></a>)}
              </div>
            </div>
            {expandedProject === project.title && (
              <div className="project-case-study">
                <h4>Inside this project</h4>
                {project.image && (
                  <figure className="project-screenshot">
                    <a href={project.image} target="_blank" rel="noreferrer" aria-label={`Open full-size ${project.title} screenshot in a new tab`}>
                      <img src={project.image} alt={project.imageAlt} loading="lazy" width={project.imageWidth} height={project.imageHeight} />
                    </a>
                    <figcaption>{project.metric} · Click the image to view full size.</figcaption>
                  </figure>
                )}
                <p>{project.description}</p>
                <p><strong>My contribution:</strong> {project.contribution}</p>
                <p><strong>Focus:</strong> {project.tags.join(', ')}</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}

function SkillsContent() {
  return (
    <div className="skills-view">
      <aside className="skills-sidebar">
        <div className="control-icon"><Wrench size={34} /></div>
        <h2>Skills & tools</h2>
        <p>The toolkit I use to take projects from idea to working software.</p>
        <div className="system-meter"><span>Current mode</span><strong><i /> Ready to build</strong></div>
      </aside>
      <div className="skill-groups">
        {skills.map((skill, index) => (
          <section key={skill.group}>
            <div className="skill-icon">{index === 0 ? <Monitor /> : index === 1 ? <Code2 /> : index === 2 ? <HardDrive /> : index === 3 ? <Server /> : <Wrench />}</div>
            <div><h3>{skill.group}</h3><div className="skill-pills">{skill.items.map((item) => <span key={item}>{item}</span>)}</div></div>
          </section>
        ))}
      </div>
    </div>
  )
}

function ResumeContent() {
  return (
    <div className="resume-view">
      <div className="resume-toolbar"><button onClick={() => window.print()}><Printer size={16} /> Print / Save PDF</button><span>1 page</span></div>
      <article className="resume-paper">
        <header><div><h1>{profile.name}</h1><p>{profile.role}</p></div><div><span>{profile.location}</span><span>{profile.email}</span></div></header>
        <section><h2>Profile</h2><p>{profile.intro}</p></section>
        <section><h2>Selected projects</h2>{projects.map((p) => <div className="resume-item" key={p.title}><h3>{p.title}</h3><p>{p.description}</p><small>{p.tags.join(' · ')}</small></div>)}</section>
        <section><h2>Core skills</h2><p>{skills.map((s) => `${s.group}: ${s.items.join(', ')}`).join('  •  ')}</p></section>
      </article>
    </div>
  )
}

function RecycleContent() {
  return (
    <div className="recycle-view">
      <Recycle size={60} />
      <h2>Nothing to see here.</h2>
      <p>Only abandoned ideas, fixed bugs, and one very questionable first draft.</p>
      <div className="recycle-status">0 objects · 100% of lessons retained</div>
    </div>
  )
}

type PortfolioWindowProps = {
  windowState: WindowState
  active: boolean
  onFocus: () => void
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onMove: (x: number, y: number) => void
  children: React.ReactNode
}

function PortfolioWindow({ windowState: app, active, onFocus, onClose, onMinimize, onMaximize, onMove, children }: PortfolioWindowProps) {
  const drag = useRef<{ offsetX: number; offsetY: number } | null>(null)

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (app.maximized || window.innerWidth < 700 || (event.target as HTMLElement).closest('button')) return
    onFocus()
    drag.current = { offsetX: event.clientX - app.x, offsetY: event.clientY - app.y }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current) return
    const maxX = Math.max(0, window.innerWidth - 240)
    const maxY = Math.max(0, window.innerHeight - 90)
    onMove(
      Math.min(maxX, Math.max(0, event.clientX - drag.current.offsetX)),
      Math.min(maxY, Math.max(0, event.clientY - drag.current.offsetY)),
    )
  }

  const stopDrag = () => { drag.current = null }

  if (!app.open) return null
  const style = app.maximized
    ? { zIndex: app.z }
    : { zIndex: app.z, left: app.x, top: app.y, width: app.width, height: app.height }

  return (
    <section className={`xp-window ${active ? 'xp-window--active' : ''} ${app.maximized ? 'xp-window--maximized' : ''}`} style={{ ...style, display: app.minimized ? 'none' : undefined }} onPointerDown={onFocus} aria-label={`${app.title} window`}>
      <div className="titlebar" onDoubleClick={onMaximize} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={stopDrag} onPointerCancel={stopDrag}>
        <div className="titlebar-name"><AppIcon name={app.icon} size={18} /><span>{app.title}</span></div>
        <div className="window-controls">
          <button onPointerDown={(e) => e.stopPropagation()} onClick={onMinimize} aria-label="Minimize"><span className="minimize-mark" /></button>
          <button onPointerDown={(e) => e.stopPropagation()} onClick={onMaximize} aria-label={app.maximized ? 'Restore' : 'Maximize'}><span className={app.maximized ? 'restore-mark' : 'maximize-mark'} /></button>
          <button className="close-button" onPointerDown={(e) => e.stopPropagation()} onClick={onClose} aria-label="Close"><X size={15} strokeWidth={3} /></button>
        </div>
      </div>
      <div className="menu-strip"><span>File</span><span>Edit</span><span>View</span><span>Favorites</span><span>Help</span></div>
      <div className="window-content">{children}</div>
    </section>
  )
}

function StartMenu({ openApp, close, notify }: { openApp: (id: WindowId) => void; close: () => void; notify: (message: string) => void }) {
  const launch = (id: WindowId) => { openApp(id); close() }
  return (
    <div className="start-menu">
      <header><div className="start-avatar profile-photo"><img src={profile.photo} alt={`${profile.name}'s profile photo`} /></div><strong>{profile.name}</strong></header>
      <div className="start-columns">
        <div className="start-primary">
          <button onClick={() => launch('projects')}><span className="start-icon folder-bg"><FolderOpen /></span><span><b>My Projects</b><small>Case studies and experiments</small></span></button>
          <button onClick={() => launch('contact')}><span className="start-icon mail-bg"><Mail /></span><span><b>Contact</b><small>Send Brian a message</small></span></button>
          <hr />
          <button onClick={() => launch('about')}><span className="start-icon"><UserRound /></span><span><b>About Me</b></span></button>
          <button onClick={() => launch('skills')}><span className="start-icon"><Wrench /></span><span><b>Skills & Tools</b></span></button>
          <button onClick={() => launch('resume')}><span className="start-icon"><FileText /></span><span><b>Resume</b></span></button>
        </div>
        <div className="start-secondary">
          <button onClick={() => launch('welcome')}><Monitor size={20} /><b>My Portfolio</b></button>
          <button onClick={() => launch('projects')}><FolderOpen size={20} />My Documents</button>
          <hr />
          <button onClick={() => { window.open(profile.github, '_blank', 'noopener,noreferrer'); close() }}><Code2 size={20} />GitHub</button>
          <button onClick={() => launch('contact')}><MessageSquareText size={20} />Get in touch</button>
        </div>
      </div>
      <footer><button onClick={() => notify('Thanks for visiting — shutdown is disabled in this demo.')}><Power size={18} /> Turn Off Portfolio</button></footer>
    </div>
  )
}

function Clock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  return <time dateTime={now.toISOString()}>{now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</time>
}

export default function App() {
  const [booting, setBooting] = useState(true)
  const [windows, setWindows] = useState(initialWindows)
  const [selectedIcon, setSelectedIcon] = useState<WindowId | null>(null)
  const [startOpen, setStartOpen] = useState(false)
  const [toast, setToast] = useState('')
  const maxZ = Math.max(...windows.map((item) => item.z))
  const finishBoot = useCallback(() => setBooting(false), [])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 3600)
    return () => window.clearTimeout(timer)
  }, [toast])

  const focusWindow = (id: WindowId) => {
    setWindows((current) => current.map((item) => item.id === id ? { ...item, z: Math.max(...current.map((w) => w.z)) + 1 } : item))
  }

  const openApp = (id: WindowId) => {
    setWindows((current) => {
      const nextZ = Math.max(...current.map((item) => item.z)) + 1
      return current.map((item) => item.id === id ? { ...item, open: true, minimized: false, z: nextZ } : item)
    })
    setStartOpen(false)
  }

  const patchWindow = (id: WindowId, patch: Partial<WindowState>) => {
    setWindows((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item))
  }

  const toggleTask = (app: WindowState) => {
    if (app.minimized) openApp(app.id)
    else if (app.z === maxZ) patchWindow(app.id, { minimized: true })
    else focusWindow(app.id)
  }

  const handleDesktopIcon = (id: WindowId) => {
    setSelectedIcon(id)
    openApp(id)
  }

  const renderContent = (id: WindowId) => {
    if (id === 'welcome') return <WelcomeContent openApp={openApp} />
    if (id === 'about') return <AboutContent />
    if (id === 'projects') return <ProjectsContent />
    if (id === 'skills') return <SkillsContent />
    if (id === 'resume') return <ResumeContent />
    if (id === 'contact') return <ContactContent notify={setToast} />
    return <RecycleContent />
  }

  return (
    <>
      {booting && <BootScreen onDone={finishBoot} />}
      <main className="desktop" onPointerDown={() => { setStartOpen(false); setSelectedIcon(null) }}>
        <div className="sky-cloud sky-cloud--one" /><div className="sky-cloud sky-cloud--two" />
        <div className="desktop-icons">
          {desktopApps.map((app) => (
            <button
              className={`desktop-icon ${selectedIcon === app.id ? 'desktop-icon--selected' : ''}`}
              key={app.id}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => handleDesktopIcon(app.id)}
            >
              <span className={`desktop-icon-image desktop-icon-image--${app.icon}`}><AppIcon name={app.icon} size={34} /></span>
              <span>{app.label}</span>
            </button>
          ))}
        </div>

        {!booting && !windows.some((app) => app.open && !app.minimized) && (
          <section className="desktop-home" aria-labelledby="desktop-home-title">
            <div className="desktop-home-title"><Monitor size={17} aria-hidden="true" /> Brian's Portfolio</div>
            <div className="desktop-home-content">
              <p className="desktop-home-kicker">WELCOME BACK</p>
              <h1 id="desktop-home-title">{profile.name}</h1>
              <p>{profile.role}. Explore my work or open the welcome window to start again.</p>
              <div className="desktop-home-actions">
                <button type="button" onClick={() => openApp('welcome')}>Open welcome</button>
                <button type="button" onClick={() => openApp('projects')}>Browse projects</button>
              </div>
            </div>
          </section>
        )}

        {windows.map((app) => (
          <PortfolioWindow
            key={app.id}
            windowState={app}
            active={app.z === maxZ}
            onFocus={() => focusWindow(app.id)}
            onClose={() => patchWindow(app.id, { open: false })}
            onMinimize={() => patchWindow(app.id, { minimized: true })}
            onMaximize={() => patchWindow(app.id, { maximized: !app.maximized })}
            onMove={(x, y) => patchWindow(app.id, { x, y })}
          >
            {renderContent(app.id)}
          </PortfolioWindow>
        ))}

        {toast && <div className="toast"><CheckCircle2 size={18} />{toast}<button onClick={() => setToast('')}><X size={14} /></button></div>}

        {startOpen && <div onPointerDown={(event) => event.stopPropagation()}><StartMenu openApp={openApp} close={() => setStartOpen(false)} notify={setToast} /></div>}

        <nav className="taskbar" onPointerDown={(event) => event.stopPropagation()}>
          <button className={`start-button ${startOpen ? 'start-button--active' : ''}`} onClick={() => setStartOpen((value) => !value)}><span className="start-logo"><i /><i /><i /><i /></span><b>start</b></button>
          <div className="taskbar-apps">
            {windows.filter((app) => app.open).map((app) => (
              <button key={app.id} className={!app.minimized && app.z === maxZ ? 'taskbar-app--active' : ''} onClick={() => toggleTask(app)}><AppIcon name={app.icon} size={17} /><span>{app.title}</span></button>
            ))}
          </div>
          <div className="system-tray"><Wifi size={16} /><Clock /></div>
        </nav>
      </main>
    </>
  )
}
