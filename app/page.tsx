"use client";

import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Calculator,
  Camera,
  Check,
  ChevronDown,
  Clapperboard,
  Film,
  Gauge,
  Layers3,
  Mail,
  Megaphone,
  Menu,
  MessageCircle,
  MousePointerClick,
  Palette,
  Play,
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
  { label: "Captação", href: "#captacao" },
  { label: "Aquisição", href: "#aquisicao" },
];

const serviceCards = [
  {
    icon: Palette,
    title: "Posicionamento",
    text: "A clareza que transforma uma marca esquecida em uma escolha óbvia.",
    accent: "violet",
  },
  {
    icon: Sparkles,
    title: "Conteúdo que marca",
    text: "Direção criativa e conteúdo para criar presença, desejo e confiança.",
    accent: "pink",
  },
  {
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

type QuoteServiceKey = "positioning" | "content" | "meta" | "google" | "cinematic";

const quoteServices: Array<{
  key: QuoteServiceKey;
  label: string;
  description: string;
  price: number;
  unitLabel: string;
  details: string;
  benefits: string[];
}> = [
  { key: "positioning", label: "Posicionamento", description: "Mensagem e direção estratégica", price: 690, unitLabel: "/mês", details: "Organiza o que sua marca promete, para quem fala e por que deve ser escolhida.", benefits: ["Mensagem que diferencia", "Direção para o conteúdo", "Base para campanhas mais coerentes"] },
  { key: "content", label: "Conteúdo", description: "Roteiro, criação e edição", price: 0, unitLabel: "/mês", details: "Transforma a estratégia em ideias, roteiros e peças que criam presença e confiança toda semana.", benefits: ["Mais consistência nas redes", "Criativos que explicam sem cansar", "Biblioteca de conteúdo para testar"] },
  { key: "meta", label: "Meta Ads", description: "Campanhas para gerar demanda", price: 720, unitLabel: "/mês", details: "Leva sua mensagem para Instagram e Facebook com segmentação, criativos e testes pensados para gerar conversa.", benefits: ["Distribuição para novos públicos", "Testes de criativos e ofertas", "Otimização para conversas"] },
  { key: "google", label: "Google Ads", description: "Busca e intenção de compra", price: 720, unitLabel: "/mês", details: "Coloca sua marca diante de quem já está procurando uma solução, serviço ou produto como o seu.", benefits: ["Presença em buscas relevantes", "Palavras-chave com intenção", "Acompanhamento de cliques e oportunidades"] },
  { key: "cinematic", label: "Captação cinematográfica para Ads", description: "Produção visual para criativos", price: 400, unitLabel: " por captação", details: "Uma captação com direção, luz e composição para transformar sua oferta em anúncios mais desejáveis e memoráveis.", benefits: ["Material com aparência profissional", "Variações para anúncios e redes", "Mais impacto no primeiro segundo"] },
];

function QuoteCalculator() {
  const [videosPerWeek, setVideosPerWeek] = useState(4);
  const [selectedServices, setSelectedServices] = useState<QuoteServiceKey[]>(["positioning", "content"]);
  const [expandedService, setExpandedService] = useState<QuoteServiceKey | null>(null);
  const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  const contentPrice = 650 + videosPerWeek * 180;
  const total = selectedServices.reduce((sum, key) => {
    if (key === "content") return sum + contentPrice;
    return sum + (quoteServices.find((service) => service.key === key)?.price ?? 0);
  }, 0);
  const planName = total < 2200 ? "Presença" : total < 3400 ? "Tração" : "Aceleração";
  const selectedLabels = selectedServices.map((key) => quoteServices.find((service) => service.key === key)?.label).filter(Boolean).join(", ");
  const whatsappQuote = `https://wa.me/?text=${encodeURIComponent(`Olá, Up Clips! Fiz uma simulação de plano. Serviços: ${selectedLabels}. Conteúdo: ${videosPerWeek} vídeos por semana. Estimativa do mix: ${money.format(total)}. Quero entender os próximos passos.`)}`;

  const toggleService = (key: QuoteServiceKey) => {
    setSelectedServices((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
  };

  return (
    <section className="quote-section" id="simulador">
      <div className="quote-glow" />
      <div className="section quote-inner">
        <div className="section-label light reveal"><Calculator size={14} /> Um próximo passo mais claro</div>
        <div className="quote-heading reveal reveal-delay-1">
          <div>
            <p className="micro-kicker">Simulador de plano</p>
            <h2>Monte o seu <em>próximo movimento.</em></h2>
          </div>
          <p>Escolha o que sua marca precisa agora e receba uma estimativa inicial em menos de um minuto.</p>
        </div>

        <div className="quote-layout">
          <div className="quote-controls reveal reveal-delay-2">
            <div className="quote-control-head"><span className="control-icon"><Share2 size={15} /></span><strong>Quantos conteúdos por semana?</strong></div>
            <div className="volume-control">
              <div className="volume-value"><strong>{videosPerWeek}</strong><span>vídeos / semana</span></div>
              <input aria-label="Quantidade de vídeos por semana" type="range" min="2" max="10" step="1" value={videosPerWeek} onChange={(event) => setVideosPerWeek(Number(event.target.value))} />
              <div className="range-labels"><span>2</span><span>10</span></div>
            </div>
            <div className="quote-control-head services-head"><span className="control-icon"><Target size={15} /></span><strong>O que entra no plano?</strong></div>
            <div className="quote-service-list">
              {quoteServices.map((service) => {
                const active = selectedServices.includes(service.key);
                const expanded = expandedService === service.key;
                const servicePrice = service.key === "content" ? contentPrice : service.price;
                return (
                  <div className={`quote-service-item ${active ? "is-selected" : ""}`} key={service.key}>
                    <button className="quote-service" type="button" aria-pressed={active} onClick={() => toggleService(service.key)}>
                      <span className="quote-check">{active ? <Check size={14} /> : null}</span>
                      <span><strong>{service.label}</strong><small>{service.description}</small></span>
                      <ArrowUpRight size={16} />
                    </button>
                    <button className="quote-service-info" type="button" aria-expanded={expanded} aria-controls={`quote-details-${service.key}`} onClick={() => setExpandedService(expanded ? null : service.key)}>
                      Saiba mais <ChevronDown size={14} />
                    </button>
                    {expanded ? (
                      <div className="quote-service-details" id={`quote-details-${service.key}`}>
                        <p>{service.details}</p>
                        <strong>A partir de {money.format(servicePrice)}{service.unitLabel}</strong>
                        <ul>{service.benefits.map((benefit) => <li key={benefit}><Check size={13} /> {benefit}</li>)}</ul>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <p className="quote-combination-note"><Sparkles size={14} /> Em conjunto, posicionamento guia o conteúdo, a captação cria ativos fortes e os anúncios colocam tudo diante das pessoas certas.</p>
          </div>

          <aside className="quote-result reveal reveal-delay-3">
            <div className="quote-result-top"><span>Estimativa inicial</span><Calculator size={20} /></div>
            <div className="quote-plan"><small>Plano sugerido</small><strong>{planName}</strong></div>
            <div className="quote-total"><span>a partir de</span><strong>{money.format(total)}<small>{selectedServices.includes("cinematic") ? " mix inicial" : "/mês"}</small></strong></div>
            <p>Os serviços recorrentes são mensais. A captação cinematográfica parte de R$ 400 por sessão e entra no mix como referência.</p>
            <a className="button button-primary quote-button" href={whatsappQuote} target="_blank" rel="noreferrer">Continuar no WhatsApp <ArrowUpRight size={17} /></a>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
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
          <img
            className="brand-mark"
            src="/up-clips-logo.png"
            alt=""
            width={52}
            height={52}
            decoding="async"
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
        <img className="hero-image" src="/up-clips-hero-studio.webp" alt="Equipe criativa da Up Clips produzindo um anúncio em estúdio" width={1536} height={1024} fetchPriority="high" decoding="async" />
        <div className="hero-image-shade" />
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="eyebrow reveal reveal-delay-1">
            <span className="eyebrow-dot" />
            Agência de posicionamento & aquisição
          </div>
          <h1 className="hero-title text-reveal reveal reveal-delay-2">
            <span className="text-line"><span>Sua marca não precisa gritar.</span></span>
            <span className="text-line"><span><em>Precisa ocupar espaço.</em></span></span>
          </h1>
          <p className="hero-copy reveal reveal-delay-3">
            Posicionamento, conteúdo e tráfego para marcas que querem ser lembradas.
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
            Clareza para ser escolhido.
          </div>
        </div>
        <div className="hero-production-tag reveal reveal-delay-3"><span className="live-dot" /><div><small>Em produção</small><strong>CRIATIVOS QUE PARAM O SCROLL</strong></div><Camera size={18} /></div>
        <a className="scroll-cue" href="#tension" aria-label="Rolar para a próxima seção">
          <span>role para descobrir</span>
          <ChevronDown size={16} />
        </a>
      </section>

      <QuoteCalculator />

      <section className="marquee-band" aria-label="Especialidades da Up Clips">
        <div className="marquee-track">
          <span>POSICIONAMENTO</span><i>✦</i><span>CONTEÚDO</span><i>✦</i><span>META ADS</span><i>✦</i><span>GOOGLE ADS</span>
        </div>
      </section>

      <section className="section tension-section" id="tension">
        <div className="section-label reveal"><Target size={14} /> O que está travando sua marca</div>
        <div className="tension-layout">
          <div className="tension-intro reveal reveal-delay-1">
            <h2 className="text-reveal">
              <span className="text-line"><span>Se sua marca parece igual,</span></span>
              <span className="text-line"><span><em>o mercado trata igual.</em></span></span>
            </h2>
          </div>
          <div className="tension-copy reveal reveal-delay-2">
            <p>Seu valor existe. Falta transformar isso em presença, desejo e conversa.</p>
            <p className="copy-strong">Menos esforço solto. Mais direção.</p>
            <a className="inline-link" href={whatsappLink} target="_blank" rel="noreferrer">Quero uma direção clara <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="signal-cards">
          <div className="signal-card reveal reveal-delay-1"><Target className="signal-icon" size={18} /><strong>Você posta, mas não é lembrado.</strong><span>Presença sem percepção de valor.</span></div>
          <div className="signal-card reveal reveal-delay-2"><Megaphone className="signal-icon" size={18} /><strong>Você anuncia, mas não converte.</strong><span>Tráfego sem mensagem que conecta.</span></div>
          <div className="signal-card reveal reveal-delay-3"><MessageCircle className="signal-icon" size={18} /><strong>Você explica demais.</strong><span>Quando a marca poderia falar por si.</span></div>
        </div>
        <div className="brand-shift reveal">
          <div className="brand-shift-copy"><span>DA PRESENÇA SOLTA</span><strong>PARA UMA MARCA QUE AS PESSOAS RECONHECEM.</strong><p>Estratégia organiza. Conteúdo repete os sinais certos. Aquisição transforma atenção em oportunidade.</p></div>
          <div className="feed-compare" aria-label="Comparação visual de uma presença digital inconsistente com uma presença de marca organizada">
            <div className="feed-frame feed-before"><div className="feed-head"><span /><i /></div><div className="feed-grid"><span /><span /><span /><span /><span /><span /></div><small>SEM DIREÇÃO</small></div>
            <ArrowRight className="feed-arrow" size={22} />
            <div className="feed-frame feed-after"><div className="feed-head"><span /><i /></div><div className="feed-grid"><span /><span /><span /><span /><span /><span /></div><small>COM SISTEMA DE MARCA</small></div>
          </div>
        </div>
      </section>

      <section className="phrase-band phrase-band-dark" aria-label="Direção da Up Clips">
        <div className="phrase-inner reveal"><Sparkles size={18} /><p>Menos ruído. <em>Mais presença.</em></p></div>
      </section>

      <section className="section method-section" id="metodo">
        <div className="section-label reveal"><Sparkles size={14} /> O jeito Up Clips</div>
        <div className="method-heading reveal reveal-delay-1">
          <h2 className="text-reveal">
              <span className="text-line"><span>Posicionamento que vira linguagem.</span></span>
              <span className="text-line"><span><em>Conteúdo que vira movimento.</em></span></span>
          </h2>
          <p>Mensagem, conteúdo e aquisição na mesma direção.</p>
        </div>
        <div className="service-grid" id="servicos">
          {serviceCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <article className={`service-card accent-${card.accent} reveal reveal-delay-${index + 1}`} key={card.title}>
                <div className="card-topline"><Icon size={22} strokeWidth={1.65} /></div>
                <div className={`service-visual service-visual-${card.accent}`} aria-hidden="true"><span /><span /><span /><span /></div>
                <div className="card-body"><h3>{card.title}</h3><p>{card.text}</p></div>
                <ArrowUpRight className="card-arrow" size={20} />
              </article>
            );
          })}
        </div>
      </section>

      <section className="capture-section" id="captacao">
        <div className="section capture-inner">
          <div className="capture-media reveal">
            <img src="/up-clips-cinematic-capture.webp" alt="Captação cinematográfica de um criativo para anúncio" width={1120} height={1400} loading="lazy" decoding="async" />
            <div className="capture-corners" aria-hidden="true" />
            <div className="capture-price"><Camera size={17} /><span>Captação base</span><strong>R$ 400</strong></div>
          </div>
          <div className="capture-copy reveal reveal-delay-2">
            <div className="section-label light"><Clapperboard size={14} /> Imagem que sustenta a promessa</div>
            <p className="micro-kicker">Captação cinematográfica para Ads</p>
            <h2 className="text-reveal"><span className="text-line"><span>Seu anúncio tem um segundo</span></span><span className="text-line"><span><em>para parecer relevante.</em></span></span></h2>
            <p className="capture-lead">Direção, luz e enquadramento para transformar uma oferta comum em um criativo com presença.</p>
            <div className="capture-points">
              <div><Film size={18} /><span><strong>Material com intenção</strong><small>Cenas pensadas para anúncio, não apenas para preencher o feed.</small></span></div>
              <div><Layers3 size={18} /><span><strong>Uma captação, vários ativos</strong><small>Cortes para Reels, Stories, campanhas e testes de criativo.</small></span></div>
              <div><Play size={18} /><span><strong>Primeiro segundo mais forte</strong><small>Movimento, produto e mensagem organizados para segurar atenção.</small></span></div>
            </div>
            <a className="button button-primary" href={whatsappLink} target="_blank" rel="noreferrer">Quero planejar uma captação <ArrowUpRight size={17} /></a>
          </div>
        </div>
      </section>

      <section className="ads-section" id="aquisicao">
        <div className="ads-orbit orbit-one" /><div className="ads-orbit orbit-two" />
        <div className="section ads-inner">
          <div className="section-label light reveal"><TrendingUp size={14} /> Atenção que vira oportunidade</div>
          <div className="ads-heading reveal reveal-delay-1">
            <p className="micro-kicker">Aquisição com intenção</p>
            <h2 className="text-reveal">
              <span className="text-line"><span>Atenção não é sorte.</span></span>
              <span className="text-line"><span><em>É estratégia em circulação.</em></span></span>
            </h2>
          </div>
          <div className="ads-grid">
            <article className="ads-card meta-card reveal reveal-delay-2">
              <div className="ads-card-head"><div className="platform-icon meta-icon"><Share2 size={24} /></div><div><span className="platform-tag">Meta</span><h3>Meta Ads</h3></div></div>
              <div className="ad-preview meta-preview" aria-label="Exemplo visual de anúncio para Instagram e Facebook"><div className="preview-top"><span /><i /></div><div className="preview-media"><Play size={23} fill="currentColor" /></div><div className="preview-lines"><span /><span /></div><div className="preview-action"><MessageCircle size={13} /> Conversar no WhatsApp</div></div>
              <p>Ideias que interrompem o scroll e abrem conversas.</p>
              <div className="ads-features"><span><Share2 size={15} /> Instagram & Facebook</span><span><Sparkles size={15} /> Criativos que conectam</span><span><MessageCircle size={15} /> Conversas no WhatsApp</span></div>
              <a className="card-cta" href={whatsappLink} target="_blank" rel="noreferrer">Quero ser visto <ArrowUpRight size={16} /></a>
            </article>
            <article className="ads-card google-card reveal reveal-delay-3">
              <div className="ads-card-head"><div className="platform-icon google-icon"><Search size={24} /></div><div><span className="platform-tag">Google</span><h3>Google Ads</h3></div></div>
              <div className="ad-preview search-preview" aria-label="Exemplo visual de anúncio na busca do Google"><div className="search-field"><span>agência para fortalecer marca</span><Search size={14} /></div><div className="search-result"><small>Anúncio · upclips.com.br</small><strong>Sua marca, finalmente clara.</strong><span>Posicionamento, conteúdo e mídia na mesma direção.</span></div><div className="search-result muted-result"><small>Resultado orgânico</small><strong>Outras opções</strong></div></div>
              <p>Faça sua marca aparecer quando a intenção já existe.</p>
              <div className="ads-features"><span><Search size={15} /> Intenção de busca</span><span><MousePointerClick size={15} /> Palavras que convertem</span><span><Gauge size={15} /> Otimização contínua</span></div>
              <a className="card-cta" href={whatsappLink} target="_blank" rel="noreferrer">Quero ser encontrado <ArrowUpRight size={16} /></a>
            </article>
          </div>
        </div>
      </section>

      <section className="phrase-band phrase-band-purple" aria-label="Convite da Up Clips">
        <div className="phrase-inner reveal"><MousePointerClick size={18} /><p>Clareza que <em>chama atenção.</em></p></div>
      </section>

      <section className="section process-section">
        <div className="process-content">
          <div className="section-label reveal"><Check size={14} /> Sem complicar</div>
          <h2 className="text-reveal reveal reveal-delay-1">
            <span className="text-line"><span>Uma boa marca não explica tudo.</span></span>
            <span className="text-line"><span><em>Ela deixa claro.</em></span></span>
          </h2>
          <div className="process-steps">
            <div className="process-step reveal reveal-delay-1"><span className="process-icon"><Target size={17} /></span><div><h3>Clareza</h3><p>O que torna sua marca diferente.</p></div></div>
            <div className="process-step reveal reveal-delay-2"><span className="process-icon"><Palette size={17} /></span><div><h3>Direção</h3><p>Mensagem, visual e campanha alinhados.</p></div></div>
            <div className="process-step reveal reveal-delay-3"><span className="process-icon"><TrendingUp size={17} /></span><div><h3>Movimento</h3><p>Marca em circulação e aprendendo.</p></div></div>
          </div>
        </div>
        <div className="process-aside reveal reveal-delay-2">
          <div className="aside-orb"><BarChart3 size={36} strokeWidth={1.2} /></div>
          <div className="mini-pipeline" aria-label="Fluxo de estratégia até geração de leads"><span>MARCA</span><i /><span>CRIATIVO</span><i /><span>MÍDIA</span><i /><strong>LEAD</strong></div>
          <span>Uma marca consistente<br />é uma marca que cresce.</span>
          <a className="button button-outline" href={whatsappLink} target="_blank" rel="noreferrer">Começar conversa <MessageCircle size={17} /></a>
        </div>
      </section>

      <section className="final-cta" id="contato">
        <div className="final-glow" />
        <div className="final-content reveal">
          <p className="micro-kicker">Seu próximo movimento começa aqui</p>
          <h2 className="text-reveal">
            <span className="text-line"><span>O próximo passo não precisa ser complicado.</span></span>
            <span className="text-line"><span><em>Precisa começar.</em></span></span>
          </h2>
          <p>Uma conversa direta para descobrir o próximo passo.</p>
          <a className="button button-light" href={whatsappLink} target="_blank" rel="noreferrer">Falar com a Up Clips <ArrowUpRight size={18} /></a>
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand" href="#top" aria-label="Up Clips - voltar ao início"><img className="brand-mark" src="/up-clips-logo.png" alt="" width={38} height={38} loading="lazy" decoding="async" /><span className="brand-name">UP CLIPS</span></a>
        <div className="footer-meta"><span>Posicionamento que gera movimento.</span><a href="mailto:oi@upclips.com.br"><Mail size={15} /> oi@upclips.com.br</a></div>
        <div className="footer-end"><span>© 2026 Up Clips</span><a href="#top">Voltar ao topo <ArrowUpRight size={14} /></a></div>
      </footer>
    </main>
  );
}
