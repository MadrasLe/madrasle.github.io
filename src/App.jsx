import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, BarChart3, Network, ChevronDown, Github, ExternalLink } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import './App.css';

// Import das imagens
import gtlmLogo from './assets/GTLM.png';
import trainingLoss from './assets/Code_Generated_Image(1).png';
import expertHeatmap from './assets/transferir.png';
import tokenHeatmap from './assets/transferir.png';
import expertDistribution from './assets/transferir(1).png';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={gtlmLogo} alt="GTLM Research" className="h-10 w-auto" />
              <span className="text-xl font-bold text-gradient">GTLM Research</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className={`transition-colors ${activeSection === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('technology')}
                className={`transition-colors ${activeSection === 'technology' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Tecnologia
              </button>
              <button 
                onClick={() => scrollToSection('results')}
                className={`transition-colors ${activeSection === 'results' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Resultados
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 min-h-screen flex items-center neural-network-bg">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-gradient">Modelos de IA</span>
                  <br />
                  <span className="text-foreground">Brasileiros</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Estamos desenvolvendo modelos de IA proprietários em português e inglês, com arquitetura modular MoE, 
                  otimizados para baixo custo e alta eficiência. Nossa missão é tornar o Brasil independente de modelos 
                  estrangeiros e abrir caminho para inovação científica local.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground pulse-glow"
                  onClick={() => scrollToSection('technology')}
                >
                  <Brain className="mr-2 h-5 w-5" />
                  Explorar Tecnologia
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => scrollToSection('results')}
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Ver Resultados
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">PTLM</div>
                  <div className="text-sm text-muted-foreground">Portuguese Language Model</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">GTLM</div>
                  <div className="text-sm text-muted-foreground">Gated Transformer LM</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-chart-3">MoE</div>
                  <div className="text-sm text-muted-foreground">Mixture of Experts</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
                <img 
                  src={gtlmLogo} 
                  alt="GTLM Research Logo" 
                  className="relative z-10 w-full max-w-md mx-auto floating-animation"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <ChevronDown className="h-8 w-8 mx-auto text-muted-foreground animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 tech-grid">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-gradient">Tecnologia & Produto</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nossa arquitetura inovadora combina o melhor dos modelos de linguagem com eficiência computacional avançada
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full glow-effect">
                <CardHeader>
                  <Brain className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">PTLM</CardTitle>
                  <CardDescription>Portuguese Transformer Language Model</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Modelo de linguagem especializado em português brasileiro, treinado com dados locais 
                    para compreender nuances culturais e linguísticas específicas do nosso país.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full glow-effect">
                <CardHeader>
                  <Cpu className="h-12 w-12 text-accent mb-4" />
                  <CardTitle className="text-2xl">GTLM</CardTitle>
                  <CardDescription>Gated Transformer Language Model</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Arquitetura avançada com mecanismos de gating que permitem controle fino sobre o fluxo 
                    de informações, resultando em maior eficiência e capacidade de especialização.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full glow-effect">
                <CardHeader>
                  <Network className="h-12 w-12 text-chart-3 mb-4" />
                  <CardTitle className="text-2xl">MoE</CardTitle>
                  <CardDescription>Mixture of Experts</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Sistema modular onde diferentes "experts" se especializam em tarefas específicas, 
                    permitindo escalabilidade eficiente e redução significativa de custos computacionais.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl p-8 border border-border"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Arquitetura Inovadora</h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-primary">Eficiência Computacional</h4>
                <p className="text-muted-foreground">
                  Nossa arquitetura MoE permite que apenas uma fração dos parâmetros seja ativada para cada token, 
                  resultando em inferência até 10x mais rápida que modelos tradicionais de tamanho similar.
                </p>
                <h4 className="text-xl font-semibold text-accent">Especialização Inteligente</h4>
                <p className="text-muted-foreground">
                  Cada expert desenvolve competências específicas durante o treinamento, criando um sistema 
                  altamente especializado que mantém a versatilidade de um modelo generalista.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-chart-3">Escalabilidade</h4>
                <p className="text-muted-foreground">
                  A arquitetura modular permite adicionar novos experts conforme necessário, 
                  escalando capacidades sem retraining completo do modelo base.
                </p>
                <h4 className="text-xl font-semibold text-chart-4">Custo-Benefício</h4>
                <p className="text-muted-foreground">
                  Redução significativa nos custos de treinamento e inferência, tornando IA avançada 
                  acessível para empresas e pesquisadores brasileiros.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20 gradient-bg">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-gradient">Resultados & Evidências</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nossos experimentos demonstram a eficácia da arquitetura MoE com especialização bem-sucedida dos experts
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="chart-container">
                <CardHeader>
                  <CardTitle className="text-xl">Curva de Loss do Treinamento</CardTitle>
                  <CardDescription>
                    Convergência estável demonstrando aprendizado efetivo do modelo GTLM
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img 
                    src={trainingLoss} 
                    alt="Training Loss Curve" 
                    className="w-full rounded-lg"
                  />
                  <p className="text-sm text-muted-foreground mt-4">
                    A curva mostra convergência saudável com loss estabilizando em ~2.5, 
                    indicando que o modelo aprendeu efetivamente os padrões dos dados.
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
              <Card className="chart-container">
                <CardHeader>
                  <CardTitle className="text-xl">Distribuição de Carga por Expert</CardTitle>
                  <CardDescription>
                    Balanceamento saudável entre experts sem colapso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img 
                    src={expertDistribution} 
                    alt="Expert Load Distribution" 
                    className="w-full rounded-lg"
                  />
                  <p className="text-sm text-muted-foreground mt-4">
                    Expert 2 domina com 28.5%, seguido pelos Experts 0 e 3. 
                    Nenhum expert "morreu", indicando especialização bem-sucedida.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="chart-container">
              <CardHeader>
                <CardTitle className="text-xl">Mapa de Calor: Utilização de Experts por Camada</CardTitle>
                <CardDescription>
                  Padrões de ativação mostrando especialização funcional dos experts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <img 
                  src={expertHeatmap} 
                  alt="Expert Utilization Heatmap" 
                  className="w-full rounded-lg"
                />
                <p className="text-sm text-muted-foreground mt-4">
                  O mapa revela que diferentes experts são ativados em diferentes camadas e contextos, 
                  demonstrando especialização emergente durante o treinamento. Cada cor representa 
                  a intensidade de uso de um expert específico.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="chart-container">
              <CardHeader>
                <CardTitle className="text-xl">Mapa de Calor: Expert Top-1 por Token</CardTitle>
                <CardDescription>
                  Especialização por tipo de token demonstrando aprendizado contextual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <img 
                  src={tokenHeatmap} 
                  alt="Token-wise Expert Activation" 
                  className="w-full rounded-lg"
                />
                <p className="text-sm text-muted-foreground mt-4">
                  Tokens específicos ativam consistentemente os mesmos experts em diferentes camadas, 
                  sugerindo que o modelo desenvolveu especialização funcional. Por exemplo, 
                  preposições e artigos mostram padrões distintos de ativação.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Métricas de Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary">0.4904</div>
                    <div className="text-sm text-muted-foreground">Entropia Normalizada</div>
                    <div className="text-xs text-muted-foreground mt-1">Router confiante e decisivo</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent">24.37</div>
                    <div className="text-sm text-muted-foreground">Tokens/segundo</div>
                    <div className="text-xs text-muted-foreground mt-1">Velocidade de geração</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-chart-3">150M</div>
                    <div className="text-sm text-muted-foreground">Parâmetros</div>
                    <div className="text-xs text-muted-foreground mt-1">Modelo eficiente</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src={gtlmLogo} alt="GTLM Research" className="h-8 w-auto" />
              <span className="text-lg font-semibold">GTLM Research</span>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Documentação
              </Button>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground mt-8">
            © 2024 GTLM Research. Desenvolvendo o futuro da IA brasileira.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
