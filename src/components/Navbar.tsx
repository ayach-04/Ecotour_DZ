import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, Leaf } from "lucide-react";

type NavbarProps = {
  lang: "en" | "fr" | "ar";
  setLang: (lang: "en" | "fr" | "ar") => void;
};

const navText = {
  en: { home: "Home", destinations: "Destinations", journeys: "Journeys", contact: "Contact", begin: "Begin Your Journey" },
  fr: { home: "Accueil", destinations: "Destinations", journeys: "Voyages", contact: "Contact", begin: "Commencer votre voyage" },
  ar: { home: "الرئيسية", destinations: "الوجهات", journeys: "الرحلات", contact: "تواصل", begin: "ابدأ رحلتك" },
};

export const Navbar = ({ lang, setLang }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const copy = navText[lang];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      if (window.scrollY < 200) {
        setActiveSection("home");
        return;
      }

      // Detect active section
      const sections = ["home", "destinations", "journeys", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-emerald-100/50" 
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection("home")} 
            className="flex items-center gap-3 group"
          >
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className={`relative transition-all duration-300 ${
              scrolled ? "scale-90" : "scale-100"
            }`}>
              <Leaf className={`w-8 h-8 transition-colors ${
                scrolled ? "text-emerald-700" : "text-white drop-shadow-lg"
              }`} />
              <div className={`absolute inset-0 blur-md ${
                scrolled ? "opacity-0" : "opacity-50 bg-emerald-300"
              } transition-opacity`} />
            </motion.div>
            <div className="flex flex-col text-left">
              <span className={`font-serif text-xl tracking-wide transition-colors ${
                scrolled ? "text-zinc-900" : "text-white drop-shadow-md"
              }`}>
                EcoTour DZ
              </span>
              <span className={`text-[10px] tracking-widest uppercase transition-colors  ${
                scrolled ? "text-emerald-700" : "text-emerald-100"
              }`}>
                Travel Responsibly
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: "home", label: copy.home },
              { id: "destinations", label: copy.destinations },
              { id: "journeys", label: copy.journeys },
              { id: "contact", label: copy.contact }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm tracking-wide transition-colors ${
                  scrolled 
                    ? activeSection === item.id 
                      ? "text-emerald-700" 
                      : "text-zinc-700 hover:text-emerald-600"
                    : activeSection === item.id
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                } after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform ${
                  activeSection === item.id ? "after:scale-x-100" : "hover:after:scale-x-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Language & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-colors ${scrolled ? "bg-white/80 text-zinc-700" : "bg-white/10 text-white"}`}>
              <Globe className="w-3.5 h-3.5" />
              {(["en", "fr", "ar"] as const).map((code) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`px-2 py-0.5 rounded ${lang === code ? "bg-emerald-600 text-white" : "hover:text-emerald-600"}`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => scrollToSection("journeys")}
              className={`group relative overflow-hidden px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                scrolled
                  ? "bg-emerald-700 text-white hover:bg-emerald-800 shadow-md hover:shadow-lg"
                  : "bg-white text-emerald-900 hover:bg-emerald-50 shadow-lg hover:shadow-xl"
              }`}
            >
              <span className="relative z-10">{copy.begin}</span>
              <div className={`absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-800 opacity-0 group-hover:opacity-100 transition-opacity`} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden flex flex-col gap-1.5 p-2 transition-colors ${
              scrolled ? "text-zinc-900" : "text-white"
            }`}
            aria-label="Menu"
          >
            <span className={`w-6 h-0.5 bg-current transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-0.5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`w-6 h-0.5 bg-current transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-6 border-t border-emerald-100/20 mt-2 pt-6">
            <div className="flex flex-col gap-4">
                {[
                { id: "home", label: copy.home },
                { id: "destinations", label: copy.destinations },
                { id: "journeys", label: copy.journeys },
                { id: "contact", label: copy.contact }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-4 py-2 rounded-lg transition-colors ${
                    scrolled
                      ? activeSection === item.id
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-zinc-700 hover:bg-emerald-50/50"
                      : activeSection === item.id
                        ? "bg-white/20 text-white"
                        : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <button
                onClick={() => scrollToSection("journeys")}
                className={`mt-2 px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                  scrolled
                    ? "bg-emerald-700 text-white"
                    : "bg-white text-emerald-900"
                }`}
              >
                {copy.begin}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
