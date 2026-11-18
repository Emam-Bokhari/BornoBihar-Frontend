"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updateProductById } from "@/services/Product";
import { TProduct } from "@/types";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  DollarSign,
  FileText,
  Image as ImageIcon,
  Layers,
  Plus,
  ShieldCheck,
  Tag,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";

const categoryOptions = [
  { value: "fiction", label: "Fiction" },
  { value: "nonFiction", label: "Non-Fiction" },
  { value: "academic", label: "Academic" },
  { value: "philosophy", label: "Philosophy" },
  { value: "children", label: "Children" },
  { value: "science", label: "Science" },
  { value: "religion", label: "Religion" },
  { value: "history", label: "History" },
  { value: "biography", label: "Biography" },
  { value: "art", label: "Art" },
  { value: "poetry", label: "Poetry" },
  { value: "romance", label: "Romance" },
  { value: "mystery", label: "Mystery" },
  { value: "fantasy", label: "Fantasy" },
  { value: "travel", label: "Travel" },
  { value: "selfHelp", label: "Self-Help" },
  { value: "psychology", label: "Psychology" },
  { value: "politics", label: "Politics" },
  { value: "cookbook", label: "Cookbook" },
  { value: "humor", label: "Humor" },
  { value: "graphicNovels", label: "Graphic Novels" },
  { value: "health", label: "Health" },
  { value: "technology", label: "Technology" },
  { value: "business", label: "Business" },
  { value: "education", label: "Education" },
  { value: "sports", label: "Sports" },
];

const languageOptions = [
  { value: "bengali", label: "Bengali" },
  { value: "english", label: "English" },
  { value: "arabic", label: "Arabic" },
  { value: "hindi", label: "Hindi" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "italian", label: "Italian" },
  { value: "portuguese", label: "Portuguese" },
  { value: "russian", label: "Russian" },
  { value: "chinese", label: "Chinese" },
  { value: "japanese", label: "Japanese" },
  { value: "korean", label: "Korean" },
  { value: "turkish", label: "Turkish" },
  { value: "urdu", label: "Urdu" },
  { value: "swedish", label: "Swedish" },
  { value: "dutch", label: "Dutch" },
  { value: "polish", label: "Polish" },
  { value: "greek", label: "Greek" },
  { value: "hebrew", label: "Hebrew" },
  { value: "persian", label: "Persian" },
  { value: "thai", label: "Thai" },
  { value: "vietnamese", label: "Vietnamese" },
];

const formatOptions = [
  { value: "hardcover", label: "Hardcover" },
  { value: "paperback", label: "Paperback" },
  { value: "eBook", label: "eBook" },
  { value: "audioBook", label: "Audio Book" },
  { value: "pdf", label: "PDF" },
  { value: "audiobookMP3", label: "Audiobook MP3" },
  { value: "audiobookCD", label: "Audiobook CD" },
  { value: "comicBook", label: "Comic Book" },
  { value: "interactiveBook", label: "Interactive Book" },
  { value: "flipBook", label: "Flip Book" },
  { value: "boxSet", label: "Box Set" },
  { value: "deluxeEdition", label: "Deluxe Edition" },
];

export default function UpdateProductForm({ product }: { product: TProduct }) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      title: product?.title || "",
      category: product?.category || "",
      author: product?.author || "",
      aboutAuthor: product?.aboutAuthor || "",
      shipping: product?.shipping || "",
      returnsPolicy: product?.returnsPolicy || "",
      termsOfSale: product?.termsOfSale || "",
      description: product?.description || "",
      price: product?.price ? String(product.price) : "",
      images:
        product?.images && product.images.length > 0
          ? product.images.map((image) => ({ value: image }))
          : [{ value: "" }],
      publisher: product?.publisher || "",
      publishedDate: product?.publishedDate || "",
      edition: product?.edition || "",
      language: product?.language || "",
      pages: product?.pages ? String(product.pages) : "",
      rating: product?.rating ? String(product.rating) : "",
      format: product?.format || "",
      quantity: product?.quantity ? String(product.quantity) : "",
    },
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;

  const {
    append: appendImage,
    remove: removeImage,
    fields: imageFields,
  } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const addImage = () => {
    appendImage({ value: "" });
  };

  const imagesWatch = watch("images");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const images = data.images.map((image: { value: string }) => image.value);
    const modifiedData = {
      ...data,
      images,
      price: parseFloat(data.price),
      pages: parseInt(data?.pages),
      rating: parseInt(data.rating),
      discount: parseInt(data?.discount),
      quantity: parseInt(data.quantity),
    };

    try {
      const response = await updateProductById(product._id, modifiedData);
      if (response?.success) {
        toast.success("Product updated successfully");
        router.push("/admin/dashboard/products");
      } else {
        toast.error(response.error[0]?.message);
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="w-full p-4 space-y-6 pb-12">
      <FormProvider {...form}>
        <form
          id="update-product-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Top Header with title and actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200/80 dark:border-zinc-800">
            <div className="space-y-1">
              <Link
                href="/admin/dashboard/products"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Products
              </Link>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Update Product
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Edit product details, images, pricing, and stock information.
              </p>
            </div>

            {/* <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/dashboard/products")}
                className="cursor-pointer rounded-xl h-10 px-4 text-xs font-medium"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#F65D4E] hover:bg-[#D84C3F] text-white font-medium shadow-xs cursor-pointer rounded-xl h-10 px-5 text-xs"
              >
                {isSubmitting ? "Updating..." : "Update Product"}
              </Button>
            </div> */}
          </div>

          {/* Main 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (Main Information) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* 1. General Information Card */}
              <Card className="rounded-2xl border border-gray-200/80 dark:border-zinc-800 shadow-xs bg-white dark:bg-zinc-900 overflow-hidden">
                <CardHeader className="p-5 pb-4 border-b border-gray-100 dark:border-zinc-800/80">
                  <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#F65D4E]" /> General Information
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-0.5">
                    Provide essential details about the book.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Product Name / Title <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            placeholder="Enter your book title"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Description <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            value={field.value || ""}
                            placeholder="Write a comprehensive description about the book..."
                            className="w-full min-h-[130px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* 2. Pricing Card */}
              <Card className="rounded-2xl border border-gray-200/80 dark:border-zinc-800 shadow-xs bg-white dark:bg-zinc-900 overflow-hidden">
                <CardHeader className="p-5 pb-4 border-b border-gray-100 dark:border-zinc-800/80">
                  <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[#F65D4E]" /> Pricing
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-0.5">
                    Configure the price for this product.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Base Price <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">
                              $
                            </span>
                            <Input
                              {...field}
                              type="number"
                              step="0.01"
                              min="0"
                              value={field.value || ""}
                              placeholder="0.00"
                              className="pl-7 w-full"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* 3. Inventory Card */}
              <Card className="rounded-2xl border border-gray-200/80 dark:border-zinc-800 shadow-xs bg-white dark:bg-zinc-900 overflow-hidden">
                <CardHeader className="p-5 pb-4 border-b border-gray-100 dark:border-zinc-800/80">
                  <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#F65D4E]" /> Inventory & Rating
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-0.5">
                    Manage stock availability and book rating.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Quantity */}
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Stock Quantity <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              min="0"
                              value={field.value || ""}
                              placeholder="e.g. 50"
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Rating */}
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Rating (1 to 5) <span className="text-red-500">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value || ""}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select rating" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="5">5 ★★★★★ (Exceptional)</SelectItem>
                              <SelectItem value="4">4 ★★★★☆ (Very Good)</SelectItem>
                              <SelectItem value="3">3 ★★★☆☆ (Good)</SelectItem>
                              <SelectItem value="2">2 ★★☆☆☆ (Fair)</SelectItem>
                              <SelectItem value="1">1 ★☆☆☆☆ (Poor)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* 4. Author Details Card */}
              <Card className="rounded-2xl border border-gray-200/80 dark:border-zinc-800 shadow-xs bg-white dark:bg-zinc-900 overflow-hidden">
                <CardHeader className="p-5 pb-4 border-b border-gray-100 dark:border-zinc-800/80">
                  <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#F65D4E]" /> Author Details
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-0.5">
                    Information about the writer and background profile.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  {/* Author Name */}
                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Author Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            placeholder="Enter author full name"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* About Author */}
                  <FormField
                    control={form.control}
                    name="aboutAuthor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          About Author <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            value={field.value || ""}
                            placeholder="Enter author bio and background information..."
                            className="w-full min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* 5. Policies & Terms Card */}
              <Card className="rounded-2xl border border-gray-200/80 dark:border-zinc-800 shadow-xs bg-white dark:bg-zinc-900 overflow-hidden">
                <CardHeader className="p-5 pb-4 border-b border-gray-100 dark:border-zinc-800/80">
                  <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#F65D4E]" /> Policies & Terms
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-0.5">
                    Shipping rules, returns policy, and terms of sale.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  {/* Shipping */}
                  <FormField
                    control={form.control}
                    name="shipping"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Shipping Policy <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            value={field.value || ""}
                            placeholder="Enter shipping details and delivery guidelines..."
                            className="w-full min-h-[80px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Returns Policy */}
                  <FormField
                    control={form.control}
                    name="returnsPolicy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Returns Policy <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            value={field.value || ""}
                            placeholder="Enter returns, replacement and refund rules..."
                            className="w-full min-h-[80px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Terms of Sale */}
                  <FormField
                    control={form.control}
                    name="termsOfSale"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Terms of Sale <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            value={field.value || ""}
                            placeholder="Enter terms of sale conditions..."
                            className="w-full min-h-[80px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Column (Sidebar Media & Organization) */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-6">
              {/* 1. Product Media Card */}
              <Card className="rounded-2xl border border-gray-200/80 dark:border-zinc-800 shadow-xs bg-white dark:bg-zinc-900 overflow-hidden">
                <CardHeader className="p-5 pb-4 border-b border-gray-100 dark:border-zinc-800/80">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#F65D4E]" /> Product Media
                    </CardTitle>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addImage}
                      className="h-8 gap-1.5 text-xs font-medium border-[#F65D4E]/40 text-[#F65D4E] hover:bg-[#F65D4E]/10 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Image
                    </Button>
                  </div>
                  <CardDescription className="text-xs text-muted-foreground mt-0.5">
                    Photo previews and image URL management.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  {/* Dashed photo preview container matching screenshot */}
                  <div className="border-2 border-dashed border-border/80 rounded-xl p-4 bg-muted/20 flex flex-col items-center justify-center">
                    <p className="text-xs font-medium text-muted-foreground mb-3 self-start">
                      Photo Product
                    </p>

                    {/* Previews row */}
                    {imagesWatch &&
                    imagesWatch.some(
                      (img: { value: string }) => img?.value?.trim()
                    ) ? (
                      <div className="flex flex-wrap gap-2.5 items-center justify-center w-full">
                        {imagesWatch.map(
                          (img: { value: string }, idx: number) => {
                            const url = img?.value?.trim();
                            if (!url) return null;
                            return (
                              <div
                                key={idx}
                                className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-border/70 bg-card shadow-xs group"
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={url}
                                  alt={`Product image ${idx + 1}`}
                                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                  onError={(e) => {
                                    (
                                      e.currentTarget as HTMLElement
                                    ).style.display = "none";
                                  }}
                                />
                                <span className="absolute bottom-1 left-1 bg-black/60 text-[10px] text-white px-1 rounded font-medium">
                                  #{idx + 1}
                                </span>
                                {imageFields.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeImage(idx)}
                                    className="absolute top-1 right-1 bg-red-600/90 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-xs"
                                    title="Remove this image"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            );
                          }
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-4 text-center">
                        <ImageIcon className="w-10 h-10 text-muted-foreground/30 mb-2" />
                        <p className="text-xs text-muted-foreground">
                          No images to preview yet
                        </p>
                        <p className="text-[11px] text-muted-foreground/70">
                          Enter image URLs below to see previews
                        </p>
                      </div>
                    )}

                    {/* Add More Image Button inside container */}
                    <div className="mt-3.5 w-full flex justify-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addImage}
                        className="border-[#F65D4E]/40 text-[#F65D4E] hover:bg-[#F65D4E]/10 rounded-lg text-xs font-medium cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 mr-1" /> Add More Image
                      </Button>
                    </div>
                  </div>

                  {/* Image URL Inputs list */}
                  <div className="space-y-3 pt-1">
                    {imageFields.map((imageField, index) => (
                      <div key={imageField.id} className="relative">
                        <FormField
                          control={form.control}
                          name={`images.${index}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center justify-between">
                                <FormLabel className="text-xs font-medium text-muted-foreground">
                                  Image {index + 1} {index === 0 && "(Cover)"}
                                </FormLabel>
                                {imageFields.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="text-xs text-destructive hover:underline flex items-center gap-1 cursor-pointer"
                                  >
                                    <Trash2 className="w-3 h-3" /> Remove
                                  </button>
                                )}
                              </div>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={field.value || ""}
                                  placeholder="https://example.com/cover.jpg"
                                  className="w-full text-xs"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 2. Category Card */}
              <Card className="rounded-2xl border border-gray-200/80 dark:border-zinc-800 shadow-xs bg-white dark:bg-zinc-900 overflow-hidden">
                <CardHeader className="p-5 pb-4 border-b border-gray-100 dark:border-zinc-800/80">
                  <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#F65D4E]" /> Category & Attributes
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-0.5">
                    Organize your product for easy navigation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  {/* Category */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Product Category <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60">
                            {categoryOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Language */}
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Language <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60">
                            {languageOptions.map((language) => (
                              <SelectItem
                                key={language.value}
                                value={language.value}
                              >
                                {language.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Format */}
                  <FormField
                    control={form.control}
                    name="format"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Format <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60">
                            {formatOptions.map((format) => (
                              <SelectItem key={format.value} value={format.value}>
                                {format.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* 3. Publishing Details Card */}
              <Card className="rounded-2xl border border-gray-200/80 dark:border-zinc-800 shadow-xs bg-white dark:bg-zinc-900 overflow-hidden">
                <CardHeader className="p-5 pb-4 border-b border-gray-100 dark:border-zinc-800/80">
                  <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#F65D4E]" /> Publishing Details
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-0.5">
                    Publication date, publisher, and volume.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  {/* Publisher */}
                  <FormField
                    control={form.control}
                    name="publisher"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Publisher <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            placeholder="e.g. Penguin Random House"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Published Date */}
                  <FormField
                    control={form.control}
                    name="publishedDate"
                    render={({ field }) => {
                      const dateValue = field.value
                        ? new Date(field.value).toISOString().split("T")[0]
                        : "";
                      return (
                        <FormItem>
                          <FormLabel>
                            Published Date <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="date"
                              value={dateValue}
                              onChange={(e) => field.onChange(e.target.value)}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  {/* Edition */}
                  <FormField
                    control={form.control}
                    name="edition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Edition <span className="text-xs text-muted-foreground">(Optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            placeholder="e.g. 1st Edition"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Pages */}
                  <FormField
                    control={form.control}
                    name="pages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Pages <span className="text-xs text-muted-foreground">(Optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min="1"
                            value={field.value ?? ""}
                            placeholder="e.g. 320"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* 4. Action Card */}
              <Card className="rounded-2xl border border-gray-200/80 dark:border-zinc-800 shadow-xs bg-zinc-50/50 dark:bg-zinc-900/50 overflow-hidden">
                <CardContent className="p-5 space-y-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#F65D4E] hover:bg-[#D84C3F] text-white font-medium shadow-xs cursor-pointer h-10 rounded-xl text-sm"
                  >
                    {isSubmitting ? "Updating..." : "Update Product"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/dashboard/products")}
                    className="w-full cursor-pointer h-10 rounded-xl text-sm border-gray-200 dark:border-zinc-800"
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
