import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { IBook } from "@/types";

const AddBook = () => {
  const [formData, setFormData] = useState<Partial<IBook>>({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: 1,
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-gray-100 dark:bg-gray-900 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">➕ Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Input
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <Input
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />
        <Input
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="copies"
          placeholder="Number of copies"
          value={formData.copies}
          onChange={handleChange}
          required
          min={0}
        />
       <div className="flex justify-center">
         <Button type="submit" >
          ADD BOOk
        </Button>
       </div>
      </form>
    </div>
  );
};

export default AddBook;
