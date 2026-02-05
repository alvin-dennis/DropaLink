import type { Metadata } from "next";
import { Bricolage_Grotesque, Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import "@/app/globals.css";
import { QueryProvider } from "@/components/providers/query-provider";

export const metadata: Metadata = {
  title: "Dropalink",
  description: "DropaLink - Private, one-time, and expiring links with full control.",
};

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});
const displayFont = Bricolage_Grotesque({
  variable: "--font-display",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${displayFont.variable}`}
    >
      <body className="min-h-screen bg-background font-poppins antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <QueryProvider>
            <div className="relative flex min-h-screen flex-col">
              <main className="flex-1">{children}</main>
            </div>
            <Toaster richColors position="top-center" theme="light" />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
