import Image from "next/image";
import { Link } from "@/i18n/routing";
import WhatsAppIcon from "@/components/icons/WhatsApp";
import { getTranslations } from "next-intl/server";

const WHATSAPP_LINKS = {
  general:
    "https://api.whatsapp.com/send?phone=+573113988094&text=Hola%20%F0%9F%91%8B%20Estoy%20evaluando%20crear%20o%20mejorar%20mi%20proyecto%20digital%20y%20quiero%20asesoria.",
  web: "https://api.whatsapp.com/send?phone=+573113988094&text=Hola%20%F0%9F%91%8B%20Quiero%20cotizar%20una%20web%20corporativa%20o%20landing%20orientada%20a%20leads.",
  ecommerce:
    "https://api.whatsapp.com/send?phone=+573113988094&text=Hola%20%F0%9F%91%8B%20Quiero%20cotizar%20un%20e-commerce%20con%20enfoque%20en%20conversion%20y%20operacion.",
  custom:
    "https://api.whatsapp.com/send?phone=+573113988094&text=Hola%20%F0%9F%91%8B%20Quiero%20cotizar%20software%20a%20medida%20para%20digitalizar%20procesos.",
  discovery:
    "https://api.whatsapp.com/send?phone=+573113988094&text=Hola%20%F0%9F%91%8B%20Quiero%20agendar%20una%20llamada%20de%20descubrimiento.",
};

const SERVICE_CTA_URL = {
  web: WHATSAPP_LINKS.web,
  ecommerce: WHATSAPP_LINKS.ecommerce,
  custom: WHATSAPP_LINKS.custom,
};

const SERVICE_STYLES = {
  web: {
    accent: "bg-primary-600 dark:bg-primary-500",
    badge:
      "border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-800 dark:bg-primary-950/50 dark:text-primary-300",
    icon: "bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300",
    ctaBg: "bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600",
    ctaBorder: "border-primary-500 dark:border-primary-600",
  },
  ecommerce: {
    accent: "bg-crusta-600 dark:bg-crusta-500",
    badge:
      "border-crusta-200 bg-crusta-50 text-crusta-700 dark:border-crusta-800 dark:bg-crusta-950/50 dark:text-crusta-300",
    icon: "bg-crusta-100 text-crusta-700 dark:bg-crusta-900/50 dark:text-crusta-300",
    ctaBg: "bg-crusta-600 hover:bg-crusta-700 dark:bg-crusta-500 dark:hover:bg-crusta-600",
    ctaBorder: "border-crusta-500 dark:border-crusta-600",
  },
  custom: {
    accent: "bg-emerald-600 dark:bg-emerald-500",
    badge:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
    icon: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
    ctaBg: "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600",
    ctaBorder: "border-emerald-500 dark:border-emerald-600",
  },
};

const IconBase = ({ className = "size-4", children }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

const CursorClickIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M12 3v8" />
    <path d="M8 7h8" />
    <path d="M8.5 13.5 6 20l4-2.1 2.2 3.1 2.3-1.3-2.2-3.1 4.2-.5z" />
  </IconBase>
);

const BagIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M7 9V7a5 5 0 0 1 10 0v2" />
    <path d="M4 9h16l-1.2 10.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8z" />
    <path d="M10 13h4" />
  </IconBase>
);

const WorkflowIcon = ({ className }) => (
  <IconBase className={className}>
    <rect x="3" y="4" width="8" height="6" rx="1.5" />
    <rect x="13" y="14" width="8" height="6" rx="1.5" />
    <path d="M11 7h3a2 2 0 0 1 2 2v5" />
  </IconBase>
);

const TargetIcon = ({ className }) => (
  <IconBase className={className}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
  </IconBase>
);

const AlertIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M12 4 3.8 18h16.4z" />
    <path d="M12 9v4" />
    <circle cx="12" cy="15.5" r="1" fill="currentColor" stroke="none" />
  </IconBase>
);

const SparkIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="m12 4 1.7 3.7L17 9.4l-3.3 1.6L12 15l-1.7-4-3.3-1.6 3.3-1.7z" />
    <path d="m18.5 4 .8 1.8L21 6.6l-1.7.8-.8 1.8-.8-1.8-1.7-.8 1.7-.8z" />
  </IconBase>
);

const BoxIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="m12 3 8 4.3v9.4L12 21 4 16.7V7.3z" />
    <path d="m12 12 8-4.7" />
    <path d="m12 12-8-4.7" />
    <path d="M12 12v9" />
  </IconBase>
);

const HandshakeIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="m4 13 4.5-4.5a2 2 0 0 1 2.8 0L12 9l.7-.7a2 2 0 0 1 2.8 0L20 12.8" />
    <path d="m9 12 2.2 2.2a1.9 1.9 0 0 0 2.7 0l2.1-2.1" />
    <path d="M3.5 12.5 6 15" />
  </IconBase>
);

const BotIcon = ({ className }) => (
  <IconBase className={className}>
    <rect x="5" y="8" width="14" height="10" rx="3" />
    <path d="M12 5v3" />
    <circle cx="10" cy="13" r="1" fill="currentColor" stroke="none" />
    <circle cx="14" cy="13" r="1" fill="currentColor" stroke="none" />
  </IconBase>
);

const ArrowUpIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M6 16 18 8" />
    <path d="M12 8h6v6" />
  </IconBase>
);

const CheckIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="m5 12.5 4.2 4.2L19 7" />
  </IconBase>
);

const SERVICE_ICONS = {
  web: CursorClickIcon,
  ecommerce: BagIcon,
  custom: WorkflowIcon,
};

const SERVICE_ILLUSTRATIONS = {
  web: "/illustrations/corporate_service.webp",
  ecommerce: "/illustrations/e-commer_service.webp",
  custom: "/illustrations/custom-software_service.webp",
};

const BLOCK_ICONS = {
  strategicResult: ArrowUpIcon,
  problem: AlertIcon,
  solution: SparkIcon,
  deliverables: BoxIcon,
  benefits: HandshakeIcon,
  aiUseCases: BotIcon,
};

const PAIN_POINT_LAYOUT = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

const BLOCK_SEMANTIC_STYLES = {
  problem: {
    label: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50/60 dark:bg-amber-950/20 border-amber-200/60 dark:border-amber-800/40",
  },
  solution: {
    label: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-800/40",
  },
  deliverables: {
    label: "text-primary-600 dark:text-primary-400",
    bg: "bg-primary-50/50 dark:bg-primary-950/20 border-primary-200/60 dark:border-primary-800/40",
  },
  ai: {
    label: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50/50 dark:bg-violet-950/20 border-violet-200/60 dark:border-violet-800/40",
  },
};

const LabelWithIcon = ({ icon: Icon, label, semantic }) => {
  const colorClass = BLOCK_SEMANTIC_STYLES[semantic]?.label ?? "text-dark-600 dark:text-dark-400";
  return (
    <div className={`inline-flex items-center gap-2 text-sm font-semibold w-fit ${colorClass}`}>
      <Icon className="size-4" />
      <span>{label}</span>
    </div>
  );
};

const splitServiceTitle = (title) => {
  if (!title) return { base: "", accent: "" };

  const separators = [" y ", " and "];

  for (const separator of separators) {
    if (title.includes(separator)) {
      const [base, ...rest] = title.split(separator);
      return {
        base: `${base}${separator.trimEnd()}`,
        accent: rest.join(separator),
      };
    }
  }

  const words = title.split(" ");
  if (words.length === 1) return { base: title, accent: "" };

  return {
    base: words.slice(0, -1).join(" "),
    accent: words.at(-1),
  };
};

export const ServicesLanding = async ({ locale }) => {
  const t = await getTranslations({ locale, namespace: "ServicesPage" });

  const painPoints = t.raw("painPoints.items");
  const services = t.raw("services.items");
  const aiFit = t.raw("ai.noHype");
  const processSteps = t.raw("process.steps");
  const proofItems = t.raw("proof.items");
  const faqItems = t.raw("faq.items");

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@graph": services.map((service) => ({
      "@type": "Service",
      name: service.title,
      description: service.problem,
      provider: {
        "@type": "Person",
        name: "Cristian Orrego",
        url: "https://cristianorrego.dev",
      },
      areaServed: "LatAm",
      serviceType: service.forWho,
    })),
  };

  return (
    <main className="mt-16">
      <header className="relative overflow-hidden border-b border-dark-100/60 dark:border-dark-800">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,168,232,0.14),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,114,47,0.15),transparent_40%)]" />
        <section className="container mx-auto px-2 py-20 lg:max-w-[1114px] lg:px-0">
          <span className="inline-flex rounded-full border border-primary-300/50 bg-primary-100/50 dark:bg-primary-950/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary-700 dark:text-primary-300">
            {t("hero.eyebrow")}
          </span>
          <h1 className="mt-6 max-w-4xl text-3xl font-black leading-tight text-dark-800 dark:text-dark-100 md:text-5xl">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-dark-700 dark:text-dark-200">
            {t("hero.subtitle")}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={WHATSAPP_LINKS.general}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-crusta-600 px-6 py-3 text-sm font-bold text-dark-100 transition-colors hover:bg-crusta-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crusta-500"
            >
              {t("hero.primaryCta")}
              <WhatsAppIcon className="size-5" />
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center rounded-full border border-dark-300/80 px-6 py-3 text-sm font-semibold text-dark-700 transition-colors hover:bg-dark-100/60 dark:border-dark-600 dark:text-dark-200 dark:hover:bg-dark-800"
            >
              {t("hero.secondaryCta")}
            </Link>
          </div>
        </section>
      </header>

      <section
        aria-labelledby="services-pain-points"
        className="container mx-auto px-2 py-16 lg:max-w-[1114px] lg:px-0"
      >
        <h2
          id="services-pain-points"
          className="text-2xl font-bold text-dark-800 dark:text-dark-100 md:text-3xl"
        >
          {t("painPoints.title")}
        </h2>
        <p className="mt-4 max-w-3xl text-base text-dark-600 dark:text-dark-300 leading-relaxed">
          {t("painPoints.subtitle")}
        </p>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {painPoints.slice(0, 5).map((painPoint, index) => (
            <li
              key={painPoint}
              className={`group relative overflow-hidden rounded-2xl border border-dark-200/60 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-primary-300 dark:border-dark-800/60 dark:bg-dark-900 dark:hover:border-primary-700 ${PAIN_POINT_LAYOUT[index]}`}
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-dark-100 text-xs font-bold text-dark-600 dark:bg-dark-800 dark:text-dark-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-dark-700 dark:text-dark-200">
                  {painPoint}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="services-cards"
        aria-labelledby="services-main-offer"
        className="container mx-auto px-2 py-16 lg:max-w-[1114px] lg:px-0"
      >
        <h2
          id="services-main-offer"
          className="text-2xl font-bold text-dark-800 dark:text-dark-100 md:text-3xl"
        >
          {t("services.title")}
        </h2>
        <p className="mt-4 max-w-3xl text-base text-dark-600 dark:text-dark-300 leading-relaxed">
          {t("services.subtitle")}
        </p>
        <div className="mt-10 space-y-8">
          {services.map((service, index) => {
            const serviceStyles =
              SERVICE_STYLES[service.id] ?? SERVICE_STYLES.web;
            const ServiceIcon = SERVICE_ICONS[service.id] ?? TargetIcon;
            const StrategicIcon = BLOCK_ICONS.strategicResult;
            const ProblemIcon = BLOCK_ICONS.problem;
            const SolutionIcon = BLOCK_ICONS.solution;
            const DeliverablesIcon = BLOCK_ICONS.deliverables;
            const BenefitsIcon = BLOCK_ICONS.benefits;
            const AiIcon = BLOCK_ICONS.aiUseCases;

            return (
              <article
                key={service.id}
                id={service.id}
                className="relative overflow-hidden rounded-3xl border border-dark-200/60 bg-white text-dark-800 shadow-sm hover:shadow-lg transition-shadow dark:border-dark-800/60 dark:bg-dark-900 dark:text-dark-100"
              >
                {/* Accent bar - subtle top border */}
                <div className={`absolute inset-x-0 top-0 h-0.5 ${serviceStyles.accent}`} />

                {/* Header Section */}
                <header className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-dark-400 dark:text-dark-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={`inline-flex size-11 items-center justify-center rounded-xl ${serviceStyles.icon}`}>
                        <ServiceIcon className="size-5" />
                      </span>
                    </div>
                    <span className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold ${serviceStyles.badge}`}>
                      {service.forWho}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold leading-tight md:text-3xl">
                    {(() => {
                      const { base, accent } = splitServiceTitle(service.title);
                      return (
                        <>
                          <span>{base} </span>
                          {accent && <span className="text-dark-600 dark:text-dark-300">{accent}</span>}
                        </>
                      );
                    })()}
                  </h3>

                  {service.solution && (
                    <p className="mt-3 text-base text-dark-600 dark:text-dark-400 leading-relaxed">
                      {service.solution}
                    </p>
                  )}
                </header>

                <div className="border-t border-dark-100 dark:border-dark-800" />

                {/* Problem + Solution + Illustration */}
                <div className="p-6 md:p-8">
                  <div className="grid gap-5 lg:grid-cols-2">
                    {/* Left: Problem + Solution stacked */}
                    <div className="flex flex-col gap-5">
                      <div className={`rounded-2xl p-5 border ${BLOCK_SEMANTIC_STYLES.problem.bg}`}>
                        <LabelWithIcon icon={ProblemIcon} label={t("services.labels.problem")} semantic="problem" />
                        <p className="mt-3 text-base font-medium leading-relaxed text-dark-700 dark:text-dark-200">
                          {service.problem}
                        </p>
                      </div>
                      <div className={`rounded-2xl p-5 border ${BLOCK_SEMANTIC_STYLES.solution.bg}`}>
                        <LabelWithIcon icon={SolutionIcon} label={t("services.labels.solution")} semantic="solution" />
                        <p className="mt-3 text-sm leading-relaxed text-dark-600 dark:text-dark-300">
                          {service.solution}
                        </p>
                      </div>
                    </div>

                    {/* Right: Illustration */}
                    {SERVICE_ILLUSTRATIONS[service.id] && (
                      <div className="hidden lg:flex items-stretch">
                        <Image
                          src={SERVICE_ILLUSTRATIONS[service.id]}
                          alt={service.title}
                          width={540}
                          height={400}
                          className="rounded-2xl object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </div>

                  {/* Deliverables — full width below */}
                  <div className={`mt-5 rounded-2xl p-5 border ${BLOCK_SEMANTIC_STYLES.deliverables.bg}`}>
                    <LabelWithIcon icon={DeliverablesIcon} label={t("services.labels.deliverables")} semantic="deliverables" />
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {service.deliverables.slice(0, 4).map((deliverable) => (
                        <li key={deliverable} className="flex items-start gap-2 text-sm text-dark-600 dark:text-dark-300">
                          <CheckIcon className="size-4 mt-0.5 shrink-0 text-primary-500 dark:text-primary-400" />
                          <span className="leading-relaxed">{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* AI Use Cases - Expandable/Optional */}
                {service.aiOptions && service.aiOptions.length > 0 && (
                  <>
                    <div className="border-t border-dark-100 dark:border-dark-800" />
                    <div className="p-6 md:p-8">
                      <div className={`rounded-2xl p-5 border ${BLOCK_SEMANTIC_STYLES.ai.bg}`}>
                        <LabelWithIcon icon={AiIcon} label={t("services.labels.aiUseCases")} semantic="ai" />
                        <div className="mt-4 flex flex-wrap gap-2">
                          {service.aiOptions.slice(0, 3).map((option) => (
                            <span
                              key={option}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-violet-100/70 px-3 py-2 text-sm text-violet-800 dark:bg-violet-900/30 dark:text-violet-300"
                            >
                              <span className="inline-block size-1.5 rounded-full bg-violet-400 dark:bg-violet-500" />
                              {option}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="border-t border-dark-100 dark:border-dark-800" />

                {/* CTA Section */}
                <div className="p-6 md:p-8">
                  <a
                    href={SERVICE_CTA_URL[service.id]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-center gap-3 rounded-xl ${serviceStyles.ctaBg} px-6 py-4 text-white shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${serviceStyles.ctaBorder}`}
                  >
                    <span className="text-base font-semibold">{service.cta}</span>
                    <ArrowUpIcon className="size-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="services-ai-without-hype"
        className="container mx-auto px-2 py-16 lg:max-w-[1114px] lg:px-0"
      >
        <div className="rounded-3xl border border-dark-200/60 bg-dark-50/50 p-8 dark:border-dark-800/60 dark:bg-dark-800/30 md:p-10">
          <h2
            id="services-ai-without-hype"
            className="text-2xl font-bold text-dark-800 dark:text-dark-100 md:text-3xl"
          >
            {t("ai.title")}
          </h2>
          <p className="mt-4 max-w-3xl text-base text-dark-600 dark:text-dark-300 leading-relaxed">
            {t("ai.subtitle")}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-dark-200/60 bg-white p-5 dark:border-dark-700/50 dark:bg-dark-900">
              <h3 className="text-base font-semibold text-dark-800 dark:text-dark-100">
                {aiFit.yesTitle}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-dark-600 dark:text-dark-300 leading-relaxed">
                {aiFit.yes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-primary-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl border border-dark-200/60 bg-white p-5 dark:border-dark-700/50 dark:bg-dark-900">
              <h3 className="text-base font-semibold text-dark-800 dark:text-dark-100">
                {aiFit.noTitle}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-dark-600 dark:text-dark-300 leading-relaxed">
                {aiFit.no.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-dark-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl border border-dark-200/60 bg-white p-5 dark:border-dark-700/50 dark:bg-dark-900">
              <h3 className="text-base font-semibold text-dark-800 dark:text-dark-100">
                {aiFit.requirementsTitle}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-dark-600 dark:text-dark-300 leading-relaxed">
                {aiFit.requirements.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="services-process"
        className="container mx-auto px-2 py-16 lg:max-w-[1114px] lg:px-0"
      >
        <h2
          id="services-process"
          className="text-2xl font-bold text-dark-800 dark:text-dark-100 md:text-3xl"
        >
          {t("process.title")}
        </h2>
        <p className="mt-4 max-w-3xl text-base text-dark-600 dark:text-dark-300 leading-relaxed">
          {t("process.subtitle")}
        </p>
        <div className="relative mt-10">
          <div className="pointer-events-none absolute left-[15px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary-500 via-primary-400 to-transparent dark:from-primary-600 dark:via-primary-700 dark:to-transparent lg:left-0 lg:right-0 lg:top-5 lg:h-px lg:w-full lg:bg-gradient-to-r" />
          <ol className="relative grid gap-5 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <li key={step.title} className="relative pl-10 lg:pl-0 lg:pt-10">
                <span className="absolute left-0 top-0 inline-flex size-9 items-center justify-center rounded-full border-2 border-primary-500 bg-white text-xs font-bold text-primary-700 shadow-sm dark:border-primary-600 dark:bg-dark-900 dark:text-primary-300 lg:left-1/2 lg:-translate-x-1/2">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <article className="rounded-2xl border border-dark-200/60 bg-white p-5 shadow-sm dark:border-dark-800/60 dark:bg-dark-900">
                  <h3 className="text-base font-semibold text-dark-800 dark:text-dark-100">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-dark-600 dark:text-dark-300 leading-relaxed">
                    {step.description}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* <section
        aria-labelledby="services-proof"
        className="container mx-auto px-2 py-14 lg:max-w-[1114px] lg:px-0"
      >
        <h2
          id="services-proof"
          className="text-2xl font-bold text-dark-800 dark:text-dark-100 md:text-3xl"
        >
          {t("proof.title")}
        </h2>
        <p className="mt-3 max-w-3xl text-dark-700 dark:text-dark-200">
          {t("proof.subtitle")}
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {proofItems.map((proof) => (
            <article
              key={proof.name}
              className="rounded-2xl border border-dark-100 bg-white p-5 dark:border-dark-800 dark:bg-dark-900/40"
            >
              <h3 className="font-semibold text-dark-800 dark:text-dark-100">
                {proof.name}
              </h3>
              <p className="mt-2 text-sm text-dark-700 dark:text-dark-200">
                {proof.context}
              </p>
              <a
                href={proof.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex text-sm font-semibold text-primary-700 underline underline-offset-4 transition-colors hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-200"
              >
                {t("proof.linkLabel")}
              </a>
            </article>
          ))}
        </div>
      </section> */}

      <section
        aria-labelledby="services-faq"
        className="container mx-auto px-2 py-16 lg:max-w-[1114px] lg:px-0"
      >
        <h2
          id="services-faq"
          className="text-2xl font-bold text-dark-800 dark:text-dark-100 md:text-3xl"
        >
          {t("faq.title")}
        </h2>
        <div className="mt-10 space-y-4">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-dark-200/60 bg-white p-6 shadow-sm hover:shadow-md transition-shadow dark:border-dark-800/60 dark:bg-dark-900"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-dark-800 dark:text-dark-100 marker:content-none mt-0">
                <div className="flex items-center justify-between">
                  <span>{item.question}</span>
                  <span className="ml-4 text-dark-400 transition-transform group-open:rotate-180">▼</span>
                </div>
              </summary>
              <p className="mt-4 text-sm text-dark-600 dark:text-dark-300 leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-2 py-16 lg:max-w-[1114px] lg:px-0">
        <div className="rounded-3xl bg-dark-900 p-8 text-dark-50 dark:bg-dark-950 md:p-12">
          <h2 className="text-2xl font-bold md:text-3xl">
            {t("closing.title")}
          </h2>
          <p className="mt-4 max-w-3xl text-base text-dark-200 leading-relaxed">
            {t("closing.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={WHATSAPP_LINKS.general}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-crusta-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-crusta-700 hover:shadow-lg hover:-translate-y-0.5"
            >
              {t("closing.primaryCta")}
              <WhatsAppIcon className="size-5" />
            </a>
            <a
              href="mailto:cristian.duquew@gmail.com?subject=Brief%20de%20proyecto%20digital"
              className="inline-flex items-center rounded-xl border border-dark-500 bg-dark-800/50 px-6 py-3.5 text-sm font-semibold text-dark-100 transition-all hover:bg-dark-800 hover:border-dark-400"
            >
              {t("closing.secondaryCta")}
            </a>
            <a
              href={WHATSAPP_LINKS.discovery}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl border border-dark-500 bg-dark-800/50 px-6 py-3.5 text-sm font-semibold text-dark-100 transition-all hover:bg-dark-800 hover:border-dark-400"
            >
              {t("closing.tertiaryCta")}
            </a>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  );
};
