import { useFormik } from "formik";
import * as Yup from "yup";

export const useSignupForm = () => {
  const formik = useFormik<{
    username: string;
    password: string;
    usageRules: boolean;
  }>({
    initialValues: {
      username: "",
      password: "",
      usageRules: false,
    },
    onSubmit: (result) => {
      console.log(result);
    },
    validationSchema: Yup.object({
      username: Yup.string().required("اسم المستخدم مطلوب"),
      password: Yup.string().required("كلمة المرور مطلوبة"),
      usageRules: Yup.boolean()
        .required("يجب الموافقة على سياسة الاستخدام")
        .test(
          "usage-rules",
          "يجب الموافقة على سياسة الاستخدام",
          (value) => value === true
        ),
    }),
  });
  return formik;
};
