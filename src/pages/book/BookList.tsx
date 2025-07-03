import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import { useNavigate } from "react-router-dom";
import EditBook from "./EditBook";
import BorrowBook from "../borrow/BorrowBook";

const BookList = () => {
    const {data : books,isError,isLoading}=useGetBooksQuery(undefined)
    // console.log( books,isLoading,isError);
    
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (isError || !Array.isArray(books)) return <p>Failed to load books.</p>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">📚 All Books</h2>
        <Button onClick={() => navigate("/create-book")}>➕ Add New Book</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Card key={book._id} className="shadow-md border rounded-2xl bg-gray-300 dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-lg">{book.title}</CardTitle>
              <CardDescription>by {book.author}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
              <p><strong>Copies:</strong> {book.copies}</p>
              <p>
                <strong>Available:</strong>{" "}
                {book.copies === 0 || !book.available ? "❌ No" : "✅ Yes"}
              </p>
              <p className="text-muted-foreground">{book.description}</p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <EditBook book={book}></EditBook>
              <BorrowBook></BorrowBook>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => alert("Delete not implemented")}
              >
                🗑️ Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookList;
