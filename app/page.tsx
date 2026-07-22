"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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

const quoteServiceIcons = {
  positioning: Palette,
  content: Film,
  meta: Share2,
  google: Search,
  cinematic: Camera,
} satisfies Record<QuoteServiceKey, typeof Palette>;

const quoteServiceColors = {
  positioning: "#c777ff",
  content: "#ff7fc7",
  meta: "#7b8cff",
  google: "#63b3ff",
  cinematic: "#ffb65c",
} satisfies Record<QuoteServiceKey, string>;

function QuoteCalculator() {
  const [videosPerWeek, setVideosPerWeek] = useState(4);
  const [selectedServices, setSelectedServices] = useState<QuoteServiceKey[]>(["positioning", "content"]);
  const [expandedService, setExpandedService] = useState<QuoteServiceKey | null>(null);
  const [displayTotal, setDisplayTotal] = useState(0);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const displayTotalRef = useRef(0);
  const quoteSectionRef = useRef<HTMLElement>(null);
  const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  const contentPrice = 650 + videosPerWeek * 180;
  const total = selectedServices.reduce((sum, key) => {
    if (key === "content") return sum + contentPrice;
    return sum + (quoteServices.find((service) => service.key === key)?.price ?? 0);
  }, 0);
  const planName = total < 2200 ? "Presença" : total < 3400 ? "Tração" : "Aceleração";
  const selectedBreakdown = quoteServices
    .filter((service) => selectedServices.includes(service.key))
    .map((service) => ({ ...service, currentPrice: service.key === "content" ? contentPrice : service.price }));
  const selectedLabels = selectedBreakdown.map((service) => service.label).join(", ") || "a definir";
  const hasPositioning = selectedServices.includes("positioning");
  const hasContent = selectedServices.includes("content");
  const hasCinematic = selectedServices.includes("cinematic");
  const hasMeta = selectedServices.includes("meta");
  const hasGoogle = selectedServices.includes("google");
  const hasAds = hasMeta || hasGoogle;
  const recurringTotal = selectedBreakdown.reduce((sum, service) => service.key === "cinematic" ? sum : sum + service.currentPrice, 0);
  const activeStageCount = [hasPositioning, hasContent, hasCinematic, hasAds, hasAds && (hasContent || hasCinematic)].filter(Boolean).length;
  const planStrength = activeStageCount * 20;
  const whatsappQuote = `https://wa.me/?text=${encodeURIComponent(`Olá, Up Clips! Montei o plano ${planName} no site. Serviços: ${selectedLabels}. Conteúdo: ${videosPerWeek} vídeos por semana. Investimento estimado: ${money.format(total)}${hasCinematic ? ` no mix inicial e ${money.format(recurringTotal)}/mês em recorrência` : "/mês"}. Quero validar esse plano com vocês.`)}`;

  const recommendation: { message: string; actionKey?: QuoteServiceKey; actionLabel?: string } = (() => {
    if (!selectedServices.length) return { message: "Comece pela clareza: organize a mensagem antes de investir energia em produção.", actionKey: "positioning", actionLabel: "Adicionar posicionamento" };
    if (hasAds && !hasPositioning) return { message: "Você já escolheu mídia. O posicionamento reduz desperdício ao dar uma mensagem clara para os anúncios.", actionKey: "positioning", actionLabel: "Fortalecer a mensagem" };
    if (hasPositioning && !hasContent) return { message: "A estratégia está pronta para ganhar forma. Conteúdo transforma direção em presença recorrente.", actionKey: "content", actionLabel: "Adicionar conteúdo" };
    if (hasContent && !hasAds) return { message: "Seu plano já cria conteúdo, mas ainda depende do alcance orgânico. Meta Ads acelera a distribuição.", actionKey: "meta", actionLabel: "Adicionar Meta Ads" };
    if (hasAds && hasContent && !hasCinematic) return { message: "A distribuição está montada. Uma captação cinematográfica cria variações mais fortes para os testes.", actionKey: "cinematic", actionLabel: "Adicionar captação" };
    if (hasMeta && !hasGoogle) return { message: "Meta gera descoberta. Google Ads pode completar o plano capturando quem já procura uma solução.", actionKey: "google", actionLabel: "Adicionar Google Ads" };
    return { message: "Marca, conteúdo e aquisição agora trabalham como um sistema: a mensagem chama atenção e a mídia conduz até a conversa." };
  })();

  const pipelineStages = [
    { label: "Marca", detail: "clareza", icon: Target, active: hasPositioning },
    { label: "Conteúdo", detail: `${videosPerWeek} vídeos`, icon: Film, active: hasContent },
    { label: "Captação", detail: "imagem", icon: Camera, active: hasCinematic },
    { label: "Mídia", detail: hasMeta && hasGoogle ? "Meta + Google" : hasMeta ? "Meta" : hasGoogle ? "Google" : "alcance", icon: Megaphone, active: hasAds },
    { label: "Lead", detail: "conversa", icon: MessageCircle, active: hasAds && (hasContent || hasCinematic) },
  ];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reducedMotionFrame = requestAnimationFrame(() => {
        displayTotalRef.current = total;
        setDisplayTotal(total);
      });
      return () => cancelAnimationFrame(reducedMotionFrame);
    }

    const initialValue = displayTotalRef.current;
    const difference = total - initialValue;
    let startedAt: number | null = null;
    let animationFrame = 0;

    const animateTotal = (time: number) => {
      if (startedAt === null) startedAt = time;
      const progress = Math.min((time - startedAt) / 720, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(initialValue + difference * eased);
      displayTotalRef.current = nextValue;
      setDisplayTotal(nextValue);
      if (progress < 1) animationFrame = requestAnimationFrame(animateTotal);
    };

    animationFrame = requestAnimationFrame(animateTotal);
    return () => cancelAnimationFrame(animationFrame);
  }, [total]);

  useEffect(() => {
    const section = quoteSectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setQuoteVisible(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileSummaryOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileSummaryOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileSummaryOpen]);

  const toggleService = (key: QuoteServiceKey) => {
    setSelectedServices((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
  };

  return (
    <section className="quote-section" id="simulador" ref={quoteSectionRef}>
      <div className="quote-glow" />
      <div className="section quote-inner">
        <div className="section-label light reveal"><Calculator size={14} /> Um próximo passo mais claro</div>
        <div className="quote-heading reveal reveal-delay-1">
          <div>
            <p className="micro-kicker">Simulador de plano</p>
            <h2>Monte o seu <em>próximo movimento.</em></h2>
          </div>
          <div className="quote-heading-aside"><p>Escolha o que sua marca precisa agora. O plano reage a cada decisão.</p><span><Gauge size={15} /> Leva cerca de 1 minuto</span></div>
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
                  <div className={`quote-service-item ${active ? "is-selected" : ""}`} key={service.key} style={{ "--service-color": quoteServiceColors[service.key] } as CSSProperties}>
                    <button className="quote-service" type="button" aria-pressed={active} onClick={() => toggleService(service.key)}>
                      <span className="quote-check">{active ? <Check size={14} /> : null}</span>
                      <span><strong>{service.label}</strong><small>{service.description}</small></span>
                      <span className="quote-service-trailing"><b>{money.format(servicePrice)}</b><ArrowUpRight size={15} /></span>
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
            <div className="quote-result-top"><span>Seu plano ao vivo</span><span className="quote-live"><i /> Atualizado</span></div>

            <div className="quote-plan-heading">
              <div className="quote-plan"><small>Plano sugerido</small><strong>{planName}</strong></div>
              <div className="quote-strength" style={{ "--strength": `${planStrength * 3.6}deg` } as CSSProperties}><span><strong>{planStrength}%</strong><small>potência</small></span></div>
            </div>

            <div className="quote-pipeline" aria-label="Jornada construída pelo plano">
              {pipelineStages.map((stage, index) => {
                const StageIcon = stage.icon;
                return (
                  <div className={`quote-stage ${stage.active ? "is-active" : ""}`} key={stage.label}>
                    <span><StageIcon size={15} /></span>
                    <strong>{stage.label}</strong>
                    <small>{stage.detail}</small>
                    {stage.label === "Conteúdo" && stage.active ? <span className="quote-storyboard" aria-hidden="true">{Array.from({ length: Math.min(videosPerWeek, 6) }, (_, frame) => <i key={frame} />)}</span> : null}
                    {index < pipelineStages.length - 1 ? <i /> : null}
                  </div>
                );
              })}
            </div>
            {hasAds ? <div className="quote-outcome-flow">{hasMeta ? <span><Share2 size={13} /> atenção <i>→</i> conversa</span> : null}{hasGoogle ? <span><Search size={13} /> busca <i>→</i> clique <i>→</i> oportunidade</span> : null}</div> : null}

            <div className="quote-total"><span>{hasCinematic ? "investimento inicial estimado" : "estimativa mensal"}</span><strong>{money.format(displayTotal)}<small>{hasCinematic ? " mix inicial" : "/mês"}</small></strong></div>

            <div className="quote-composition">
              <div className="quote-composition-head"><span>Composição do investimento</span><strong>{selectedBreakdown.length} {selectedBreakdown.length === 1 ? "frente" : "frentes"}</strong></div>
              {selectedBreakdown.length ? (
                <>
                  <div className="quote-budget-bar" aria-hidden="true">
                    {selectedBreakdown.map((service) => <span key={service.key} style={{ width: `${total ? (service.currentPrice / total) * 100 : 0}%`, background: quoteServiceColors[service.key] }} />)}
                  </div>
                  <div className="quote-selected-list">
                    {selectedBreakdown.map((service) => {
                      const ServiceIcon = quoteServiceIcons[service.key];
                      return (
                        <div className="quote-selected-item" key={service.key} style={{ "--service-color": quoteServiceColors[service.key] } as CSSProperties}>
                          <span className="quote-selected-icon"><ServiceIcon size={14} /></span>
                          <span><strong>{service.label}</strong><small>{service.key === "cinematic" ? "por captação" : service.key === "content" ? `${videosPerWeek} vídeos por semana` : "recorrência mensal"}</small></span>
                          <b>{money.format(service.currentPrice)}</b>
                          <button type="button" onClick={() => toggleService(service.key)} aria-label={`Remover ${service.label}`}><X size={13} /></button>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : <div className="quote-empty"><Layers3 size={18} /><span>Selecione uma frente para começar a construir o plano.</span></div>}
            </div>

            <div className="quote-insight"><Sparkles size={16} /><p>{recommendation.message}</p>{recommendation.actionKey ? <button type="button" onClick={() => toggleService(recommendation.actionKey!)}>{recommendation.actionLabel}<ArrowRight size={14} /></button> : null}</div>
            <p className="quote-disclaimer">{hasCinematic ? `A recorrência estimada fica em ${money.format(recurringTotal)}/mês. A captação entra a partir de R$ 400 por sessão.` : "Estimativa mensal inicial. O escopo final é validado com você antes de qualquer contratação."}</p>
            <a className="button button-primary quote-button" href={whatsappQuote} target="_blank" rel="noreferrer">Continuar no WhatsApp <ArrowUpRight size={17} /></a>
          </aside>
        </div>
      </div>

      <div className={`quote-mobile-bar ${quoteVisible ? "is-visible" : ""}`}>
        <div><small>Plano {planName}</small><strong>{money.format(displayTotal)}<span>{hasCinematic ? " inicial" : "/mês"}</span></strong></div>
        <button type="button" onClick={() => setMobileSummaryOpen(true)}>Ver meu plano <ArrowUpRight size={16} /></button>
      </div>

      {mobileSummaryOpen ? (
        <div className="quote-drawer-backdrop" onMouseDown={() => setMobileSummaryOpen(false)}>
          <aside className="quote-drawer" role="dialog" aria-modal="true" aria-label="Resumo do plano" onMouseDown={(event) => event.stopPropagation()}>
            <div className="quote-drawer-head"><div><small>Seu plano sugerido</small><strong>{planName}</strong></div><button type="button" onClick={() => setMobileSummaryOpen(false)} aria-label="Fechar resumo"><X size={19} /></button></div>
            <div className="quote-drawer-total"><span>{hasCinematic ? "Mix inicial" : "Estimativa mensal"}</span><strong>{money.format(displayTotal)}</strong></div>
            <div className="quote-drawer-pipeline">{pipelineStages.map((stage) => { const StageIcon = stage.icon; return <span className={stage.active ? "is-active" : ""} key={stage.label}><StageIcon size={14} />{stage.label}</span>; })}</div>
            <div className="quote-drawer-list">
              {selectedBreakdown.map((service) => { const ServiceIcon = quoteServiceIcons[service.key]; return <div key={service.key}><span><ServiceIcon size={14} /><strong>{service.label}</strong></span><b>{money.format(service.currentPrice)}</b></div>; })}
            </div>
            <div className="quote-drawer-insight"><Sparkles size={15} /><p>{recommendation.message}</p></div>
            <p className="quote-drawer-note">{hasCinematic ? `Recorrência estimada: ${money.format(recurringTotal)}/mês. Captação: a partir de R$ 400.` : "A proposta final é ajustada ao momento e às metas da sua marca."}</p>
            <a className="button button-primary" href={whatsappQuote} target="_blank" rel="noreferrer">Validar plano no WhatsApp <MessageCircle size={17} /></a>
          </aside>
        </div>
      ) : null}
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
