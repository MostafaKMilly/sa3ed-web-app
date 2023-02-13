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
import { useQuery } from "@tanstack/react-query";
import API from "@/api/httpClient";

export const SignupForm = () => {
  const { getFieldProps, touched, errors, isValid, dirty } = useSignupForm();
  const navigate = useNavigate();
  const [openUsageRulesDialog, setOpenUsageRulesDialog] = useState(false);
  const { data } = useQuery(
    ["UsageRules"],
    () =>
      API.get<string, { data: string }>(
        "info/privacypolicy",
        (res) => res.data
      ),
    { enabled: openUsageRulesDialog }
  );

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
              control={
                <Checkbox
                  defaultChecked
                  color="secondary"
                  checked={getFieldProps("usageRules").value}
                />
              }
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
        <Typography sx={{ whiteSpace: "pre-wrap" }}>{data}</Typography>
      </GenericDialog>
    </Box>
  );
};
