import { FilterPanel, GenericDialog } from "@/shared";
import { Box, Paper, Typography } from "@mui/material";
import { useFilterPanel } from "./hooks/useFilterPanel";
import API from "@/api/httpClient";
import { HelpTypes, Locations } from "./types";
import { AddHelpForm, HelpsList } from "./components";
import Button from "@mui/material/Button/Button";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";

export const Help = () => {
  const { state: filter, handleFilterChange } = useFilterPanel();
  const [open, setOpen] = useState(false);

  console.log(filter);
  const [fullNameOptions, setFullNameOptions] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const names = await API.get<string[], { data: string[] }>(
        "help/names/all",
        (res) => res.data
      );
      setFullNameOptions(names);
    })();
  }, []);

  return (
    <Box width="100%" display="flex" flexDirection="column">
      <FilterPanel
        filter={filter}
        handleFilterChange={handleFilterChange}
        fullNameOptions={fullNameOptions}
      />
      <Button
        color="secondary"
        sx={{ mt: 3, width: "fit-content" }}
        endIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        اضافة بلاغ
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
            - انت الآن على وشك إضافة بلاغ عن شخص مفقود. نسأل الله أن يرده إليكم
            سالمًا.
            <br />- نرجو منك الالتزام بحذف البلاغ عند العثور على الشخص المفقود،
            وذلك لضمان بقاء البيانات محدثة بشكل دائم ولتجنب تلقي اتصالات بعد
            انتهاء الحاجة إلى البلاغ.
          </Typography>
        </Paper>
        <AddHelpForm close={() => setOpen(false)} />
      </GenericDialog>
    </Box>
  );
};
