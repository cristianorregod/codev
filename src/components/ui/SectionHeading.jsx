/**
 * Numbered section heading from the prototype: `01  Title ───────  action`.
 */
export const SectionHeading = ({
  number,
  title,
  id,
  action = null,
  className = "mb-10",
  as: Tag = "h2",
}) => (
  <div className={`flex flex-wrap items-baseline gap-4 ${className}`}>
    <span className="mono text-[13px] text-p">{number}</span>
    <Tag
      id={id}
      className="m-0 text-[28px] font-bold tracking-[-0.02em] sm:text-[34px]"
    >
      {title}
    </Tag>
    <span aria-hidden="true" className="h-px min-w-[24px] flex-1 bg-line" />
    {action}
  </div>
);
