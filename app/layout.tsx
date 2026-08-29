import type { Metadata } from "next";
import { Geist_Mono, Manrope, Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const fontHeading = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-heading",
  subsets: ["latin"],
});

const fontBody = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Irriguide",
  description:
    "Optimizing water resources for sustainable agriculture and healthier yields.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fontHeading.variable} ${fontBody.variable} ${fontMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableColorScheme
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
