export function StyleExplorer({ styles }) {
  return (
    <section>
      <div className="mt-4 flex gap-6 overflow-x-auto pb-4 scrollbar-none">
        {styles.map((style, index) => (
          <div
            key={index}
            className="flex flex-col items-center flex-shrink-0 min-w-[80px]"
          >
            <div className="h-14 w-14 flex items-center justify-center bg-emerald-100 rounded-full shadow-sm">
              <span className="text-emerald-700 font-medium text-sm">
                {style[0]}
              </span>
            </div>
            <p className="text-xs mt-2 text-gray-700">{style}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
