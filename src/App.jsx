import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Heart, HandHeart, Headset, Instagram, Menu, MessagesSquare, Phone, X } from 'lucide-react'
import { Brand, WhatsAppIcon } from './Brand'
import { LowerSections } from './Sections'

const whatsapp = 'https://wa.me/5511970768655'
const links = [
  { id: 'inicio', label: 'Início' },
  { id: 'diferencial', label: 'Diferencial' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'consultorios', label: 'Consultórios' },
]

function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('inicio')
  const toggle = useRef(null)
  const header = useRef(null)
  useEffect(() => {
    if (!open) return
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    const closeOutside = (event) => {
      if (!header.current?.contains(event.target)) setOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 880px)')
    const close = () => setOpen(false)
    desktop.addEventListener('change', close)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('focusin', closeOutside)
    return () => {
      desktop.removeEventListener('change', close)
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('focusin', closeOutside)
    }
  }, [open])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main section[id]'))
    const update = () => {
      let next = 'inicio'
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= Math.min(220, window.innerHeight * 0.32)) next = section.id
      }
      setActive(next)
    }
    let frame = 0
    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(() => { update(); frame = 0 })
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return (
    <header className="site-head" ref={header}>
      <div className="wrap header-row">
        <div onClick={() => setOpen(false)}><Brand /></div>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map(({id, label}) => <a key={id} href={'#' + id} aria-current={active === id ? 'location' : undefined}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="header-contact" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Conversar com a Agenda Querida pelo WhatsApp">
            <WhatsAppIcon size={19}/><span>WhatsApp</span>
          </a>
          <button className="nav-toggle" type="button" ref={toggle} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
      <div className={'mobile-menu' + (open ? ' is-open' : '')} inert={!open} id="mobile-nav">
        <nav className="wrap mobile-links" aria-label="Navegação no celular">
          {[...links, { id: 'depoimentos', label: 'Depoimentos' }, { id: 'contato', label: 'Contato' }].map(({id,label}) =>
            <a key={id} href={'#' + id} onClick={() => setOpen(false)} aria-current={active === id ? 'location' : undefined}>{label}</a>
          )}
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <p className="eyebrow"><span />Atendimento remoto humanizado</p>
        <h1 id="hero-title">Atendimento <br/>de verdade, com <br/><em>pessoas de verdade.</em></h1>
        <div className="hero-art">
          <div className="photo-contour" aria-hidden="true"></div>
          <div className="hero-frame"><img className="hero-photo" src="/images/hero.webp" srcSet="/images/hero-small.webp 680w, /images/hero.webp 1120w" sizes="(min-width: 1400px) 550px, (min-width: 760px) 42vw, (min-width: 640px) 580px, calc(100vw - 3rem)" width="1120" height="1019" fetchPriority="high" alt="Profissional sorrindo durante um atendimento por headset em uma mesa de trabalho." /></div>
          <svg className="drawn-heart" viewBox="0 0 82 76" fill="none" aria-hidden="true">
            <path d="M24 60C13 46 5 30 10 21c6-11 17-4 21 9C35 17 44 3 54 6c14 5 6 23-2 33C42 49 32 56 22 63" />
            <path d="M36 62c14-5 25-13 31-23" />
          </svg>
          <div className="photo-note">
            <span className="note-icon"><Heart size={23} strokeWidth={1.5} aria-hidden="true" /></span>
            <span className="note-copy"><strong>Atendimento humano</strong><span><i aria-hidden="true" />Sem robôs</span></span>
          </div>
        </div>
        <div className="hero-actions">
          <a className="primary-link" href={whatsapp} target="_blank" rel="noreferrer"><WhatsAppIcon />Fale com a Agenda Querida</a>
          <a className="secondary-link" href="#servicos">Conheça nossos serviços<ChevronDown size={15} aria-hidden="true" /></a>
        </div>
        <p className="hero-intro">Organizamos sua rotina, cuidamos dos seus clientes e oferecemos atendimento remoto humanizado para que você tenha mais tempo para o que realmente importa.</p>
      </div>
    </section>
  )
}

const careCards = [
  { title: 'Pessoas reais', body: 'Atendimento feito por profissionais, não por chatbots.', Icon: Headset },
  { title: 'Escuta e empatia', body: 'Comunicação acolhedora e personalizada.', Icon: MessagesSquare },
  { title: 'Cuidado em cada contato', body: 'Atenção aos detalhes e às necessidades dos clientes.', Icon: HandHeart },
]

function HumanizedService() {
  return (
    <section className="human" id="diferencial" aria-labelledby="human-title">
      <div className="wrap">
        <div className="human-intro">
          <p className="eyebrow centered"><span />Nosso diferencial<span /></p>
          <h2 id="human-title">Aqui, quem atende é <em>gente.</em> Não robô.</h2>
          <p>Na Agenda Querida, cada conversa importa. Nosso atendimento é realizado por pessoas reais, com empatia, atenção e cuidado em cada detalhe. Porque seus clientes merecem mais do que respostas automáticas.</p>
        </div>
        <div className="human-grid">
          {careCards.map(({title, body, Icon}) => <article className="care-card" key={title}>
            <span className="care-icon"><Icon size={25} strokeWidth={1.5} aria-hidden="true" /></span>
            <div><h3>{title}</h3><p>{body}</p></div>
          </article>)}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap footer-inner">
        <div className="footer-brand"><Brand footer /><p>Onde o cuidado acontece nos detalhes</p></div>
        <nav aria-label="Navegação do rodapé" className="footer-links">
          <h2>Navegue</h2>
          <a href="#diferencial">Nosso diferencial</a><a href="#servicos">Serviços</a><a href="#consultorios">Consultórios</a><a href="#depoimentos">Depoimentos</a>
        </nav>
        <div className="footer-links">
          <h2>Fale conosco</h2>
          <a href={whatsapp} target="_blank" rel="noreferrer"><WhatsAppIcon size={17} />(11) 97076-8655</a>
          <a href="tel:+5511913224789"><Phone size={15} aria-hidden="true"/>(11) 91322-4789</a>
          <a href="https://www.instagram.com/agendaquerida/" target="_blank" rel="noreferrer"><Instagram size={16} aria-hidden="true"/>@agendaquerida</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({isIntersecting, target}) => {
        if (!isIntersecting) return
        target.classList.add('entered')
        observer.unobserve(target)
      })
    }, { threshold: 0.08 })
    document.querySelectorAll('main section:not(.hero) h2, .care-card').forEach(el => {
      if (el.getBoundingClientRect().top > window.innerHeight) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])
  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <Header />
    <main id="conteudo">
      <Hero /><HumanizedService /><LowerSections />
    </main>
    <Footer />
  </>
}
