import { ModeToggle } from "./mode-toggle";
export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h1 className="text-xl font-bold">Cricket Analytics Dashboard</h1>
      <ModeToggle />
    </header>
  );
}
