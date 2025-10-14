export function BackgroundPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-5">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-transparent to-green-100"></div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            linear-gradient(45deg, transparent 49%, rgba(16, 185, 129, 0.05) 50%, transparent 51%)
          `,
          backgroundSize: "60px 60px, 80px 80px, 100px 100px",
        }}
      ></div>
    </div>
  );
}
