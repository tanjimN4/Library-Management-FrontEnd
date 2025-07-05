import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddBookMutation } from "@/redux/api/baseApi";
import type { IAddBook, IBookInput } from "@/types";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";


const AddBook = () => {

  const [addBook] = useAddBookMutation()
  const navigate = useNavigate()
  const form = useForm<IAddBook>();
  const [imagePreview, setImagePreview] = useState<string>();
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.secure_url;
  };

  const onsubmit: SubmitHandler<IAddBook> = async (data) => {
    try {
      let imageUrl = "";
      if (newImageFile) {
        imageUrl = await uploadImageToCloudinary(newImageFile);
      }

      const bookData:IBookInput = {

        ...data,
        image: imageUrl,
        isbn: nanoid(),
        available: true,
      };

      await addBook(bookData).unwrap();

      // ✅ Show success alert and redirect after closing
      Swal.fire({
        icon: "success",
        title: "Book Added!",
        text: "The new book has been added successfully.",
        showConfirmButton: true,
      }).then(() => {
        navigate("/books"); // 🔁 Update path if needed
      });
    } catch (error) {
      console.error("Failed to add book:", error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong while adding the book.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-gray-100 dark:bg-gray-900 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">➕ Add New Book</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ''} placeholder="Enter book title" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ''} placeholder="Enter author's name" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ''} placeholder="Enter genre (e.g., Fiction)" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ''} placeholder="Enter book description" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="copies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copies</FormLabel>
                <FormControl>
                  <Input type="number" {...field} value={field.value || ''} placeholder="Enter number of copies" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Book Image</FormLabel>
            <div className="flex items-start gap-4">
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  className=""
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setNewImageFile(file);
                      setImagePreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </FormControl>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Book Preview"
                  className="h-20 w-30 rounded object-cover border border-gray-300"
                />
              )}
            </div>
          </FormItem>

          <div className="flex justify-center mt-4">
            <Button type="submit" className="bg-emerald-600 dark:text-white">ADD BOOK</Button>
          </div>

        </form>
      </Form>
    </div>
  );
};

export default AddBook;
