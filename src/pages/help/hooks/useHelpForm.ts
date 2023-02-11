import { useFormik } from "formik";
import * as Yup from "yup";

export const useAddHelpForm = () => {
  const formik = useFormik<{
    city: { name: string; id: number } | null;
    area: { name: string; id: number } | null;
    helpType: { name: string; id: number } | null;
    location_details: string;
    name: string;
    phone: string;
    notice: string;
    moveable: boolean;
  }>({
    initialValues: {
      city: null,
      area: null,
      helpType: null,
      location_details: "",
      name: "",
      phone: "",
      notice: "",
      moveable: false,
    },
    onSubmit: (result) => {
      console.log(result);
    },
    validationSchema: Yup.object({
      city: Yup.object().nullable().required("المدينة مطلوبة"),
      area: Yup.object().nullable().required("المنطقة مطلوبة"),
      helpType: Yup.object().nullable().required("نوع المساعدة مطلوب"),
      location_details: Yup.string().required("تفاصيل الموقع مطلوبة"),
      name: Yup.string().required("الاسم مطلوب"),
      phone: Yup.string().required("رقم الهاتف مطلوب"),
      notice: Yup.string(),
    }),
  });
  return formik;
};
