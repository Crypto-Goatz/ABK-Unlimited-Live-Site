import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getSiteConfig } from "@/config/site.config";
import { getSheetData } from "@/lib/google/sheets";
import { getPublicUrl } from "@/lib/drive-utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 300;

async function getServices() {
  try {
    return await getSheetData("services");
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const services = await getServices();
  return services
    .filter((s) => s.slug)
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const services = await getServices();
  const service = services.find((s) => s.slug === slug);
  const config = getSiteConfig();

  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | ${config.name}`,
    description: service.description?.slice(0, 160) || `${service.title} services from ${config.name}`,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = getSiteConfig();
  const services = await getServices();
  const service = services.find((s) => s.slug === slug);

  if (!service) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <article className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
                {service.title}
              </h1>
            </div>

            {service.image_id && (
              <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden mb-12 bg-gray-100">
                <Image
                  src={getPublicUrl(service.image_id)}
                  alt={service.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            <div className="prose prose-lg max-w-3xl mx-auto">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {service.description}
              </p>

              {service.features && (
                <div className="mt-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    What&apos;s Included
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none pl-0">
                    {service.features.split("|").map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                        {feature.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.price_range && (
                <div className="mt-8 inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-lg font-medium">
                  Typical Investment: {service.price_range}
                </div>
              )}
            </div>

            <div className="mt-16 rounded-2xl bg-emerald-700 p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Interested in {service.title}?
              </h2>
              <p className="text-emerald-100 max-w-xl mx-auto mb-8">
                Get in touch with us to learn more about how we can help.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition-colors"
              >
                Contact Us <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
