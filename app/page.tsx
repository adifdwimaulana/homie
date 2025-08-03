import Link from "next/link";
import Image from "next/image";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import { type SanityDocument } from "next-sanity";
import { client, urlFor } from "@/lib/sanity";

const PROPERTY_QUERY = `*[_type == "property" && isPublished == true]{
  _id,
  title,
  slug,
  description,
  price,
  location,
  isPublished,
  bedrooms,
  bathrooms,
  area,
  banner
}`;

const options = { next: { revalidate: 60 } };

export default async function HomePage() {
  const currentYear = new Date().getFullYear();
  const properties: SanityDocument[] = await client.fetch(
    PROPERTY_QUERY,
    {},
    options
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Homie</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/studio">Sell</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Find Your Perfect Property
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover exceptional properties in prime locations. From modern
            apartments to luxury homes, we have the perfect space for your
            lifestyle.
          </p>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Link
                key={property.slug.current}
                href={`/property/${property.slug.current}`}
              >
                <div className="h-full flex flex-col bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
                  <div className="relative overflow-hidden">
                    <Image
                      src={urlFor(property.banner) || "/placeholder.svg"}
                      alt={property.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                      ${property.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {property.title}
                    </h4>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {property.description}
                    </p>

                    <div className="flex items-center text-gray-500 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{property.bedrooms} bed</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{property.bathrooms} bath</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        <span>{property.area} sqft</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bottom-0 w-full bg-gray-900 text-center text-gray-400 py-8">
        <p>&copy; {currentYear} Homie. All rights reserved.</p>
      </footer>
    </div>
  );
}
