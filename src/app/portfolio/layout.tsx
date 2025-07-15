import { PortfolioBreadcrumb } from "@/components/PortfolioBreadcrumb";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="container mx-auto px-4 pt-8">
        <PortfolioBreadcrumb />
      </div>
      {children}
    </div>
  );
}