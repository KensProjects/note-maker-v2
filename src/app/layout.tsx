import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "./_components/navbar/Navbar";
import JotaiProvider from "./_components/JotaiProvider";
import NextAuthProvider from "./_components/auth/NextAuthProvider";
import { getServerAuthSession } from "~/server/auth";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Note Maker",
  description: "A website used to create convenient notes for individual users!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession()

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider headers={headers()}>
          <JotaiProvider>
            <NextAuthProvider session={session}>
              <Toaster position="bottom-center" />
              <Navbar />
              {children}
            </NextAuthProvider>
          </JotaiProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
