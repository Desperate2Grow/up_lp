"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  Gauge,
  Mail,
  Megaphone,
  Menu,
  MessageCircle,
  MousePointerClick,
  Palette,
  Search,
  Share2,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";

const whatsappLink =
  "https://wa.me/?text=Ol%C3%A1%2C%20quero%20entender%20como%20a%20Up%20Clips%20pode%20fortalecer%20minha%20marca.";

const navItems = [
  { label: "Método", href: "#metodo" },
  { label: "Serviços", href: "#servicos" },
  { label: "Aquisição", href: "#aquisicao" },
];

const serviceCards = [
  {
    number: "01",
    icon: Palette,
    title: "Posicionamento",
    text: "A clareza que transforma uma marca esquecida em uma escolha óbvia.",
    accent: "violet",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Conteúdo que marca",
    text: "Direção criativa e conteúdo para criar presença, desejo e confiança.",
    accent: "pink",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Aquisição",
    text: "Campanhas que colocam sua mensagem diante de quem já está procurando.",
    accent: "blue",
  },
];

const proofItems = [
  "Diagnóstico sem enrolação",
  "Plano feito para o seu momento",
  "Comunicação que você entende",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Up Clips - início">
          <Image
            className="brand-mark"
            src="/up-clips-logo.png"
            alt=""
            width={52}
            height={52}
            priority
          />
          <span className="brand-name">UP CLIPS</span>
        </a>

        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navegação principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href={whatsappLink} target="_blank" rel="noreferrer">
            Falar com a gente <ArrowUpRight size={15} strokeWidth={2.3} />
          </a>
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-grid" />
        <div className="hero-streak streak-one" />
        <div className="hero-streak streak-two" />
        <div className="hero-streak streak-three" />
        <div className="hero-spark spark-one" />
        <div className="hero-spark spark-two" />
        <div className="hero-content">
          <div className="eyebrow reveal reveal-delay-1">
            <span className="eyebrow-dot" />
            Agência de posicionamento & aquisição
          </div>
          <h1 className="hero-title text-reveal reveal reveal-delay-2">
            <span className="text-line"><span>Sua marca não precisa de mais posts.</span></span>
            <span className="text-line"><span><em>Precisa ser lembrada.</em></span></span>
          </h1>
          <p className="hero-copy reveal reveal-delay-3">
            A Up Clips transforma presença digital fraca e inconsistente em uma marca que chama atenção, gera confiança e abre conversas.
          </p>
          <div className="hero-actions reveal reveal-delay-4">
            <a className="button button-primary" href={whatsappLink} target="_blank" rel="noreferrer">
              Quero fortalecer minha marca <ArrowUpRight size={18} />
            </a>
            <a className="text-link" href="#metodo">
              Entender o método <ArrowDownRight size={17} />
            </a>
          </div>
          <div className="hero-note reveal reveal-delay-4">
            <span className="note-line" />
            Para marcas que sabem que podem ser percebidas de outro jeito.
          </div>
        </div>
        <a className="scroll-cue" href="#tension" aria-label="Rolar para a próxima seção">
          <span>role para descobrir</span>
          <ChevronDown size={16} />
        </a>
      </section>

      <section className="marquee-band" aria-label="Especialidades da Up Clips">
        <div className="marquee-track">
          <span>POSICIONAMENTO</span><i>✦</i><span>CONTEÚDO</span><i>✦</i><span>META ADS</span><i>✦</i><span>GOOGLE ADS</span><i>✦</i>
          <span>POSICIONAMENTO</span><i>✦</i><span>CONTEÚDO</span><i>✦</i><span>META ADS</span><i>✦</i><span>GOOGLE ADS</span><i>✦</i>
        </div>
      </section>

      <section className="section tension-section" id="tension">
        <div className="section-label reveal"><span>01</span> O que está travando sua marca</div>
        <div className="tension-layout">
          <div className="tension-intro reveal reveal-delay-1">
            <h2 className="text-reveal">
              <span className="text-line"><span>Se você não ocupa um espaço na mente,</span></span>
              <span className="text-line"><span><em>ocupa o espaço de ninguém.</em></span></span>
            </h2>
          </div>
          <div className="tension-copy reveal reveal-delay-2">
            <p>Você entrega bem. Mas, no digital, sua marca parece igual a todas as outras. O perfil não traduz o seu valor, o conteúdo não cria conexão e o anúncio vira só mais um custo.</p>
            <p className="copy-strong">O problema não é falta de esforço. É falta de direção.</p>
            <a className="inline-link" href={whatsappLink} target="_blank" rel="noreferrer">Quero uma direção clara <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="signal-cards">
          <div className="signal-card reveal reveal-delay-1"><span className="signal-index">A</span><strong>Você posta, mas não é lembrado.</strong><span>Presença sem percepção de valor.</span></div>
          <div className="signal-card reveal reveal-delay-2"><span className="signal-index">B</span><strong>Você anuncia, mas não converte.</strong><span>Tráfego sem mensagem que conecta.</span></div>
          <div className="signal-card reveal reveal-delay-3"><span className="signal-index">C</span><strong>Você explica demais.</strong><span>Quando a marca poderia falar por si.</span></div>
        </div>
      </section>

      <section className="section method-section" id="metodo">
        <div className="section-label reveal"><span>02</span> O jeito Up Clips</div>
        <div className="method-heading reveal reveal-delay-1">
          <h2 className="text-reveal">
            <span className="text-line"><span>Da presença <span className="muted-word">apagada</span> à marca que</span></span>
            <span className="text-line"><span><em>puxa conversa.</em></span></span>
          </h2>
          <p>Não é sobre parecer maior. É sobre ser percebido pelo valor que você já entrega.</p>
        </div>
        <div className="service-grid" id="servicos">
          {serviceCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <article className={`service-card accent-${card.accent} reveal reveal-delay-${index + 1}`} key={card.number}>
                <div className="card-topline"><span>{card.number}</span><Icon size={22} strokeWidth={1.65} /></div>
                <div className="card-body"><h3>{card.title}</h3><p>{card.text}</p></div>
                <ArrowUpRight className="card-arrow" size={20} />
              </article>
            );
          })}
        </div>
      </section>

      <section className="ads-section" id="aquisicao">
        <div className="ads-orbit orbit-one" /><div className="ads-orbit orbit-two" />
        <div className="section ads-inner">
          <div className="section-label light reveal"><span>03</span> Atenção que vira oportunidade</div>
          <div className="ads-heading reveal reveal-delay-1">
            <p className="micro-kicker">Aquisição com intenção</p>
            <h2 className="text-reveal">
              <span className="text-line"><span>Não compramos cliques.</span></span>
              <span className="text-line"><span><em>Construímos próximos passos.</em></span></span>
            </h2>
          </div>
          <div className="ads-grid">
            <article className="ads-card meta-card reveal reveal-delay-2">
              <div className="ads-card-head"><div className="platform-icon meta-icon"><Share2 size={24} /></div><div><span className="platform-tag">Meta</span><h3>Meta Ads</h3></div></div>
              <p>Interrompa o scroll com uma ideia impossível de ignorar. Criativos e campanhas para gerar desejo antes mesmo do clique.</p>
              <div className="ads-features"><span><Share2 size={15} /> Instagram & Facebook</span><span><Sparkles size={15} /> Criativos que conectam</span><span><MessageCircle size={15} /> Conversas no WhatsApp</span></div>
              <a className="card-cta" href={whatsappLink} target="_blank" rel="noreferrer">Quero ser visto <ArrowUpRight size={16} /></a>
            </article>
            <article className="ads-card google-card reveal reveal-delay-3">
              <div className="ads-card-head"><div className="platform-icon google-icon"><Search size={24} /></div><div><span className="platform-tag">Google</span><h3>Google Ads</h3></div></div>
              <p>Se alguém já está procurando pelo que você faz, sua marca precisa aparecer com a resposta certa — no momento certo.</p>
              <div className="ads-features"><span><Search size={15} /> Intenção de busca</span><span><MousePointerClick size={15} /> Palavras que convertem</span><span><Gauge size={15} /> Otimização contínua</span></div>
              <a className="card-cta" href={whatsappLink} target="_blank" rel="noreferrer">Quero ser encontrado <ArrowUpRight size={16} /></a>
            </article>
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="process-content">
          <div className="section-label reveal"><span>04</span> Sem complicar</div>
          <h2 className="text-reveal reveal reveal-delay-1">
            <span className="text-line"><span>Você traz o que sabe fazer.</span></span>
            <span className="text-line"><span><em>A gente mostra por que importa.</em></span></span>
          </h2>
          <div className="process-steps">
            <div className="process-step reveal reveal-delay-1"><span>01</span><div><h3>Clareza</h3><p>Entendemos o que torna sua marca diferente — sem linguagem complicada.</p></div></div>
            <div className="process-step reveal reveal-delay-2"><span>02</span><div><h3>Direção</h3><p>Organizamos mensagem, visual e campanha para tudo apontar para o mesmo lugar.</p></div></div>
            <div className="process-step reveal reveal-delay-3"><span>03</span><div><h3>Movimento</h3><p>Colocamos sua marca em circulação e aprendemos com cada resposta do mercado.</p></div></div>
          </div>
        </div>
        <div className="process-aside reveal reveal-delay-2">
          <div className="aside-orb"><BarChart3 size={36} strokeWidth={1.2} /></div>
          <span>Uma marca consistente<br />é uma marca que cresce.</span>
          <a className="button button-outline" href={whatsappLink} target="_blank" rel="noreferrer">Começar conversa <MessageCircle size={17} /></a>
        </div>
      </section>

      <section className="final-cta" id="contato">
        <div className="final-glow" />
        <div className="final-content reveal">
          <p className="micro-kicker">Seu próximo movimento começa aqui</p>
          <h2 className="text-reveal">
            <span className="text-line"><span>Pronto para deixar de <span className="soft-white">parecer opção</span></span></span>
            <span className="text-line"><span>e se tornar <em>a escolha?</em></span></span>
          </h2>
          <p>Conte para a gente onde sua marca está hoje. A primeira conversa é direta, humana e sem compromisso.</p>
          <a className="button button-light" href={whatsappLink} target="_blank" rel="noreferrer">Falar com a Up Clips <ArrowUpRight size={18} /></a>
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand" href="#top" aria-label="Up Clips - voltar ao início"><Image className="brand-mark" src="/up-clips-logo.png" alt="" width={38} height={38} loading="lazy" /><span className="brand-name">UP CLIPS</span></a>
        <div className="footer-meta"><span>Posicionamento que gera movimento.</span><a href="mailto:oi@upclips.com.br"><Mail size={15} /> oi@upclips.com.br</a></div>
        <div className="footer-end"><span>© 2025 Up Clips</span><a href="#top">Voltar ao topo <ArrowUpRight size={14} /></a></div>
      </footer>
    </main>
  );
}
