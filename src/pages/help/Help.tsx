import { FilterPanel, GenericDialog } from "@/shared";
import { Box, Paper, Typography } from "@mui/material";
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
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: "16px",
            backgroundColor: "#ffde66",
            mb: 3,
          }}
        >
          <Typography
            variant="body1"
            gutterBottom
            sx={{ color: "error.main", textAlign: "center" }}
          >
            ملاحظات هامة
          </Typography>
          <Typography variant="body2" sx={{ color: "common.black" }}>
            - انت الان على وشك اضافة طلب مساعدة, فرج الله همك.
            <br />
            - أنتم من يساهم بنجاح هذا التطبيق. لذلك نرجوا منك الإلتزام
            بحذف طلب المساعدة عندما يتم تلبيتها, وذلك من اجل بقاء البيانات محدثة
            بشكل دائم, ولكي لا تتلقى تصالات تعرض عليك المساعدة بعد أن تصبح لست
            بحاجة لها.
          </Typography>
        </Paper>
        <AddHelpForm close={() => setOpen(false)} />
      </GenericDialog>
    </Box>
  );
};
