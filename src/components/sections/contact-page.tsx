0"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCopy,
  Globe,
  Headphones,
  Landmark,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getContactCsrfToken,
  submitContactQuery,
  type ContactQueryPayload,
} from "@/features/contact/contact-api";

const COMPANY_NAME = "Kotnala Consultancy Private Limited";
const COMPANY_CIN = "U62099UT2026OPC021331";
const COMPANY_ADDRESS = [
  "Shiv Shakti Enclave,",
  "Mamchand Chowk,",
  "Balawala,",
  "Nakronda,",
  "Dehradun,",
  "UK",
].join("\n");

const whatsappMessage =
  "Hi there, I want to learn more about Kotnala Consultancy's approach.";
const whatsappLink = `https://wa.me/917011804564?text=${encodeURIComponent(whatsappMessage)}`;

const officeCards = [
  {
    id: "uk-hq",
    title: "Headquater",
    lines: [
      "Shiv Shakti Enclave,",
      "Mamchand Chowk,",
      "Balawala,",
      "Nakronda,",
      "Dehradun,",
      "UK",
    ],
    zip: "248008",
  },
  {
    id: "uk-delhi",
    title: "Delhi Branch",
    lines: ["Surajmal Vihar,", "East Delhi,", "Delhi,", "UK"],
    zip: "110032",
  },
  {
    id: "us",
    title: "United States",
    lines: ["18 E Gray St", "Des Moines", "IA", "USA"],
    zip: "50315",
  },
  {
    id: "uk",
    title: "United Kingdom",
    lines: ["Holmquarry Rd", "Riccarton", "Kilmarnock", "KA1 4DA", "United Kingdom"],
    zip: "KA1 4DA",
  },
] as const;

const channels = [
  {
    id: "office",
    title: "Office",
    email: "office@kotnala.com",
    description: "Official communication and technical consultation.",
  },
  {
    id: "uk-ops",
    title: "UK Operations",
    email: "divyansh@kotnala.consulting",
    description: "Operations Management Team",
  },
  {
    id: "uk-consultation",
    title: "UK Consultation",
    email: "divyansh.consultant@kotnala.consulting",
    description: "Consultation Management Team",
  },
  {
    id: "us-consultation",
    title: "US Consultation",
    email: "divyansh.consultant@kotnala.us",
    description: "US Consultation Team",
  },
  {
    id: "us-ops",
    title: "US Operations",
    email: "divyansh@kotnala.us",
    description: "US Operations Team",
  },
] as const;

type ValidationState = {
  email: string | null;
  subject: string | null;
  problem: string | null;
};

const MIN_QUERY_LENGTH = 40;
const MAX_QUERY_LENGTH = 1800;

function MagneticLinkButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [transformStyle, setTransformStyle] = useState("translate3d(0,0,0)");

  return (
    <Link
      href={href}
      className={cn(buttonVariants({ size: "lg" }), "relative overflow-hidden", className)}
      onMouseMove={(event) => {
        const node = event.currentTarget;
        const rect = node.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
        setTransformStyle(`translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`);
      }}
      onMouseLeave={() => {
        setTransformStyle("translate3d(0,0,0)");
      }}
    >
      <span style={{ transform: transformStyle }} className="inline-flex items-center gap-2 transition-transform duration-200">
        {children}
      </span>
    </Link>
  );
}

function CorporateInfoCard({
  icon: Icon,
  title,
  value,
  canCopy,
  onCopy,
  copied,
}: {
  icon: typeof Building2;
  title: string;
  value: string;
  canCopy?: boolean;
  onCopy?: () => void;
  copied?: boolean;
}) {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="interactive-card group rounded-3xl border border-white/12 bg-white/6 p-6 shadow-floating backdrop-blur-xl"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-white/80">
          <Icon className="size-4 text-cyan-300" aria-hidden="true" />
          {title}
        </div>
        {canCopy ? (
          <button
            type="button"
            aria-label={`Copy ${title}`}
            onClick={onCopy}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-black/20 text-white/80 transition hover:border-cyan-300/70 hover:text-white"
          >
            {copied ? <CheckCircle2 className="size-4 text-emerald-300" /> : <ClipboardCopy className="size-4" />}
          </button>
        ) : null}
      </div>
      <p className="whitespace-pre-line text-sm leading-6 text-white/90">{value}</p>
    </motion.article>
  );
}

export function ContactPageSections() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState("");
  const [csrfLoading, setCsrfLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [problem, setProblem] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  const particles = useMemo(
    () =>
    Array.from({ length: 14 }, (_, index) => ({
      id: `particle-${index}`,
      left: 6 + index * 6.2,
      duration: 5 + (index % 4),
      delay: index * 0.22,
    })),
    [],
  );

  const [fieldTouched, setFieldTouched] = useState({
    email: false,
    subject: false,
    problem: false,
  });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const dialogTitleId = useId();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setCsrfLoading(true);
        const data = await getContactCsrfToken();
        setCsrfToken(data.csrf_token);
      } catch (error) {
        setErrorText(error instanceof Error ? error.message : "Unable to initialize contact form.");
      } finally {
        setCsrfLoading(false);
      }
    };

    void fetchToken();
  }, []);

  useEffect(() => {
    const node = textareaRef.current;
    if (!node) {
      return;
    }

    node.style.height = "0px";
    node.style.height = `${Math.min(node.scrollHeight, 420)}px`;
  }, [problem]);

  useEffect(() => {
    if (!showConfirm) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowConfirm(false);
      }
    };

    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [showConfirm]);

  const validation = useMemo<ValidationState>(() => {
    const next: ValidationState = {
      email: null,
      subject: null,
      problem: null,
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }

    if (subject.trim().length < 8) {
      next.subject = "Subject should be at least 8 characters.";
    }

    if (problem.trim().length < MIN_QUERY_LENGTH) {
      next.problem = `Please provide at least ${MIN_QUERY_LENGTH} characters.`;
    }

    if (problem.length > MAX_QUERY_LENGTH) {
      next.problem = `Query must be less than ${MAX_QUERY_LENGTH} characters.`;
    }

    return next;
  }, [email, subject, problem]);

  const isValid = !validation.email && !validation.subject && !validation.problem;

  const copyText = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(key);
      window.setTimeout(() => setCopiedField(null), 1800);
    } catch {
      setErrorText("Clipboard access is blocked. Please copy manually.");
    }
  };

  const clearForm = () => {
    setEmail("");
    setSubject("");
    setProblem("");
    setWebsite("");
    setFieldTouched({
      email: false,
      subject: false,
      problem: false,
    });
    setErrorText(null);
  };

  const handleSubmit = async () => {
    if (!isValid || !csrfToken || isSubmitting) {
      return;
    }

    const payload: ContactQueryPayload = {
      email: email.trim(),
      subject: subject.trim(),
      problem: problem.trim(),
      website: website.trim(),
    };

    try {
      setIsSubmitting(true);
      setErrorText(null);
      const result = await submitContactQuery(payload, csrfToken);
      setSuccessRef(result.reference_id);
      setShowConfirm(false);
    } catch (error) {
      setErrorText(error instanceof Error ? error.message : "Unable to send your query.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="main-content" className="relative flex-1 overflow-hidden bg-[#060a12] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(40,122,196,0.28)_0%,transparent_34%),radial-gradient(circle_at_82%_82%,rgba(41,173,142,0.22)_0%,transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid-subtle opacity-60" />

      <section className="layout-container relative pt-20 pb-14 sm:pt-24 sm:pb-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
          <Reveal>
            <div className="space-y-6">
              <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1 text-xs font-semibold tracking-[0.16em] text-cyan-100 uppercase">
                Enterprise Contact Desk
              </p>
              <h1 className="max-w-2xl text-balance font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Contact Kotnala Consultancy
              </h1>
              <p className="max-w-2xl text-balance text-base leading-7 text-white/78 sm:text-lg">
                Whether you&apos;re planning a digital transformation, building AI systems, modernizing
                enterprise software, or looking for technical leadership, our team is ready to help.
              </p>
              <div className="flex flex-wrap gap-3">
                <MagneticLinkButton href="/book-call" className="bg-cyan-300 text-slate-900 hover:bg-cyan-200">
                  Book Strategy Call
                  <ArrowRight className="size-4" aria-hidden="true" />
                </MagneticLinkButton>
                <MagneticLinkButton href="#communication-channels" className="border border-white/25 bg-white/6 text-white hover:bg-white/10">
                  Contact Operations
                </MagneticLinkButton>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative rounded-3xl border border-white/12 bg-white/6 p-6 shadow-floating backdrop-blur-xl"
            >
              <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_22%_18%,rgba(99,197,255,0.3)_0%,transparent_36%)]" />
              <div className="relative grid gap-4 sm:grid-cols-2">
                {["UK HQ", "Global Delivery", "Consulting Ops", "Response SLA <24h"].map((label, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: 0.12 + index * 0.08 }}
                    className="rounded-2xl border border-white/10 bg-black/22 p-4"
                  >
                    <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-200/40 bg-cyan-300/15 text-cyan-100">
                      <Globe className="size-4" aria-hidden="true" />
                    </div>
                    <p className="text-sm font-medium text-white/90">{label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <section className="layout-container relative pb-16 sm:pb-20">
        <Reveal>
          <div className="mb-6 flex items-center gap-2 text-sm font-medium text-cyan-100/90">
            <Landmark className="size-4" aria-hidden="true" />
            Corporate Information
          </div>
        </Reveal>
        <Reveal stagger>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <CorporateInfoCard icon={Building2} title="Company Name" value={COMPANY_NAME} />
            <CorporateInfoCard
              icon={ShieldCheck}
              title="CIN"
              value={COMPANY_CIN}
              canCopy
              copied={copiedField === "cin"}
              onCopy={() => void copyText("cin", COMPANY_CIN)}
            />
            <CorporateInfoCard
              icon={MapPin}
              title="Headquarters"
              value={COMPANY_ADDRESS}
              canCopy
              copied={copiedField === "hq"}
              onCopy={() => void copyText("hq", COMPANY_ADDRESS)}
            />
            <CorporateInfoCard icon={MessageSquare} title="ZIP Code" value="248008" />
          </div>
        </Reveal>
      </section>

      <section className="layout-container relative pb-16 sm:pb-20">
        <Reveal>
          <div className="mb-6 flex items-center gap-2 text-sm font-medium text-cyan-100/90">
            <Building2 className="size-4" aria-hidden="true" />
            Global Offices
          </div>
        </Reveal>

        <Reveal stagger>
          <div className="grid gap-4 md:grid-cols-2">
            {officeCards.map((office) => (
              <motion.article
                key={office.id}
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="group rounded-3xl border border-white/12 bg-white/6 p-6 shadow-floating backdrop-blur-xl"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="inline-flex items-center gap-2 text-lg font-semibold text-white">
                    {office.title}
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-black/25 text-cyan-200">
                    <Building2 className="size-4" aria-hidden="true" />
                  </span>
                </div>
                <p className="whitespace-pre-line text-sm leading-6 text-white/85">{office.lines.join("\n")}</p>
                <div className="mt-4 inline-flex rounded-full border border-emerald-300/35 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                  ZIP {office.zip}
                </div>
              </motion.article>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="communication-channels" className="layout-container relative pb-16 sm:pb-20">
        <Reveal>
          <div className="mb-6 flex items-center gap-2 text-sm font-medium text-cyan-100/90">
            <Headphones className="size-4" aria-hidden="true" />
            Communication Channels
          </div>
        </Reveal>

        <Reveal stagger>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {channels.map((channel) => (
              <motion.article
                key={channel.id}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="group rounded-3xl border border-white/12 bg-white/6 p-5 shadow-floating backdrop-blur-xl"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-200/30 bg-cyan-300/12 text-cyan-100">
                    <Mail className="size-4" aria-hidden="true" />
                  </div>
                  <button
                    type="button"
                    aria-label={`Copy ${channel.title} email`}
                    onClick={() => void copyText(channel.id, channel.email)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/14 bg-black/22 text-white/80 transition hover:border-cyan-300/70 hover:text-white"
                  >
                    {copiedField === channel.id ? (
                      <CheckCircle2 className="size-4 text-emerald-300" />
                    ) : (
                      <ClipboardCopy className="size-4" />
                    )}
                  </button>
                </div>
                <p className="text-sm font-semibold text-white">{channel.title}</p>
                <p className="mt-1 text-sm text-cyan-100">{channel.email}</p>
                <p className="mt-2 text-sm text-white/72">{channel.description}</p>
              </motion.article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <a
              href="https://linkedin.com/company/kotnala"
              target="_blank"
              rel="noreferrer"
              className="interactive-card rounded-3xl border border-white/12 bg-white/6 p-5 text-sm text-white shadow-floating backdrop-blur-xl hover:border-cyan-300/55"
            >
              <p className="font-semibold">LinkedIn Company</p>
              <p className="mt-1 text-white/74">Visit Company LinkedIn</p>
            </a>
            <a
              href="https://linkedin.com/in/divyanshkotnala"
              target="_blank"
              rel="noreferrer"
              className="interactive-card rounded-3xl border border-white/12 bg-white/6 p-5 text-sm text-white shadow-floating backdrop-blur-xl hover:border-cyan-300/55"
            >
              <p className="font-semibold">LinkedIn Founder</p>
              <p className="mt-1 text-white/74">Connect with Founder</p>
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="interactive-card rounded-3xl border border-white/12 bg-white/6 p-5 text-sm text-white shadow-floating backdrop-blur-xl hover:border-emerald-300/55"
            >
              <p className="font-semibold">WhatsApp</p>
              <p className="mt-1 text-white/74">WhatsApp Us</p>
            </a>
            <div className="rounded-3xl border border-white/12 bg-white/6 p-5 text-sm text-white shadow-floating backdrop-blur-xl">
              <p className="font-semibold">Phone</p>
              <p className="mt-1 text-cyan-100">+91 7011804564</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="layout-container relative pb-16 sm:pb-20">
        <Reveal>
          <div className="mb-6 flex items-center gap-2 text-sm font-medium text-cyan-100/90">
            <MessageSquare className="size-4" aria-hidden="true" />
            Ask Our Team
          </div>
        </Reveal>

        <Reveal>
          <div className="rounded-3xl border border-white/12 bg-white/6 p-6 shadow-floating backdrop-blur-xl sm:p-8">
            {successRef ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-start gap-5"
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 15 }}
                  className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-300/12"
                >
                  <CheckCircle2 className="size-10 text-emerald-300" aria-hidden="true" />
                </motion.div>
                <div className="space-y-3">
                  <h2 className="font-heading text-2xl font-semibold text-white">Thank you for contacting Kotnala Consultancy.</h2>
                  <p className="max-w-2xl text-sm leading-7 text-white/78">
                    Our team has received your query. We will get back to you on your registered email
                    address. Please keep checking your inbox (and spam folder if necessary).
                  </p>
                  <p className="text-xs text-cyan-100/90">Reference ID: {successRef}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => {
                      setSuccessRef(null);
                      clearForm();
                    }}
                    className="bg-cyan-300 text-slate-900 hover:bg-cyan-200"
                  >
                    Ask Another Question
                  </Button>
                  <Link href="/book-call" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white/22 bg-transparent text-white hover:bg-white/8")}>
                    Book Strategy Call
                  </Link>
                  <Link href="/" className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "text-white hover:bg-white/8")}>
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            ) : csrfLoading ? (
              <div className="space-y-4" aria-live="polite" aria-busy="true">
                <div className="h-8 w-56 animate-pulse rounded-xl bg-white/10" />
                <div className="h-12 w-full animate-pulse rounded-xl bg-white/10" />
                <div className="h-12 w-full animate-pulse rounded-xl bg-white/10" />
                <div className="h-44 w-full animate-pulse rounded-2xl bg-white/10" />
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setFieldTouched({ email: true, subject: true, problem: true });
                  if (isValid) {
                    setShowConfirm(true);
                  }
                }}
                noValidate
              >
                <label className="block space-y-2 text-sm">
                  <span className="font-medium text-white">Email Address</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onBlur={() => setFieldTouched((prev) => ({ ...prev, email: true }))}
                    onChange={(event) => setEmail(event.target.value)}
                    aria-invalid={Boolean(fieldTouched.email && validation.email)}
                    aria-label="Email Address"
                    className="h-12 w-full rounded-2xl border border-white/14 bg-black/25 px-4 text-sm text-white placeholder:text-white/45 outline-none transition focus:border-cyan-300/70 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.2)]"
                    placeholder="you@company.com"
                  />
                  {fieldTouched.email && validation.email ? <p className="text-xs text-rose-300">{validation.email}</p> : null}
                </label>

                <label className="block space-y-2 text-sm">
                  <span className="font-medium text-white">Subject / Query Title</span>
                  <input
                    type="text"
                    required
                    value={subject}
                    onBlur={() => setFieldTouched((prev) => ({ ...prev, subject: true }))}
                    onChange={(event) => setSubject(event.target.value)}
                    aria-invalid={Boolean(fieldTouched.subject && validation.subject)}
                    aria-label="Subject / Query Title"
                    className="h-12 w-full rounded-2xl border border-white/14 bg-black/25 px-4 text-sm text-white placeholder:text-white/45 outline-none transition focus:border-cyan-300/70 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.2)]"
                    placeholder="Tell us what you need help with"
                  />
                  {fieldTouched.subject && validation.subject ? <p className="text-xs text-rose-300">{validation.subject}</p> : null}
                </label>

                <label className="hidden" aria-hidden="true">
                  <span>Website</span>
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                  />
                </label>

                <label className="block space-y-2 text-sm">
                  <span className="font-medium text-white">Describe your problem</span>
                  <textarea
                    ref={textareaRef}
                    required
                    value={problem}
                    onBlur={() => setFieldTouched((prev) => ({ ...prev, problem: true }))}
                    onChange={(event) => setProblem(event.target.value)}
                    aria-invalid={Boolean(fieldTouched.problem && validation.problem)}
                    aria-label="Describe your problem"
                    className="min-h-[170px] w-full resize-none rounded-2xl border border-white/14 bg-black/25 px-4 py-3 text-sm leading-6 text-white placeholder:text-white/45 outline-none transition focus:border-cyan-300/70 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.2)]"
                    placeholder="Share your current architecture, constraints, timeline, and expected outcomes."
                  />
                  <div className="flex items-center justify-between gap-3 text-xs text-white/62">
                    <span>{Math.max(0, MIN_QUERY_LENGTH - problem.trim().length)} chars to minimum</span>
                    <span>{problem.length}/{MAX_QUERY_LENGTH}</span>
                  </div>
                  {fieldTouched.problem && validation.problem ? <p className="text-xs text-rose-300">{validation.problem}</p> : null}
                </label>

                {errorText ? <p className="rounded-xl border border-rose-300/40 bg-rose-300/10 px-3 py-2 text-xs text-rose-200">{errorText}</p> : null}

                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting || !csrfToken}
                  className="h-12 bg-cyan-300 px-6 text-slate-900 hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-55"
                >
                  {isSubmitting ? <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" /> : <Send className="mr-2 size-4" aria-hidden="true" />}
                  Submit Query
                </Button>
              </form>
            )}
          </div>
        </Reveal>
      </section>

      <section className="layout-container relative pb-16 sm:pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br from-cyan-400/18 via-sky-300/7 to-emerald-300/12 p-8 shadow-floating backdrop-blur-xl sm:p-10">
            <div className="pointer-events-none absolute inset-0">
              {particles.map((particle) => (
                <motion.span
                  key={particle.id}
                  className="absolute top-full h-2 w-2 rounded-full bg-cyan-100/40"
                  style={{ left: `${particle.left}%` }}
                  animate={{ y: [-10, -320], opacity: [0, 0.7, 0] }}
                  transition={{
                    duration: particle.duration,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: particle.delay,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 max-w-3xl space-y-4">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-white">Need a Technical Discussion?</h2>
              <p className="text-sm leading-7 text-white/82 sm:text-base">
                Schedule a one-to-one strategy session with our consulting team to discuss software
                architecture, AI adoption, cloud modernization, enterprise systems, or CTO-as-a-Service.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/book-call" className={cn(buttonVariants({ size: "lg" }), "bg-cyan-300 text-slate-900 hover:bg-cyan-200")}>
                  Book Strategy Call
                </Link>
                <Link href="/services/technology-consulting" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white/25 bg-transparent text-white hover:bg-white/8")}>
                  Learn About Consulting
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="layout-container relative pb-24">
        <Reveal>
          <div className="rounded-3xl border border-white/12 bg-white/6 p-6 shadow-floating backdrop-blur-xl sm:p-8">
            <p className="text-sm font-semibold text-white">Need more information?</p>
            <p className="mt-2 text-sm leading-7 text-white/75">
              Read our Terms &amp; Conditions before scheduling a consultation.
            </p>
            <div className="mt-4">
              <Link
                href="/terms-and-conditions"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white/25 bg-transparent text-white hover:bg-white/8")}
              >
                View Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <AnimatePresence>
        {showConfirm ? (
          <motion.div
            className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-[#01040a]/75 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={dialogTitleId}
              initial={{ y: 24, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl rounded-3xl border border-white/14 bg-[#0b1322] p-6 shadow-floating"
              onClick={(event) => event.stopPropagation()}
            >
              <h3 id={dialogTitleId} className="font-heading text-xl font-semibold text-white">
                Please confirm your email address
              </h3>
              <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-black/22 p-4 text-sm text-white/86">
                <p>
                  <span className="text-white/60">Entered Email:</span> {email.trim()}
                </p>
                <p>
                  <span className="text-white/60">Entered Subject:</span> {subject.trim()}
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="border-white/20 bg-transparent text-white hover:bg-white/8"
                  onClick={() => setShowConfirm(false)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  disabled={isSubmitting}
                  className="bg-cyan-300 text-slate-900 hover:bg-cyan-200"
                  onClick={() => void handleSubmit()}
                >
                  {isSubmitting ? <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" /> : null}
                  Send Query
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
