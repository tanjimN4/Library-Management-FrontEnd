import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateBookMutation } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
interface IProps {
  book:IBook
}

const EditBook = ({ book }: IProps) => {
  const [open, setOpen] = useState(false);
  const [updateBook] = useUpdateBookMutation();
  const [imagePreview, setImagePreview] = useState<string>(book.image);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const form = useForm<IBook>({
    defaultValues: {
      title: book.title,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn,
      description: book.description,
      copies: book.copies,
      available: book.available,
      image: book.image,
    },
  });

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

  const onSubmit = async (data: IBook) => {
    let imageUrl = book.image;

    if (newImageFile) {
      imageUrl = await uploadImageToCloudinary(newImageFile);
    }

    const updatedBook: IBook = {
      ...data,
      available: data.copies > 0,
      image: imageUrl,
    };

    updateBook({ id: book._id, body: updatedBook });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-cyan-500 hover:bg-cyan-600">✏️ Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[500px] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>Edit and save your book details.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
                    <Input {...field} />
                  </FormControl>
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
                    <Input {...field} />
                  </FormControl>
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="copies"
              rules={{
                validate: (value) =>
                  value !== null && value >= 0 ? true : "Copies must be 0 or greater",
              }}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      min={0}
                      step={1}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                  )}
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
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
                  className="mt-2 h-32 rounded object-cover"
                />
              )}
            </FormItem>

            <DialogFooter>
              <Button className="bg-emerald-700 hover:bg-emerald-500" type="submit">
                💾 Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBook;
