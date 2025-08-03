import { defineField, defineType } from "sanity";

export const property = defineType({
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isPublished",
      title: "Is Published",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "banner",
      title: "Banner Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
      options: {
        layout: "grid",
      },
    }),
    defineField({
      name: "bedrooms",
      title: "Bedrooms",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "bathrooms",
      title: "Bathrooms",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "area",
      title: "Area",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "parking",
      title: "Parking",
      type: "number",
      validation: (rule) => rule.required().min(0),
      initialValue: 1,
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Wi-Fi", value: "wifi" },
          { title: "Gym", value: "gym" },
          { title: "Security", value: "security" },
          { title: "Parking", value: "parking" },
          { title: "Pool", value: "pool" },
          { title: "Garden", value: "garden" },
        ],
        layout: "list",
      },
    }),
  ],
});
