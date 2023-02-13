import API from "@/api/httpClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

const saveDonationMutation = (data: Record<string, any>) =>
  API.post("offerhelp", data);

export const useDoinationForm = (closeDialog: () => void) => {
  const client = useQueryClient();

  const { mutate } = useMutation(saveDonationMutation, {
    onSuccess: () => {
      closeDialog();
      client.invalidateQueries(["Donations"]);
      toast("تم حفظ التبرع بنجاح", {
        type: "success",
        position: toast.POSITION.TOP_CENTER,
      });
    },
  });
  const formik = useFormik<{
    city: { name: string; id: number } | null;
    area: { name: string; id: number } | null;
    helpType: { name: string; id: number } | null;
    location_details: string;
    name: string;
    phone: string;
    notice: string;
  }>({
    initialValues: {
      city: null,
      area: null,
      helpType: null,
      location_details: "",
      name: "",
      phone: "",
      notice: "",
    },
    onSubmit: (result) => {
      const { area, city, helpType, ...rest } = result;

      mutate({
        ...rest,
        id_city: city?.id,
        id_area: area?.id,
        help_type: helpType?.id,
        moveable:false
      });
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
