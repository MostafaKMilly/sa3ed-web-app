import { Box } from "@mui/material";
import { FormContainer, LoginForm } from "./components";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import Typography from "@mui/material/Typography";
import API from "@/api/httpClient";

const loader = () => {
  const token = localStorage.getItem("token");
  if (token !== null) {
    return redirect("/");
  }
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const user = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const { data } = (await API.post("auth/login", user)) ?? {};
  if (data) {
    localStorage.setItem("token", data.data.token);
    return redirect("/");
  }
  return null;
};

export const Login = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
      px={1}
      mx={2}
    >
      <FormContainer variant="outlined">
        <img src="/logo.png" alt="logo" width={130} />
        <Typography variant="h3" sx={{ mt: 2, color: "common.black" }}>
          كن ساعداً للخير وسَاعِدْ
        </Typography>
        <LoginForm />
      </FormContainer>
    </Box>
  );
};

Login.loader = loader;
Login.action = action;
