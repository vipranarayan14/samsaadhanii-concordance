import React from "react";
import dynamic from "next/dynamic";

const AnalyseChat = dynamic(() => import("./AnalyseChat"), { ssr: false });

export const metadata = {
  title: "Analyse",
};

export default function Page() {
  return (
    <main>
      <AnalyseChat />
    </main>
  );
}
