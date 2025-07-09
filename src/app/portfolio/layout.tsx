import HireMeCTA from "@/components/hire-me-cta";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
      <HireMeCTA />
    </div>
  );
}
