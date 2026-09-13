import type { Metadata } from "next"
import "@/app/globals.css"
import Tawk from "@/components/tawk/Tawk"
import { connectToDB } from "@/lib/connectToDB"

export const metadata: Metadata = {
  title: "CapitalsFargoFX",
  description: "Digital asset management and investment platform.",
   icons: {
    icon: "/favicon.png",
  },
}


export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const Yes = await connectToDB()

  console.log("Database connection status:", Yes ? "Connected" : "Failed to connect")
  
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">{children}</body>
      <Tawk />
    </html>
  )
}
