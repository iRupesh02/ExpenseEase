import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "../components/ui/sonner"
import { dark } from '@clerk/themes'
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "ExpenseEase",
  description: "ExpenseEase sounds like an intuitive, user-friendly expense management tool designed to help users track, budget, and manage their finances efficiently. It could offer features like a clear dashboard for viewing expenses, budgeting tools, analytics for spending patterns, and integrations with Clerk authentication for user access and secure data handling.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: dark,
    }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased dark` }
        >
           <Toaster />
          {children}
         
        </body>
      </html>
    </ClerkProvider>
  );
}
