import { FilterPanel, GenericDialog } from "@/shared";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useFilterPanel } from "./hooks/useFilterPanel";
import API from "@/api/httpClient";
import { HelpTypes, Locations } from "./types";
import { DonationList } from "./components";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { AddDonationForm } from "./components/AddDonationForm";

export const locationQuery = {
  queryKey: ["Location"],
  queryFn: () =>
    API.get<Locations, { data: Locations }>(
      "/location/all",
      (res) => res?.data
    ),
};

export const helpTypesQuery = {
  queryKey: ["HelpType"],
  queryFn: () =>
    API.get<HelpTypes, { data: HelpTypes }>(
      "/helpinfo/types",
      (res) => res?.data
    ),
};

export const Donation = () => {
  const { state: filter, handleFilterChange } = useFilterPanel();
  const [open, setOpen] = useState(false);

  return (
    <Box width="100%" display="flex" flexDirection="column">
      <FilterPanel
        filter={filter}
        handleFilterChange={handleFilterChange}
        fullNameOptions={[]}
      />
      <Button
        color="secondary"
        sx={{ mt: 3, width: "fit-content" }}
        endIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        اضافة تبرع
      </Button>
      <DonationList filter={filter} />
      <GenericDialog
        maxWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
        dialog={{ title: "اضافة تبرع" }}
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
            -أنت الان على وشك إضافة تبرع. أخلف الله عليك وجزاك الله خيرا.ً
            <br />- أنتم من يساهم بنجاح هذا التطبيق. لذلك نرجوا منك الإلتزام
            بحذف عرض التبرع عندما تريد إنهاء تقديم هذا التبرع. وذلك من إجل بقاء
            البيانات محدثة بشكل دائم, ولكي لا تتلقى اتصالات او طلبات بعد أن تكون
            قد انتهيت من تقديم هذه المساعدة.
          </Typography>
        </Paper>
        <AddDonationForm close={() => setOpen(false)} />
      </GenericDialog>
    </Box>
  );
};
