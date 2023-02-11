import { FilterPanel, GenericDialog } from "@/shared";
import { Box } from "@mui/material";
import { useFilterPanel } from "./hooks/useFilterPanel";
import API from "@/api/httpClient";
import { HelpTypes, Locations } from "./types";
import { AddHelpForm, HelpsList } from "./components";
import Button from "@mui/material/Button/Button";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

export const Help = () => {
  const { state: filter, handleFilterChange } = useFilterPanel();
  const [open, setOpen] = useState(false);

  return (
    <Box width="100%" display="flex" flexDirection="column">
      <FilterPanel filter={filter} handleFilterChange={handleFilterChange} />
      <Button
        color="secondary"
        sx={{ mt: 3, width: "fit-content" }}
        endIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        اضافة طلب
      </Button>
      <HelpsList filter={filter} />
      <GenericDialog
        maxWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
        dialog={{ title: "اضافة طلب" }}
      >
        <AddHelpForm close={() => setOpen(false)} />
      </GenericDialog>
    </Box>
  );
};
