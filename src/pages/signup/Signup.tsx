import { Box } from "@mui/material";
import { FormContainer, SignupForm } from "./components";
import { redirect, ActionFunctionArgs } from "react-router-dom";
import Typography from "@mui/material/Typography";

const loader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return redirect("/");
  }
  return null;
};

const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const user = {
    username: formData.get("username"),
    fullName: formData.get("fullName"),
  };
  // Store dummy form data to simulate a successful login request
  localStorage.setItem("token", JSON.stringify(user));
  return redirect("/");
};

export const Signup = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      px={1}
    >
      <FormContainer variant="outlined">
        <img src="/logo.png" alt="logo" width={130} />
        <Typography variant="h3" sx={{ mt: 2, color: "common.black" }}>
          كن ساعداً للخير وسَاعِدْ
        </Typography>
        <SignupForm />
      </FormContainer>
    </Box>
  );
};

Signup.loader = loader;
Signup.action = action;
