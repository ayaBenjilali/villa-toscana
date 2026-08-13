"use client";

import { FormEvent, useState, useEffect, useCallback, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CalendarDays,
  Check,
  ChefHat,
  Clock,
  Facebook,
  Grape,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Star,
  User,
  Users,
  Utensils,
  Wine,
  X,
} from "lucide-react";

/* ── Data ─────────────────────────────────────────── */

const specialties = [
  {
    name: "Risotto aux truffes",
    price: "240 DH",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1000&q=88",
    text: "Riz carnaroli, parmesan affiné, beurre noisette et truffe noire râpée à table.",
  },
  {
    name: "Tagliatelles fraîches",
    price: "175 DH",
    image: "https://images.unsplash.com/photo-1556760544-74068565f05c?auto=format&fit=crop&w=1000&q=88",
    text: "Pâtes maison, ragù lentement mijoté, tomates San Marzano et basilic frais.",
  },
  {
    name: "Burrata crémeuse",
    price: "150 DH",
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=1000&q=88",
    text: "Burrata des Pouilles, huile d'olive artisanale, figues rôties et fleur de sel.",
  },
  {
    name: "Osso Buco",
    price: "260 DH",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1000&q=88",
    text: "Veau braisé, gremolata au citron, jus corsé et polenta crémeuse au mascarpone.",
  },
  {
    name: "Filet de bœuf",
    price: "320 DH",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1000&q=88",
    text: "Cuisson précise, réduction Barolo, légumes de saison glacés et huile verte.",
  },
  {
    name: "Tiramisu maison",
    price: "95 DH",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1000&q=88",
    text: "Mascarpone fouetté, café italien, cacao amer et biscuit imbibé minute.",
  },
];

const experiences: Array<[LucideIcon, string, string]> = [
  [Leaf, "Produits frais", "Arrivages quotidiens, légumes de saison et herbes du marché."],
  [Utensils, "Cuisine maison", "Pâtes, sauces et desserts préparés sur place chaque jour."],
  [ChefHat, "Chef expérimenté", "Cuisine précise, créative et respectueuse du produit."],
  [Wine, "Vins italiens", "Cave sélectionnée entre Toscane, Piémont et Sicile."],
  [Sparkles, "Service raffiné", "Accueil discret, rythme fluide et attention aux détails."],
];

const gallery = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=88",
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1400&q=88",
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1400&q=88",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1400&q=88",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1400&q=88",
  "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1400&q=88",
];

const reviews = [
  ["Sofia Bellini", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=88", "Une soirée superbe. Les tagliatelles étaient parfaites et le service d'une élégance rare."],
  ["Karim Lahlou", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=88", "On sent le niveau gastronomique sans perdre la chaleur italienne. Le risotto aux truffes est mémorable."],
  ["Claire Moretti", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=88", "Décor romantique, assiettes précises, cave impressionnante. Parfait pour un dîner important."],
  ["Amine Berrada", "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=88", "Le chef maîtrise la simplicité italienne avec une vraie exigence. Tout est juste."],
  ["Leïla Romano", "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=88", "La burrata, l'huile d'olive et le tiramisu donnent l'impression d'être en Toscane."],
  ["Julien Arnaud", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=88", "Adresse haut de gamme, mais jamais froide. Le personnel connaît très bien les vins."],
];

const navLinks = [
  { href: "#histoire", label: "Notre histoire" },
  { href: "#carte", label: "La carte" },
  { href: "#chef", label: "Le chef" },
  { href: "#avis", label: "Avis" },
  { href: "#contact", label: "Nous trouver" },
];

/* ── Decorative Components ───────────────────────── */

function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="block h-px w-10 bg-gradient-to-r from-transparent to-gold/50" />
      <span className="block h-1.5 w-1.5 rotate-45 border border-gold/60" />
      <span className="block h-px w-10 bg-gradient-to-l from-transparent to-gold/50" />
    </div>
  );
}

function GoldRuleDark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="block h-px w-10 bg-gradient-to-r from-transparent to-bordeaux/25" />
      <span className="block h-1.5 w-1.5 rotate-45 border border-bordeaux/30" />
      <span className="block h-px w-10 bg-gradient-to-l from-transparent to-bordeaux/25" />
    </div>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`text-[10px] font-bold uppercase tracking-[0.35em] sm:text-[11px] ${light ? "text-gold" : "text-bordeaux"}`}>
      {children}
    </p>
  );
}

function SectionHeading({ children, light = false, className = "" }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <h2 className={`font-serif text-[26px] font-semibold leading-[1.12] tracking-wide sm:text-4xl lg:text-5xl ${light ? "text-cream" : "text-charcoal"} ${className}`}>
      {children}
    </h2>
  );
}

/* ── Validation Helper ───────────────────────────── */

function validateField(name: string, value: string): string {
  if (name === "nom") {
    if (!value.trim()) return "Le nom est obligatoire.";
    if (value.trim().length < 2) return "Le nom doit comporter au moins 2 caractères.";
  }

  if (name === "phone") {
    if (!value.trim()) return "Le numéro de téléphone est obligatoire.";
    const clean = value.replace(/[\s\-\+\(\)]/g, "");
    if (clean.length < 8 || !/^\+?\d+$/.test(value.trim())) return "Numéro invalide (ex: 06 12 34 56 78).";
  }

  if (name === "email") {
    if (!value.trim()) return "L'adresse email est obligatoire.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Veuillez entrer une adresse email valide.";
  }

  if (name === "date") {
    if (!value) return "Veuillez choisir une date.";
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) return "La date ne peut pas être dans le passé.";
  }

  if (name === "heure") {
    if (!value) return "Veuillez choisir une heure.";
    const parts = value.split(":");
    if (parts.length === 2) {
      const h = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const mins = h * 60 + m;
      const lunchStart = 12 * 60 + 30; // 12h30
      const lunchEnd = 15 * 60;        // 15h00
      const dinnerStart = 19 * 60;     // 19h00
      const dinnerEnd = 23 * 60 + 30;  // 23h30

      if (!((mins >= lunchStart && mins <= lunchEnd) || (mins >= dinnerStart && mins <= dinnerEnd))) {
        return "Horaires : 12h30–15h00 ou 19h00–23h30.";
      }
    }
  }

  if (name === "personnes") {
    if (!value) return "Veuillez indiquer le nombre de personnes.";
  }

  return "";
}

/* ── Main Component ───────────────────────────────── */

export function VillaToscanaPage() {
  const [sent, setSent] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    nom: "",
    phone: "",
    email: "",
    date: "",
    heure: "",
    personnes: "2 personnes",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formErrorMsg, setFormErrorMsg] = useState("");

  // Get today's YYYY-MM-DD for min date attribute
  const todayStr = new Date().toISOString().split("T")[0];

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validate all required fields
    const fieldsToValidate = ["nom", "phone", "email", "date", "heure", "personnes"];
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};

    let hasError = false;
    fieldsToValidate.forEach((field) => {
      newTouched[field] = true;
      const err = validateField(field, formData[field as keyof typeof formData]);
      if (err) {
        newErrors[field] = err;
        hasError = true;
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (hasError) {
      setFormErrorMsg("Veuillez corriger les champs surlignés ci-dessous.");
      return;
    }

    setFormErrorMsg("");
    setSent(true);
    window.setTimeout(() => {
      setSent(false);
      setFormData({
        nom: "",
        phone: "",
        email: "",
        date: "",
        heure: "",
        personnes: "2 personnes",
        message: "",
      });
      setTouched({});
      setErrors({});
    }, 4500);
  }

  return (
    <main className="overflow-hidden bg-cream font-sans text-charcoal">

      {/* ━━ HEADER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bordeaux-deep shadow-luxury-lg backdrop-blur-md"
            : "bg-gradient-to-b from-bordeaux-deep/90 to-bordeaux-deep/70 backdrop-blur-sm"
        }`}
      >
        <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-8" aria-label="Navigation principale">
          <a href="#accueil" className="flex items-center gap-2 font-serif text-[19px] font-semibold tracking-[0.06em] text-cream sm:text-2xl">
            <Grape className="h-4 w-4 text-gold sm:h-5 sm:w-5" />
            Villa Toscana
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/65 lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="relative py-1 transition-colors duration-200 hover:text-gold after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold/60 after:transition-all hover:after:w-full">
                {link.label}
              </a>
            ))}
          </div>

          <a href="#reservation" className="hidden items-center gap-2 bg-gradient-to-r from-gold to-gold-dark px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-bordeaux-deep shadow-gold transition-all duration-200 hover:shadow-gold-glow lg:inline-flex">
            <CalendarDays className="h-3.5 w-3.5" />
            Réserver
          </a>

          {/* Mobile button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-cream/80 active:text-gold lg:hidden"
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-[22px] w-[22px]" />
          </button>
        </nav>
      </header>

      {/* ━━ MOBILE DRAWER ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-charcoal/70 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed bottom-0 right-0 top-0 z-[70] flex w-[300px] max-w-[85vw] flex-col bg-bordeaux-deep shadow-luxury-lg lg:hidden"
            >
              <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

              <div className="flex items-center justify-between px-5 py-4">
                <span className="flex items-center gap-2 font-serif text-lg font-semibold text-cream">
                  <Grape className="h-4 w-4 text-gold" />
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center text-cream/60 active:text-cream"
                  aria-label="Fermer le menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="h-px bg-gradient-to-r from-gold/20 via-gold/10 to-transparent" />

              <div className="flex flex-col gap-0.5 px-4 py-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-sm px-3 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-cream/75 transition-all active:bg-bordeaux-light/20 active:text-cream"
                  >
                    <span className="block h-0.5 w-2 bg-gold/40" />
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="mt-auto px-5 pb-8">
                <div className="mb-5 h-px bg-gradient-to-r from-gold/20 via-gold/10 to-transparent" />
                <a
                  href="#reservation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 bg-gradient-to-r from-gold to-gold-dark px-5 py-4 text-[13px] font-bold uppercase tracking-[0.12em] text-bordeaux-deep shadow-gold"
                >
                  <CalendarDays className="h-4 w-4" />
                  Réserver une table
                </a>
                <div className="mt-6 flex items-center justify-center gap-5 text-cream/40">
                  <a href="https://instagram.com" aria-label="Instagram" className="transition hover:text-gold"><Instagram className="h-5 w-5" /></a>
                  <a href="https://facebook.com" aria-label="Facebook" className="transition hover:text-gold"><Facebook className="h-5 w-5" /></a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="accueil" className="relative flex min-h-[100svh] items-end text-cream">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=90')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bordeaux-deep/50 via-bordeaux-deep/70 to-bordeaux-deep" />
        <div className="absolute inset-0 bg-gradient-to-r from-bordeaux-deep/90 via-bordeaux-deep/30 to-bordeaux-deep/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(46,13,20,0.5)_100%)]" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-24 sm:px-8 sm:pb-14 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="flex items-center gap-3">
              <span className="block h-px w-8 bg-gold/60 sm:w-12" />
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold sm:text-[11px]">
                Cuisine italienne d'exception
              </span>
            </div>

            <h1 className="mt-5 max-w-4xl font-serif text-[32px] font-semibold leading-[1.08] tracking-wide text-cream sm:mt-7 sm:text-5xl lg:text-[72px]">
              L'Italie à votre table,{" "}
              <span className="text-gold">un art de vivre.</span>
            </h1>

            <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-cream/60 sm:mt-6 sm:max-w-xl sm:text-[16px] sm:leading-7">
              Produits d'exception, pâtes fraîches maison et vins de domaines familiaux. Une adresse gastronomique au cœur de Casablanca.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
              <a
                href="#reservation"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold to-gold-dark px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.12em] text-bordeaux-deep shadow-gold transition-all duration-200 hover:shadow-gold-glow sm:text-[13px]"
              >
                Réserver une table
              </a>
              <a
                href="#carte"
                className="inline-flex items-center justify-center gap-2 border border-cream/20 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-cream/80 transition-all duration-200 hover:border-gold/50 hover:text-gold sm:text-[13px]"
              >
                Découvrir la carte <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 sm:mt-12"
          >
            <div className="h-px bg-gradient-to-r from-gold/30 via-gold/10 to-transparent" />
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-4 text-[11px] text-cream/40 sm:gap-x-8 sm:text-[12px]">
              <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-gold/50" /> Corniche, Casablanca</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-gold/50" /> Mar–Dim · 12h30–23h30</span>
              <span className="flex items-center gap-1.5"><Phone className="h-3 w-3 text-gold/50" /> +212 522 77 45 18</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━ HISTOIRE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="histoire" className="bg-cream px-4 py-14 sm:px-8 sm:py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div className="relative min-h-[320px] overflow-hidden shadow-luxury sm:min-h-[480px]">
            <img
              src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1500&q=88"
              alt="Chef préparant une assiette italienne raffinée"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-gold/40 sm:left-5 sm:top-5 sm:h-8 sm:w-8" />
            <div className="absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-gold/40 sm:bottom-5 sm:right-5 sm:h-8 sm:w-8" />

            <div className="absolute inset-x-3 bottom-3 border border-gold/20 bg-bordeaux-deep/90 p-3.5 text-cream backdrop-blur-sm sm:inset-x-5 sm:bottom-5 sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Tradition familiale</p>
              <p className="mt-1.5 font-serif text-base leading-snug sm:text-xl">Des gestes transmis, une précision contemporaine.</p>
            </div>
          </div>

          <div>
            <SectionLabel>Notre histoire</SectionLabel>
            <GoldRuleDark className="mt-3 justify-start" />
            <SectionHeading className="mt-4">
              Une maison italienne née d'une table familiale.
            </SectionHeading>
            <p className="mt-5 text-[14px] leading-7 text-smoke/75 sm:mt-6 sm:text-base sm:leading-8">
              Villa Toscana est née d'un souvenir simple : les dimanches en famille, les pâtes fraîches étirées à la main et l'huile d'olive versée avec générosité. Aujourd'hui, cette tradition devient une expérience gastronomique précise et lumineuse.
            </p>
            <p className="mt-3 text-[14px] leading-7 text-smoke/75 sm:mt-4 sm:text-base sm:leading-8">
              Notre cuisine travaille des produits importés d'Italie, des légumes de saison, des pâtes fraîches maison, des huiles artisanales de Toscane et une cave de vins sélectionnés auprès de domaines familiaux.
            </p>
          </div>
        </div>
      </section>

      {/* ━━ CARTE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="carte" className="relative bg-bordeaux-deep px-4 py-14 text-cream sm:px-8 sm:py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(92,26,40,0.3),transparent_70%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel light>Nos spécialités</SectionLabel>
            <GoldRule className="mt-3" />
            <SectionHeading light className="mt-4">
              Des assiettes pensées comme des pièces d'exception.
            </SectionHeading>
            <p className="mt-3 text-[13px] leading-6 text-cream/50 sm:mt-4 sm:text-base">
              Chaque plat est court, précis et généreux.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
            {specialties.map((item) => (
              <article
                key={item.name}
                className="group overflow-hidden bg-cream text-charcoal shadow-soft transition-all duration-300 hover:shadow-luxury"
              >
                <div className="relative h-44 overflow-hidden sm:h-56">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-xl font-semibold tracking-wide sm:text-2xl">{item.name}</h3>
                    <span className="mt-1 shrink-0 bg-bordeaux-deep px-2.5 py-1 text-[11px] font-bold text-gold">{item.price}</span>
                  </div>
                  <p className="mt-2.5 text-[13px] leading-5 text-smoke/65 sm:mt-3 sm:text-sm sm:leading-6">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ CHEF ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="chef" className="bg-cream-warm px-4 py-14 sm:px-8 sm:py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:gap-16">
          <div>
            <SectionLabel>Le Chef</SectionLabel>
            <GoldRuleDark className="mt-3 justify-start" />
            <SectionHeading className="mt-4">
              Luca Moretti, la rigueur au service de l'émotion.
            </SectionHeading>
            <p className="mt-5 text-[14px] leading-7 text-smoke/75 sm:mt-6 sm:text-base sm:leading-8">
              Formé entre Florence et Milan, le chef Luca Moretti défend une cuisine lisible, élégante et profondément italienne. Sa signature : des produits frais, des sauces courtes, des cuissons précises et une créativité qui ne masque jamais le goût.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 sm:mt-7">
              {["Pâtes fraîches", "Produits nobles", "Dressage précis"].map((tag) => (
                <span key={tag} className="border border-bordeaux/15 bg-cream px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-bordeaux sm:px-4 sm:py-2.5 sm:text-[12px]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="relative min-h-[340px] overflow-hidden shadow-luxury sm:min-h-[520px]">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1400&q=88"
              alt="Chef gastronomique italien"
              className="h-full min-h-[340px] w-full object-cover sm:min-h-[520px]"
            />
            <div className="absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-gold/40 sm:right-5 sm:top-5 sm:h-8 sm:w-8" />
            <div className="absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-gold/40 sm:bottom-5 sm:left-5 sm:h-8 sm:w-8" />
          </div>
        </div>
      </section>

      {/* ━━ EXPÉRIENCE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-cream px-4 py-14 sm:px-8 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>L'expérience</SectionLabel>
            <GoldRuleDark className="mt-3" />
            <SectionHeading className="mt-4">
              Chaque détail compte, du premier au dernier geste.
            </SectionHeading>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-5">
            {experiences.map(([Icon, title, text], idx) => (
              <article
                key={String(title)}
                className={`group border border-charcoal/5 bg-white p-4 shadow-soft transition-all duration-300 hover:shadow-luxury sm:p-5 ${idx === 4 ? "col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="flex h-10 w-10 items-center justify-center bg-bordeaux-deep/5 sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5 text-bordeaux sm:h-6 sm:w-6" />
                </div>
                <h3 className="mt-3 font-serif text-lg font-semibold text-charcoal sm:mt-5 sm:text-xl">{title}</h3>
                <p className="mt-1.5 text-[12px] leading-5 text-smoke/60 sm:mt-2.5 sm:text-[13px] sm:leading-5">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ GALERIE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-bordeaux px-4 py-14 text-cream sm:px-8 sm:py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(201,168,76,0.06),transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel light>Galerie</SectionLabel>
            <GoldRule className="mt-3" />
            <SectionHeading light className="mt-4">
              Cuisine, salle et gestes d'équipe.
            </SectionHeading>
          </div>

          <div className="mt-8 grid auto-rows-[140px] grid-cols-2 gap-2 sm:mt-14 sm:auto-rows-[220px] sm:gap-3 lg:grid-cols-4 lg:gap-4">
            {gallery.map((image, index) => (
              <div
                key={image}
                className={`group relative overflow-hidden ${index === 0 || index === 5 ? "col-span-2 row-span-2" : ""}`}
              >
                <img
                  src={image}
                  alt={"Villa Toscana galerie " + (index + 1)}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 border-2 border-transparent transition-all duration-300 group-hover:border-gold/30" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ AVIS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="avis" className="bg-cream px-4 py-14 sm:px-8 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Avis clients</SectionLabel>
            <GoldRuleDark className="mt-3" />
            <SectionHeading className="mt-4">
              Des dîners qui restent en mémoire.
            </SectionHeading>
          </div>

          <div className="mt-8 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {reviews.map(([name, avatar, text]) => (
              <article key={name} className="border border-charcoal/5 bg-white p-4 shadow-soft sm:p-6">
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-[13px] leading-6 text-smoke/70 sm:mt-4 sm:text-sm sm:leading-7">"{text}"</p>
                <div className="mt-4 flex items-center gap-3 sm:mt-5">
                  <img src={avatar} alt={name} className="h-9 w-9 rounded-full object-cover ring-2 ring-gold/15 sm:h-10 sm:w-10" />
                  <p className="text-[13px] font-semibold text-charcoal sm:text-sm">{name}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ RÉSERVATION (Refondu & Aligné Mobile) ━━━━━━━ */}
      <section id="reservation" className="relative bg-bordeaux-deep px-4 py-14 text-cream sm:px-8 sm:py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,168,76,0.06),transparent_50%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          <div className="flex flex-col justify-center">
            <SectionLabel light>Réservation</SectionLabel>
            <GoldRule className="mt-3 justify-start" />
            <SectionHeading light className="mt-4">
              Réserver votre table chez Villa Toscana.
            </SectionHeading>
            <p className="mt-4 text-[14px] leading-7 text-cream/55 sm:mt-5 sm:text-base sm:leading-8">
              Notre équipe confirme chaque demande avec soin. Pour les événements privés ou régimes particuliers, précisez vos demandes dans le message.
            </p>

            <div className="mt-6 space-y-2.5 text-[13px] text-cream/45 sm:mt-8">
              <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-gold/50" /> +212 522 77 45 18</p>
              <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-gold/50" /> reservation@villatoscana.ma</p>
              <p className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-gold/50" /> Service : 12h30–15h00 & 19h00–23h30</p>
            </div>
          </div>

          <form onSubmit={submit} noValidate className="border border-gold/20 bg-cream p-5 text-charcoal shadow-luxury sm:p-7">
            <div className="mb-5 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent sm:mb-6" />

            {formErrorMsg && (
              <div className="mb-5 flex items-center gap-2 border border-red-600/30 bg-red-50 p-3 text-[13px] font-medium text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{formErrorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Nom */}
              <div>
                <label htmlFor="nom-field" className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-smoke/75">
                  <User className="h-3.5 w-3.5 text-bordeaux" /> Nom complet *
                </label>
                <input
                  id="nom-field"
                  name="nom"
                  type="text"
                  value={formData.nom}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="ex: Jean Dupont"
                  aria-invalid={!!errors.nom}
                  className={`h-[46px] w-full border bg-white px-3.5 text-sm text-charcoal outline-none transition ${
                    errors.nom && touched.nom
                      ? "border-red-600 bg-red-50/20 focus:border-red-600"
                      : "border-charcoal/15 focus:border-bordeaux"
                  }`}
                />
                {errors.nom && touched.nom && (
                  <p className="mt-1 flex items-center gap-1 text-[12px] font-medium text-red-600">
                    <AlertCircle className="h-3 w-3 shrink-0" /> {errors.nom}
                  </p>
                )}
              </div>

              {/* Téléphone */}
              <div>
                <label htmlFor="phone-field" className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-smoke/75">
                  <Phone className="h-3.5 w-3.5 text-bordeaux" /> Téléphone *
                </label>
                <input
                  id="phone-field"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="ex: 06 12 34 56 78"
                  aria-invalid={!!errors.phone}
                  className={`h-[46px] w-full border bg-white px-3.5 text-sm text-charcoal outline-none transition ${
                    errors.phone && touched.phone
                      ? "border-red-600 bg-red-50/20 focus:border-red-600"
                      : "border-charcoal/15 focus:border-bordeaux"
                  }`}
                />
                {errors.phone && touched.phone && (
                  <p className="mt-1 flex items-center gap-1 text-[12px] font-medium text-red-600">
                    <AlertCircle className="h-3 w-3 shrink-0" /> {errors.phone}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <label htmlFor="email-field" className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-smoke/75">
                  <Mail className="h-3.5 w-3.5 text-bordeaux" /> Adresse email *
                </label>
                <input
                  id="email-field"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="ex: contact@exemple.com"
                  aria-invalid={!!errors.email}
                  className={`h-[46px] w-full border bg-white px-3.5 text-sm text-charcoal outline-none transition ${
                    errors.email && touched.email
                      ? "border-red-600 bg-red-50/20 focus:border-red-600"
                      : "border-charcoal/15 focus:border-bordeaux"
                  }`}
                />
                {errors.email && touched.email && (
                  <p className="mt-1 flex items-center gap-1 text-[12px] font-medium text-red-600">
                    <AlertCircle className="h-3 w-3 shrink-0" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date-field" className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-smoke/75">
                  <Calendar className="h-3.5 w-3.5 text-bordeaux" /> Date *
                </label>
                <input
                  id="date-field"
                  name="date"
                  type="date"
                  min={todayStr}
                  value={formData.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.date}
                  className={`h-[46px] w-full border bg-white px-3.5 text-sm text-charcoal outline-none transition ${
                    errors.date && touched.date
                      ? "border-red-600 bg-red-50/20 focus:border-red-600"
                      : "border-charcoal/15 focus:border-bordeaux"
                  }`}
                />
                {errors.date && touched.date && (
                  <p className="mt-1 flex items-center gap-1 text-[12px] font-medium text-red-600">
                    <AlertCircle className="h-3 w-3 shrink-0" /> {errors.date}
                  </p>
                )}
              </div>

              {/* Heure */}
              <div>
                <label htmlFor="heure-field" className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-smoke/75">
                  <Clock className="h-3.5 w-3.5 text-bordeaux" /> Heure *
                </label>
                <input
                  id="heure-field"
                  name="heure"
                  type="time"
                  step="900"
                  value={formData.heure}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.heure}
                  className={`h-[46px] w-full border bg-white px-3.5 text-sm text-charcoal outline-none transition ${
                    errors.heure && touched.heure
                      ? "border-red-600 bg-red-50/20 focus:border-red-600"
                      : "border-charcoal/15 focus:border-bordeaux"
                  }`}
                />
                {errors.heure && touched.heure && (
                  <p className="mt-1 flex items-center gap-1 text-[12px] font-medium text-red-600">
                    <AlertCircle className="h-3 w-3 shrink-0" /> {errors.heure}
                  </p>
                )}
              </div>

              {/* Nombre de personnes */}
              <div className="sm:col-span-2">
                <label htmlFor="personnes-field" className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-smoke/75">
                  <Users className="h-3.5 w-3.5 text-bordeaux" /> Nombre de personnes *
                </label>
                <select
                  id="personnes-field"
                  name="personnes"
                  value={formData.personnes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="h-[46px] w-full border border-charcoal/15 bg-white px-3.5 text-sm text-charcoal outline-none transition focus:border-bordeaux"
                >
                  <option value="1 personne">1 personne</option>
                  <option value="2 personnes">2 personnes</option>
                  <option value="3 personnes">3 personnes</option>
                  <option value="4 personnes">4 personnes</option>
                  <option value="5 personnes">5 personnes</option>
                  <option value="6 personnes ou plus">6 personnes ou plus</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="mt-4">
              <label htmlFor="message-field" className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-smoke/75">
                Message ou demande spéciale (optionnel)
              </label>
              <textarea
                id="message-field"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Ex: Table près de la fenêtre, allergie alimentaire, anniversaire..."
                rows={3}
                className="w-full resize-none border border-charcoal/15 bg-white px-3.5 py-3 text-sm text-charcoal outline-none transition placeholder:text-smoke/45 focus:border-bordeaux"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-gradient-to-r from-bordeaux to-bordeaux-deep px-6 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-cream shadow-luxury transition-all duration-200 hover:shadow-luxury-lg active:scale-[0.99] sm:text-[13px]"
            >
              Confirmer la réservation <CalendarDays className="h-4 w-4" />
            </button>

            {/* Success Message */}
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2.5 border border-emerald-600/30 bg-emerald-50 p-3 text.sm font-semibold text-emerald-800"
              >
                <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>Merci ! Votre réservation a été transmise. Notre équipe vous recontactera rapidement pour confirmer.</span>
              </motion.div>
            )}
          </form>
        </div>
      </section>

      {/* ━━ CONTACT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="contact" className="bg-cream px-4 py-14 sm:px-8 sm:py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-4 sm:gap-6 lg:grid-cols-[1fr_0.82fr] lg:gap-8">
          <div className="min-h-[260px] overflow-hidden border border-charcoal/5 shadow-soft sm:min-h-[380px]">
            <iframe
              title="Carte Villa Toscana Casablanca"
              src="https://www.google.com/maps?q=Boulevard%20de%20la%20Corniche%20Casablanca&z=14&output=embed"
              className="h-full min-h-[260px] w-full border-0 sm:min-h-[380px]"
              loading="lazy"
            />
          </div>
          <div className="relative bg-bordeaux-deep p-5 text-cream shadow-luxury sm:p-8 lg:p-10">
            <div className="absolute left-4 top-4 h-5 w-5 border-l border-t border-gold/30 sm:h-7 sm:w-7" />
            <div className="absolute bottom-4 right-4 h-5 w-5 border-b border-r border-gold/30 sm:h-7 sm:w-7" />

            <p className="font-serif text-2xl font-semibold tracking-wide sm:text-3xl lg:text-4xl">Villa Toscana</p>
            <GoldRule className="mt-4 justify-start" />
            <div className="mt-5 space-y-3.5 text-cream/70 sm:mt-7 sm:space-y-4">
              <p className="flex gap-3 text-[13px] sm:text-base"><MapPin className="h-4 w-4 shrink-0 text-gold sm:h-5 sm:w-5" /> Boulevard de la Corniche, Casablanca</p>
              <p className="flex gap-3 text-[13px] sm:text-base"><Clock className="h-4 w-4 shrink-0 text-gold sm:h-5 sm:w-5" /> Mardi – dimanche : 12h30–15h00 · 19h00–23h30</p>
              <p className="flex gap-3 text-[13px] sm:text-base"><Phone className="h-4 w-4 shrink-0 text-gold sm:h-5 sm:w-5" /> +212 522 77 45 18</p>
              <p className="flex gap-3 text-[13px] sm:text-base"><Mail className="h-4 w-4 shrink-0 text-gold sm:h-5 sm:w-5" /> reservation@villatoscana.ma</p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ FOOTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer className="bg-bordeaux-deep px-4 py-7 text-cream sm:px-8 sm:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl pt-6 sm:pt-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="flex items-center gap-2 font-serif text-xl font-semibold tracking-wide sm:text-2xl lg:text-3xl">
                <Grape className="h-4 w-4 text-gold" />
                Villa Toscana
              </p>
              <p className="mt-1 text-[11px] text-cream/35 sm:text-[12px]">Restaurant italien gastronomique · Casablanca</p>
            </div>
            <div className="flex flex-wrap gap-3 text-[11px] text-cream/45 sm:gap-5 sm:text-[12px]">
              <a href="#carte" className="transition hover:text-gold">La carte</a>
              <a href="#chef" className="transition hover:text-gold">Le chef</a>
              <a href="#reservation" className="transition hover:text-gold">Réservation</a>
              <a href="#contact" className="transition hover:text-gold">Contact</a>
            </div>
            <div className="flex gap-4 text-gold/50">
              <a href="https://instagram.com" aria-label="Instagram" className="transition hover:text-gold"><Instagram className="h-5 w-5" /></a>
              <a href="https://facebook.com" aria-label="Facebook" className="transition hover:text-gold"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>
          <p className="mt-5 text-[10px] text-cream/20 sm:mt-6 sm:text-[11px]">© {new Date().getFullYear()} Villa Toscana. Tous droits réservés.</p>
        </div>
      </footer>
    </main>
  );
}
