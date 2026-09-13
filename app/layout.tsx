import type { Metadata } from "next"
import "@/app/globals.css"
import Tawk from "@/components/tawk/Tawk"

export const metadata: Metadata = {
  title: "CapitalsFargoFX",
  description: "Digital asset management and investment platform.",
   icons: {
    icon: "/favicon.png",
  },
}


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">{children}</body>
      <Tawk />
    </html>
  )
}
