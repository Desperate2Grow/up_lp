"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Camera,
  Check,
  ChevronDown,
  CircleOff,
  CircleDollarSign,
  Compass,
  Film,
  Gauge,
  ImageIcon,
  Layers3,
  Lock,
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
type BillingType = "monthly" | "once";

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

const fixedServices: ServiceKey[] = ["positioning", "content"];

const serviceCatalog = {
  positioning: {
    icon: Target,
    title: "Posicionamento estratégico",
    short: "Mensagem, público e oferta na mesma direção.",
    price: 690,
    billing: "monthly" as BillingType,
    priceLabel: "/mês",
    fixed: true,
    details: "É a base que impede conteúdo e anúncios de comunicarem promessas diferentes. Organizamos a percepção que sua marca precisa construir antes de ampliar o alcance.",
    benefits: ["Direção de mensagem e oferta", "Público e diferenciais prioritários", "Critério para aprovar conteúdo e campanhas"],
  },
  content: {
    icon: Film,
    title: "Conteúdo com direção",
    short: "Estratégia, roteiro e edição de 4 vídeos por semana.",
    price: 1370,
    billing: "monthly" as BillingType,
    priceLabel: "/mês",
    fixed: true,
    details: "Transforma o posicionamento em presença recorrente. O cliente deixa de encontrar uma marca silenciosa ou inconsistente quando chega pelos anúncios ou pelas redes.",
    benefits: ["4 vídeos por semana", "Roteiros alinhados ao posicionamento", "Edição e variações para os canais"],
  },
  cinematic: {
    icon: Camera,
    title: "Captação cinematográfica para Ads",
    short: "Uma sessão dirigida para elevar o impacto dos criativos.",
    price: 400,
    billing: "once" as BillingType,
    priceLabel: "/captação",
    fixed: false,
    details: "Entra quando a velocidade ou o lançamento pede material com maior percepção de valor. A sessão gera imagens pensadas desde a origem para prender atenção e virar variações de anúncio.",
    benefits: ["Direção de cena, luz e enquadramento", "Material para anúncios e redes", "Base visual para múltiplos cortes"],
  },
  meta: {
    icon: Share2,
    title: "Meta Ads",
    short: "Descoberta, demanda e conversas pelo Instagram e Facebook.",
    price: 720,
    billing: "monthly" as BillingType,
    priceLabel: "/mês",
    fixed: false,
    details: "É indicado quando a marca precisa gerar demanda, alcançar novos públicos e transformar criativos em conversas. A gestão conecta mensagem, segmentação e testes.",
    benefits: ["Estrutura e gestão de campanhas", "Testes de públicos e criativos", "Otimização para conversas e oportunidades"],
  },
  google: {
    icon: Search,
    title: "Google Ads",
    short: "Presença diante de quem já procura uma solução.",
    price: 720,
    billing: "monthly" as BillingType,
    priceLabel: "/mês",
    fixed: false,
    details: "Entra quando já existe intenção de busca ou uma estrutura que pode converter essa procura. Complementa o Meta capturando demanda ativa, em vez de depender apenas da descoberta.",
    benefits: ["Mapeamento de buscas relevantes", "Campanhas por intenção", "Otimização de cliques e oportunidades"],
  },
  conversion: {
    icon: PanelTop,
    title: "Landing page de conversão",
    short: "Uma rota direta entre o interesse e o contato.",
    price: 890,
    billing: "once" as BillingType,
    priceLabel: "implantação",
    fixed: false,
    details: "É recomendada quando os anúncios não têm um destino claro. A página concentra argumento, prova e chamada para ação para reduzir a perda entre o clique e o WhatsApp.",
    benefits: ["Estrutura de argumento e oferta", "Página responsiva focada em conversão", "Integração direta com o WhatsApp"],
  },
} satisfies Record<ServiceKey, {
  icon: typeof Target;
  title: string;
  short: string;
  price: number;
  billing: BillingType;
  priceLabel: string;
  fixed: boolean;
  details: string;
  benefits: string[];
}>;

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

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
  const services = new Set<ServiceKey>(fixedServices);
  const reasons: Partial<Record<ServiceKey, string>> = {};

  reasons.positioning = agency === "agency"
    ? "Cria um norte compartilhado para complementar sua agência atual sem duplicar esforços ou enfraquecer a mensagem."
    : noPresence
      ? "Antes dos canais, sua marca precisa de uma mensagem que organize todas as decisões."
      : "Alinha o que já existe para sua marca ser reconhecida pela mesma ideia em todos os pontos.";

  reasons.content = hasSocial
    ? "Transforma seus canais atuais em uma presença coerente, recorrente e reconhecível."
    : noPresence
      ? "Cria os primeiros sinais de presença para sua marca começar a ocupar espaço."
      : "Mantém a mensagem viva e dá aos anúncios uma presença confiável para onde conduzir o público.";

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
  const [expandedService, setExpandedService] = useState<ServiceKey | null>(null);
  const [displayTotal, setDisplayTotal] = useState(0);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const displayTotalRef = useRef(0);

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
    setExpandedService(null);
    scheduleStep(0);
  };

  const toggleCustomService = (service: ServiceKey) => {
    if (fixedServices.includes(service)) return;
    setCustomServices((current) => current.includes(service)
      ? current.filter((item) => item !== service)
      : [...current, service]);
  };

  const visibleServices = customMode
    ? Array.from(new Set<ServiceKey>([...fixedServices, ...customServices]))
    : recommendation.services;
  const recurringTotal = visibleServices.reduce((total, service) => (
    serviceCatalog[service].billing === "monthly" ? total + serviceCatalog[service].price : total
  ), 0);
  const oneTimeTotal = visibleServices.reduce((total, service) => (
    serviceCatalog[service].billing === "once" ? total + serviceCatalog[service].price : total
  ), 0);
  const firstMonthTotal = recurringTotal + oneTimeTotal;
  const planServices = customMode
    ? Object.keys(serviceCatalog) as ServiceKey[]
    : recommendation.services;
  const optionalServiceCount = visibleServices.filter((service) => !serviceCatalog[service].fixed).length;
  const selectedChannelLabels = channels.map((channel) => channelLabels[channel]).join(", ");
  const selectedServiceLabels = visibleServices.map((service) => serviceCatalog[service].title).join(", ");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      displayTotalRef.current = firstMonthTotal;
      setDisplayTotal(firstMonthTotal);
      return;
    }

    const initialValue = displayTotalRef.current;
    const difference = firstMonthTotal - initialValue;
    let startedAt: number | null = null;
    let animationFrame = 0;
    const animateTotal = (timestamp: number) => {
      if (startedAt === null) startedAt = timestamp;
      const progressValue = Math.min((timestamp - startedAt) / 720, 1);
      const easedProgress = 1 - Math.pow(1 - progressValue, 3);
      const nextValue = Math.round(initialValue + difference * easedProgress);
      displayTotalRef.current = nextValue;
      setDisplayTotal(nextValue);
      if (progressValue < 1) animationFrame = requestAnimationFrame(animateTotal);
    };
    animationFrame = requestAnimationFrame(animateTotal);
    return () => cancelAnimationFrame(animationFrame);
  }, [firstMonthTotal]);

  const whatsappMessage = `https://wa.me/5511954829186?text=${encodeURIComponent(
    `Olá, Up Clips! Montei o plano ${recommendation.name} pelo site. Cenário: ${agency ? agencyLabels[agency] : "a definir"}. Canais atuais: ${selectedChannelLabels || "nenhum"}. Objetivo: ${goal ? goalLabels[goal] : "a definir"}. Serviços: ${selectedServiceLabels}. Investimento estimado no primeiro mês: ${money.format(firstMonthTotal)}; recorrência a partir do segundo mês: ${money.format(recurringTotal)}/mês. Quero validar o escopo e os próximos passos.`,
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

      <section className={`journey-stage ${step === 4 ? "is-result" : ""}`}>
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
                <p><Sparkles size={15} /> {customMode ? "Personalize os complementos" : recommendation.eyebrow}</p>
                <h1>{customMode ? "A base está pronta. Escolha como acelerar." : recommendation.name}</h1>
                <span>{customMode ? "Posicionamento e conteúdo formam o núcleo fixo. Você decide quais frentes entram para aquisição e conversão." : recommendation.summary}</span>
                <div className="answer-chips">
                  <b>{agency ? agencyLabels[agency] : "Cenário inicial"}</b>
                  <b>{goal ? goalLabels[goal] : "Objetivo definido"}</b>
                  <b>{pace === "accelerate" ? "ritmo acelerado" : pace === "constant" ? "ritmo constante" : "começo essencial"}</b>
                </div>
              </div>

              <section className="plan-investment-hero" aria-label="Investimento estimado">
                <div className="plan-investment-lead">
                  <span><CircleDollarSign size={16} /> Investimento estimado</span>
                  <strong>{money.format(displayTotal)}</strong>
                  <small>no primeiro mês</small>
                  <p>Um plano fechado para o seu momento, com base fixa e somente os complementos que fazem sentido agora.</p>
                </div>
                <div className="plan-investment-metrics">
                  <div>
                    <span>A partir do 2º mês</span>
                    <strong>{money.format(recurringTotal)}<small>/mês</small></strong>
                  </div>
                  <div>
                    <span>Entradas pontuais</span>
                    <strong>{oneTimeTotal ? money.format(oneTimeTotal) : "Nenhuma"}</strong>
                  </div>
                  <div>
                    <span>Estrutura do plano</span>
                    <strong>2 fixos + {optionalServiceCount} {optionalServiceCount === 1 ? "complemento" : "complementos"}</strong>
                  </div>
                </div>
              </section>

              <section className="plan-flow">
                <div className="plan-flow-heading">
                  <span>A ordem tem um motivo</span>
                  <h2>Da clareza até a conversa.</h2>
                  <p>Abra cada etapa para entender por que ela entrou no seu plano neste momento.</p>
                </div>

                <div className="plan-sequence" aria-label="Caminho estratégico do plano">
                  <i className="is-active"><Compass size={16} /><span><b>Clareza</b><small>o que dizer</small></span></i>
                  <em />
                  <i className="is-active"><Film size={16} /><span><b>Presença</b><small>como aparecer</small></span></i>
                  <em />
                  <i className={visibleServices.some((service) => ["meta", "google", "cinematic"].includes(service)) ? "is-active" : ""}><TrendingUp size={16} /><span><b>Aquisição</b><small>quem alcançar</small></span></i>
                  <em />
                  <i className={visibleServices.includes("conversion") || visibleServices.some((service) => ["meta", "google"].includes(service)) ? "is-active" : ""}><MessageCircle size={16} /><span><b>Conversa</b><small>onde converter</small></span></i>
                </div>

                <div className={`plan-service-stack ${customMode ? "is-custom" : ""}`}>
                  {planServices.map((serviceKey, index) => {
                    const service = serviceCatalog[serviceKey];
                    const Icon = service.icon;
                    const selected = visibleServices.includes(serviceKey);
                    const expanded = expandedService === serviceKey;
                    const momentReason = recommendation.reasons[serviceKey]
                      ?? (selected && customMode && !service.fixed
                        ? "Você adicionou esta frente para ampliar o plano além da recomendação inicial."
                        : !selected
                          ? "Esta frente não apareceu como prioridade pelas suas respostas, mas pode ser adicionada se já existir uma necessidade específica."
                          : service.short);
                    return (
                      <article className={`plan-service-card ${selected ? "is-selected" : "is-muted"} ${service.fixed ? "is-fixed" : ""}`} key={serviceKey}>
                        <div className="plan-service-rail" aria-hidden="true">
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <i />
                        </div>
                        <div className="plan-service-main">
                          <div className="plan-service-top">
                            <i className="plan-service-icon"><Icon size={22} /></i>
                            <div>
                              <div className="plan-service-badges">
                                <span>{service.fixed ? <><Lock size={11} /> Base fixa</> : selected ? "Recomendado agora" : "Complemento opcional"}</span>
                              </div>
                              <h3>{service.title}</h3>
                            </div>
                            <div className="plan-service-price">
                              <strong>{money.format(service.price)}</strong>
                              <small>{service.priceLabel}</small>
                            </div>
                          </div>

                          <p className="plan-service-summary">{momentReason}</p>

                          <div className="plan-service-controls">
                            {customMode && !service.fixed ? (
                              <button className={`plan-service-toggle ${selected ? "is-selected" : ""}`} type="button" aria-pressed={selected} onClick={() => toggleCustomService(serviceKey)}>
                                {selected ? <><Check size={14} /> Incluído no plano</> : "Adicionar ao plano"}
                              </button>
                            ) : service.fixed ? (
                              <span className="plan-fixed-note"><Lock size={12} /> Essencial em todos os planos</span>
                            ) : null}
                            <button className="plan-service-more" type="button" aria-expanded={expanded} onClick={() => setExpandedService(expanded ? null : serviceKey)}>
                              Por que preciso disso agora? <ChevronDown size={15} />
                            </button>
                          </div>

                          {expanded ? (
                            <div className="plan-service-details">
                              <div>
                                <span>Por que entrou no seu plano</span>
                                <p>{momentReason}</p>
                              </div>
                              <div>
                                <span>Como este serviço agrega</span>
                                <p>{service.details}</p>
                              </div>
                              <ul>
                                {service.benefits.map((benefit) => <li key={benefit}><Check size={13} /> {benefit}</li>)}
                              </ul>
                            </div>
                          ) : null}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>

              <aside className="result-actions">
                <div className="result-summary-head">
                  <span>Resumo do investimento</span>
                  <strong>{money.format(firstMonthTotal)}</strong>
                  <small>primeiro mês</small>
                </div>
                <div className="result-price-breakdown">
                  <div><span>Recorrência mensal</span><b>{money.format(recurringTotal)}</b></div>
                  <div><span>Implantações e captações</span><b>{money.format(oneTimeTotal)}</b></div>
                  <div><span>Serviços incluídos</span><b>{visibleServices.length}</b></div>
                </div>
                <p className="result-investment-note">Valores estimados para o escopo apresentado. A verba investida diretamente no Meta ou Google não está inclusa.</p>
                <a className="result-whatsapp" href={whatsappMessage} target="_blank" rel="noreferrer">
                  Levar meu plano para o WhatsApp <ArrowUpRight size={18} />
                </a>
                {!customMode ? (
                  <button className="result-customize" type="button" onClick={() => setCustomMode(true)}>
                    <SlidersHorizontal size={17} /> Personalizar complementos
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
