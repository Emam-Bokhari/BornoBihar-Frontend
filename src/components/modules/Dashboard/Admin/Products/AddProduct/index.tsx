"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addProduct } from "@/services/Product";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ProductSchema } from "./product.validation";
import { Plus } from "lucide-react";

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

export default function AddProductForm() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      title: "",
      category: "",
      author: "",
      aboutAuthor: "",
      shipping: "",
      returnsPolicy: "",
      termsOfSale: "",
      description: "",
      price: "",
      images: [{ value: "" }],
      publisher: "",
      publishedDate: "",
      edition: "",
      language: "",
      pages: "",
      rating: "",
      format: "",
      quantity: "",
    },
    resolver: zodResolver(ProductSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const { append: appendImage, fields: imageFields } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const addImage = () => {
    appendImage({ value: "" });
  };

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
      const response = await addProduct(modifiedData);
      if (response?.success) {
        toast.success("Product is created successfully");
        router.push("/admin/dashboard/products");
      } else {
        toast.error(response.error[0]?.message);
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Add a New Product</h2>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* title and category */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* title */}
            <div className="flex-1">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Title <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your book title"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* category */}
            <div className="flex-1">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Category <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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
            </div>
          </div>

          {/* images */}
          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-3">
              <Label>
                Images <span className="text-red-500">*</span>
              </Label>
              <Button
                variant="outline"
                className="size-8 cursor-pointer bg-[#F65D4E] hover:bg-[#D84C3F]"
                onClick={addImage}
                type="button"
              >
                <Plus className=" text-white" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Dynamic image fields */}
              {imageFields.map((imageField, index) => (
                <div key={imageField.id}>
                  <FormField
                    control={form.control}
                    name={`images.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image {index + 1}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value || ""}
                            placeholder="Enter your image url"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* price */}
            <div>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Price <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter the price e.g, 15"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* language */}
            <div>
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
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* format */}
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
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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
            {/* author */}
            <div>
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Author <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter the author"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* pages */}
            <div>
              <FormField
                control={form.control}
                name="pages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pages</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Enter book pages e.g, 222"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* edition */}
            <div>
              <FormField
                control={form.control}
                name="edition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Edition</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter book edition e.g, 1st Edition"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* publisher */}
            <div>
              <FormField
                control={form.control}
                name="publisher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Publisher<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter book publisher"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* published date */}
            <div>
              <FormField
                control={form.control}
                name="publishedDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Published Date<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter book published date"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* rating */}
            <div>
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Rating<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter book rating e.g, 4"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* quantity */}
            <div>
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Quantity<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter book quantity e.g, 50"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            {/* description */}
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
                      placeholder="Enter description"
                      className="w-full min-h-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            {/* about author */}
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
                      placeholder="Enter about author"
                      className="w-full min-h-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            {/* shipping */}
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
                      placeholder="Enter shipping policy"
                      className="w-full min-h-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            {/* returns policy */}
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
                      placeholder="Enter returns policy"
                      className="w-full min-h-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            {/* terms of sale */}
            <FormField
              control={form.control}
              name="termsOfSale"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Terms of sale <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter terms of sale"
                      className="w-full min-h-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-4">
            <Button
              type="submit"
              className="bg-[#F65D4E] hover:bg-[#D84C3F] cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
