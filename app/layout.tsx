import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/provider/ThemeProvider";
import { ConvexClientProvider } from "@/provider/ConvexProvider";
import ModelProvider from "@/provider/ModelProvider";
import { Toaster } from "sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "MindCanvas: Unleash Your Creativity",
  description:
    "MindCanvas is your ultimate digital workspace for brainstorming, planning, and collaborating. Our intuitive platform empowers individuals and teams to visualize their ideas, organize projects, and streamline workflows with ease. Whether you're crafting the next big project or simply mapping out your thoughts, MindCanvas offers the tools you need to bring your creativity to life. Join us and transform the way you think, plan, and create!",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/LogoDark.png",
        href: "/LogoDark.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/LogoLight.png",
        href: "/LogoLight.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="mindcanavs-theme"
            >
              <Toaster position="bottom-center" />
              <ModelProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
