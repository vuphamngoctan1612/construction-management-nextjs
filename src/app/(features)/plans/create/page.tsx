'use client';
import { Navigation } from "@/configs/sidebarNavigation";
import PageContainer from "@/layouts/PageContainer";

export default function Page() {
 
  return (
    <PageContainer
      activeNav={Navigation.CostEstimates}
      breadcrumbs={[
        {
          text: "Home",
          href: "./"
        },
        {
          text: "Construction Sites"
        }, 
      ]}
    >
    <main className="h-screen bg-subdued">
        
    </main> 
    </PageContainer>
  );
}