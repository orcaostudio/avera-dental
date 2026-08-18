export default function PageContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full max-w-[1600px] mx-auto px-6 md:px-10 lg:px-14 ${className}`}
    >
      {children}
    </div>
  );
}
