export function CouponCard({ code, description, discount }) {
  return (
    <div className="bg-emerald-50 border border-emerald-100 rounded-md p-3">
      <p className="text-emerald-900 text-sm font-medium">Use code {code}</p>
      <p className="text-emerald-700 text-xs">
        {description || `Save ${discount} on select items`}
      </p>
    </div>
  );
}
