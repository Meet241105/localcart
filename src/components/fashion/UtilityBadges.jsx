export function UtilityBadges({ badges }) {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
      {badges.map((badge) => (
        <div key={badge} className="bg-white shadow rounded-md p-3">
          {badge}
        </div>
      ))}
    </section>
  );
}
