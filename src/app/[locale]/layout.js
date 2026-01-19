import "@fontsource-variable/onest";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/Navbar";
import { DarkModeProvider } from "../providers/DarkModeProvider";
import "../globals.css";
import { Footer } from "@/components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export const metadata = {
  metadataBase: new URL("https://cristianorrego.dev"),
  title:
    "Cristian Orrego Dev 👨‍💻 | FullStack, React, Next, Laravel, NodeJS, Desarrollo",
  description:
    "Hola 👋, soy Cristian Orrego Dev, profesional en Ingeniería en Sistemas y Desarrollador FullStack con más de 3 años de experiencia en TI creando soluciones web desde páginas web informativas hasta aplicaciones web para uso de empresas resolviendo problemas de rendimiento y ayudando en el arduo proceso de digitalización. Echa un vistazo al timeline donde resumo mi experiencia y encuentra al final mi curriculum actualizado.",
  openGraph: {
    title:
      "Cristian Orrego Dev 👨‍💻 | FullStack, React, Next, Laravel, NodeJS, Desarrollo",
    description:
      "Hola 👋, soy Cristian Orrego, Ingeniero de Sistemas y Desarrollador FullStack con más de 3 años de experiencia. Este es mi portafolio personal, te invito a que conozcas un poco sobre mi trabajo.",
    images: ["/images/og.webp"],
    siteName: "cristianorrego.dev",
    type: "website",
    locale: "es_ES",
    url: "https://cristianorrego.dev",
    author: "cristianorregodev",
  },
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      suppressHydrationWarning
      lang={locale}
      className="scroll-smooth"
    >
      <body className="bg-dark-50 dark:bg-dark-950 ">
        <NextIntlClientProvider messages={messages}>
          <DarkModeProvider>
            <Navbar />
            {children}
            <Footer />
          </DarkModeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
