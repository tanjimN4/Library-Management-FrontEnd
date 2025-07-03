import App from "@/App";
import AddBook from "@/pages/book/AddBook";
import BookList from "@/pages/book/BookList";
import EditBook from "@/pages/book/EditBook";
import BorrowBook from "@/pages/borrow/BorrowBook";
import BorrowSummary from "@/pages/borrow/BorrowSummary";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout component
    children: [
      {
        path: "/",
        element: <BookList />,
      },
      {
        path: "/books",
        element: <BookList />,
      },
      {
        path: "/create-book",
        element: <AddBook />,
      },
      {
        path: "/edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "/borrow/:bookId",
        element: <BorrowBook />,
      },
      {
        path: "/borrow-summary",
        element: <BorrowSummary />,
      },
    ],
  },
]);

export default router;
