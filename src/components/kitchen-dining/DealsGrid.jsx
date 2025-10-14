import { DealCard } from "@/components/common/DealCard";

export function DealsGrid({ deals }) {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
      <DealCard deal={deals[0]} variant="large" />
      <div className="grid gap-5">
        {deals.slice(1).map((deal, index) => (
          <DealCard key={index} deal={deal} />
        ))}
      </div>
    </div>
  );
}
