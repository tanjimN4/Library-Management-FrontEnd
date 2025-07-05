import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import { useNavigate } from "react-router-dom";
import EditBook from "./EditBook";
import BorrowBook from "../borrow/BorrowBook";
import DeleteBook from "./DeleteBook";

const BookList = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useGetBooksQuery({ page, limit });
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Failed to load books.</p>;

  const books = data.data;
  console.log(data);
  

  const pagination = data.pagination;

 const totalPages = pagination?.totalPages || 1;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">📚 All Books</h2>
        <Button onClick={() => navigate("/create-book")}>➕ Add New Book</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <Card
            key={book._id}
            className="shadow-md border rounded-2xl bg-gray-300 dark:bg-gray-900 w-96"
          >
            <CardHeader>
              <img
                src={book.image}
                alt={book.title}
                className="w-96 h-80 object-fill rounded-lg mb-4"
              />
              <CardTitle className="text-lg">{book.title}</CardTitle>
              <CardDescription>by {book.author}</CardDescription>
            </CardHeader>

            <CardContent className="text-sm space-y-1">
              <p>
                <strong>Genre:</strong> {book.genre}
              </p>
              <p>
                <strong>ISBN:</strong> {book.isbn}
              </p>
              <p>
                <strong>Copies:</strong> {book.copies}
              </p>
              <p>
                <strong>Available:</strong>{" "}
                {book.copies === 0 || !book.available ? "❌ No" : "✅ Yes"}
              </p>
              <p className="text-muted-foreground">{book.description}</p>
            </CardContent>

            <CardFooter className="flex justify-end space-x-2">
              <EditBook book={book} />
              <BorrowBook book={book} />
              <DeleteBook id={book._id}></DeleteBook>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-4">
        <Button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="bg-blue-500 text-white"
        >
          ⬅ Prev
        </Button>

        <span className="text-center font-medium">
          Page {page} of {totalPages}
        </span>

        <Button
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="bg-blue-500 text-white"
        >
          Next ➡
        </Button>
      </div>
    </div>
  );
};

export default BookList;
