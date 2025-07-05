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
import { useAddBorrowBookMutation } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { format } from "date-fns"; 

interface BorrowData {
    title: string;
    isbn: string;
    quantity: number;
    dueDate: string;
    book?: string;
}

const BorrowBook = ({ book }: { book: IBook }) => {

    const todayStr = format(new Date(), "yyyy-MM-dd");

    const [addBorrowBook] = useAddBorrowBookMutation()
    const navigate = useNavigate();
    const form = useForm<BorrowData>({
        defaultValues: {
            title: book.title,
            isbn: book.isbn,
            quantity: 1,
            dueDate: "",
        },
    });

    const onSubmit = async (data: BorrowData) => {
        if (data.quantity > book.copies) {
            Swal.fire({
                icon: "error",
                title: "Too Many Copies",
                text: "Quantity exceeds available copies!",
            });
            return;
        }

        if (book.copies === 0) {
            Swal.fire({
                icon: "warning",
                title: "Unavailable",
                text: "This book is currently unavailable.",
            });
            return;
        }

        try {
            const borrowdata = { ...data, book: book._id }
            await addBorrowBook(borrowdata).unwrap(); // unwrap() throws if there's an error

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Borrowed successfully",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                navigate("/borrow-summary");
            });
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Borrowed Failed",
                showConfirmButton: false,
                timer: 1500,
            })
            console.log(error);

        }
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="bg-cyan-500 hover:bg-cyan-600"
                    disabled={book.copies === 0}
                >
                    📥 Borrow
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Borrow Book</DialogTitle>
                    <DialogDescription>
                        Fill in the quantity and due date to borrow the book.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-3"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} readOnly className="bg-gray-100" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isbn"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ISBN</FormLabel>
                                    <FormControl>
                                        <Input {...field} readOnly className="bg-gray-100" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantity (Available: {book.copies})</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={1}
                                            max={book.copies}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dueDate"
                            rules={{
                                required: "Due date is required",
                                validate: (value) => {
                                    if (!value) return "Due date is required";
                                    const selectedDate = new Date(value);
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0); // normalize to start of day
                                    if (selectedDate < today) {
                                        return "Due date cannot be in the past";
                                    }
                                    return true;
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Due Date</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            {...field}
                                            min={todayStr} // disables past dates in date picker UI
                                        />
                                    </FormControl>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                </FormItem>
                            )}
                        />;

                        <DialogFooter>
                            <Button
                                className="bg-emerald-700 hover:bg-emerald-500"
                                type="submit"
                            >
                                Confirm Borrow
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default BorrowBook;
