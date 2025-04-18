"use client";

import { PageLayout } from "@/core/components/layout/PageLayout";
import { TabsWithCard } from "@/core/components/ui/tabs-with-card";
import { BarDetailTabs } from "@/components/BarDetailTabs";
import { bars } from "@/lib/data";

export default function ComponentsPage() {
  return (
    <PageLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Component Examples</h1>
          <p className="text-muted-foreground">
            This page showcases various components used in the BarFindr application.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Tabs with Card (Generic)</h2>
          <TabsWithCard />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Bar Detail Tabs</h2>
          <BarDetailTabs bar={bars[0]} />
        </div>
      </div>
    </PageLayout>
  );
}
