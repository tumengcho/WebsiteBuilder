import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
} from "@mui/material";

export const SaveComponent = ({ componentJSON }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [componentName, setComponentName] = useState("");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setComponentName("");
  };

  const handleSave = () => {
    if (!componentName) return;

    const savedComponents =
      JSON.parse(localStorage.getItem("savedComponents")) || [];

    const newComponent = { ...componentJSON };
    newComponent.displayName = componentName;
    console.log(newComponent.displayName);

    savedComponents.push(newComponent);
    localStorage.setItem("savedComponents", JSON.stringify(savedComponents));

    handleCloseDialog();
    setSnackbarOpen(true);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Save Component
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Save Component</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Component Name"
            fullWidth
            value={componentName}
            onChange={(e) => setComponentName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            color="primary"
            disabled={!componentName}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Component saved successfully!"
      />
    </>
  );
};
