import { Skeleton } from "@/components/ui/skeleton";
import { useGetBorrowBookQuery } from "@/redux/api/baseApi";

const BorrowSummary = () => {
  const {
    data: borrowedBooks = [],
    isLoading,
    isError,
    error,
  } = useGetBorrowBookQuery();

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">📚 Borrow Summary</h1>

      {isLoading ? (
        <Skeleton className="h-32 w-full rounded-md" />
      ) : isError ? (
        <p className="text-red-500 text-center">
          {(error as  { message: string })?.message || "Failed to load borrow summary"}
        </p>
      ) : borrowedBooks.length === 0 ? (
        <p className="text-center text-gray-500">No borrowed books found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full text-left text-sm border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-3 font-semibold">📖 Book Title</th>
                <th className="p-3 font-semibold">📘 ISBN</th>
                <th className="p-3 font-semibold">📦 Total Borrowed</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.map((item, index: number) => (
                <tr key={index} className="border-t hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="p-3">{item.book.title}</td>
                  <td className="p-3">{item.book.isbn}</td>
                  <td className="p-3">{item.totalQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BorrowSummary;
