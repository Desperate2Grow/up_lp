"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Camera,
  Check,
  CircleOff,
  Compass,
  Film,
  Gauge,
  ImageIcon,
  Layers3,
  MessageCircle,
  Music2,
  PanelTop,
  Rocket,
  RotateCcw,
  Search,
  Share2,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  Users,
  PlayCircle,
  Zap,
} from "lucide-react";

type AgencyKey = "none" | "internal" | "freelancer" | "agency";
type ChannelKey = "instagram" | "tiktok" | "youtube" | "landing" | "ecommerce" | "none";
type GoalKey = "positioning" | "consistency" | "conversations" | "sales" | "launch";
type PaceKey = "essential" | "constant" | "accelerate";
type ServiceKey = "positioning" | "content" | "cinematic" | "meta" | "google" | "conversion";

type Recommendation = {
  name: string;
  eyebrow: string;
  summary: string;
  services: ServiceKey[];
  reasons: Partial<Record<ServiceKey, string>>;
};

const agencyOptions = [
  { key: "none" as const, icon: CircleOff, title: "Ainda não tenho", text: "Quero começar com direção, sem desperdiçar energia." },
  { key: "internal" as const, icon: Users, title: "Eu ou minha equipe", text: "Já fazemos algumas coisas, mas falta um sistema claro." },
  { key: "freelancer" as const, icon: UserRound, title: "Tenho freelancer", text: "Existe execução, mas preciso conectar as frentes." },
  { key: "agency" as const, icon: Building2, title: "Já tenho agência", text: "Quero complementar o que já existe e acelerar resultados." },
];

const channelOptions = [
  { key: "instagram" as const, icon: ImageIcon, title: "Instagram", text: "Conteúdo, comunidade e anúncios." },
  { key: "tiktok" as const, icon: Music2, title: "TikTok", text: "Descoberta e conteúdo de alcance." },
  { key: "youtube" as const, icon: PlayCircle, title: "YouTube", text: "Autoridade e conteúdo de profundidade." },
  { key: "landing" as const, icon: PanelTop, title: "Landing page", text: "Uma rota direta para conversão." },
  { key: "ecommerce" as const, icon: ShoppingBag, title: "E-commerce", text: "Uma operação pronta para vender." },
  { key: "none" as const, icon: CircleOff, title: "Ainda não tenho", text: "Preciso construir minha presença do início." },
];

const goalOptions = [
  { key: "positioning" as const, icon: Compass, title: "Organizar meu posicionamento", text: "Ser entendido antes de tentar vender mais." },
  { key: "consistency" as const, icon: Sparkles, title: "Ter presença consistente", text: "Parar de aparecer só quando sobra tempo." },
  { key: "conversations" as const, icon: MessageCircle, title: "Gerar mais conversas", text: "Transformar atenção em contatos reais." },
  { key: "sales" as const, icon: TrendingUp, title: "Vender mais", text: "Conectar mídia, oferta e conversão." },
  { key: "launch" as const, icon: Rocket, title: "Lançar algo novo", text: "Criar impacto e velocidade desde o primeiro dia." },
];

const paceOptions = [
  { key: "essential" as const, icon: Gauge, title: "Começar pelo essencial", text: "Uma base enxuta, com as prioridades certas." },
  { key: "constant" as const, icon: Layers3, title: "Construir com constância", text: "Um sistema recorrente para crescer com clareza." },
  { key: "accelerate" as const, icon: Zap, title: "Acelerar agora", text: "Mais frentes trabalhando juntas desde o início." },
];

const serviceCatalog = {
  positioning: { icon: Target, title: "Posicionamento estratégico", short: "Mensagem, público e oferta na mesma direção." },
  content: { icon: Film, title: "Conteúdo com direção", short: "Uma presença reconhecível, não apenas mais posts." },
  cinematic: { icon: Camera, title: "Captação cinematográfica", short: "Ativos de maior impacto para conteúdo e anúncios." },
  meta: { icon: Share2, title: "Meta Ads", short: "Descoberta, demanda e conversas pelo Instagram e Facebook." },
  google: { icon: Search, title: "Google Ads", short: "Presença diante de quem já procura uma solução." },
  conversion: { icon: PanelTop, title: "Estrutura de conversão", short: "Uma rota clara entre o interesse e o contato." },
} satisfies Record<ServiceKey, { icon: typeof Target; title: string; short: string }>;

const agencyLabels: Record<AgencyKey, string> = {
  none: "sem agência",
  internal: "com operação interna",
  freelancer: "com apoio freelancer",
  agency: "com uma agência atual",
};

const channelLabels: Record<ChannelKey, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  landing: "Landing page",
  ecommerce: "E-commerce",
  none: "Sem canais estruturados",
};

const goalLabels: Record<GoalKey, string> = {
  positioning: "clareza de posicionamento",
  consistency: "presença consistente",
  conversations: "mais conversas",
  sales: "mais vendas",
  launch: "um novo lançamento",
};

function createRecommendation(
  agency: AgencyKey,
  channels: ChannelKey[],
  goal: GoalKey,
  pace: PaceKey,
): Recommendation {
  const noPresence = channels.includes("none");
  const hasSocial = channels.some((channel) => ["instagram", "tiktok", "youtube"].includes(channel));
  const hasConversion = channels.some((channel) => ["landing", "ecommerce"].includes(channel));
  const services = new Set<ServiceKey>();
  const reasons: Partial<Record<ServiceKey, string>> = {};

  if (noPresence || goal === "positioning" || agency === "none") {
    services.add("positioning");
    reasons.positioning = noPresence
      ? "Antes dos canais, sua marca precisa de uma mensagem que organize todas as decisões."
      : "Alinha o que já existe para sua marca ser reconhecida pela mesma ideia em todos os pontos.";
  }

  if (noPresence || hasSocial || goal === "consistency" || goal === "launch") {
    services.add("content");
    reasons.content = hasSocial
      ? "Transforma seus canais atuais em uma presença coerente, recorrente e reconhecível."
      : "Cria os primeiros sinais de presença para sua marca começar a ocupar espaço.";
  }

  if (goal === "conversations" || goal === "sales" || goal === "launch" || hasSocial) {
    services.add("meta");
    reasons.meta = goal === "conversations"
      ? "Coloca sua mensagem diante de pessoas com potencial para iniciar uma conversa."
      : "Amplifica os criativos e acelera a descoberta da sua oferta.";
  }

  if (hasConversion || goal === "sales") {
    services.add("google");
    reasons.google = hasConversion
      ? "Aproveita sua estrutura atual para capturar pessoas que já demonstram intenção."
      : "Abre uma frente para encontrar demanda ativa, não apenas gerar descoberta.";
  }

  if (!hasConversion && ["conversations", "sales", "launch"].includes(goal)) {
    services.add("conversion");
    reasons.conversion = "Evita perder atenção ao criar um caminho simples entre o anúncio e o contato.";
  }

  if (goal === "launch" || pace === "accelerate") {
    services.add("cinematic");
    reasons.cinematic = "Cria material com maior percepção de valor para sustentar anúncios e lançamentos.";
  }

  if (!services.size) {
    services.add("positioning");
    services.add("content");
    reasons.positioning = "Dá clareza para sua marca crescer sem comunicar ideias desconectadas.";
    reasons.content = "Transforma essa clareza em uma presença que o mercado consegue reconhecer.";
  }

  let name = "Presença que Converte";
  if (noPresence) name = "Fundação Digital";
  if (goal === "launch") name = "Lançamento com Impacto";
  else if (goal === "sales" && hasConversion) name = "Aquisição Integrada";
  else if (pace === "accelerate") name = "Escala Multicanal";

  const agencyContext = agency === "agency"
    ? "complementa sua agência atual sem duplicar esforços"
    : agency === "none"
      ? "constrói uma base antes de acelerar a mídia"
      : "organiza a operação que você já começou";

  return {
    name,
    eyebrow: agency === "agency" ? "Plano complementar sugerido" : "Plano sugerido para o seu momento",
    summary: `Uma estrutura que ${agencyContext} e conecta as frentes necessárias para buscar ${goalLabels[goal]}.`,
    services: Array.from(services),
    reasons,
  };
}

export default function JourneyHome() {
  const [introVisible, setIntroVisible] = useState(true);
  const [step, setStep] = useState(0);
  const [agency, setAgency] = useState<AgencyKey | null>(null);
  const [channels, setChannels] = useState<ChannelKey[]>([]);
  const [goal, setGoal] = useState<GoalKey | null>(null);
  const [pace, setPace] = useState<PaceKey | null>(null);
  const [leaving, setLeaving] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const [customServices, setCustomServices] = useState<ServiceKey[]>([]);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const introTimer = window.setTimeout(() => setIntroVisible(false), 3100);
    return () => window.clearTimeout(introTimer);
  }, []);

  useEffect(() => () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
  }, []);

  const recommendation = useMemo(
    () => createRecommendation(
      agency ?? "none",
      channels.length ? channels : ["none"],
      goal ?? "positioning",
      pace ?? "essential",
    ),
    [agency, channels, goal, pace],
  );

  const scheduleStep = (nextStep: number) => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setLeaving(true);
    advanceTimer.current = setTimeout(() => {
      setStep(nextStep);
      setLeaving(false);
    }, 240);
  };

  const chooseAgency = (value: AgencyKey) => {
    setAgency(value);
    scheduleStep(1);
  };

  const toggleChannel = (value: ChannelKey) => {
    setChannels((current) => {
      if (value === "none") return current.includes("none") ? [] : ["none"];
      const withoutNone = current.filter((channel) => channel !== "none");
      return withoutNone.includes(value)
        ? withoutNone.filter((channel) => channel !== value)
        : [...withoutNone, value];
    });
  };

  const chooseGoal = (value: GoalKey) => {
    setGoal(value);
    scheduleStep(3);
  };

  const choosePace = (value: PaceKey) => {
    setPace(value);
    const plan = createRecommendation(agency ?? "none", channels.length ? channels : ["none"], goal ?? "positioning", value);
    setCustomServices(plan.services);
    setCustomMode(false);
    scheduleStep(4);
  };

  const goBack = () => {
    if (customMode) {
      setCustomMode(false);
      return;
    }
    if (step > 0) scheduleStep(step - 1);
  };

  const restart = () => {
    setAgency(null);
    setChannels([]);
    setGoal(null);
    setPace(null);
    setCustomMode(false);
    setCustomServices([]);
    scheduleStep(0);
  };

  const toggleCustomService = (service: ServiceKey) => {
    setCustomServices((current) => current.includes(service)
      ? current.filter((item) => item !== service)
      : [...current, service]);
  };

  const visibleServices = customMode ? customServices : recommendation.services;
  const selectedChannelLabels = channels.map((channel) => channelLabels[channel]).join(", ");
  const selectedServiceLabels = visibleServices.map((service) => serviceCatalog[service].title).join(", ");
  const whatsappMessage = `https://wa.me/5511954829186?text=${encodeURIComponent(
    `Olá, Up Clips! Montei meu plano pelo site. Cenário: ${agency ? agencyLabels[agency] : "a definir"}. Canais atuais: ${selectedChannelLabels || "nenhum"}. Objetivo: ${goal ? goalLabels[goal] : "a definir"}. Plano: ${selectedServiceLabels || "quero começar do zero"}. Quero conversar sobre os próximos passos.`,
  )}`;

  const progress = Math.min(step, 4) * 25;

  return (
    <main className="journey-shell">
      {introVisible ? (
        <div className="brand-intro" role="dialog" aria-label="Apresentação Up Clips">
          <button type="button" onClick={() => setIntroVisible(false)}>Pular</button>
          <div className="brand-intro-lockup">
            <div className="brand-intro-mark"><img src="/up-clips-logo.png" alt="" width={420} height={420} /></div>
            <div className="brand-intro-copy">
              <strong>UP CLIPS</strong>
              <span>Estratégia, criação & performance</span>
            </div>
          </div>
        </div>
      ) : null}

      <header className="journey-header">
        <a className="journey-brand" href="/" aria-label="Up Clips - início">
          <img src="/up-clips-logo.png" alt="" width={46} height={46} />
          <strong>UP CLIPS</strong>
        </a>
        <a className="journey-services-link" href="/servicos">
          <span>Sobre nossos serviços</span>
          <ArrowUpRight size={17} />
        </a>
      </header>

      <div className="journey-progress" aria-label={`Progresso: ${progress}%`}>
        <div><span style={{ width: `${progress}%` }} /></div>
        <small>{step < 4 ? `Etapa ${step + 1} de 4` : "Seu plano"}</small>
      </div>

      <section className="journey-stage">
        <div className={`journey-step ${leaving ? "is-leaving" : ""}`} key={step}>
          {step < 4 ? (
            <div className="journey-step-top">
              {step > 0 ? <button className="journey-back" type="button" onClick={goBack}><ArrowLeft size={17} /> Voltar</button> : <span />}
              <span>Responda apenas tocando nas opções</span>
            </div>
          ) : null}

          {step === 0 ? (
            <div className="journey-question">
              <div className="journey-heading">
                <p>Vamos entender seu ponto de partida</p>
                <h1>Hoje, quem cuida do seu <em>marketing?</em></h1>
                <span>Isso muda a forma como o plano deve entrar na sua operação.</span>
              </div>
              <div className="journey-choice-grid agency-grid">
                {agencyOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button className={agency === option.key ? "is-selected" : ""} type="button" key={option.key} onClick={() => chooseAgency(option.key)}>
                      <i><Icon size={22} /></i>
                      <strong>{option.title}</strong>
                      <span>{option.text}</span>
                      <ArrowRight className="choice-arrow" size={18} />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="journey-question">
              <div className="journey-heading">
                <p>Seus pontos de contato</p>
                <h1>Onde sua marca já <em>encontra pessoas?</em></h1>
                <span>Escolha todas as opções que já fazem parte da sua operação.</span>
              </div>
              <div className="journey-choice-grid channel-grid">
                {channelOptions.map((option) => {
                  const Icon = option.icon;
                  const selected = channels.includes(option.key);
                  return (
                    <button className={selected ? "is-selected" : ""} type="button" aria-pressed={selected} key={option.key} onClick={() => toggleChannel(option.key)}>
                      <i><Icon size={21} /></i>
                      <strong>{option.title}</strong>
                      <span>{option.text}</span>
                      <b>{selected ? <Check size={15} /> : null}</b>
                    </button>
                  );
                })}
              </div>
              <button className="journey-continue" type="button" disabled={!channels.length} onClick={() => scheduleStep(2)}>
                Continuar com {channels.length} {channels.length === 1 ? "escolha" : "escolhas"} <ArrowRight size={17} />
              </button>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="journey-question">
              <div className="journey-heading">
                <p>A transformação que importa</p>
                <h1>O que precisa acontecer <em>agora?</em></h1>
                <span>Vamos usar essa resposta para ordenar as prioridades do plano.</span>
              </div>
              <div className="journey-choice-grid goal-grid">
                {goalOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button className={goal === option.key ? "is-selected" : ""} type="button" key={option.key} onClick={() => chooseGoal(option.key)}>
                      <i><Icon size={22} /></i>
                      <strong>{option.title}</strong>
                      <span>{option.text}</span>
                      <ArrowRight className="choice-arrow" size={18} />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="journey-question pace-question">
              <div className="journey-heading">
                <p>O ritmo do plano</p>
                <h1>Como você quer começar essa <em>mudança?</em></h1>
                <span>Não existe resposta certa. Existe o ritmo que faz sentido para você.</span>
              </div>
              <div className="journey-choice-grid pace-grid">
                {paceOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button className={pace === option.key ? "is-selected" : ""} type="button" key={option.key} onClick={() => choosePace(option.key)}>
                      <i><Icon size={24} /></i>
                      <strong>{option.title}</strong>
                      <span>{option.text}</span>
                      <ArrowRight className="choice-arrow" size={18} />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="journey-result">
              <div className="result-heading">
                <button className="journey-back" type="button" onClick={goBack}><ArrowLeft size={17} /> {customMode ? "Voltar à recomendação" : "Revisar respostas"}</button>
                <p><Sparkles size={15} /> {customMode ? "Monte sua própria estrutura" : recommendation.eyebrow}</p>
                <h1>{customMode ? "Seu plano, do seu jeito." : recommendation.name}</h1>
                <span>{customMode ? "Ative somente as frentes que você quer levar para a conversa." : recommendation.summary}</span>
                <div className="answer-chips">
                  <b>{agency ? agencyLabels[agency] : "Cenário inicial"}</b>
                  <b>{goal ? goalLabels[goal] : "Objetivo definido"}</b>
                  <b>{pace === "accelerate" ? "ritmo acelerado" : pace === "constant" ? "ritmo constante" : "começo essencial"}</b>
                </div>
              </div>

              <div className={`plan-service-grid ${customMode ? "is-custom" : ""}`}>
                {(customMode ? Object.keys(serviceCatalog) as ServiceKey[] : recommendation.services).map((serviceKey, index) => {
                  const service = serviceCatalog[serviceKey];
                  const Icon = service.icon;
                  const selected = customServices.includes(serviceKey);
                  return customMode ? (
                    <button className={selected ? "is-selected" : ""} type="button" aria-pressed={selected} key={serviceKey} onClick={() => toggleCustomService(serviceKey)}>
                      <span className="plan-service-index">{String(index + 1).padStart(2, "0")}</span>
                      <i><Icon size={22} /></i>
                      <strong>{service.title}</strong>
                      <p>{service.short}</p>
                      <b>{selected ? <Check size={16} /> : null}</b>
                    </button>
                  ) : (
                    <article key={serviceKey}>
                      <span className="plan-service-index">{String(index + 1).padStart(2, "0")}</span>
                      <i><Icon size={22} /></i>
                      <strong>{service.title}</strong>
                      <p>{recommendation.reasons[serviceKey] ?? service.short}</p>
                    </article>
                  );
                })}
              </div>

              <aside className="result-actions">
                <div className="result-path">
                  <span>Seu caminho</span>
                  <div>
                    <i className="is-active"><Compass size={15} /><small>Clareza</small></i>
                    <b />
                    <i className={visibleServices.some((service) => ["content", "cinematic"].includes(service)) ? "is-active" : ""}><Film size={15} /><small>Presença</small></i>
                    <b />
                    <i className={visibleServices.some((service) => ["meta", "google"].includes(service)) ? "is-active" : ""}><TrendingUp size={15} /><small>Aquisição</small></i>
                    <b />
                    <i className={visibleServices.length ? "is-active" : ""}><MessageCircle size={15} /><small>Conversa</small></i>
                  </div>
                </div>
                <a className={`result-whatsapp ${!visibleServices.length ? "is-disabled" : ""}`} href={visibleServices.length ? whatsappMessage : undefined} target="_blank" rel="noreferrer" aria-disabled={!visibleServices.length}>
                  Levar meu plano para o WhatsApp <ArrowUpRight size={18} />
                </a>
                {!customMode ? (
                  <button className="result-customize" type="button" onClick={() => setCustomMode(true)}>
                    <SlidersHorizontal size={17} /> Prefiro personalizar do zero
                  </button>
                ) : (
                  <button className="result-customize" type="button" onClick={() => setCustomServices(recommendation.services)}>
                    <RotateCcw size={16} /> Restaurar recomendação
                  </button>
                )}
                <button className="result-restart" type="button" onClick={restart}><RotateCcw size={14} /> Refazer jornada</button>
              </aside>
            </div>
          ) : null}
        </div>
      </section>

      <footer className="journey-footer">
        <span>Up Clips © 2026</span>
        <a href="/servicos">Conhecer nosso método <ArrowUpRight size={13} /></a>
      </footer>
    </main>
  );
}
