import { Search } from "./Search";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Search />

      {children}
    </main>
  );
}
