"use client";
import { Tabs, Tab } from "@heroui/tabs";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col p-5">
      <Tabs aria-label="Options" selectedKey={pathname}>
        <Tab key="/company" title="Company" href="/company"></Tab>
        <Tab key="/contacts" title="Contacts" href="/contacts"></Tab>
      </Tabs>

      {children}
    </div>
  );
}
