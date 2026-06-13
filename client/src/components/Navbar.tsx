import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, Leaf } from "lucide-react";
import { useTranslation } from "react-i18next";

type Page = "home" | "destinations" | "guide" | "learn" | "community" | "contact"

type NavbarProps = {
  lang: "en" | "fr" | "ar";
  setLang: (lang: "en" | "fr" | "ar") => void;
  page: Page;
  navigateToPage?: (page: Page) => void;
};

export const Navbar = ({ lang, setLang, page, navigateToPage }: NavbarProps) => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const copy = t("nav", { returnObjects: true }) as {
    home: string;
    destinations: string;
    guide: string;
    community: string;
    learn: string;
    contact: string;
    begin: string;
  };

  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [lang, i18n]);

  useEffect(() => {
    const onScroll = () => setScrolled(page !== "home" || window.scrollY > 50);
    onScroll(); // initialize based on page and current scroll
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [page]);

  useEffect(() => {
    setActiveSection(page);
  }, [page]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToElement = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (!element) return false;
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    return true;
  };

  const handlePageNav = (targetPage: Page) => {
    if (page === targetPage) {
      scrollToTop();
    } else if (navigateToPage) {
      navigateToPage(targetPage);
    }
    setActiveSection(targetPage);
    setOpen(false);
  };

  const scrollToSection = (id: string) => {
    if (id === "home") {
      handlePageNav("home");
      return;
    }

    if (id === "community") {
      handlePageNav("community");
      return;
    }

    if (id === "contact") {
      handlePageNav("contact");
      return;
    }

    if (id === "destinations") {
      handlePageNav("destinations");
      return;
    }

    if (id === "guide") {
      handlePageNav("guide");
      return;
    }

    if (id === "learn") {
      handlePageNav("learn");
      return;
    }

    if (page !== "home") {
      handlePageNav("home");
      return;
    }

    scrollToElement(id);
    setActiveSection(id);
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
          <button onClick={() => scrollToSection("home")} className="flex items-center gap-3 group">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className={`relative transition-all duration-300 ${
                scrolled ? "scale-90" : "scale-100"
              }`}
            >
              <Leaf
                className={`w-8 h-8 transition-colors ${
                  scrolled ? "text-emerald-700" : "text-white drop-shadow-lg"
                }`}
              />
              <div
                className={`absolute inset-0 blur-md ${
                  scrolled ? "opacity-0" : "opacity-50 bg-emerald-300"
                } transition-opacity`}
              />
            </motion.div>
            <div className="flex flex-col text-left">
              <span
                className={`font-serif text-xl tracking-wide transition-colors ${
                  scrolled ? "text-zinc-900" : "text-white drop-shadow-md"
                }`}
              >
                EcoTour DZ
              </span>
              <span
                className={`text-[10px] tracking-widest uppercase transition-colors  ${
                  scrolled ? "text-emerald-700" : "text-emerald-100"
                }`}
              >
                Travel Responsibly
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: "home", label: copy.home },
              { id: "destinations", label: copy.destinations },
              { id: "guide", label: copy.guide },
              { id: "community", label: copy.community },
              { id: "learn", label: copy.learn },
              { id: "contact", label: copy.contact },
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

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen((v) => !v)}
                className={`p-2 rounded-full transition-colors ${
                  scrolled ? "text-emerald-700" : "text-white"
                }`}
                aria-label="Change language"
              >
                <Globe className="w-5 h-5" />
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 bg-white rounded-full shadow-lg border border-emerald-50 px-4 py-2 flex items-center gap-3">
                  {(["en", "fr", "ar"] as const).map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLang(code);
                        setLangMenuOpen(false);
                      }}
                      className={`text-xs font-semibold uppercase transition-colors ${
                        lang === code ? "text-emerald-600" : "text-black"
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              )}
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
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-800 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

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

        {open && (
          <div className="md:hidden pb-6 border-t border-emerald-100/20 mt-2 pt-6">
            <div className="flex flex-col gap-4">
              {[
                { id: "home", label: copy.home },
                { id: "destinations", label: copy.destinations },
                { id: "guide", label: copy.guide },
                { id: "community", label: copy.community },
                { id: "learn", label: copy.learn },
                { id: "contact", label: copy.contact },
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
                  scrolled ? "bg-emerald-700 text-white" : "bg-white text-emerald-900"
                }`}
              >
                {copy.begin}
              </button>

              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-sm w-fit">
                <Globe className="w-4 h-4 text-emerald-700" />
                {(["en", "fr", "ar"] as const).map((code) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLang(code);
                      setOpen(false);
                    }}
                    className={`text-xs font-semibold uppercase ${
                      lang === code ? "text-emerald-600" : "text-black"
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
