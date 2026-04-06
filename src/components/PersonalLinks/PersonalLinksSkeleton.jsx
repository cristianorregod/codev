export const PersonalLinksSkeleton = () => {
  return (
    <section className="container mx-auto px-3 pt-32 pb-12">
      <div className="mx-auto w-full max-w-md space-y-5">
        <div className="rounded-3xl border border-white/25 bg-white/15 dark:bg-dark-900/40 backdrop-blur-xl p-6 text-center animate-pulse">
          <div className="mx-auto h-20 w-20 rounded-full bg-white/40 dark:bg-dark-700/60" />
          <div className="mx-auto mt-4 h-5 w-40 rounded-full bg-white/40 dark:bg-dark-700/60" />
          <div className="mx-auto mt-3 h-4 w-56 rounded-full bg-white/30 dark:bg-dark-700/50" />
          <div className="mt-5 flex justify-center gap-2">
            <div className="h-8 w-16 rounded-full bg-white/30 dark:bg-dark-700/50" />
            <div className="h-8 w-16 rounded-full bg-white/30 dark:bg-dark-700/50" />
            <div className="h-8 w-16 rounded-full bg-white/30 dark:bg-dark-700/50" />
          </div>
        </div>

        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="h-16 rounded-2xl border border-white/20 bg-white/15 dark:bg-dark-900/40 backdrop-blur-xl animate-pulse"
          />
        ))}
      </div>
    </section>
  );
};
