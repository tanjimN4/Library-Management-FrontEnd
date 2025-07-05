import { Button } from "@/components/ui/button";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import Swal from 'sweetalert2'
interface DeleteBookProps {
    id: string;
}

const DeleteBook = ({ id }: DeleteBookProps) => {

    const [deleteBook] = useDeleteBookMutation()

    const deleteOneBook = (id: string) => {
        console.log(id)

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteBook(id).unwrap()
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your Book has been deleted.",
                            icon: "success"
                        });
                    })
                    .catch((error)=>{
                        Swal.fire("Error: Failed to delete book")
                        console.log(error);
                        
                    })

            }
        });
    }

    return (
        <div>
            <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteOneBook(id)}
            >
                🗑️ Delete
            </Button>
        </div>
    );
};

export default DeleteBook;