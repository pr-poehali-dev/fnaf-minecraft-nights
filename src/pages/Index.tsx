import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_BG = "https://cdn.poehali.dev/projects/acb62ac1-5539-4cf3-9138-c4fef0836b86/files/377cadc4-3967-4779-9f96-e99d299a68db.jpg";

const lorChapters = [
  {
    num: "I",
    title: "Начало Тьмы",
    year: "1847 г.",
    text: "Деревня Черноречье исчезла за одну ночь. Очевидцы говорили о тени, пожравшей луну. Когда рассвело — на месте деревни остались лишь пепел и тишина. Тишина, из которой доносились шёпоты.",
    icon: "Moon",
  },
  {
    num: "II",
    title: "Культ Безымянного",
    year: "1923 г.",
    text: "Профессор Краузе обнаружил в подвалах заброшенного монастыря манускрипт, написанный кровью. Текст описывал ритуалы призыва существ из пространства между снами. Краузе не пережил следующей ночи.",
    icon: "BookOpen",
  },
  {
    num: "III",
    title: "Проект «Умбра»",
    year: "1975 г.",
    text: "Секретное военное ведомство начало эксперименты по открытию врат. Участников программы находили мёртвыми с выражением абсолютного ужаса на лицах. Все файлы засекречены до 2041 года.",
    icon: "FlaskConical",
  },
  {
    num: "IV",
    title: "Сегодняшняя ночь",
    year: "Сейчас",
    text: "Ты получил координаты. Место, где тьма наиболее плотная. Они ждут тебя там. Или охотятся. Разница невелика — исход один. Вопрос лишь в том, сколько ты продержишься.",
    icon: "MapPin",
  },
];

const gameModes = [
  {
    id: "coop",
    title: "Кооператив",
    subtitle: "До 4 игроков",
    description: "Объединитесь с выжившими. Вместе вы сильнее — но тьма растёт пропорционально числу жертв. Каждый несёт свою роль: разведчик, медик, хранитель огня, хроникёр.",
    icon: "Users",
    accent: "#8B0000",
    features: ["Разделение ролей", "Голосовой чат", "Общий инвентарь", "Совместные ритуалы"],
    label: "ВЫЖИВАНИЕ В КОМАНДЕ",
  },
  {
    id: "pvp",
    title: "Охота",
    subtitle: "2–8 игроков",
    description: "Один становится Тенью. Остальные — жертвами. Охотник обретает нечеловеческие способности с каждым уничтоженным. Жертвы должны завершить ритуал изгнания до рассвета.",
    icon: "Swords",
    accent: "#C41E3A",
    features: ["Асимметричный геймплей", "Нарастающая сила охотника", "Динамические карты", "Ивенты тьмы"],
    label: "ОХОТА ВО ТЬМЕ",
  },
];

function useInView(ref: React.RefObject<Element>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

export default function Index() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [navVisible, setNavVisible] = useState(false);

  const lorRef = useRef<HTMLDivElement>(null);
  const modesRef = useRef<HTMLDivElement>(null);
  const lorInView = useInView(lorRef as React.RefObject<Element>);
  const modesInView = useInView(modesRef as React.RefObject<Element>);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      setNavVisible(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="noise-bg min-h-screen bg-void text-bone overflow-x-hidden">

      {/* Floating Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: navVisible ? "rgba(8,4,4,0.92)" : "transparent",
          backdropFilter: navVisible ? "blur(12px)" : "none",
          borderBottom: navVisible ? "1px solid rgba(139,0,0,0.25)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-cormorant text-2xl font-light tracking-[0.3em] text-bone animate-flicker">
            UMBRA
          </span>
          <div className="hidden md:flex gap-8">
            {[["Лор", "lore"], ["Режимы", "modes"], ["Играть", "play"]].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="font-oswald font-light text-sm tracking-[0.2em] text-bone/60 hover:text-blood-light transition-colors duration-300 uppercase"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            transform: `translateY(${scrollY * 0.3}px)`,
            filter: "brightness(0.3) saturate(0.6)",
          }}
        />
        <div
          className="absolute inset-0 animate-fog-drift"
          style={{
            background: "radial-gradient(ellipse 120% 60% at 50% 100%, rgba(8,0,0,0.95) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(0,0,0,0.8) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(60,0,0,0.5) 100%)",
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div
            className="inline-flex items-center gap-3 mb-8 opacity-0"
            style={{ animation: "rise-from-dark 0.8s ease-out 0.3s forwards" }}
          >
            <div className="h-px w-12 bg-blood" />
            <span className="font-oswald font-light text-xs tracking-[0.4em] text-blood-light uppercase">
              Хоррор · Выживание · 2024
            </span>
            <div className="h-px w-12 bg-blood" />
          </div>

          <h1
            className="font-cormorant text-[clamp(5rem,18vw,14rem)] leading-none font-light tracking-[0.08em] text-bone text-shadow-blood opacity-0"
            style={{ animation: "rise-from-dark 1s ease-out 0.5s forwards" }}
          >
            UMBRA
          </h1>

          <p
            className="font-cormorant italic text-[clamp(1rem,3vw,1.8rem)] text-bone/60 mt-2 mb-10 tracking-[0.15em] opacity-0"
            style={{ animation: "rise-from-dark 0.8s ease-out 0.8s forwards" }}
          >
            Во тьме нет спасения
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center opacity-0"
            style={{ animation: "rise-from-dark 0.8s ease-out 1.1s forwards" }}
          >
            <button
              className="btn-blood px-10 py-4 text-sm animate-pulse-blood"
              onClick={() => scrollTo("modes")}
            >
              Начать игру
            </button>
            <button
              className="btn-ghost-blood px-10 py-4 text-sm"
              onClick={() => scrollTo("lore")}
            >
              Узнать лор
            </button>
          </div>

          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
            style={{ animation: "rise-from-dark 0.8s ease-out 1.8s forwards" }}
          >
            <span className="font-oswald font-light text-[10px] tracking-[0.4em] text-bone/30 uppercase">Листай вниз</span>
            <div className="w-px h-12 bg-gradient-to-b from-blood/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* LORE SECTION */}
      <section id="lore" className="relative py-32 px-6" ref={lorRef}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 100% 50% at 50% 50%, rgba(60,0,0,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-1000 ${lorInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="font-oswald font-light text-xs tracking-[0.5em] text-blood-light uppercase block mb-4">
              — История —
            </span>
            <h2 className="font-cormorant text-[clamp(2.5rem,6vw,5rem)] font-light text-bone text-shadow-bone leading-none">
              Летопись Тьмы
            </h2>
            <p className="font-ibm text-bone/40 text-sm mt-4 max-w-lg mx-auto leading-relaxed">
              Каждая эпоха оставила свой след. Каждый след — это жертва.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lorChapters.map((ch, i) => (
              <div
                key={ch.num}
                className={`card-horror p-8 transition-all duration-700 ${lorInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <div
                      className="w-12 h-12 flex items-center justify-center"
                      style={{ border: "1px solid rgba(139,0,0,0.3)" }}
                    >
                      <Icon name={ch.icon} fallback="Star" size={20} className="text-blood-light" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-cormorant text-4xl font-light text-blood/40 leading-none">{ch.num}</span>
                      <div>
                        <h3 className="font-cormorant text-xl font-semibold text-bone leading-tight">{ch.title}</h3>
                        <span className="font-oswald font-light text-xs tracking-[0.3em] text-blood-light">{ch.year}</span>
                      </div>
                    </div>
                    <div className="w-full h-px my-4" style={{ background: "linear-gradient(90deg, rgba(139,0,0,0.4), transparent)" }} />
                    <p className="font-ibm text-sm text-bone/55 leading-relaxed">{ch.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${lorInView ? "opacity-100" : "opacity-0"}`}>
            <blockquote className="font-cormorant italic text-[clamp(1.1rem,2.5vw,1.6rem)] text-bone/35 max-w-2xl mx-auto leading-relaxed">
              «Тьма не приходит сама. Её всегда призывают. Вопрос в том — зачем ты это сделал?»
            </blockquote>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* MODES SECTION */}
      <section id="modes" className="relative py-32 px-6" ref={modesRef}>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-1000 ${modesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="font-oswald font-light text-xs tracking-[0.5em] text-blood-light uppercase block mb-4">
              — Режимы игры —
            </span>
            <h2 className="font-cormorant text-[clamp(2.5rem,6vw,5rem)] font-light text-bone leading-none">
              Как ты встретишь тьму?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {gameModes.map((mode, i) => (
              <div
                key={mode.id}
                onClick={() => setSelectedMode(selectedMode === mode.id ? null : mode.id)}
                className={`card-horror p-8 cursor-pointer transition-all duration-700 ${modesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
                style={{
                  transitionDelay: `${i * 200}ms`,
                  borderColor: selectedMode === mode.id ? `${mode.accent}80` : "rgba(139,0,0,0.2)",
                  boxShadow: selectedMode === mode.id
                    ? `inset 0 0 40px rgba(0,0,0,0.5), 0 0 40px ${mode.accent}30`
                    : "inset 0 0 40px rgba(0,0,0,0.5), 0 0 20px rgba(139,0,0,0.05)",
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="font-oswald font-light text-[10px] tracking-[0.5em] uppercase"
                    style={{ color: mode.accent }}
                  >
                    {mode.label}
                  </span>
                  <div
                    className="w-10 h-10 flex items-center justify-center"
                    style={{ border: `1px solid ${mode.accent}40` }}
                  >
                    <Icon name={mode.icon} fallback="Star" size={18} style={{ color: mode.accent }} />
                  </div>
                </div>

                <h3 className="font-cormorant text-4xl font-light text-bone mb-1">{mode.title}</h3>
                <p className="font-oswald font-light text-sm tracking-[0.2em] mb-5" style={{ color: `${mode.accent}cc` }}>
                  {mode.subtitle}
                </p>

                <div className="w-full h-px mb-5" style={{ background: `linear-gradient(90deg, ${mode.accent}50, transparent)` }} />

                <p className="font-ibm text-sm text-bone/55 leading-relaxed mb-6">{mode.description}</p>

                <div className="grid grid-cols-2 gap-2">
                  {mode.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: mode.accent }} />
                      <span className="font-ibm text-xs text-bone/40">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <button
                    className="w-full py-3 text-xs tracking-[0.3em] uppercase font-oswald font-light transition-all duration-300"
                    style={{
                      border: `1px solid ${selectedMode === mode.id ? mode.accent : `${mode.accent}40`}`,
                      color: selectedMode === mode.id ? "#E8DCC8" : `${mode.accent}99`,
                      background: selectedMode === mode.id ? `${mode.accent}20` : "transparent",
                    }}
                  >
                    {selectedMode === mode.id ? "✓ Выбрано" : "Выбрать режим"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* CTA SECTION */}
      <section id="play" className="relative py-32 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(80,0,0,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-cormorant text-[clamp(2rem,6vw,4.5rem)] font-light text-bone text-shadow-blood leading-tight mb-4">
            Тьма зовёт тебя
          </h2>
          <p className="font-ibm text-sm text-bone/40 mb-10 leading-relaxed">
            Присоединись к тысячам выживших. Или не переживи первую ночь.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-blood px-12 py-4 text-sm animate-pulse-blood">
              Играть сейчас
            </button>
            <button className="btn-ghost-blood px-12 py-4 text-sm">
              Смотреть трейлер
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-blood/15 pt-12">
            {[["47 293", "Выживших"], ["1 204 877", "Жертв тьмы"], ["99", "Ночей подряд"]].map(([num, label]) => (
              <div key={label}>
                <div className="font-cormorant text-3xl font-light text-blood-light">{num}</div>
                <div className="font-oswald font-light text-[10px] tracking-[0.3em] text-bone/30 uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-void-soft py-8 px-6 text-center">
        <span className="font-cormorant text-lg tracking-[0.4em] text-blood/60 animate-flicker">UMBRA</span>
        <p className="font-ibm text-[11px] text-bone/20 mt-2 tracking-widest uppercase">
          © 2024 · Все права защищены · 18+
        </p>
      </footer>
    </div>
  );
}