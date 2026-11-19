import { FaWhatsapp } from 'react-icons/fa6'

export function Brand({ footer = false }) {
  return (
    <a className={footer ? 'brand brand-footer' : 'brand'} href="#inicio" aria-label="Agenda Querida, início">
      <img src="/marca.svg" width="48" height="50" alt="" />
      <span className="brand-type">
        <span className="brand-name">Agenda Querida</span>
        <span className="brand-role">Secretariado virtual</span>
      </span>
    </a>
  )
}

export function WhatsAppIcon({ size = 20 }) {
  return <FaWhatsapp size={size} aria-hidden="true" focusable="false" />
}
