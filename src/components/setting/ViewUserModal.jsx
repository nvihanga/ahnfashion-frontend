import { Drawer, Box, IconButton } from "@mui/material";
import { MdClose } from "react-icons/md";

const ViewUserModal = ({ isOpen, onClose, user }) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 450, padding: 2, height: '100vh' }} role="presentation">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <h2 className="text-2xl font-semibold">User Details</h2>
          <IconButton onClick={onClose}>
            <MdClose />
          </IconButton>
        </Box>

        <div className="space-y-4 h-[calc(100vh-120px)] overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">User ID</label>
              <div className="w-full p-2 border rounded bg-gray-100">
                {user?.id}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <div className="w-full p-2 border rounded bg-gray-100">
                {user?.username}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <div className="w-full p-2 border rounded bg-gray-100">
                {user?.name}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="w-full p-2 border rounded bg-gray-100">
                {user?.email}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <div className="w-full p-2 border rounded bg-gray-100">
                {user?.phone}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <div className="w-full p-2 border rounded bg-gray-100">
                {user?.role}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <div className="w-full p-2 border rounded bg-gray-100">
                {user?.status}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Created At</label>
              <div className="w-full p-2 border rounded bg-gray-100">
                {new Date(user?.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Updated At</label>
              <div className="w-full p-2 border rounded bg-gray-100">
                {new Date(user?.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <Box display="flex"  alignItems="right" mb={3} mt={-5} px={42}>

        <div className="mt-4 flex justify-end"> 
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ViewUserModal;