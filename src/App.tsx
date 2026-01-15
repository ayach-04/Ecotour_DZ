import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { Footer } from "./components/Footer";

export default function App() {
  const [lang, setLang] = useState<"en" | "fr" | "ar">("en");

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <div className="min-h-screen">
      <Navbar lang={lang} setLang={setLang} />
      <HomePage lang={lang} />
      <Footer />
    </div>
  );
}
