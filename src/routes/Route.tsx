import App from "@/App";
import AddBook from "@/pages/book/AddBook";
import BookList from "@/pages/book/BookList";
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
        path: "/borrow-summary",
        element: <BorrowSummary />,
      },
    ],
  },
]);

export default router;
