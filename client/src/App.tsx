import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { DestinationsPage } from "./pages/DestinationsPage";
import { GuidePage } from "./pages/GuidePage";
import { LearnPage } from "./pages/LearnPage";
import { CommunityPage } from "./pages/communitypage";
import { ContactPage } from "./pages/ContactPage";
import { Footer } from "./components/Footer";
import BackToTop from "./components/BackToTop";
import "./i18n";
import i18n from "i18next";

const supportedLangs = ["en", "fr", "ar"] as const;
const getPageFromPath = (): "home" | "destinations" | "guide" | "learn" | "community" | "contact" => {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const maybe = segments[1];
  if (maybe === "destinations") return "destinations";
  if (maybe === "guide") return "guide";
  if (maybe === "learn") return "learn";
  if (maybe === "community") return "community";
  if (maybe === "contact") return "contact";
  return "home";
};

export default function App() {
  const [lang, setLang] = useState<"en" | "fr" | "ar">("en");
  const [page, setPage] = useState<"home" | "destinations" | "guide" | "learn" | "community" | "contact">(
    getPageFromPath()
  );

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, behavior: "auto" });
    const segments = window.location.pathname.split("/").filter(Boolean);
    const first = segments[0] as "en" | "fr" | "ar" | undefined;
    const detected = first && supportedLangs.includes(first) ? first : "en";
    if (!first || !supportedLangs.includes(first)) {
      const newPath = "/" + [detected, ...segments].filter(Boolean).join("/");
      window.history.replaceState(null, "", newPath);
    }
    setLang(detected);
    const maybePage = segments[1];
    setPage(
      maybePage === "destinations"
        ? "destinations"
        : maybePage === "guide"
          ? "guide"
          : maybePage === "learn"
            ? "learn"
            : maybePage === "community"
              ? "community"
              : maybePage === "contact"
                ? "contact"
                : "home"
    );

    const onPopState = () => {
      const fromPath = getPageFromPath();
      setPage(fromPath);
      const segs = window.location.pathname.split("/").filter(Boolean);
      const firstSeg = segs[0] as "en" | "fr" | "ar" | undefined;
      if (firstSeg && supportedLangs.includes(firstSeg)) {
        setLang(firstSeg);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    const desiredPath = "/" + [lang, page === "home" ? "" : page].filter(Boolean).join("/");
    if (window.location.pathname !== desiredPath) {
      window.history.replaceState(null, "", desiredPath);
    }
  }, [lang, page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const navigateToPage = (nextPage: "home" | "destinations" | "guide" | "learn" | "community" | "contact") => {
    setPage(nextPage);
    const newPath = "/" + [lang, nextPage === "home" ? "" : nextPage].filter(Boolean).join("/");
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, "", newPath);
    }
  };

  const contentStyle = page === "home" ? undefined : { paddingTop: "5rem" };

  return (
    <div className="min-h-screen">
      <Navbar lang={lang} setLang={setLang} page={page} navigateToPage={navigateToPage} />
      <div style={contentStyle}>
        {page === "destinations" ? (
          <DestinationsPage lang={lang} />
        ) : page === "guide" ? (
          <GuidePage lang={lang} />
        ) : page === "learn" ? (
          <LearnPage lang={lang} />
        ) : page === "community" ? (
          <CommunityPage />
        ) : page === "contact" ? (
          <ContactPage />
        ) : (
          <HomePage lang={lang} />
        )}
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
}
