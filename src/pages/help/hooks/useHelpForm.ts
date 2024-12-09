import API from "@/api/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import moment, { Moment } from "moment"; // Updated import

// Updated mutation to send FormData
const saveHelpMutation = async (data: { formData: FormData }) => {
  return API.post("help", data.formData, (res) => res, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useAddHelpForm = (closeDialog: () => void) => {
  const client = useQueryClient();

  const { mutate } = useMutation(saveHelpMutation, {
    onSuccess: () => {
      closeDialog();
      client.invalidateQueries(["Helps"]);
      toast("تم حفظ البلاغ بنجاح", {
        type: "success",
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });

  const formik = useFormik<{
    city: { name: string; id: number } | null;
    area: { name: string; id: number } | null;
    full_name: string;
    date_of_birth: Moment | null; // Updated type
    missing_date: Moment | null; // Updated type
    appearance_description: string;
    location_details: string;
    phone: string;
    notice: string;
    image: File | null;
  }>({
    initialValues: {
      city: null,
      area: null,
      full_name: "",
      date_of_birth: null,
      missing_date: null,
      appearance_description: "",
      location_details: "",
      phone: "",
      notice: "",
      image: null,
    },
    onSubmit: (values) => {
      const formData = new FormData();
      if (values.city?.id) {
        formData.append("id_city", String(values.city.id));
      }
      if (values.area?.id) {
        formData.append("id_area", String(values.area.id));
      }

      formData.append("full_name", values.full_name);
      if (values.date_of_birth) {
        formData.append(
          "date_of_birth",
          values.date_of_birth.format("YYYY-MM-DD") // Updated to use moment
        );
      }
      if (values.missing_date) {
        formData.append(
          "missing_date",
          values.missing_date.format("YYYY-MM-DD") // Updated to use moment
        );
      }
      formData.append("appearance_description", values.appearance_description);
      formData.append("location_details", values.location_details);
      formData.append("phone", values.phone);
      formData.append("notice", values.notice);

      if (values.image) {
        formData.append("image", values.image);
      }

      mutate({ formData });
    },
    validationSchema: Yup.object({
      city: Yup.object().nullable().required("المدينة مطلوبة"),
      area: Yup.object().nullable().required("المنطقة مطلوبة"),
      full_name: Yup.string().required("الاسم مطلوب"),
      date_of_birth: Yup.date().nullable().required("تاريخ الميلاد مطلوب"),
      missing_date: Yup.date().nullable(),
      appearance_description: Yup.string().required("وصف المظهر مطلوب"),
      location_details: Yup.string(),
      phone: Yup.string().required("رقم الهاتف مطلوب"),
      notice: Yup.string(),
      image: Yup.mixed().nullable(),
    }),
  });
  return formik;
};
