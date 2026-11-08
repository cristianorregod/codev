import Image from "next/image";
import { Link } from "@/i18n/routing";
import WhatsAppIcon from "@/components/icons/WhatsApp";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";

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

const ChevronIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="m6 9 6 6 6-6" />
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

const PAIN_POINT_LAYOUT = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

const Label = ({ icon: Icon, children, tone = "text-p" }) => (
  <div className={`mono inline-flex items-center gap-2 text-xs ${tone}`}>
    <Icon className="size-4" />
    <span>{children}</span>
  </div>
);

const Bullet = ({ tone = "bg-p-fill" }) => (
  <span
    aria-hidden="true"
    className={`mt-[9px] inline-block size-1.5 shrink-0 rounded-full ${tone}`}
  />
);

const sectionClass = "mx-auto max-w-site px-6 pb-6 pt-20 sm:pt-24";
const cardClass = "rounded-2xl border border-line bg-surface";

export const ServicesLanding = async ({ locale }) => {
  const t = await getTranslations({ locale, namespace: "ServicesPage" });

  const painPoints = t.raw("painPoints.items");
  const services = t.raw("services.items");
  const aiFit = t.raw("ai.noHype");
  const processSteps = t.raw("process.steps");
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
    <>
      <section className="gridbg border-b border-line">
        <div className="mx-auto flex max-w-site flex-col gap-[22px] px-6 pb-16 pt-16 sm:pb-24 sm:pt-[88px]">
          <span className="mono text-[13px] text-p">{t("hero.label")}</span>
          <span className="mono inline-flex items-center gap-2.5 self-start rounded-full border border-line bg-surface px-3 py-[7px] text-[13px] text-muted">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-s-fill"
            />
            {t("hero.eyebrow")}
          </span>
          <h1 className="m-0 max-w-[900px] text-[36px] font-extrabold leading-[1.06] tracking-[-0.03em] sm:text-[48px] lg:text-[56px]">
            {t("hero.title")}
          </h1>
          <p className="m-0 max-w-[680px] text-[17px] leading-[1.65] text-muted sm:text-[18px]">
            {t("hero.subtitle")}
          </p>
          <div className="mt-1.5 flex flex-wrap gap-3">
            <a
              href={WHATSAPP_LINKS.general}
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex min-h-12 items-center gap-2.5 rounded-xl bg-s-fill px-[22px] font-bold text-s-on no-underline"
            >
              <WhatsAppIcon className="size-5" />
              {t("hero.primaryCta")}
            </a>
            <Link
              href="/projects"
              className="ghost btn inline-flex min-h-12 items-center rounded-xl border border-line px-[18px] font-semibold text-muted no-underline"
            >
              {t("hero.secondaryCta")}
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="services-pain-points" className={sectionClass}>
        <SectionHeading
          number="01"
          id="services-pain-points"
          title={t("painPoints.title")}
          className="mb-4"
        />
        <p className="mb-9 mt-0 max-w-[680px] text-[17px] leading-[1.65] text-muted">
          {t("painPoints.subtitle")}
        </p>
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-12">
          {painPoints.slice(0, 5).map((painPoint, index) => (
            <li
              key={painPoint}
              className={`card flex items-start gap-4 p-5 ${cardClass} ${PAIN_POINT_LAYOUT[index]}`}
            >
              <span className="mono pt-0.5 text-[13px] text-s">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="m-0 text-[15px] leading-[1.6] text-fg">
                {painPoint}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="services-cards"
        aria-labelledby="services-main-offer"
        className={sectionClass}
      >
        <SectionHeading
          number="02"
          id="services-main-offer"
          title={t("services.title")}
          className="mb-4"
        />
        <p className="mb-9 mt-0 max-w-[680px] text-[17px] leading-[1.65] text-muted">
          {t("services.subtitle")}
        </p>
        <div className="flex flex-col gap-6">
          {services.map((service, index) => {
            const ServiceIcon = SERVICE_ICONS[service.id] ?? TargetIcon;
            const illustration = SERVICE_ILLUSTRATIONS[service.id];

            return (
              <article
                key={service.id}
                id={service.id}
                className="overflow-hidden rounded-[18px] border border-line bg-surface"
              >
                <header className="flex flex-col gap-4 p-6 md:p-9">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="mono text-[13px] text-p">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="inline-flex size-11 items-center justify-center rounded-xl bg-p-soft text-p"
                    >
                      <ServiceIcon className="size-5" />
                    </span>
                    <span className="mono rounded-md border border-line px-[9px] py-1 text-xs text-muted">
                      {service.forWho}
                    </span>
                  </div>
                  <h3 className="m-0 text-[24px] font-bold leading-[1.2] tracking-[-0.01em] md:text-[30px]">
                    {service.title}
                  </h3>
                  {service.strategicResult ? (
                    <p className="m-0 max-w-[760px] text-[17px] leading-[1.6] text-muted">
                      {service.strategicResult}
                    </p>
                  ) : null}
                </header>

                <div className="grid gap-5 border-t border-line p-6 md:p-9 lg:grid-cols-2">
                  <div className="flex flex-col gap-5">
                    <div className="rounded-xl border border-line bg-surface-2 p-5">
                      <Label icon={AlertIcon} tone="text-s">
                        {t("services.labels.problem")}
                      </Label>
                      <p className="mb-0 mt-3 text-base leading-[1.6] text-fg">
                        {service.problem}
                      </p>
                    </div>
                    <div className="rounded-xl border border-line bg-surface-2 p-5">
                      <Label icon={SparkIcon}>
                        {t("services.labels.solution")}
                      </Label>
                      <p className="mb-0 mt-3 text-[15px] leading-[1.6] text-muted">
                        {service.solution}
                      </p>
                    </div>
                  </div>
                  {illustration ? (
                    <div className="hidden items-stretch lg:flex">
                      <Image
                        src={illustration}
                        alt={service.title}
                        width={540}
                        height={400}
                        className="h-full w-full rounded-xl border border-line object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="rounded-xl border border-line bg-surface-2 p-5 lg:col-span-2">
                    <Label icon={BoxIcon}>
                      {t("services.labels.deliverables")}
                    </Label>
                    <ul className="m-0 mt-3 grid list-none gap-2 p-0 sm:grid-cols-2">
                      {service.deliverables.slice(0, 4).map((deliverable) => (
                        <li
                          key={deliverable}
                          className="flex items-start gap-2 text-[15px] leading-[1.55] text-muted"
                        >
                          <CheckIcon className="mt-0.5 size-4 shrink-0 text-p" />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {service.aiOptions && service.aiOptions.length > 0 ? (
                  <div className="border-t border-line px-6 py-6 md:px-9">
                    <Label icon={BotIcon}>
                      {t("services.labels.aiUseCases")}
                    </Label>
                    <ul className="mono m-0 mt-4 flex list-none flex-wrap gap-2 p-0 text-[13px]">
                      {service.aiOptions.slice(0, 3).map((option) => (
                        <li
                          key={option}
                          className="rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-fg"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="border-t border-line p-6 md:px-9">
                  <a
                    href={SERVICE_CTA_URL[service.id]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn inline-flex min-h-12 items-center gap-2.5 rounded-xl bg-p-fill px-[22px] font-bold text-p-on no-underline"
                  >
                    {service.cta}
                    <ArrowUpIcon className="size-4" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="services-ai-without-hype"
        className={sectionClass}
      >
        <SectionHeading
          number="03"
          id="services-ai-without-hype"
          title={t("ai.title")}
          className="mb-4"
        />
        <p className="mb-9 mt-0 max-w-[680px] text-[17px] leading-[1.65] text-muted">
          {t("ai.subtitle")}
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { title: aiFit.yesTitle, items: aiFit.yes, tone: "bg-p-fill" },
            { title: aiFit.noTitle, items: aiFit.no, tone: "bg-muted" },
            {
              title: aiFit.requirementsTitle,
              items: aiFit.requirements,
              tone: "bg-s-fill",
            },
          ].map((column) => (
            <article key={column.title} className={`p-6 ${cardClass}`}>
              <h3 className="m-0 text-lg font-bold">{column.title}</h3>
              <ul className="m-0 mt-4 flex list-none flex-col gap-2.5 p-0 text-[15px] leading-[1.6] text-muted">
                {column.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Bullet tone={column.tone} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="services-process" className={sectionClass}>
        <SectionHeading
          number="04"
          id="services-process"
          title={t("process.title")}
          className="mb-4"
        />
        <p className="mb-9 mt-0 max-w-[680px] text-[17px] leading-[1.65] text-muted">
          {t("process.subtitle")}
        </p>
        <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(200px,1fr))] overflow-hidden rounded-2xl border border-line bg-surface p-0">
          {processSteps.map((step, index) => (
            <li
              key={step.title}
              className="-mb-px -mr-px flex flex-col gap-3 border-b border-r border-line p-6"
            >
              <span className="mono text-[13px] text-p">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="m-0 text-[17px] font-bold">{step.title}</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="services-faq" className={sectionClass}>
        <SectionHeading number="05" id="services-faq" title={t("faq.title")} />
        <div className="flex flex-col gap-3">
          {faqItems.map((item) => (
            <details key={item.question} className={`group ${cardClass}`}>
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 p-[18px] font-semibold text-fg [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <ChevronIcon className="size-[18px] shrink-0 text-muted transition-transform group-open:rotate-180" />
              </summary>
              <p className="m-0 border-t border-line px-[18px] py-4 text-[15px] leading-[1.65] text-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 pb-24 pt-20 sm:pb-28 sm:pt-24">
        <div className="gridbg rounded-[18px] border border-line bg-surface p-8 md:p-12">
          <h2 className="m-0 max-w-[760px] text-[28px] font-bold leading-[1.2] tracking-[-0.02em] md:text-[34px]">
            {t("closing.title")}
          </h2>
          <p className="mb-0 mt-4 max-w-[680px] text-[17px] leading-[1.65] text-muted">
            {t("closing.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={WHATSAPP_LINKS.general}
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex min-h-12 items-center gap-2.5 rounded-xl bg-s-fill px-[22px] font-bold text-s-on no-underline"
            >
              <WhatsAppIcon className="size-5" />
              {t("closing.primaryCta")}
            </a>
            <a
              href="mailto:cristian.duquew@gmail.com?subject=Brief%20de%20proyecto%20digital"
              className="ghost btn inline-flex min-h-12 items-center rounded-xl border border-line px-[18px] font-semibold text-muted no-underline"
            >
              {t("closing.secondaryCta")}
            </a>
            <a
              href={WHATSAPP_LINKS.discovery}
              target="_blank"
              rel="noopener noreferrer"
              className="ghost btn inline-flex min-h-12 items-center rounded-xl border border-line px-[18px] font-semibold text-muted no-underline"
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
    </>
  );
};
