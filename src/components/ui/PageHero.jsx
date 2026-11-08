/**
 * Grid-backed header used by the listing pages (`~/proyectos`, `~/artículos`).
 */
export const PageHero = ({ label, title, description, children }) => (
  <section className="gridbg border-b border-line">
    <div className="mx-auto flex max-w-site flex-col gap-[18px] px-6 pb-12 pt-16 sm:pb-14 sm:pt-[88px]">
      <span className="mono text-[13px] text-p">{label}</span>
      <h1 className="m-0 text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[56px]">
        {title}
      </h1>
      {description ? (
        <p className="m-0 max-w-[620px] text-[17px] leading-[1.6] text-muted sm:text-[18px]">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  </section>
);
