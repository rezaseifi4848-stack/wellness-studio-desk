import { PremiumPageShell } from "@/components/PremiumPageShell";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return <PremiumPageShell>{children}</PremiumPageShell>;
}
