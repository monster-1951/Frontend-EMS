import axios from "axios";


interface DeleteDialogProps {
  id: number;
}

const DeleteDialog = ({ id }: DeleteDialogProps) => {
  const ServerUrl = import.meta.env.VITE_ServerUrl
  const handleCancel = () => {
    window.location.href = `/dashboard`;
  };

  const handleDelete = async () => {
    const currentId = localStorage.getItem("id");
    if (currentId !== id.toString()) {
      const response = await axios
        .post(`${ServerUrl}/CRUD/Employee/Delete/${id}`)
        .then((res) => res)
        .catch((err) => err);

      console.log(response);

      window.location.href = `/dashboard`;
    } else {
      alert(
        `You can't delete your own data. Pleas login through another account and try`
      );
    }
  };

  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-opacity-75 transition-opacity w-full flex justify-center"></div>

        <div className="fixed inset-0 z-10 w-full ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
            <div className="relative transform overflow-hidden rounded-lg bg-gray-900 text-center shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg ">
              <div className="bg-gray-900 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 shadow-3xl ">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="font-bold leading-6 text-white text-2xl text-left"
                      id="modal-title"
                    >
                      Delete Employee {id} ?
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm font-semibold text-white">
                        Deletion is not reversible, and the Employee data will
                        be completely deleted. If you do not want to delete, you
                        can click cancel.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 px-4 py-3 sm:flex sm:justify-between sm:px-6 w-[86%] mx-auto">
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto border-[1px] border-black"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteDialog;
