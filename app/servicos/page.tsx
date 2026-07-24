"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  ChevronDown,
  CircleDollarSign,
  Compass,
  Film,
  Layers3,
  MessageCircle,
  PanelTop,
  Search,
  Share2,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";

type GoalKey = "organizar" | "presenca" | "leads" | "vendas";
type ServiceKey = "positioning" | "content" | "cinematic" | "meta" | "google" | "landing";

const whatsappLink =
  "https://wa.me/5511954829186?text=Ol%C3%A1%2C%20vi%20os%20servi%C3%A7os%20da%20Up%20Clips%20e%20quero%20entender%20qual%20estrutura%20faz%20sentido%20para%20minha%20marca.";

const services = [
  {
    key: "positioning" as const,
    icon: Compass,
    category: "Estratégia",
    title: "Posicionamento estratégico",
    price: "R$ 690",
    unit: "/mês",
    summary: "Clareza sobre o que sua marca representa, para quem fala e por que deve ser escolhida.",
    bestFor: "Marcas com comunicação genérica, confusa ou inconsistente.",
    result: "Uma direção única para conteúdo, oferta, anúncios e decisões de marca.",
    deliverables: ["Mensagem e proposta de valor", "Público e diferenciais prioritários", "Direção para conteúdo e campanhas"],
    accent: "violet",
  },
  {
    key: "content" as const,
    icon: Film,
    category: "Presença",
    title: "Conteúdo com direção",
    price: "R$ 1.370",
    unit: "/mês",
    summary: "Roteiro, criação e edição para sua marca aparecer com constância e ser reconhecida.",
    bestFor: "Quem depende de postagens soltas ou não consegue sustentar uma presença.",
    result: "Quatro vídeos por semana conectados ao posicionamento e aos objetivos comerciais.",
    deliverables: ["4 vídeos por semana", "Roteiros estratégicos", "Edição e variações para os canais"],
    accent: "pink",
  },
  {
    key: "cinematic" as const,
    icon: Camera,
    category: "Produção",
    title: "Captação cinematográfica para Ads",
    price: "R$ 400",
    unit: "/captação",
    summary: "Direção, luz e enquadramento pensados para criar imagens que param o olhar.",
    bestFor: "Lançamentos, campanhas e marcas que precisam elevar a percepção de valor.",
    result: "Uma base visual forte para anúncios, Reels, Stories e múltiplos cortes.",
    deliverables: ["Direção de cena e enquadramento", "Material pensado para anúncios", "Ativos para diferentes formatos"],
    accent: "orange",
  },
  {
    key: "meta" as const,
    icon: Share2,
    category: "Aquisição",
    title: "Meta Ads",
    price: "R$ 720",
    unit: "/mês",
    summary: "Campanhas no Instagram e Facebook para gerar descoberta, demanda e conversas.",
    bestFor: "Marcas que precisam alcançar novas pessoas e acelerar a distribuição.",
    result: "Criativos, públicos e campanhas trabalhando para produzir oportunidades.",
    deliverables: ["Estrutura e gestão de campanhas", "Testes de públicos e criativos", "Otimização para conversas"],
    accent: "blue",
  },
  {
    key: "google" as const,
    icon: Search,
    category: "Aquisição",
    title: "Google Ads",
    price: "R$ 720",
    unit: "/mês",
    summary: "Sua marca diante de quem já está procurando uma solução como a sua.",
    bestFor: "Negócios com demanda de busca e intenção de contratação ou compra.",
    result: "Uma frente de aquisição baseada em procura ativa, palavras-chave e oportunidade.",
    deliverables: ["Mapeamento de buscas", "Campanhas por intenção", "Otimização de cliques e oportunidades"],
    accent: "cyan",
  },
  {
    key: "landing" as const,
    icon: PanelTop,
    category: "Conversão",
    title: "Landing page de conversão",
    price: "R$ 890",
    unit: "implantação",
    summary: "Uma página direta para transformar interesse em contato pelo WhatsApp.",
    bestFor: "Campanhas sem um destino claro ou sites que dispersam o visitante.",
    result: "Argumento, prova e chamada para ação organizados em uma única rota.",
    deliverables: ["Estrutura de oferta e argumento", "Página responsiva", "Integração com WhatsApp"],
    accent: "green",
  },
];

const goals: Array<{
  key: GoalKey;
  label: string;
  title: string;
  text: string;
  services: ServiceKey[];
  insight: string;
}> = [
  {
    key: "organizar",
    label: "Organizar a marca",
    title: "Quero ser entendido",
    text: "Minha comunicação parece genérica ou muda o tempo todo.",
    services: ["positioning", "content"],
    insight: "Começamos pela mensagem e transformamos essa direção em uma presença que o público consegue reconhecer.",
  },
  {
    key: "presenca",
    label: "Criar presença",
    title: "Quero aparecer melhor",
    text: "Preciso de consistência e de uma imagem mais profissional.",
    services: ["positioning", "content", "cinematic"],
    insight: "A estratégia define o que dizer; conteúdo e captação dão frequência e força visual para a marca ocupar espaço.",
  },
  {
    key: "leads",
    label: "Gerar leads",
    title: "Quero mais conversas",
    text: "Preciso transformar atenção em contatos reais.",
    services: ["positioning", "content", "meta", "landing"],
    insight: "Construímos a mensagem, criamos os ativos, distribuímos no Meta e conduzimos o interesse para uma página focada em contato.",
  },
  {
    key: "vendas",
    label: "Aumentar vendas",
    title: "Quero uma operação completa",
    text: "Preciso conectar presença, mídia e conversão.",
    services: ["positioning", "content", "cinematic", "meta", "google", "landing"],
    insight: "Criamos uma operação integrada para gerar descoberta, capturar intenção e reduzir a perda entre o clique e a conversa.",
  },
];

const processSteps = [
  { icon: Target, title: "Diagnóstico", text: "Entendemos o momento, os canais e o objetivo comercial." },
  { icon: Compass, title: "Direção", text: "Definimos a mensagem e as frentes que realmente precisam entrar." },
  { icon: Layers3, title: "Execução", text: "Conteúdo, captação, mídia e página trabalham com o mesmo argumento." },
  { icon: Zap, title: "Evolução", text: "Aprendemos com a resposta do público e ajustamos as prioridades." },
];

const moneyNote = "A verba investida diretamente nas plataformas de anúncio não está incluída.";

export default function ServicesPage() {
  const [selectedGoal, setSelectedGoal] = useState<GoalKey>("organizar");
  const [expandedService, setExpandedService] = useState<ServiceKey | null>(null);
  const activeGoal = goals.find((goal) => goal.key === selectedGoal) ?? goals[0];

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-services-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="services-page">
      <header className="services-nav">
        <a className="services-brand" href="/" aria-label="Up Clips — início">
          <img src="/up-clips-logo.png" alt="" width={52} height={52} />
          <span><strong>UP CLIPS</strong><small>Estratégia, criação & performance</small></span>
        </a>
        <nav aria-label="Navegação da página de serviços">
          <a href="#como-ajudamos">Como ajudamos</a>
          <a href="#servicos">Serviços</a>
          <a href="#quem-somos">Quem somos</a>
        </nav>
        <a className="services-nav-cta" href="/">Montar meu plano <ArrowUpRight size={16} /></a>
      </header>

      <section className="services-hero">
        <div className="services-hero-copy" data-services-reveal>
          <p><Sparkles size={15} /> Agência criativa e de performance</p>
          <h1>Sua marca não precisa de mais tarefas. Precisa das <em>frentes certas.</em></h1>
          <span>A Up Clips conecta estratégia, conteúdo, produção, mídia e conversão para marcas que ainda não ocupam o espaço que poderiam na internet.</span>
          <div className="services-hero-actions">
            <a className="services-primary-button" href="/">Descobrir meu plano <ArrowRight size={17} /></a>
            <a className="services-text-button" href={whatsappLink} target="_blank" rel="noreferrer">Falar com a Up Clips <ArrowUpRight size={16} /></a>
          </div>
          <div className="services-hero-signals">
            <div><b>Mensagem</b><span>para ser entendido</span></div>
            <div><b>Presença</b><span>para ser lembrado</span></div>
            <div><b>Aquisição</b><span>para ser escolhido</span></div>
          </div>
        </div>

        <div className="services-hero-visual" data-services-reveal>
          <img src="/up-clips-hero-studio.webp" alt="Ambiente de produção audiovisual da Up Clips" width={960} height={1120} />
          <div className="services-hero-frame" aria-hidden="true" />
          <div className="services-hero-tag">
            <i><Camera size={17} /></i>
            <span><small>Uma operação conectada</small><strong>Estratégia + criação + performance</strong></span>
          </div>
        </div>
      </section>

      <section className="services-help" id="como-ajudamos">
        <div className="services-section-heading" data-services-reveal>
          <p>Comece pelo seu momento</p>
          <h2>Como podemos ajudar <em>agora?</em></h2>
          <span>Escolha o resultado que mais importa. Nós mostramos quais serviços assumem um papel no caminho.</span>
        </div>

        <div className="services-goal-layout" data-services-reveal>
          <div className="services-goal-options" role="group" aria-label="Escolha seu objetivo">
            {goals.map((goal) => (
              <button
                className={selectedGoal === goal.key ? "is-selected" : ""}
                type="button"
                aria-pressed={selectedGoal === goal.key}
                key={goal.key}
                onClick={() => setSelectedGoal(goal.key)}
              >
                <span>{goal.label}</span>
                <strong>{goal.title}</strong>
                <small>{goal.text}</small>
                <ArrowRight size={17} />
              </button>
            ))}
          </div>

          <aside className="services-goal-result" aria-live="polite">
            <span>Estrutura indicada</span>
            <h3>{activeGoal.title}</h3>
            <p>{activeGoal.insight}</p>
            <div>
              {activeGoal.services.map((serviceKey) => {
                const service = services.find((item) => item.key === serviceKey);
                if (!service) return null;
                const Icon = service.icon;
                return <b key={serviceKey}><Icon size={14} /> {service.title}</b>;
              })}
            </div>
            <a href="#servicos">Entender cada serviço <ArrowRight size={16} /></a>
          </aside>
        </div>
      </section>

      <section className="services-catalog" id="servicos">
        <div className="services-section-heading" data-services-reveal>
          <p>O que fazemos</p>
          <h2>Serviços com um papel <em>claro.</em></h2>
          <span>Nenhuma frente existe apenas para “fazer marketing”. Cada serviço resolve uma parte específica da jornada entre percepção e contato.</span>
        </div>

        <div className="services-catalog-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            const expanded = expandedService === service.key;
            const recommended = activeGoal.services.includes(service.key);
            return (
              <article
                className={`services-catalog-card accent-${service.accent} ${recommended ? "is-recommended" : ""}`}
                key={service.key}
                data-services-reveal
              >
                <div className="services-card-top">
                  <span>{String(index + 1).padStart(2, "0")} · {service.category}</span>
                  {recommended ? <b><Check size={11} /> Para seu objetivo</b> : null}
                </div>
                <i className="services-card-icon"><Icon size={25} /></i>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <div className="services-card-price">
                  <small>A partir de</small>
                  <strong>{service.price}</strong>
                  <span>{service.unit}</span>
                </div>
                <button
                  className="services-card-more"
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setExpandedService(expanded ? null : service.key)}
                >
                  Ver o que está incluído <ChevronDown size={16} />
                </button>
                {expanded ? (
                  <div className="services-card-details">
                    <div><span>Indicado para</span><p>{service.bestFor}</p></div>
                    <div><span>O que muda</span><p>{service.result}</p></div>
                    <ul>
                      {service.deliverables.map((item) => <li key={item}><Check size={13} /> {item}</li>)}
                    </ul>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
        <p className="services-price-note"><CircleDollarSign size={15} /> {moneyNote}</p>
      </section>

      <section className="services-system">
        <div className="services-system-copy" data-services-reveal>
          <p>Por que funciona melhor junto</p>
          <h2>Uma operação. Não seis serviços soltos.</h2>
          <span>O posicionamento dá direção. O conteúdo e a captação transformam essa direção em ativos. A mídia distribui. A página conduz para a conversa.</span>
          <a href="/">Montar uma combinação para minha marca <ArrowRight size={17} /></a>
        </div>
        <div className="services-system-flow" data-services-reveal>
          <div><i><Compass size={21} /></i><span><b>Clareza</b><small>Mensagem e oferta</small></span></div>
          <em />
          <div><i><Film size={21} /></i><span><b>Presença</b><small>Conteúdo e imagem</small></span></div>
          <em />
          <div><i><Share2 size={21} /></i><span><b>Aquisição</b><small>Meta e Google</small></span></div>
          <em />
          <div><i><MessageCircle size={21} /></i><span><b>Conversão</b><small>Página e contato</small></span></div>
        </div>
      </section>

      <section className="services-about" id="quem-somos">
        <div className="services-about-media" data-services-reveal>
          <img src="/up-clips-cinematic-capture.webp" alt="Captação audiovisual dirigida pela Up Clips" width={900} height={1100} loading="lazy" />
          <div><Camera size={18} /><span><small>Estratégia que chega à execução</small><strong>Da ideia ao criativo no ar</strong></span></div>
        </div>
        <div className="services-about-copy" data-services-reveal>
          <p>Quem somos</p>
          <h2>A Up Clips existe para dar <em>direção</em> ao crescimento.</h2>
          <span>Somos uma agência que une estratégia, criação e performance no mesmo raciocínio. Trabalhamos principalmente com marcas e profissionais que ainda não têm um posicionamento digital forte — ou que já fazem marketing, mas parecem fragmentados.</span>
          <div className="services-principles">
            <div><b>Antes de produzir</b><span>entendemos o que a marca precisa comunicar.</span></div>
            <div><b>Antes de anunciar</b><span>criamos uma mensagem que mereça ser distribuída.</span></div>
            <div><b>Antes de escalar</b><span>organizamos o caminho até a conversa.</span></div>
          </div>
        </div>
      </section>

      <section className="services-process">
        <div className="services-section-heading" data-services-reveal>
          <p>Como trabalhamos</p>
          <h2>Você sabe o que acontece <em>depois.</em></h2>
          <span>Sem pacotes misteriosos ou uma lista de tarefas desconectadas.</span>
        </div>
        <div className="services-process-grid">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title} data-services-reveal>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i><Icon size={22} /></i>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="services-final" data-services-reveal>
        <div>
          <p>Você não precisa escolher sozinho</p>
          <h2>Conte seu momento. Nós organizamos as frentes certas.</h2>
        </div>
        <div>
          <a className="services-primary-button" href="/">Montar meu plano <ArrowRight size={17} /></a>
          <a className="services-text-button" href={whatsappLink} target="_blank" rel="noreferrer">Conversar no WhatsApp <ArrowUpRight size={16} /></a>
        </div>
      </section>

      <footer className="services-footer">
        <a className="services-brand" href="/">
          <img src="/up-clips-logo.png" alt="" width={46} height={46} />
          <span><strong>UP CLIPS</strong><small>Estratégia, criação & performance</small></span>
        </a>
        <p>Posicionamento, conteúdo, produção, tráfego e conversão.</p>
        <a href={whatsappLink} target="_blank" rel="noreferrer">São Paulo · WhatsApp <ArrowUpRight size={14} /></a>
      </footer>
    </main>
  );
}
