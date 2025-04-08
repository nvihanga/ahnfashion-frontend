// // import {
// //     Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
// //     TextField, Paper, Button, IconButton
// // } from "@mui/material";
// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import { format } from "date-fns";
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import EditIcon from '@mui/icons-material/Edit';

// // const CashOutList = () => {
// //     const [cashOuts, setCashOuts] = useState([]);
// //     const [search, setSearch] = useState("");
// //     const [editingId, setEditingId] = useState(null);
// //     const [editForm, setEditForm] = useState({ reason: "", amount: "", placeDate: "" });

// //     const fetchCashOuts = () => {
// //         axios.get("http://localhost:8085/api/v1/cashout")
// //             .then(res => {
// //                 console.log("Fetched CashOuts:", res.data);
// //                 setCashOuts(res.data);
// //             })
// //             .catch(err => {
// //                 console.error("Failed to fetch:", err);
// //                 alert("Error fetching Cash Out data");
// //             });
// //     };

// //     useEffect(() => {
// //         fetchCashOuts();
// //     }, []);

// //     const handleDelete = (id) => {
// //         axios.delete(`http://localhost:8085/api/v1/cashout/${id}`)
// //             .then(() => {
// //                 setCashOuts(prev => prev.filter(co => co.id !== id));
// //             })
// //             .catch(err => console.error("Failed to delete:", err));
// //     };

// //     const handleEdit = (cashOut) => {
// //         setEditingId(cashOut.id);
// //         setEditForm({
// //             reason: cashOut.reason || "",
// //             amount: cashOut.amount || "",
// //             placeDate: cashOut.placeDate || cashOut.date || ""
// //         });
// //     };

// //     const handleUpdate = (id) => {
// //         const updatedData = {
// //             reason: editForm.reason,
// //             amount: parseFloat(editForm.amount),
// //             placeDate: editForm.placeDate
// //         };

// //         axios.put(`http://localhost:8085/api/v1/cashout/${id}`, updatedData)
// //             .then(() => {
// //                 fetchCashOuts();
// //                 setEditingId(null);
// //                 setEditForm({ reason: "", amount: "", placeDate: "" });
// //             })
// //             .catch(err => {
// //                 console.error("Failed to update:", err);
// //                 alert("Update failed!");
// //             });
// //     };

// //     const filteredCashOuts = cashOuts.filter(co =>
// //         co.reason?.toLowerCase().includes(search.toLowerCase())
// //     );

// //     return (
// //         <div className="w-full p-4">
// //             <TextField
// //                 label="Search by Reason"
// //                 fullWidth
// //                 value={search}
// //                 onChange={(e) => setSearch(e.target.value)}
// //                 margin="normal"
// //             />

// //             <TableContainer component={Paper}>
// //                 <Table>
// //                     <TableHead>
// //                         <TableRow style={{ backgroundColor: "#f5f5f5" }}>
// //                             <TableCell><b>DATE</b></TableCell>
// //                             <TableCell><b>REASON</b></TableCell>
// //                             <TableCell><b>AMOUNT (RS)</b></TableCell>
// //                             <TableCell><b>ACTIONS</b></TableCell>
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {filteredCashOuts.map((co) => (
// //                             <TableRow key={co.id}>
// //                                 {editingId === co.id ? (
// //                                     <>
// //                                         <TableCell>
// //                                             <TextField
// //                                                 type="date"
// //                                                 value={editForm.placeDate}
// //                                                 onChange={(e) => setEditForm({ ...editForm, placeDate: e.target.value })}
// //                                             />
// //                                         </TableCell>
// //                                         <TableCell>
// //                                             <TextField
// //                                                 value={editForm.reason}
// //                                                 onChange={(e) => setEditForm({ ...editForm, reason: e.target.value })}
// //                                             />
// //                                         </TableCell>
// //                                         <TableCell>
// //                                             <TextField
// //                                                 type="number"
// //                                                 value={editForm.amount}
// //                                                 onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
// //                                             />
// //                                         </TableCell>
// //                                         <TableCell>
// //                                             <Button onClick={() => handleUpdate(co.id)}>Save</Button>
// //                                             <Button onClick={() => setEditingId(null)}>Cancel</Button>
// //                                         </TableCell>
// //                                     </>
// //                                 ) : (
// //                                     <>
// //                                         <TableCell>
// //                                             {co.placeDate || co.date
// //                                                 ? format(new Date(co.placeDate || co.date), 'yyyy-MM-dd')
// //                                                 : "N/A"}
// //                                         </TableCell>
// //                                         <TableCell>{co.reason}</TableCell>
// //                                         <TableCell> {Number(co.amount).toFixed(2)}</TableCell>
// //                                         <TableCell>
// //                                             <IconButton onClick={() => handleEdit(co)}>
// //                                                 <EditIcon />
// //                                             </IconButton>
// //                                             <IconButton onClick={() => handleDelete(co.id)}>
// //                                                 <DeleteIcon />
// //                                             </IconButton>
// //                                         </TableCell>
// //                                     </>
// //                                 )}
// //                             </TableRow>
// //                         ))}
// //                     </TableBody>
// //                 </Table>
// //             </TableContainer>
// //         </div>
// //     );
// // };

// // export default CashOutList;


// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TextField,
//     Paper,
//     Button,
//     IconButton,
//   } from "@mui/material";
//   import { useState, useEffect } from "react";
//   import axios from "axios";
//   import { format } from "date-fns";
//   import DeleteIcon from "@mui/icons-material/Delete";
//   import EditIcon from "@mui/icons-material/Edit";
  
//   const CashOutList = () => {
//     const [cashOuts, setCashOuts] = useState([]);
//     const [search, setSearch] = useState("");
//     const [editingId, setEditingId] = useState(null);
//     const [editForm, setEditForm] = useState({
//       reason: "",
//       amount: "",
//       placeDate: "",
//     });
  
//     const fetchCashOuts = () => {
//       axios
//         .get("http://localhost:8085/api/v1/cashout")
//         .then((res) => {
//           setCashOuts(res.data);
//         })
//         .catch((err) => {
//           console.error("Failed to fetch:", err);
//           alert("Error fetching Cash Out data");
//         });
//     };
  
//     useEffect(() => {
//       fetchCashOuts();
//     }, []);
  
//     const handleDelete = (id) => {
//       axios
//         .delete(`http://localhost:8085/api/v1/cashout/${id}`)
//         .then(() => {
//           setCashOuts((prev) => prev.filter((co) => co.id !== id));
//         })
//         .catch((err) => console.error("Failed to delete:", err));
//     };
  
//     const handleEdit = (cashOut) => {
//       setEditingId(cashOut.id);
//       setEditForm({
//         reason: cashOut.reason || "",
//         amount: cashOut.amount || "",
//         placeDate: cashOut.placeDate || cashOut.date || "",
//       });
//     };
  
//     const handleUpdate = (id) => {
//       const updatedData = {
//         reason: editForm.reason,
//         amount: parseFloat(editForm.amount),
//         placeDate: editForm.placeDate,
//       };
  
//       axios
//         .put(`http://localhost:8085/api/v1/cashout/${id}`, updatedData)
//         .then(() => {
//           fetchCashOuts();
//           setEditingId(null);
//           setEditForm({ reason: "", amount: "", placeDate: "" });
//         })
//         .catch((err) => {
//           console.error("Failed to update:", err);
//           alert("Update failed!");
//         });
//     };
  
//     const filteredCashOuts = cashOuts.filter((co) =>
//       co.reason?.toLowerCase().includes(search.toLowerCase())
//     );
  
//     return (
//       <div className="w-full p-4">
//         <TextField
//           label="Search by Reason"
//           fullWidth
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           margin="normal"
//         />
  
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow style={{ backgroundColor: "#f5f5f5" }}>
//                 <TableCell><b>DATE</b></TableCell>
//                 <TableCell><b>REASON</b></TableCell>
//                 <TableCell><b>AMOUNT (RS)</b></TableCell>
//                 <TableCell><b>ACTIONS</b></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredCashOuts.map((co) => (
//                 <TableRow key={co.id}>
//                   {editingId === co.id ? (
//                     <>
//                       <TableCell>
//                         <TextField
//                           type="date"
//                           value={editForm.placeDate}
//                           onChange={(e) =>
//                             setEditForm({
//                               ...editForm,
//                               placeDate: e.target.value,
//                             })
//                           }
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <TextField
//                           value={editForm.reason}
//                           onChange={(e) =>
//                             setEditForm({
//                               ...editForm,
//                               reason: e.target.value,
//                             })
//                           }
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <TextField
//                           type="number"
//                           value={editForm.amount}
//                           onChange={(e) =>
//                             setEditForm({
//                               ...editForm,
//                               amount: e.target.value,
//                             })
//                           }
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Button onClick={() => handleUpdate(co.id)} color="primary">
//                           Save
//                         </Button>
//                         <Button onClick={() => setEditingId(null)} color="secondary">
//                           Cancel
//                         </Button>
//                       </TableCell>
//                     </>
//                   ) : (
//                     <>
//                       <TableCell>
//                         {co.placeDate || co.date
//                           ? format(new Date(co.placeDate || co.date), "yyyy-MM-dd")
//                           : "N/A"}
//                       </TableCell>
//                       <TableCell>{co.reason}</TableCell>
//                       <TableCell>{Number(co.amount).toFixed(2)}</TableCell>
//                       <TableCell>
//                         <IconButton
//                           onClick={() => handleEdit(co)}
//                           color="primary"
//                         >
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton
//                           onClick={() => handleDelete(co.id)}
//                           color="error"
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </>
//                   )}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     );
//   };
  
//   export default CashOutList;
  

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Paper,
    Button,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
  } from "@mui/material";
  import { useState, useEffect } from "react";
  import axios from "axios";
  import { format } from "date-fns";
  import DeleteIcon from "@mui/icons-material/Delete";
  import EditIcon from "@mui/icons-material/Edit";
  
  const CashOutList = () => {
    const [cashOuts, setCashOuts] = useState([]);
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
      reason: "",
      amount: "",
      placeDate: "",
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
  
    const fetchCashOuts = () => {
      axios
        .get("http://localhost:8085/api/v1/cashout")
        .then((res) => {
          setCashOuts(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch:", err);
          alert("Error fetching Cash Out data");
        });
    };
  
    useEffect(() => {
      fetchCashOuts();
    }, []);
  
    const handleDelete = (id) => {
      setDeleteId(id); // Save the id of the item to be deleted
      setOpenDialog(true); // Open the confirmation dialog
    };
  
    const confirmDelete = () => {
      axios
        .delete(`http://localhost:8085/api/v1/cashout/${deleteId}`)
        .then(() => {
          setCashOuts((prev) => prev.filter((co) => co.id !== deleteId));
          setOpenDialog(false); // Close the dialog after deleting
        })
        .catch((err) => console.error("Failed to delete:", err));
    };
  
    const handleEdit = (cashOut) => {
      setEditingId(cashOut.id);
      setEditForm({
        reason: cashOut.reason || "",
        amount: cashOut.amount || "",
        placeDate: cashOut.placeDate || cashOut.date || "",
      });
    };
  
    const handleUpdate = (id) => {
      const updatedData = {
        reason: editForm.reason,
        amount: parseFloat(editForm.amount),
        placeDate: editForm.placeDate,
      };
  
      axios
        .put(`http://localhost:8085/api/v1/cashout/${id}`, updatedData)
        .then(() => {
          fetchCashOuts();
          setEditingId(null);
          setEditForm({ reason: "", amount: "", placeDate: "" });
        })
        .catch((err) => {
          console.error("Failed to update:", err);
          alert("Update failed!");
        });
    };
  
    const filteredCashOuts = cashOuts.filter((co) =>
      co.reason?.toLowerCase().includes(search.toLowerCase())
    );
  
    return (
      <div className="w-full p-4">
        <TextField
          label="Search by Reason"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          margin="normal"
        />
  
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><b>DATE</b></TableCell>
                <TableCell><b>REASON</b></TableCell>
                <TableCell><b>AMOUNT (RS)</b></TableCell>
                <TableCell><b>ACTIONS</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCashOuts.map((co) => (
                <TableRow key={co.id}>
                  {editingId === co.id ? (
                    <>
                      <TableCell>
                        <TextField
                          type="date"
                          value={editForm.placeDate}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              placeDate: e.target.value,
                            })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={editForm.reason}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              reason: e.target.value,
                            })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={editForm.amount}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              amount: e.target.value,
                            })
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleUpdate(co.id)} color="primary">
                          Save
                        </Button>
                        <Button onClick={() => setEditingId(null)} color="secondary">
                          Cancel
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>
                        {co.placeDate || co.date
                          ? format(new Date(co.placeDate || co.date), "yyyy-MM-dd")
                          : "N/A"}
                      </TableCell>
                      <TableCell>{co.reason}</TableCell>
                      <TableCell>{Number(co.amount).toFixed(2)}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleEdit(co)}
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(co.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        {/* Confirmation Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to delete this cash out record?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  
  export default CashOutList;
  