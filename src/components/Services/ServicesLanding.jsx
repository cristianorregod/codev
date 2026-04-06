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
    accent:
      "from-primary-500/20 to-primary-100/30 dark:from-primary-800/40 dark:to-primary-950/10",
    badge:
      "border-primary-300/60 bg-primary-100/70 text-primary-800 dark:border-primary-900/50 dark:bg-primary-950/40 dark:text-primary-200",
    panel:
      "border-primary-200/70 bg-primary-50/70 dark:border-primary-900/30 dark:bg-primary-950/20",
    icon: "border-primary-300/60 bg-primary-100/80 text-primary-800 dark:border-primary-900/60 dark:bg-primary-950/50 dark:text-primary-200",
  },
  ecommerce: {
    accent:
      "from-crusta-500/20 to-crusta-100/30 dark:from-crusta-800/40 dark:to-crusta-950/10",
    badge:
      "border-crusta-300/60 bg-crusta-100/70 text-crusta-800 dark:border-crusta-900/50 dark:bg-crusta-950/40 dark:text-crusta-200",
    panel:
      "border-crusta-200/70 bg-crusta-50/70 dark:border-crusta-900/30 dark:bg-crusta-950/20",
    icon: "border-crusta-300/60 bg-crusta-100/80 text-crusta-800 dark:border-crusta-900/60 dark:bg-crusta-950/50 dark:text-crusta-200",
  },
  custom: {
    accent:
      "from-emerald-500/20 to-emerald-100/30 dark:from-emerald-800/40 dark:to-emerald-950/10",
    badge:
      "border-emerald-300/60 bg-emerald-100/70 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200",
    panel:
      "border-emerald-200/70 bg-emerald-50/70 dark:border-emerald-900/30 dark:bg-emerald-950/20",
    icon: "border-emerald-300/60 bg-emerald-100/80 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-200",
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

const LabelWithIcon = ({ icon: Icon, label }) => (
  <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-dark-600 dark:border-dark-700 dark:bg-dark-900/60 dark:text-dark-300 w-fit">
    <Icon className="size-3.5" />
    <span>{label}</span>
  </div>
);

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
        className="container mx-auto px-2 py-14 lg:max-w-[1114px] lg:px-0"
      >
        <h2
          id="services-pain-points"
          className="text-2xl font-bold text-dark-800 dark:text-dark-100 md:text-3xl"
        >
          {t("painPoints.title")}
        </h2>
        <p className="mt-3 max-w-3xl text-dark-700 dark:text-dark-200">
          {t("painPoints.subtitle")}
        </p>
        <ul className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-12">
          {painPoints.slice(0, 5).map((painPoint, index) => (
            <li
              key={painPoint}
              className={`group relative overflow-hidden rounded-2xl border border-dark-100 bg-white/90 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-dark-800 dark:bg-dark-900/45 ${PAIN_POINT_LAYOUT[index]}`}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,168,232,0.12),transparent_58%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex items-start gap-3">
                <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-dark-200/70 bg-dark-50 text-[11px] font-bold text-dark-700 dark:border-dark-700 dark:bg-dark-800 dark:text-dark-100">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-dark-700 dark:text-dark-200 md:text-[15px]">
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
        className="container mx-auto px-2 py-6 lg:max-w-[1114px] lg:px-0"
      >
        <h2
          id="services-main-offer"
          className="text-2xl font-bold text-dark-800 dark:text-dark-100 md:text-3xl"
        >
          {t("services.title")}
        </h2>
        <p className="mt-3 max-w-3xl text-dark-700 dark:text-dark-200">
          {t("services.subtitle")}
        </p>
        <div className="mt-8 space-y-7">
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
                className="relative overflow-hidden rounded-[2rem] border border-dark-100 bg-white p-6 text-dark-800 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.18)] dark:border-dark-800/90 dark:bg-dark-950 dark:text-dark-100 dark:shadow-[0_20px_60px_-35px_rgba(0,0,0,0.85)] md:p-8"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${serviceStyles.accent} opacity-90`}
                />
                <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(0,168,232,0.14),transparent_52%),radial-gradient(circle_at_10%_100%,rgba(255,114,47,0.11),transparent_45%)]" />

                <header className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-dark-500 dark:text-dark-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`inline-flex size-10 items-center justify-center rounded-xl border ${serviceStyles.icon}`}
                      >
                        <ServiceIcon className="size-4.5" />
                      </span>
                    </div>
                    <h3 className="mt-4 text-3xl font-black leading-tight md:text-[2.05rem]">
                      {(() => {
                        const { base, accent } = splitServiceTitle(
                          service.title,
                        );
                        return (
                          <>
                            <span>{base} </span>
                            {accent ? (
                              <span className="bg-primary-600 bg-clip-text text-transparent">
                                {accent}
                              </span>
                            ) : null}
                          </>
                        );
                      })()}
                    </h3>
                  </div>

                  <span
                    className={`rounded-full border px-4 py-1.5 text-xs font-semibold md:text-[13px] ${serviceStyles.badge}`}
                  >
                    {service.forWho}
                  </span>
                </header>

                <div className="mt-7 grid gap-4 xl:grid-cols-12">
                  <div className="h-full xl:col-span-7">
                    <div className="flex h-full flex-col rounded-2xl  p-5 md:p-6 bg-amber-400/60 dark:bg-amber-950/70">
                      <LabelWithIcon
                        icon={ProblemIcon}
                        label={t("services.labels.problem")}
                      />
                      <p className="mt-4 text-lg font-bold leading-snug text-amber-900 dark:text-white md:text-xl">
                        {service.problem}
                      </p>

                      <div className="mt-5 rounded-xl border border-dark-200/80 bg-amber-100 p-4 dark:border-dark-600/90 dark:bg-dark-950/60">
                        <LabelWithIcon
                          icon={SolutionIcon}
                          label={t("services.labels.solution")}
                        />
                        <p className="mt-3 text-sm leading-relaxed text-amber-900 dark:text-dark-200 md:text-[15px]">
                          {service.solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="h-full rounded-2xl bg-teal-50/70 p-5  dark:bg-teal-900 xl:col-span-5">
                    <LabelWithIcon
                      icon={DeliverablesIcon}
                      label={t("services.labels.deliverables")}
                    />
                    <ul className="mt-4 grid gap-2.5">
                      {service.deliverables.map((deliverable) => (
                        <li
                          key={deliverable}
                          className="rounded-xl border border-teal-200/80 bg-white px-3 py-3 text-sm text-teal-900 dark:border-teal-700 dark:bg-teal-950/60 dark:text-dark-100"
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-teal-700 dark:bg-teal-500/15 dark:text-teal-200">
                              <CheckIcon className="size-3.5" />
                            </span>
                            <span className="leading-relaxed">
                              {deliverable}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 xl:grid-cols-12">
                  <div className="rounded-2xl bg-primary-50 p-5 dark:border-dark-700/80 dark:bg-dark-900 xl:col-span-5">
                    <LabelWithIcon
                      icon={BenefitsIcon}
                      label={t("services.labels.benefits")}
                    />
                    <ul className="mt-4 space-y-2">
                      {service.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="rounded-xl border border-primary-200/80 bg-white px-3 py-2 text-sm leading-relaxed text-dark-700  dark:bg-primary-950/60 dark:text-dark-100"
                        >
                          <div className="flex items-center gap-2 ">
                            <span className="inline-block size-2 rounded-full bg-primary-500" />
                            <span>{benefit}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl  bg-indigo-100 p-5  dark:bg-indigo-950/25 xl:col-span-7">
                    <div className="">
                      <div className="mb-4">
                        <LabelWithIcon
                          icon={AiIcon}
                          label={t("services.labels.aiUseCases")}
                        />
                      </div>

                      <ul className="grid gap-2 sm:grid-cols-2">
                        {service.aiOptions.map((option) => (
                          <li
                            key={option}
                            className="rounded-xl border border-indigo-200/70 bg-white/90 px-3 py-3 text-sm text-dark-700 dark:border-indigo-900/60 dark:bg-dark-950/45 dark:text-dark-100"
                          >
                            <div className="flex items-start gap-2">
                              <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-900/70 dark:text-primary-200">
                                <AiIcon className="size-3.5" />
                              </span>
                              <span className="leading-relaxed">{option}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <a
                    href={SERVICE_CTA_URL[service.id]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-2/4 max-w-2xl items-center justify-between gap-4 overflow-hidden rounded-2xl border border-primary-300 bg-primary-600 px-5 py-3.5 md:px-6 md:py-4 shadow-[0_18px_40px_-25px_rgba(37,99,235,0.55)] transition-all hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-[0_26px_55px_-24px_rgba(37,99,235,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  >
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-100/80">
                        {t("services.labels.ctaHint")}
                      </p>
                      <p className="mt-1.5 text-base font-bold leading-snug text-white md:text-lg">
                        {service.cta}
                      </p>
                    </div>
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-base font-bold text-white transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="services-ai-without-hype"
        className="container mx-auto px-2 py-14 lg:max-w-[1114px] lg:px-0"
      >
        <div className="rounded-3xl border border-primary-200/60 bg-primary-50/70 p-6 dark:border-primary-900/40 dark:bg-primary-950/20 md:p-8">
          <h2
            id="services-ai-without-hype"
            className="text-2xl font-bold text-dark-800 dark:text-dark-100 md:text-3xl"
          >
            {t("ai.title")}
          </h2>
          <p className="mt-3 max-w-3xl text-dark-700 dark:text-dark-200">
            {t("ai.subtitle")}
          </p>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl bg-white p-4 dark:bg-dark-900/70">
              <h3 className="font-semibold text-dark-800 dark:text-dark-100">
                {aiFit.yesTitle}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-dark-700 dark:text-dark-200">
                {aiFit.yes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl bg-white p-4 dark:bg-dark-900/70">
              <h3 className="font-semibold text-dark-800 dark:text-dark-100">
                {aiFit.noTitle}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-dark-700 dark:text-dark-200">
                {aiFit.no.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl bg-white p-4 dark:bg-dark-900/70">
              <h3 className="font-semibold text-dark-800 dark:text-dark-100">
                {aiFit.requirementsTitle}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-dark-700 dark:text-dark-200">
                {aiFit.requirements.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="services-process"
        className="container mx-auto px-2 py-6 lg:max-w-[1114px] lg:px-0"
      >
        <h2
          id="services-process"
          className="text-2xl font-bold text-dark-800 dark:text-dark-100 md:text-3xl"
        >
          {t("process.title")}
        </h2>
        <p className="mt-3 max-w-3xl text-dark-700 dark:text-dark-200">
          {t("process.subtitle")}
        </p>
        <div className="relative mt-8">
          <div className="pointer-events-none absolute left-[15px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary-400 via-primary-300 to-primary-200 dark:from-primary-700 dark:via-primary-800 dark:to-primary-900 lg:left-0 lg:right-0 lg:top-5 lg:h-px lg:w-full" />
          <ol className="relative grid gap-4 lg:grid-cols-5 lg:gap-5">
            {processSteps.map((step, index) => (
              <li key={step.title} className="relative pl-10 lg:pl-0 lg:pt-10">
                <span className="absolute left-0 top-0 inline-flex size-8 items-center justify-center rounded-full border border-primary-300 bg-white text-xs font-bold text-primary-800 shadow-sm dark:border-primary-900 dark:bg-dark-900 dark:text-primary-200 lg:left-1/2 lg:-translate-x-1/2">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <article className="rounded-2xl border border-dark-100 bg-white p-4 dark:border-dark-800 dark:bg-dark-900/40">
                  <h3 className="font-semibold text-dark-800 dark:text-dark-100">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-dark-700 dark:text-dark-200">
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
        className="container mx-auto px-2 py-6 lg:max-w-[1114px] lg:px-0"
      >
        <h2
          id="services-faq"
          className="text-2xl font-bold text-dark-800 dark:text-dark-100 md:text-3xl"
        >
          {t("faq.title")}
        </h2>
        <div className="mt-8 space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-dark-100 bg-white p-5 dark:border-dark-800 dark:bg-dark-900/40"
            >
              <summary className="mt-0 cursor-pointer list-none font-semibold text-dark-800 dark:text-dark-100">
                {item.question}
              </summary>
              <p className="mt-3 text-sm text-dark-700 dark:text-dark-200">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-2 py-14 lg:max-w-[1114px] lg:px-0">
        <div className="rounded-3xl bg-dark-900 p-7 text-dark-50 dark:bg-dark-950 md:p-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            {t("closing.title")}
          </h2>
          <p className="mt-3 max-w-3xl text-dark-200">
            {t("closing.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={WHATSAPP_LINKS.general}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-crusta-600 px-6 py-3 text-sm font-bold text-dark-100 transition-colors hover:bg-crusta-700"
            >
              {t("closing.primaryCta")}
              <WhatsAppIcon className="size-5" />
            </a>
            <a
              href="mailto:cristian.duquew@gmail.com?subject=Brief%20de%20proyecto%20digital"
              className="inline-flex items-center rounded-full border border-dark-400 px-6 py-3 text-sm font-semibold text-dark-100 transition-colors hover:bg-dark-800"
            >
              {t("closing.secondaryCta")}
            </a>
            <a
              href={WHATSAPP_LINKS.discovery}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-dark-400 px-6 py-3 text-sm font-semibold text-dark-100 transition-colors hover:bg-dark-800"
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
