import {
  FormControl,
  TextField,
  FormLabel,
  FormHelperText,
  Button,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useAddHelpForm } from "../hooks/useHelpForm";
import CitiesCombo from "@/shared/components/CitiesCombo";
import AreasCombo from "@/shared/components/AreasCombo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const AddHelpForm = (props: { close: () => void }) => {
  const {
    getFieldProps,
    handleSubmit,
    touched,
    errors,
    isValid,
    dirty,
    values,
    setFieldValue,
  } = useAddHelpForm(props.close);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {/* المحافظة */}
        <FormControl
          sx={{ display: "flex", rowGap: 1, flexDirection: "column" }}
          required
          error={touched.city && Boolean(errors.city)}
        >
          <FormLabel>ما هي المحافظة ؟</FormLabel>
          <CitiesCombo
            fullWidth
            getOptionLabel={(option) => option.name}
            value={values.city}
            onChange={(_, newValue) => {
              setFieldValue("city", newValue);
              setFieldValue("area", null); // Reset area if city changes
            }}
            sx={{ width: "100% !important" }}
            renderInput={(props) => (
              <TextField
                {...props}
                placeholder="اختار المحافظة"
                color="warning"
              />
            )}
          />
          <FormHelperText>{touched.city && errors.city}</FormHelperText>
        </FormControl>

        {/* المنطقة */}
        <FormControl
          sx={{ display: "flex", rowGap: 1, flexDirection: "column" }}
          required
          error={touched.area && Boolean(errors.area)}
        >
          <FormLabel>ما هي المنطقة ؟</FormLabel>
          <AreasCombo
            cityId={values.city?.id}
            getOptionLabel={(option) => option.name}
            value={values.area}
            onChange={(_, newValue) => {
              setFieldValue("area", newValue);
            }}
            sx={{ width: "100% !important" }}
            renderInput={(params) => <TextField {...params} required />}
          />
          <FormHelperText>{touched.area && errors.area}</FormHelperText>
        </FormControl>

        {/* اسم المفقود */}
        <FormControl
          sx={{ display: "flex", rowGap: 1, flexDirection: "column" }}
          required
          error={touched.full_name && Boolean(errors.full_name)}
        >
          <FormLabel>اسم المفقود</FormLabel>
          <TextField
            fullWidth
            {...getFieldProps("full_name")}
            helperText={touched.full_name && errors.full_name}
          />
        </FormControl>

        {/* تاريخ الميلاد */}
        <FormControl
          sx={{ display: "flex", rowGap: 1, flexDirection: "column" }}
          required
          error={touched.date_of_birth && Boolean(errors.date_of_birth)}
        >
          <FormLabel>تاريخ الميلاد</FormLabel>
          <DatePicker
            value={values.date_of_birth || null}
            onChange={(newValue) => {
              setFieldValue("date_of_birth", newValue);
            }}
            slotProps={{
              textField: {
                variant: "outlined",
                placeholder: "اختر تاريخ الميلاد",
                error: touched.date_of_birth && Boolean(errors.date_of_birth),
                helperText: touched.date_of_birth && errors.date_of_birth,
              },
            }}
          />
        </FormControl>

        {/* تاريخ الفقد */}
        <FormControl
          sx={{ display: "flex", rowGap: 1, flexDirection: "column" }}
          required
          error={touched.missing_date && Boolean(errors.missing_date)}
        >
          <FormLabel>تاريخ الفقد</FormLabel>
          <DatePicker
            value={values.missing_date || null}
            onChange={(newValue) => {
              setFieldValue("missing_date", newValue);
            }}
            slotProps={{
              textField: {
                variant: "outlined",
                placeholder: "اختر تاريخ الفقد",
                error: touched.missing_date && Boolean(errors.missing_date),
                helperText: touched.missing_date && errors.missing_date,
              },
            }}
          />
        </FormControl>

        {/* وصف المظهر */}
        <FormControl
          sx={{ display: "flex", rowGap: 1, flexDirection: "column" }}
          required
          error={
            touched.appearance_description &&
            Boolean(errors.appearance_description)
          }
        >
          <FormLabel>وصف المظهر</FormLabel>
          <TextField
            fullWidth
            {...getFieldProps("appearance_description")}
            multiline
            rows={3}
            helperText={
              touched.appearance_description && errors.appearance_description
            }
          />
        </FormControl>

        {/* تفاصيل الموقع */}
        <FormControl
          sx={{ display: "flex", rowGap: 1, flexDirection: "column" }}
          required
          error={touched.location_details && Boolean(errors.location_details)}
        >
          <FormLabel>تفاصيل الموقع</FormLabel>
          <TextField
            fullWidth
            {...getFieldProps("location_details")}
            required
            helperText={touched.location_details && errors.location_details}
          />
        </FormControl>

        {/* الاسم تم تغييره إلى full_name أعلاه، لذا يمكن إزالة حقل الاسم القديم إذا لم يعد مطلوباً */}

        {/* رقم الهاتف */}
        <FormControl
          sx={{ display: "flex", rowGap: 1, flexDirection: "column" }}
          error={touched.phone && Boolean(errors.phone)}
          required
        >
          <FormLabel>رقم الهاتف</FormLabel>
          <TextField
            fullWidth
            {...getFieldProps("phone")}
            type="number"
            helperText={touched.phone && errors.phone}
          />
        </FormControl>

        {/* ملاحظات */}
        <FormControl
          sx={{ display: "flex", rowGap: 1, flexDirection: "column" }}
        >
          <FormLabel>ملاحظات</FormLabel>
          <TextField
            fullWidth
            {...getFieldProps("notice")}
            multiline
            rows={2}
          />
        </FormControl>

        {/* رفع الصور */}
        <FormControl
          sx={{ display: "flex", rowGap: 1, flexDirection: "column" }}
        >
          <FormLabel>صور المفقود</FormLabel>
          <TextField
            type="file"
            inputProps={{ multiple: true, accept: "image/*" }}
            onChange={(e) => {
              const files = (e.target as any).files[0];
              setFieldValue("image", files);
            }}
            helperText={(touched.image && errors.image) as string}
          />
        </FormControl>

        <Button type="submit" disabled={!dirty || !isValid}>
          حفظ
        </Button>
      </Stack>
    </form>
  );
};
