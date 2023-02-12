import {
  FormControl,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  Button,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useAddHelpForm } from "../hooks/useHelpForm";
import CitiesCombo from "@/shared/components/CitiesCombo";
import AreasCombo from "@/shared/components/AreasCombo";
import HelpTypesCombo from "@/shared/components/HelpTypesCombo";

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
            }}
            sx={{
              with: "100% !important",
            }}
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
            sx={{
              with: "100% !important",
            }}
            renderInput={(params) => <TextField {...params} required />}
          />
          <FormHelperText>{touched.area && errors.area}</FormHelperText>
        </FormControl>

        <FormControl
          sx={{ display: "flex", rowGap: 1, flexDirection: "column" }}
          error={touched.helpType && Boolean(errors.helpType)}
          required
        >
          <FormLabel>نوع المساعدة</FormLabel>
          <HelpTypesCombo
            getOptionLabel={(option) => option.name}
            value={values.helpType}
            onChange={(_, newValue) => {
              setFieldValue("helpType", newValue);
            }}
            sx={{
              with: "100% !important",
            }}
            renderInput={(props) => (
              <TextField
                {...props}
                required
                placeholder="نوع المساعدة"
                color="warning"
              />
            )}
          />
          <FormHelperText>{touched.helpType && errors.helpType}</FormHelperText>
        </FormControl>

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

        <FormControl
          sx={{ display: "flex", rowGap: 1, flexDirection: "column" }}
          error={touched.name && Boolean(errors.name)}
          required
        >
          <FormLabel>الاسم</FormLabel>
          <TextField
            fullWidth
            {...getFieldProps("name")}
            helperText={touched.name && errors.name}
          />
        </FormControl>

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

        <FormControl
          component="fieldset"
          error={touched.moveable && Boolean(errors.moveable)}
        >
          <FormLabel>قابلة للنقل ?</FormLabel>
          <RadioGroup {...getFieldProps("moveable")}>
            <FormControlLabel value={true} control={<Radio />} label="نعم" />
            <FormControlLabel value={false} control={<Radio />} label="لا" />
          </RadioGroup>
        </FormControl>

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
        <Button type="submit" disabled={!dirty || !isValid}>
          حفظ
        </Button>
      </Stack>
    </form>
  );
};
