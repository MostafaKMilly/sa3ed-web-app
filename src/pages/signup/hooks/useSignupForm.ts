import { useFormik } from "formik";
import * as Yup from "yup";

export const useSignupForm = () => {
  const formik = useFormik<{
    username: string;
    password: string;
  }>({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (result) => {
      console.log(result);
    },
    validationSchema: Yup.object({
      username: Yup.string().required("اسم المستخدم مطلوب"),
      password: Yup.string().required("كلمة المرور مطلوبة"),
    }),
  });
  return formik;
};
