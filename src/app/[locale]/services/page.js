import { Hero } from "@/components/Services/Hero";
import { ServiceItem } from "@/components/Services/ServiceItem";
import { MY_SERVICES } from "@/helpers/staticData";

export const metadata = {
  title: "Cristian Orrego Dev 👨‍💻 | Servicios de desarrollo web",
  description:
    "Potencia tu presencia en línea con soluciones web personalizadas. Desde páginas personales hasta e-commerce y proyectos corporativos, ¡hacemos realidad tu visión digital!",
  keywords:
    "cristianorregodev, desarrollo web, desarrollo web colombia, desarrollo web colombia, desarrollo web colombia, tienda en linea, desarrollo de e-commerce, desarrollo web cali, desarrollo web medellin, agencia de diseño web colombia",
  metadataBase: new URL("https://cristianorrego.dev"),
  author: "cristianorregodev",
  openGraph: {
    title: `Cristian Orrego Dev 👨‍💻 | Servicio de desarrollo web`,
    description:
      "Potencia tu presencia en línea con soluciones web personalizadas. Desde páginas personales hasta e-commerce y proyectos corporativos, ¡hacemos realidad tu visión digital!",
    images: ["/images/og-services.webp"],
    author: "cristianorregodev",
    url: "https://cristianorrego.dev/services",
    author: "cristianorregodev",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Hero />
      {MY_SERVICES.map((service) => (
        <ServiceItem key={service.title} service={service} />
      ))}
    </>
  );
}
