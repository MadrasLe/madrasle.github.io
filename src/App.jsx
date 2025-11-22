import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { Brain, ChartColumn, Check, ChevronDown, Copy, Cpu, Github, Loader, Milestone, Network } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for classes
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Assets (Placeholders - assuming they exist in public/assets or similar) ---
const GTLM_LOGO = "/assets/GTLM-DBZW7LFu.png";
const LOSS_CURVE = "/assets/Code_Generated_Image(1)-nTJFZKJm.png";
const HEATMAP = "/assets/transferir-B78NkTW3.png";
const TOKEN_ACTIVATION = "/assets/learn-QEr3O0tx.png";
const EXPERT_LOAD = "/assets/transferir(1)-CIAiLE57.png";
const INFERENCE_EXAMPLE = "/assets/ptlm-inference-DvMW_lrV.png";
const CONTEXT_GRAPH = "/assets/long-context-graph-C8yjayzq.png";

// --- Components ---

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        {
          "bg-primary text-primary-foreground shadow hover:bg-primary/90": variant === "default" || !variant,
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90": variant === "destructive",
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground": variant === "outline",
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80": variant === "secondary",
          "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
          "text-primary underline-offset-4 hover:underline": variant === "link",
          "h-9 px-4 py-2": size === "default" || !size,
          "h-8 rounded-md px-3 text-xs": size === "sm",
          "h-10 rounded-md px-8": size === "lg",
          "h-9 w-9": size === "icon",
        },
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

// --- Articles Data ---
const ARTICLES = {
  1: {
    id: 1,
    titulo: "Pesquisa em Long Context: O Gargalo e a Oportunidade do Futuro dos Transformers",
    resumo: "Uma análise sobre o desafio do aumento de contexto em modelos de linguagem, seus custos computacionais e o futuro da arquitetura Transformer.",
    conteudo: (
      <>
        <h2>Introdução</h2>
        <p>
          O aumento do <strong>contexto</strong> — isto é, a quantidade de tokens que um modelo pode processar de uma só vez — tornou-se um dos grandes desafios da pesquisa em modelos de linguagem. Paradoxalmente, ele é ao mesmo tempo o <strong>maior gargalo de custo computacional</strong> e, ironicamente, a <strong>principal vantagem competitiva</strong> dos Transformers frente às arquiteturas sequenciais clássicas, como RNNs e LSTMs.
        </p>
        <p>
          Enquanto modelos sequenciais processam tokens de forma natural em séries temporais, os Transformers carregam consigo o peso da <strong>atenção quadrática</strong>: o custo de computação não cresce linearmente, mas sim de forma <strong>quadrática</strong> em relação ao tamanho do contexto. Em outras palavras, dobrar o contexto de 2048 para 4096 não significa dobrar o custo, mas multiplicá-lo por muito mais.
        </p>
        <figure className="article-image-container">
          <img src={CONTEXT_GRAPH} alt="Gráfico comparando custo quadrático vs. custo linear de atenção" />
          <figcaption>Visualização do custo computacional: a atenção quadrática (vermelho) cresce exponencialmente com o tamanho do contexto, enquanto soluções lineares (azul) escalam de forma sustentável.</figcaption>
        </figure>
        <p>
          Esse é o motivo pelo qual a pesquisa em <strong>Long Context</strong> é tão estratégica: encontrar maneiras de mitigar o custo quadrático da atenção, aumentando a eficiência e expandindo o que um modelo pode compreender de uma vez só.
        </p>
        <h2>Atacando o Custo Quadrático da Atenção</h2>
        <p>Diversas técnicas vêm sendo propostas para enfrentar o problema:</p>
        <ul>
          <li><strong>Atenção Linear:</strong> reformular os cálculos de atenção para reduzir sua complexidade, em vez de O(n²), buscar aproximações próximas a O(n).</li>
          <li><strong>SSMs (State Space Models):</strong> uma renovação das antigas RNNs/LSTMs, que processam sequências de forma linear e já demonstraram competir em algumas tarefas.</li>
          <li><strong>Soluções Híbridas:</strong> misturar a eficiência de arquiteturas lineares com a expressividade dos Transformers, tentando capturar o melhor dos dois mundos.</li>
        </ul>
        <p>
          No entanto, os modelos não-Transformers ainda apresentam dificuldades em superar consistentemente a performance dos Transformers padrão em benchmarks gerais. O desafio não é apenas reduzir custo, mas <strong>fazer isso sem sacrificar qualidade</strong>.
        </p>
        <h2>O Caso do Ada-Thunderbolt I</h2>
        <p>
          Na GTLM Research, desenvolvemos e testamos a arquitetura <strong>Ada-Thunderbolt I</strong>, projetada especificamente para atacar o problema do <strong>custo computacional em contextos longos</strong>.
        </p>
        <p>
          Diferente de abordagens puramente lineares, o Thunderbolt reorganiza o funcionamento das cabeças de atenção e o cálculo das projeções QKV, otimizando também o gerenciamento de cache KV. Essa estratégia permite que o modelo escale seu contexto de forma quase linear, mesmo mantendo o custo da atenção tradicional.
        </p>
        <h3>Resultados Experimentais</h3>
        <ul>
          <li><strong>Escala Extrema:</strong> o Ada-Thunderbolt I alcançou <strong>100k de contexto máximo</strong> em uma única GPU A100 80GB em um modelo MoE de 1.5B (300M ativos).</li>
          <li><strong>Eficiência em Hardware Limitado:</strong> em uma A100 40GB, o mesmo modelo atingiu <strong>32k de contexto</strong>, mantendo um <strong>TPS quase constante</strong> em todo o crescimento, com apenas uma queda perceptível no limite de 32k devido à redução no batch size.</li>
        </ul>
        <p>
          Esses resultados sugerem que arquiteturas híbridas — que preservam os pontos fortes dos Transformers, mas otimizam seus gargalos — oferecem <strong>um caminho promissor para expandir o contexto sem custos proibitivos</strong>.
        </p>
        <h2>O Futuro: Ada-Thunderbolt II</h2>
        <p>
          O próximo passo da GTLM Research é o desenvolvimento do <strong>Ada-Thunderbolt II</strong>, uma evolução ainda mais agressiva. Enquanto a primeira versão atacava o custo total por meio de reorganização e caching, a nova proposta busca <strong>eliminar totalmente o custo quadrático da atenção</strong>, aproximando-se de uma escalabilidade verdadeiramente linear, sem sacrificar a expressividade do Transformer.
        </p>
        <p>
          Se bem-sucedido, isso abrirá espaço para modelos capazes de processar <strong>milhões de tokens</strong> de contexto em hardware acessível, rompendo uma das últimas barreiras técnicas para aplicações práticas em escala global.
        </p>
        <h2>Conclusão</h2>
        <p>
          O problema do <strong>Long Context</strong> não é apenas um desafio técnico, mas um divisor de águas para o futuro da IA. Resolver esse gargalo significa criar modelos capazes de raciocinar em cima de <strong>livros inteiros, bases jurídicas, históricos médicos ou séries temporais complexas</strong>, sem fragmentação.
        </p>
        <p>
          A pesquisa em arquiteturas híbridas como a linha <strong>Ada-Thunderbolt</strong> mostra que é possível <strong>unir velocidade, eficiência e profundidade de contexto</strong>, mantendo a qualidade de aprendizado. Esse talvez seja o passo crucial para levar os LLMs de hoje para a próxima geração de inteligência artificial.
        </p>
      </>
    )
  },
  2: {
    id: 2,
    titulo: "Hellaswag vs. TruthfulQA: O Paradoxo dos Benchmarks em LLMs",
    resumo: "Uma análise crítica sobre como benchmarks populares podem levar a interpretações paradoxais no desempenho de LLMs.",
    conteudo: (
      <>
        <h2>Introdução</h2>
        <p>
          Benchmarks são as ferramentas mais usadas para medir o desempenho de <strong>modelos de linguagem de larga escala (LLMs)</strong>. Contudo, nem sempre eles apontam na mesma direção. Dois dos mais conhecidos, <strong>Hellaswag</strong> e <strong>TruthfulQA</strong>, frequentemente produzem resultados paradoxais, levantando questões sobre <strong>o que realmente estamos medindo quando avaliamos inteligência artificial</strong>.
        </p>
        <p>
          Na GTLM Research, observamos esse paradoxo de perto durante os testes do protótipo <strong>PTLM 1.5B A300M</strong>, o que nos levou a propor uma nova maneira de interpretar esses benchmarks e pensar além deles.
        </p>
        <h2>O Papel do Hellaswag</h2>
        <p>
          O <strong>Hellaswag</strong> é um benchmark de plausibilidade narrativa. Ele mede a capacidade do modelo de escolher a continuação mais plausível de uma história ou situação cotidiana, com base no senso comum.
        </p>
        <p>
          Por isso, ele é altamente correlacionado com o que podemos chamar de <strong>“viés de empatia”</strong>: mesmo que os LLMs não tenham empatia real, a habilidade de gerar respostas coerentes com narrativas humanas cria a <strong>ilusão de conexão emocional</strong>.
        </p>
        <p>Ou seja, bons resultados no Hellaswag fazem o modelo parecer mais natural, mais “humano” e mais convincente para interações do dia a dia.</p>
        <h2>O Papel do TruthfulQA</h2>
        <p>
          Já o <strong>TruthfulQA</strong> tem objetivo oposto. Ele mede a capacidade do modelo de <strong>resistir a narrativas falsas, falaciosas ou enviesadas</strong> — desde fake news a falácias lógicas.
        </p>
        <p>
          Um modelo treinado em corpora muito grandes e “sujos” da internet tende a <strong>absorver vieses, desinformação e contradições</strong>. Isso faz com que, apesar de performar muito bem em plausibilidade narrativa (Hellaswag), ele frequentemente <strong>falhe em distinguir o verdadeiro do falso</strong>, marcando baixo no TruthfulQA.
        </p>
        <p>
          Nesse sentido, o TruthfulQA é quase um teste de <strong>honestidade epistêmica</strong>: mede a propensão de um modelo a alucinar.
        </p>
        <h2>O Paradoxo Fundamental</h2>
        <p>Surge então um paradoxo claro:</p>
        <ul>
          <li><strong>Modelos grandes, treinados em datasets imensos e heterogêneos</strong>, geralmente atingem notas muito altas no Hellaswag (pela abundância de narrativas e senso comum), mas <strong>notas baixas no TruthfulQA</strong> (pela contaminação por fake news e vieses).</li>
          <li><strong>Modelos menores, treinados em datasets muito limpos e curados</strong>, podem ter desempenho <strong>mediano ou baixo no Hellaswag</strong>, mas resultados <strong>surpreendentemente altos no TruthfulQA</strong>.</li>
        </ul>
        <p>
          Esse paradoxo nos leva a questionar: será que benchmarks tradicionais não estão medindo <strong>duas dimensões em tensão</strong> — plausibilidade narrativa vs. confiabilidade epistêmica?
        </p>
        <h2>O Caso PTLM 1.5B A300M</h2>
        <p>
          Nos experimentos internos da GTLM Research, o modelo <strong>PTLM 1.5B A300M</strong> apresentou resultados inesperados:
        </p>
        <ul>
          <li><strong>Hellaswag</strong>: 40% (abaixo da média para modelos de tamanho similar).</li>
          <li><strong>TruthfulQA</strong>:
            <ul>
              <li>MC1: 40%</li>
              <li>MC2: 53%</li>
            </ul>
          </li>
        </ul>
        <p>
          Esse desempenho foi tão alto que chegou a <strong>superar modelos muito maiores</strong>, incluindo até o GPT-3.5 em algumas métricas do TruthfulQA.
        </p>
        <p>
          A hipótese levantada é que o <strong>dataset extremamente limpo e curado</strong> do PTLM, livre de toxicidade, vieses excessivos e fake news, foi determinante para esse resultado. Ou seja: <strong>um modelo pequeno, mas treinado em dados de alta qualidade, pode ser mais confiável epistemicamente do que modelos enormes treinados em dados sujos</strong>.
        </p>
        <h2>Uma Nova Proposta de Avaliação</h2>
        <p>
          Com base nessa observação, propomos a ideia de um <strong>índice composto</strong> que normalize o desempenho em Hellaswag e TruthfulQA.
        </p>
        <h3>Motivação:</h3>
        <ul>
          <li>O Hellaswag mede <strong>empatia narrativa e fluidez social</strong>.</li>
          <li>O TruthfulQA mede <strong>honestidade epistêmica e resistência a alucinações</strong>.</li>
        </ul>
        <p>
          Ambos são importantes, mas em direções diferentes. Um modelo ideal deveria equilibrar os dois: ser <strong>confiável</strong> e ao mesmo tempo <strong>natural e convincente</strong>.
        </p>
        <h3>Ideia do Índice:</h3>
        <p>Criar uma métrica ponderada que combine os dois scores. Exemplo:</p>
        <div className="formula-block">Índice_Epistêmico = α · TruthfulQA + (1 - α) · Hellaswag</div>
        <p>
          Onde α (alfa) pode variar conforme a aplicação (mais próximo de 1 em aplicações críticas como medicina e direito, mais próximo de 0.5 em aplicações de interação social). Isso abriria espaço para <strong>benchmark contextualizado</strong>, adaptado ao uso real do modelo.
        </p>
        <h2>Conclusão</h2>
        <p>
          O paradoxo entre <strong>Hellaswag e TruthfulQA</strong> mostra que ainda estamos longe de uma métrica única capaz de avaliar inteligência artificial de forma holística.
        </p>
        <ul>
          <li>Hellaswag mede <strong>a ilusão de humanidade</strong>.</li>
          <li>TruthfulQA mede <strong>a resistência à mentira</strong>.</li>
          <li>Juntos, eles revelam tensões profundas entre <strong>fluidez narrativa</strong> e <strong>honestidade epistêmica</strong>.</li>
        </ul>
        <p>
          O caso do <strong>PTLM 1.5B A300M</strong> sugere que <strong>qualidade de dados pode ser mais importante que quantidade</strong> em certos benchmarks, e abre caminho para novas formas de avaliação.
        </p>
        <p>
          Na GTLM Research, acreditamos que <strong>a próxima geração de benchmarks deve integrar múltiplas dimensões</strong>, refletindo melhor a complexidade da cognição humana — e evitando que modelos sejam avaliados apenas por sua capacidade de “soar humano”, em detrimento da verdade.
        </p>
      </>
    )
  },
  3: {
    id: 3,
    titulo: "Otimização Agressiva: Como Reduzimos Custos de Treinamento de LLMs",
    resumo: "Nossa abordagem para usar otimizadores agressivos de forma estável, reduzindo custos de treinamento e acelerando a inovação em IA.",
    conteudo: (
      <>
        <h2>Além da Força Bruta: Inteligência no Treinamento</h2>
        <p>
          Na GTLM Research, acreditamos que treinar LLMs não é apenas uma questão de mais GPUs ou datasets maiores, mas de <strong>eficiência e inteligência no treinamento</strong>. Hoje, o otimizador mais usado do mundo, o AdamW, atualiza cada peso usando médias móveis dos gradientes:
        </p>
        <div className="formula-block text-sm">
          m_t = β₁ m_t₋₁ + (1-β₁)g_t,<br />
          v_t = β₂ v_t₋₁ + (1-β₂)g_t²,<br />
          w_t₊₁ = w_t - η (m_t / (√v_t + ε)) - λw_t
        </div>
        <p>
          Esse método é <strong>estável e seguro</strong>, mas também <strong>conservador</strong>. Para alcançar resultados competitivos, ele precisa de <strong>bilhões a trilhões de tokens</strong> e meses de GPU. Em outras palavras, O método é estável e seguro, mas conservador: garante aprendizado determinístico e controlado, <strong> o custo de retardar a emergência de comportamentos sofisticados — e elevar os custos de treino</strong>.
        </p>
        <h2>Nossa Vantagem Competitiva</h2>
        <p>
          A GTLM Research desenvolveu um pipeline que permite <strong>usar otimizadores mais agressivos</strong> sem perder estabilidade. Em vez de apenas seguir gradientes médios, nossos modelos monitoram dinamicamente valores internos críticos, como os logits de atenção:
        </p>
        <div className="formula-block">s_ij = (qᵢ ⋅ kⱼ) / √d</div>
        <p>
          Ao manter esse tipo de sinal sob controle, conseguimos aplicar atualizações mais ousadas, explorar pré-condicionamento avançado e ganhar muito mais aprendizado por token. Isso reduz em <strong>ordens de grandeza</strong> o custo de treinamento e acelera o tempo de convergência. Treinos que custariam centenas de milhares de dólares podem cair para dezenas de milhares, com modelos <strong>mais eficientes e mais poderosos</strong> no final do processo.
        </p>
        <p>
          Essa abordagem não é apenas teoria; ela significa que podemos construir modelos grandes com <strong>menos energia</strong>, <strong>menos tempo</strong> e <strong>mais inteligência emergente</strong> do que seria possível com o caminho tradicional. Não se trata apenas de escolher outro otimizador, mas de criar uma <strong>arquitetura e um processo</strong> que suportem passos maiores sem perder robustez.
        </p>
        <h2>Conclusão: Um Novo Padrão de Eficiência</h2>
        <p>
          O resultado é um <strong>novo padrão de eficiência</strong> no treinamento de IA: modelos que aprendem mais rápido, custam menos e abrem espaço para inovações antes inviáveis. É essa engenharia de otimização que transforma custo em vantagem competitiva — e é isso que a GTLM Research oferece.
        </p>
      </>
    )
  }
};

const ROADMAP_ITEMS = [
  {
    status: "Concluído",
    title: "PTLM (Protótipo)",
    description: "Validação da arquitetura MoE com 1.5B de parâmetros e treinamento com 6.5B de tokens. Custo < $30."
  },
  {
    status: "Em Andamento",
    title: "GTLM (Modelo Base)",
    description: "Desenvolvimento do modelo generalista com especialização aprimorada e arquitetura de nova geração."
  },
  {
    status: "Futuro",
    title: "Ajuste fino e aplicações",
    description: "Ajuste fino do GTLM para setores específicos (jurídico, saúde, finanças) e criação de APIs comerciais."
  },
  {
    status: "Futuro",
    title: "Modelo Soberano",
    description: "Escalar o GTLM para se tornar um modelo de fundação competitivo, reduzindo a dependência externa do Brasil."
  }
];

// --- Particle Options ---
const particleOptions = {
  fullScreen: { enable: true, zIndex: -1 },
  background: { color: { value: "#020817" } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      resize: true
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 }
    }
  },
  particles: {
    color: { value: "#ffffff" },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.1,
      width: 1
    },
    move: {
      direction: "none",
      enable: true,
      outModes: { default: "bounce" },
      random: false,
      speed: 1,
      straight: false
    },
    number: {
      density: { enable: true, area: 800 },
      value: 80
    },
    opacity: { value: 0.2 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } }
  },
  detectRetina: true
};

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [showEmailCopied, setShowEmailCopied] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("gabriel.yukio2205@gmail.com");
    setShowEmailCopied(true);
    setTimeout(() => {
      setShowEmailCopied(false);
    }, 2000);
  };

  const openArticle = useCallback((id) => {
    setSelectedArticleId(id);
    window.history.pushState({ artigo: id }, "", `#/artigos/${id}`);
    // Disable body scroll
    document.body.style.overflow = 'hidden';
  }, []);

  const closeArticle = useCallback(() => {
    setSelectedArticleId(null);
    window.history.pushState({}, "", window.location.pathname);
    // Enable body scroll
    document.body.style.overflow = 'auto';
  }, []);

  useEffect(() => {
    const checkHash = () => {
      const match = window.location.hash.match(/^#\/artigos\/(\d+)/);
      if (match) {
        setSelectedArticleId(parseInt(match[1], 10));
        document.body.style.overflow = 'hidden';
      } else {
        setSelectedArticleId(null);
        document.body.style.overflow = 'auto';
      }
    };

    checkHash();
    window.addEventListener("popstate", checkHash);
    return () => window.removeEventListener("popstate", checkHash);
  }, []);

  return (
    <div className="min-h-screen text-foreground relative overflow-x-hidden font-sans selection:bg-primary/30">
      <Particles id="tsparticles" init={particlesInit} options={particleOptions} />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
              <img src={GTLM_LOGO} alt="GTLM Research" className="h-10 w-auto" />
              <span className="text-xl font-bold text-gradient tracking-tight">GTLM Research</span>
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'Technology', 'Results', 'Artigos', 'Roadmap'].map((item) => {
                const sectionId = item.toLowerCase();
                return (
                  <button
                    key={item}
                    onClick={() => scrollToSection(sectionId)}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary relative group",
                      activeSection === sectionId ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {item === 'Roadmap' ? 'Visão de Futuro' : item === 'Technology' ? 'Tecnologia' : item === 'Results' ? 'Resultados' : item}
                    <span className={cn(
                      "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                      activeSection === sectionId ? "w-full" : ""
                    )} />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                  <span className="text-gradient">Modelos de IA Brasileiros.</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Estamos desenvolvendo modelos de IA proprietários do zero em português e inglês, com arquitetura modular MoE, otimizados para baixo custo e alta eficiência. Nossa missão é tornar o Brasil independente de modelos estrangeiros e abrir caminho para inovação científica local.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground pulse-glow text-base px-8"
                  onClick={() => scrollToSection("technology")}
                >
                  <Brain className="mr-2 h-5 w-5" />
                  Explorar Tecnologia
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection("results")}
                  className="text-base px-8 border-primary/20 hover:bg-primary/10"
                >
                  <ChartColumn className="mr-2 h-5 w-5" />
                  Ver Resultados
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/30">
                {[
                  { label: "PTLM", sub: "Portuguese Language Model", color: "text-primary" },
                  { label: "GTLM", sub: "Generalist Transformer LM", color: "text-accent" },
                  { label: "MoE", sub: "Mixture of Experts", color: "text-chart-3" }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className={cn("text-3xl font-bold", stat.color)}>{stat.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative flex justify-center"
            >
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse" />
                <img
                  src={GTLM_LOGO}
                  alt="GTLM Research Logo"
                  className="relative z-10 w-full h-full object-contain floating-animation drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="h-8 w-8 text-muted-foreground animate-bounce cursor-pointer" onClick={() => scrollToSection("technology")} />
          </motion.div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-24 bg-background/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              <span className="text-gradient">Tecnologia & Produto</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nossa arquitetura inovadora combina o melhor dos modelos de linguagem com eficiência computacional avançada
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Brain,
                color: "text-primary",
                title: "PTLM",
                subtitle: "Portuguese Transformer Language Model",
                description: "Primeiro modelo MoE Brasileiro protótipo treinado com 6.5B tokens, possuindo 1.5B parâmetros totais e 300M ativos. Desenvolvido com menos de $30 de custo computacional, demonstrando convergência eficaz e especialização sem colapso de experts, comprovando a viabilidade da arquitetura."
              },
              {
                icon: Cpu,
                color: "text-accent",
                title: "GTLM",
                subtitle: "Generalist Transformer Language Model",
                description: "Um salto arquitetônico que avança sobre os fundamentos do PTLM. O GTLM e suas variantes empregam um sistema MoE mais sofisticado, com especialização de experts aprimorada. Sua viabilidade e superioridade foram comprovadas em experimentos internos."
              },
              {
                icon: Network,
                color: "text-chart-3",
                title: "MoE",
                subtitle: "Mixture of Experts",
                description: 'Sistema onde diferentes "experts" se especializam em tarefas específicas, permitindo escalabilidade eficiente e redução significativa de custos computacionais.'
              }
            ].map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                  <CardHeader>
                    <tech.icon className={cn("h-12 w-12 mb-4 group-hover:scale-110 transition-transform duration-300", tech.color)} />
                    <CardTitle className="text-2xl">{tech.title}</CardTitle>
                    <CardDescription>{tech.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{tech.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-b from-card/80 to-background rounded-3xl p-8 lg:p-12 border border-border/50 shadow-2xl"
          >
            <h3 className="text-3xl font-bold mb-10 text-center">Arquitetura Inovadora</h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-semibold text-primary mb-3">Eficiência Computacional</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Nossa arquitetura baseada em MoE e outras técnicas avançadas permite que apenas uma fração dos parâmetros seja ativada para cada token, resultando em inferência até 10x mais rápida que modelos tradicionais de tamanho similar.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-accent mb-3">Especialização Inteligente</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Cada expert desenvolve competências específicas durante o treinamento, criando um sistema altamente especializado que mantém a versatilidade de um modelo generalista.
                  </p>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-semibold text-chart-3 mb-3">Escalabilidade</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    A arquitetura modular permite adaptar o modelo conforme necessário durante a fase de pré-treino, escalando capacidades de forma inteligente.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-chart-4 mb-3">Custo-Benefício</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Redução significativa nos custos de treinamento e inferência, tornando IA avançada acessível para empresas e pesquisadores brasileiros.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              <span className="text-gradient">Resultados & Evidências</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nossos experimentos demonstram a eficácia da arquitetura MoE com especialização bem-sucedida dos experts
            </p>
          </motion.div>

          <div className="space-y-12">
            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="chart-container h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">Curva de Loss do Treinamento - PTLM</CardTitle>
                    <CardDescription>Convergência estável demonstrando aprendizado efetivo</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img src={LOSS_CURVE} alt="Training Loss Curve" className="w-full rounded-lg shadow-lg border border-white/10" />
                    <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                      A curva do PTLM mostra convergência saudável com loss estabilizando em ~2.5, demonstrando que o modelo protótipo aprendeu efetivamente com apenas 6.5B tokens e $30 de custo.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="chart-container h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-accent">Distribuição de Carga por Expert - G2 GTLM</CardTitle>
                    <CardDescription>Balanceamento saudável entre experts sem colapso</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img src={EXPERT_LOAD} alt="Expert Load Distribution" className="w-full rounded-lg shadow-lg border border-white/10" />
                    <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                      Expert 2 domina com 28.5% (especialização), seguido pelos Experts 0 e 3. Nenhum expert "morreu", indicando especialização bem-sucedida.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="chart-container">
                <CardHeader>
                  <CardTitle className="text-xl text-chart-3">Mapa de Calor: Utilização de Experts por Camada - PTLM</CardTitle>
                  <CardDescription>Padrões de ativação do modelo experimental PTLM de 1.5B parâmetros</CardDescription>
                </CardHeader>
                <CardContent>
                  <img src={HEATMAP} alt="Expert Utilization Heatmap" className="w-full rounded-lg shadow-lg border border-white/10" />
                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                    O mapa do PTLM revela que diferentes experts são ativados em diferentes camadas e contextos, demonstrando especialização emergente durante o treinamento. Cada cor representa a intensidade de uso de um expert específico no modelo protótipo.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="chart-container h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Exemplos de Geração de Texto - PTLM (Base)</CardTitle>
                    <CardDescription>Demonstração da capacidade de inferência sem fine-tuning</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img src={INFERENCE_EXAMPLE} alt="Exemplos de inferência" className="w-full rounded-lg shadow-lg border border-white/10" />
                    <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                      Estes exemplos mostram a capacidade fundamental do modelo protótipo PTLM base. Mesmo sem qualquer ajuste fino, ele é capaz de continuar narrativas, responder a perguntas factuais e seguir instruções básicas.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="chart-container h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-chart-4">Mapa de Calor: Expert Top-1 por Token - G2 GTLM</CardTitle>
                    <CardDescription>Especialização por tipo de token</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img src={TOKEN_ACTIVATION} alt="Token-wise Expert Activation" className="w-full rounded-lg shadow-lg border border-white/10" />
                    <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                      No G2 GTLM, tokens específicos ativam consistentemente os mesmos experts em diferentes camadas, demonstrando especialização funcional sem colapso.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/30 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Métricas de Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-8 text-center divide-x divide-border/30">
                    <div className="space-y-2">
                      <div className="text-4xl font-bold text-primary">0.4904</div>
                      <div className="text-sm font-medium text-muted-foreground">Entropia Normalizada</div>
                      <div className="text-xs text-muted-foreground/70">Router confiante e decisivo (G2 GTLM)</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-4xl font-bold text-accent">0.42</div>
                      <div className="text-sm font-medium text-muted-foreground">Acurácia</div>
                      <div className="text-xs text-muted-foreground/70">TruthfulQA MC1 (PTLM 1.5B A300M)</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-4xl font-bold text-chart-3">1.5B</div>
                      <div className="text-sm font-medium text-muted-foreground">Parâmetros Totais</div>
                      <div className="text-xs text-muted-foreground/70">300M ativos - PTLM</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="artigos" className="py-24 bg-background/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              <span className="text-gradient">Artigos & Pesquisas</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore nossos insights sobre o desenvolvimento de modelos de linguagem e o futuro da IA.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.values(ARTICLES).map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  onClick={() => openArticle(article.id)}
                  className="cursor-pointer flex flex-col justify-between p-8 bg-card border border-border/50 rounded-2xl h-full hover:bg-card/80 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
                >
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">{article.titulo}</h3>
                    <p className="text-muted-foreground leading-relaxed line-clamp-4">{article.resumo}</p>
                  </div>
                  <div className="mt-8 flex items-center text-primary font-semibold text-sm">
                    Ler artigo completo <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticleId && ARTICLES[selectedArticleId] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={closeArticle}
          >
            <div className="min-h-screen px-4 py-10 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full max-w-3xl bg-card rounded-2xl border border-border shadow-2xl overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8 sm:p-12">
                  <button
                    onClick={closeArticle}
                    className="absolute top-6 right-6 p-2 rounded-full bg-secondary/20 hover:bg-secondary/40 transition-colors text-muted-foreground"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <button
                    onClick={closeArticle}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors mb-8 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Voltar
                  </button>

                  <h1 id="artigo-titulo" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-gradient outline-none leading-tight" tabIndex={-1}>
                    {ARTICLES[selectedArticleId].titulo}
                  </h1>

                  <article className="prose prose-invert prose-lg max-w-none text-muted-foreground article-content">
                    {ARTICLES[selectedArticleId].conteudo}
                  </article>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              <span className="text-gradient">Nossa Visão de Futuro</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Da prova de conceito à soberania nacional em Inteligência Artificial.
            </p>
          </motion.div>

          <div className="w-full overflow-x-auto scrollbar-hide pb-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
              }}
              className="flex items-start min-w-[800px] md:justify-center px-4"
            >
              {ROADMAP_ITEMS.map((item, index) => (
                <React.Fragment key={index}>
                  <motion.div
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1 }
                    }}
                    className="flex flex-col items-center text-center relative group"
                    style={{ width: "250px" }}
                  >
                    <div className="relative mb-6">
                      <motion.div
                        className={cn(
                          "w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-lg transition-all duration-500 z-10 relative bg-background",
                          item.status === "Concluído" ? "border-green-500 shadow-green-500/20" :
                          item.status === "Em Andamento" ? "border-primary shadow-primary/20" :
                          "border-muted shadow-none"
                        )}
                        animate={item.status === "Em Andamento" ? {
                          scale: [1, 1.1, 1],
                          boxShadow: ["0 0 0px 0px rgba(59, 130, 246, 0)", "0 0 20px 5px rgba(59, 130, 246, 0.3)", "0 0 0px 0px rgba(59, 130, 246, 0)"]
                        } : {}}
                        transition={item.status === "Em Andamento" ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
                      >
                        {item.status === "Concluído" && <Check className="w-8 h-8 text-green-500" />}
                        {item.status === "Em Andamento" && <Loader className="w-8 h-8 text-primary animate-spin" />}
                        {item.status === "Futuro" && <Milestone className="w-8 h-8 text-muted-foreground" />}
                      </motion.div>
                    </div>

                    <div className="space-y-2 px-2">
                      <div className={cn(
                        "text-xs font-bold uppercase tracking-wider py-1 px-2 rounded-full inline-block mb-2",
                        item.status === "Concluído" ? "bg-green-500/10 text-green-500" :
                        item.status === "Em Andamento" ? "bg-primary/10 text-primary" :
                        "bg-muted text-muted-foreground"
                      )}>
                        {item.status}
                      </div>
                      <h3 className="text-lg font-bold leading-tight">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>

                  {index < ROADMAP_ITEMS.length - 1 && (
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, scaleX: 0 },
                        visible: { opacity: 1, scaleX: 1 }
                      }}
                      className="flex-1 h-1 bg-border/50 rounded-full mt-10 -mx-4 z-0 relative"
                    >
                      {item.status === "Concluído" && (
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-500 to-primary rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                        />
                      )}
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card/30 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-3">
              <img src={GTLM_LOGO} alt="GTLM Research" className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity" />
              <span className="text-lg font-semibold tracking-tight">GTLM Research</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2 bg-secondary/30 px-4 py-2 rounded-full border border-white/5 hover:border-primary/30 transition-colors">
                <span className="text-sm text-muted-foreground">gabriel.yukio2205@gmail.com</span>
                <Button
                  onClick={copyEmail}
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-transparent"
                >
                  {showEmailCopied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3 text-muted-foreground hover:text-primary" />}
                </Button>
              </div>
              <a
                href="https://github.com/MadrasLe"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-secondary/30 hover:bg-secondary/60 border border-white/5 transition-all hover:scale-110"
                aria-label="Perfil no GitHub"
              >
                <Github className="h-5 w-5 text-muted-foreground hover:text-white" />
              </a>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground/60 mt-12">
            © 2025 GTLM Research. Desenvolvendo o futuro da IA brasileira.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
