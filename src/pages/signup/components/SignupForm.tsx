import {
  Box,
  Stack,
  TextField,
  Button,
  FormLabel,
  FormControl,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
} from "@mui/material";
import { Form, useNavigate } from "react-router-dom";
import { useSignupForm } from "../hooks";
import _ from "lodash";
import { GenericDialog } from "@/shared";
import { useState } from "react";

export const SignupForm = () => {
  const { getFieldProps, touched, errors, isValid, dirty } = useSignupForm();
  const navigate = useNavigate();
  const [openUsageRulesDialog, setOpenUsageRulesDialog] = useState(false);

  return (
    <Box p={4} width="100%">
      <Form method="post" action="/signup">
        <Stack spacing={3}>
          <FormControl error={touched.username && Boolean(errors.username)}>
            <FormLabel sx={{ mb: 1 }}>اسم المستخدم :</FormLabel>
            <TextField
              id="username"
              required
              placeholder="مثال: ahmad123"
              {...getFieldProps("username")}
            />
            <FormHelperText>
              {touched.username && errors.username}
            </FormHelperText>
          </FormControl>
          <FormControl error={touched.password && Boolean(errors.password)}>
            <FormLabel sx={{ mb: 1 }}>كلمة المرور :</FormLabel>
            <TextField
              id="password"
              required
              type="password"
              autoComplete="on"
              {...getFieldProps("password")}
            />
            <FormHelperText>
              {touched.password && errors.password}
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ mt: "7px !important" }}>
            <FormControlLabel
              label={
                <Typography>
                  الموافقة على{" "}
                  <Link
                    sx={{ color: "secondary.main" }}
                    onClick={() => setOpenUsageRulesDialog(true)}
                  >
                    سياسة الاستخدام
                  </Link>
                </Typography>
              }
              control={<Checkbox defaultChecked color="secondary" />}
              {...getFieldProps("usageRules")}
            />
          </FormControl>
          <Box
            pt={2}
            display="flex"
            flexDirection={"row"}
            columnGap={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              type="submit"
              color="secondary"
              disabled={!dirty || !isValid}
            >
              تسجيل حساب
            </Button>
            <Button onClick={() => navigate("/login")}>تسجيل دخول</Button>
          </Box>
        </Stack>
      </Form>
      <GenericDialog
        open={openUsageRulesDialog}
        maxWidth="sm"
        onClose={() => setOpenUsageRulesDialog(false)}
        dialog={{
          title: "عن التطبيق",
        }}
      >
        إيماناً بدور التكنولوجيا خلال الأزمات والكوارث .. تطبيق #ساعد - لربط
        متضرري الزلزال والمحتاجين لأي مساعدة مهما كان نوعها، بالمتطوعين
        والمتبرعين بشكل مباشر
        <br />
        <br />
        <Typography variant="h3" gutterBottom>
          {" "}
          سياسة الاستخدام:
        </Typography>
        - عند تقديمك لأي طلب باستخدام التطبيق، سيتمكن كل مستخدمي التطبيق من رؤية
        طلبك ويمكنهم التواصل معك بما وفرته من معلومات تواصل
        <br />
        <br />
        - يمكنك حذف اي طلب قمت به في أي وقت وسيختفي الطلب لدى باقي المستخدمين
        <br />
        <br />
        - يعتبر التطبيق منصة لتحقيق الوصول المباشر بين المتبرعين والمحتاجين، ولا
        علاقة له بعملية تحقيق الاستفادة على أرض الواقع، وإن أي عملية احتيال أو
        عمل غير مشروع يحصل بعد ذلك فهو من مسؤولية أطراف الطلب ولا علاقة لإدارة
        التطبيق فيه
        <br />
        <br />
        - تعتبر إدارة التطبيق غير مسؤولة عن أي بيانات مضللة تم إدخالها من
        قبل أي مستخدم، وعلى ذلك يجب عليك التواصل والتأكد من صحة الطلب لدى نيتك
        التعامل مع مقدمه
      </GenericDialog>
    </Box>
  );
};
