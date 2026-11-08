export const CategoryChip = ({ children }) => (
  <span className="rounded-md bg-p-soft px-[9px] py-1 text-p">{children}</span>
);

export const TechChips = ({ stack = [], max = 4, size = "md" }) => {
  const visible = stack.slice(0, max);
  const rest = stack.length - visible.length;
  const pad = size === "sm" ? "px-2 py-1" : "px-[9px] py-[5px]";
  return (
    <ul
      className={`mono m-0 flex list-none flex-wrap gap-1.5 p-0 ${
        size === "sm" ? "text-[11px]" : "text-xs"
      }`}
    >
      {visible.map((tech) => (
        <li
          key={tech}
          className={`rounded-md border border-line text-muted ${pad}`}
        >
          {tech}
        </li>
      ))}
      {rest > 0 ? <li className={`text-muted ${pad}`}>+{rest}</li> : null}
    </ul>
  );
};
