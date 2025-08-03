import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Wifi,
  Dumbbell,
  Shield,
  Waves,
  TreePine,
} from "lucide-react";
import { type SanityDocument } from "next-sanity";
import { client, urlFor } from "@/lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const AMENITIES = [
  { icon: Wifi, name: "wifi", title: "High-Speed Internet" },
  { icon: Dumbbell, name: "gym", title: "Fitness Center" },
  { icon: Shield, name: "security", title: "24/7 Security" },
  { icon: Car, name: "parking", title: "Parking Garage" },
  { icon: Waves, name: "pool", title: "Pool" },
  { icon: TreePine, name: "garden", title: "Garden Terrace" },
];

const PROPERTY_DETAIL_QUERY = `
  *[_type == "property" && isPublished == true && slug.current == $slug][0] {
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
    parking,
    banner,
    amenities,
    images
  }
`;

const options = { next: { revalidate: 60 } };

function Amenity({ name }: { name: string }) {
  const amenity = AMENITIES.find((amenity) => amenity.name === name);

  if (!amenity) return null;

  return (
    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
      <amenity.icon className="h-5 w-5 mr-3 text-blue-600" />
      <span className="text-gray-700">{amenity.title}</span>
    </div>
  );
}

export default async function PropertyDetail({
  params,
}: {
  params: { slug: string };
}) {
  const property: SanityDocument = await client.fetch(
    PROPERTY_DETAIL_QUERY,
    { slug: params.slug },
    options
  );

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Property Not Found
          </h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Return to listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center text-blue-600 hover:text-blue-700 mr-6"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to listings
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Homie</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div className="lg:col-span-1">
            <Image
              src={urlFor(property.banner) || "/placeholder.svg"}
              alt={property.title}
              width={800}
              height={600}
              className="w-full h-96 lg:h-[500px] object-cover rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {property.images.map((image: SanityImageSource, index: number) => (
              <Image
                key={index}
                src={urlFor(image) || "/placeholder.svg"}
                alt={`${property.title} - Image ${index + 2}`}
                width={400}
                height={300}
                className="w-full h-44 lg:h-[240px] object-cover rounded-xl"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    {property.price}
                  </div>
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Bed className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                  <div className="text-2xl font-bold text-gray-900">
                    {property.bedrooms}
                  </div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center">
                  <Bath className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                  <div className="text-2xl font-bold text-gray-900">
                    {property.bathrooms}
                  </div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center">
                  <Square className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                  <div className="text-2xl font-bold text-gray-900">
                    {property.area}
                  </div>
                  <div className="text-sm text-gray-600">Sq Ft</div>
                </div>
                <div className="text-center">
                  <Car className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                  <div className="text-2xl font-bold text-gray-900">
                    {property.parking}
                  </div>
                  <div className="text-sm text-gray-600">Parking</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity: string) => (
                    <Amenity name={amenity} key={amenity} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Contact Agent
              </h3>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="I'm interested in this property..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors mb-3">
                  Schedule Tour
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Save Property
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
