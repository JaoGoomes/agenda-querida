import React, { useState } from "react";
import { WhatsAppIcon } from "./Brand";
import {
  CalendarCheck, CalendarClock, Check, CheckCheck, ClipboardList, Clock3,
  Folders, HeartHandshake, MessagesSquare, Quote, Sprout,
  Star, UsersRound,
} from "lucide-react";
import "./sections.css";

const services = [
  {
    icon: MessagesSquare,
    title: "Atendimento nos seus canais",
    text: "Acolhemos quem chega pelo WhatsApp, telefone ou e-mail e acompanhamos cada conversa.",
  },
  {
    icon: CalendarCheck,
    title: "Agendamentos e confirmações",
    text: "Combinamos os horários com seus clientes e confirmamos os compromissos da sua agenda.",
  },
  {
    icon: UsersRound,
    title: "Acompanhamento de leads",
    text: "Retomamos o contato com quem demonstrou interesse e ajudamos a transformar conversas em vendas.",
  },
  {
    icon: ClipboardList,
    title: "Suporte administrativo",
    text: "Cuidamos de cadastros, e-mails e planilhas para aliviar o trabalho administrativo do dia a dia.",
  },
  {
    icon: Folders,
    title: "Organização da rotina",
    text: "Mantemos informações e pendências em ordem para que você saiba o que precisa da sua atenção.",
  },
  {
    icon: CalendarClock,
    title: "Remarcação de consultas",
    text: "Falamos com os pacientes para confirmar sua presença ou encontrar um novo horário.",
  },
];

const benefits = [
  {
    icon: HeartHandshake,
    title: "Uma equipe preparada para acolher",
    text: "Profissionais treinados para conhecer o seu negócio e responder com agilidade, escuta e gentileza.",
  },
  {
    icon: Sprout,
    title: "Mais atenção às oportunidades",
    text: "Organizamos os contatos e os retornos para que cada pessoa interessada receba acompanhamento.",
  },
  {
    icon: Clock3,
    title: "Mais tempo para o seu negócio",
    text: "Divida a carga administrativa com a nossa equipe e reserve espaço na sua agenda para suas prioridades.",
  },
];

const medicalServices = [
  "Agendamento de consultas e exames",
  "Confirmação de presença e remarcação",
  "Acolhimento de novos pacientes",
  "Atendimento por WhatsApp, telefone e e-mail",
  "Suporte administrativo para o consultório",
];

// Replace these examples with approved client testimonials before presenting them as real reviews.
const testimonials = [
  {
    context: "Atendimento ao cliente",
    quote: "Quando um cliente me procura no meio de uma reunião, sei que tem alguém para ouvir o que ele precisa.",
  },
  {
    context: "Rotina de consultório",
    quote: "Consigo estar presente na consulta enquanto a equipe cuida das confirmações e das mudanças de horário.",
  },
];

function Services() {
  return (
    <section className="aq-services aq-section" id="servicos" aria-labelledby="aq-services-title">
      <div className="wrap">
        <div className="aq-section-intro">
          <h2 className="aq-heading" id="aq-services-title">Nossos <em>serviços.</em></h2>
          <p>Do primeiro contato à organização da agenda, você escolhe o apoio que faz sentido para a sua rotina.</p>
        </div>
        <div className="aq-service-grid">
          {services.map(({ icon: Icon, title, text }) => (
            <article className="aq-service-card" key={title}>
              <span className="aq-service-icon"><Icon size={25} strokeWidth={1.55} aria-hidden="true" /></span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="aq-benefits aq-section" id="beneficios" aria-labelledby="aq-benefits-title">
      <div className="wrap aq-benefits-layout">
        <h2 className="aq-heading" id="aq-benefits-title">Por que escolher a <em>Agenda Querida?</em></h2>
        <div className="aq-benefit-list">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article className="aq-benefit" key={title}>
              <span className="aq-benefit-icon"><Icon size={25} strokeWidth={1.5} aria-hidden="true" /></span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MedicalServices() {
  return (
    <section className="aq-medical aq-section" id="consultorios" aria-labelledby="aq-medical-title">
      <div className="wrap aq-medical-layout">
        <div className="aq-medical-heading">
          <p className="aq-medical-label"><span aria-hidden="true" />Para médicos e consultórios</p>
          <h2 className="aq-heading" id="aq-medical-title">Você cuida dos pacientes. <em>Nós cuidamos da sua rotina.</em></h2>
        </div>
        <div className="aq-medical-photo">
          <img
            src="/images/consultorio.webp"
            srcSet="/images/consultorio-small.webp 680w, /images/consultorio.webp 1120w"
            sizes="(min-width: 82rem) 540px, (min-width: 52rem) 43vw, 92vw"
            width="1120"
            height="1019"
            loading="lazy"
            decoding="async"
            alt="Estetoscópio e agenda sobre uma mesa de consultório."
          />
        </div>
        <div className="aq-medical-details">
          <p>Enquanto você atende, nossa equipe acolhe os pacientes e organiza os bastidores do consultório com discrição.</p>
          <ul>
            {medicalServices.map((service) => <li key={service}><Check size={17} strokeWidth={1.8} aria-hidden="true" />{service}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [demoComplete, setDemoComplete] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    for (const field of [form.elements.nome, form.elements.comentario]) {
      if (!field.value.trim()) {
        field.setCustomValidity(field.name === "nome" ? "Informe seu nome." : "Escreva um comentário.");
        field.reportValidity();
        return;
      }
    }
    form.reset();
    setRating(0);
    setHoveredRating(0);
    setDemoComplete(true);
  }

  function handleChange(event) {
    event.target.setCustomValidity("");
    setDemoComplete(false);
  }

  return (
    <form className="aq-feedback" onSubmit={handleSubmit} onChange={handleChange} aria-labelledby="aq-feedback-title">
      <div className="aq-feedback-heading">
        <h3 id="aq-feedback-title">Deixe sua avaliação</h3>
        <p>Experimente o formulário de demonstração.</p>
      </div>
      <label className="aq-field">Seu nome
        <input type="text" name="nome" autoComplete="off" placeholder="Como podemos te chamar?" required />
      </label>
      <fieldset className="aq-rating">
        <legend>Sua avaliação</legend>
        <div className="aq-stars" onPointerLeave={() => setHoveredRating(0)} onFocus={() => setHoveredRating(0)}>
          {[1, 2, 3, 4, 5].map((value) => (
            <label
              key={value}
              onPointerEnter={(event) => setHoveredRating(event.pointerType === "mouse" ? value : 0)}
              className={value <= (hoveredRating || rating) ? "is-filled" : undefined}
            >
              <input type="radio" name="avaliacao" value={value} checked={rating === value} onChange={() => setRating(value)} aria-label={value + (value === 1 ? " estrela" : " estrelas")} required />
              <Star size={26} strokeWidth={1.55} aria-hidden="true" />
            </label>
          ))}
        </div>
      </fieldset>
      <label className="aq-field">Seu comentário
        <textarea name="comentario" rows={3} placeholder="Conte como foi o atendimento…" required />
      </label>
      <button className="aq-action aq-send" type="submit">Enviar avaliação</button>
      <div className="aq-feedback-status" role="status" aria-live="polite" aria-atomic="true">
        {demoComplete && <p><CheckCheck size={21} aria-hidden="true" /><span>Demonstração concluída. Nenhum dado foi enviado ou armazenado.</span></p>}
      </div>
    </form>
  );
}

function Testimonials() {
  return (
    <section className="aq-testimonials aq-section" id="depoimentos" aria-labelledby="aq-testimonials-title">
      <div className="wrap aq-testimonial-layout">
        <div className="aq-quotes">
          <h2 className="aq-heading" id="aq-testimonials-title">Quem confia, <em>recomenda.</em></h2>
          <div className="aq-quote-list">
            {testimonials.map(({ context, quote }) => (
              <figure className="aq-quote" key={context}>
                <figcaption><span>Exemplo demonstrativo</span><span>{context}</span></figcaption>
                <div className="aq-quote-text">
                  <Quote size={20} strokeWidth={1.6} aria-hidden="true" />
                  <blockquote>{quote}</blockquote>
                </div>
              </figure>
            ))}
          </div>
        </div>
        <FeedbackForm />
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="aq-contact aq-section" id="contato" aria-labelledby="aq-contact-title">
      <div className="wrap aq-contact-content">
        <h2 className="aq-heading" id="aq-contact-title">Juntos, o seu negócio <em>vai mais longe!</em></h2>
        <p>Mais organização, mais tranquilidade e um atendimento que faz seus clientes se sentirem especiais.</p>
        <a className="aq-action aq-contact-button" href="https://wa.me/5511970768655" target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />Conversar pelo WhatsApp
        </a>
      </div>
    </section>
  );
}

export function LowerSections() {
  return (
    <div className="aq-lower">
      <Services />
      <Benefits />
      <MedicalServices />
      <Testimonials />
      <ContactCTA />
    </div>
  );
}
