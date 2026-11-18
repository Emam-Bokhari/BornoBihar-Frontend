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
import { Textarea } from "@/components/ui/textarea";
import { addBlog } from "@/services/Blog";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Tag,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { blogSchema } from "./blog.validation";

export default function AddBlogForm() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      title: "",
      thumbnail: "",
      category: "",
      authorName: "",
      introduction: "",
      mainContent: "",
      tags: [],
    },
    resolver: zodResolver(blogSchema),
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;

  const thumbnailWatch = watch("thumbnail");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await addBlog(data);

      if (response?.success) {
        toast.success("Blog is created successfully");
        router.push("/admin/dashboard/blogs");
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
          id="add-blog-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Top Header with title and actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200/80 dark:border-zinc-800">
            <div className="space-y-1">
              <Link
                href="/admin/dashboard/blogs"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Blogs
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Add a New Blog
              </h1>
              <p className="text-sm text-muted-foreground">
                Write and publish articles, reading guides, and literary news.
              </p>
            </div>

            {/* <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/dashboard/blogs")}
                className="cursor-pointer rounded-xl h-10 px-4 text-xs font-medium"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#F65D4E] hover:bg-[#D84C3F] text-white font-medium shadow-xs cursor-pointer rounded-xl h-10 px-5 text-xs"
              >
                {isSubmitting ? "Adding..." : "Add Blog"}
              </Button>
            </div> */}
          </div>

          {/* Main 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (Main Article Content) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* 1. General Content Card */}
              <Card className="rounded-2xl border border-gray-200/80 dark:border-zinc-800 shadow-xs bg-white dark:bg-zinc-900 overflow-hidden">
                <CardHeader className="p-5 pb-4 border-b border-gray-100 dark:border-zinc-800/80">
                  <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#F65D4E]" /> Article Content
                  </CardTitle>
                  <CardDescription>
                    Provide the title, introduction, and comprehensive article body.
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
                          Blog Title <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g. 10 Timeless Classic Novels Everyone Should Read"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Introduction */}
                  <FormField
                    control={form.control}
                    name="introduction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Introduction <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Write a captivating summary or hook for the article..."
                            className="w-full min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Main Content */}
                  <FormField
                    control={form.control}
                    name="mainContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Main Content <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Write the full comprehensive article body here..."
                            className="w-full min-h-[260px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* 2. Author Details Card */}
              <Card className="rounded-xl border border-border/70 shadow-xs">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <User className="w-4 h-4 text-[#F65D4E]" /> Author Information
                  </CardTitle>
                  <CardDescription>
                    Credit the author or editorial team behind this post.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="authorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Author Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g. John Doe / BornoBihar Editorial Team"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Column (Media, Category & Actions) */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-6">
              {/* 1. Featured Image Card */}
              <Card className="rounded-xl border border-border/70 shadow-xs">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#F65D4E]" /> Featured Image
                  </CardTitle>
                  <CardDescription>
                    Thumbnail banner displayed in the blog listing and header.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Dashed preview container */}
                  <div className="border-2 border-dashed border-border/80 rounded-xl p-4 bg-muted/20 flex flex-col items-center justify-center">
                    <p className="text-xs font-medium text-muted-foreground mb-3 self-start">
                      Banner Preview
                    </p>

                    {thumbnailWatch && thumbnailWatch.trim() ? (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border/70 bg-card shadow-xs group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={thumbnailWatch.trim()}
                          alt="Blog thumbnail preview"
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          onError={(e) => {
                            (
                              e.currentTarget as HTMLElement
                            ).style.display = "none";
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-6 text-center">
                        <ImageIcon className="w-10 h-10 text-muted-foreground/30 mb-2" />
                        <p className="text-xs text-muted-foreground">
                          No thumbnail preview yet
                        </p>
                        <p className="text-[11px] text-muted-foreground/70">
                          Enter image URL below to see preview
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail URL Input */}
                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Thumbnail URL <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://images.unsplash.com/photo-..."
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* 2. Category & Tags Card */}
              <Card className="rounded-xl border border-border/70 shadow-xs">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#F65D4E]" /> Classification & Tags
                  </CardTitle>
                  <CardDescription>
                    Organize post for easy discovery by readers.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Category */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Category <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g. Book Reviews, Author Spotlight, News"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Tags */}
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Tags <span className="text-xs text-muted-foreground">(Optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-[80px]"
                            value={
                              Array.isArray(field.value)
                                ? field.value.join(", ")
                                : field.value || ""
                            }
                            placeholder="Enter tags separated by commas, e.g. Books, Fiction, Classics"
                            onChange={(e) => {
                              const value = e.target.value;
                              form.setValue(
                                "tags",
                                value
                                  .split(",")
                                  .map((item) => item.trim())
                                  .filter(Boolean) as unknown as never
                              );
                            }}
                          />
                        </FormControl>
                        <p className="text-[11px] text-muted-foreground">
                          Separate multiple tags with a comma (,).
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* 3. Action Card */}
              <Card className="rounded-xl border border-border/70 shadow-xs bg-muted/20">
                <CardContent className="pt-6 space-y-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#F65D4E] hover:bg-[#D84C3F] text-white font-medium shadow-sm cursor-pointer h-10"
                  >
                    {isSubmitting ? "Adding..." : "Add Blog"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin/dashboard/blogs")}
                    className="w-full cursor-pointer h-10"
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
