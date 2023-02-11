import React from "react";
import {
  DialogProps,
  DialogActions,
  DialogContent,
  Dialog,
  ButtonProps as MuiButtonProps,
  Button,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function GenericDialog({
  onClose,
  onSubmit,
  dialog,
  children,
  sx,
  ...props
}: GenericDialogProps) {
  const { title, closeButton, submitButton } = dialog;

  return (
    <Dialog
      onClose={onClose}
      maxWidth="md"
      fullWidth
      {...props}
      sx={{ ...(sx as any) }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {title}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions
        sx={{
          justifyContent: "flex-start",
          columnGap: 1,
        }}
      >
        {!!submitButton && (
          <Button
            variant="contained"
            sx={{
              px: 4,
            }}
            {...submitButton}
            onClick={onSubmit}
          >
            {submitButton.label}
          </Button>
        )}
        {!!closeButton && (
          <Button
            variant="contained"
            color="secondary"
            sx={{
              px: 4,
            }}
            {...closeButton}
            onClick={onClose}
          >
            {closeButton.label}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export type GenericDialogProps = Omit<DialogProps, "onClose" | "onSubmit"> & {
  dialog: {
    title: string;
    submitButton?: MuiButtonProps & {
      label: string;
    };
    closeButton?: MuiButtonProps & {
      label: string;
    };
  };
  onClose: () => void;
  onSubmit?: () => void;
};

export default GenericDialog;
