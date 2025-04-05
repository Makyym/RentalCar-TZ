import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomDateInput from "../../components/CustomDateInput/CustomDateInput.jsx";
import s from "./ReserveForm.module.css";
import * as Yup from 'yup';
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
    email: Yup.string()
    .trim()
    .lowercase()
    .email('Invalid email address')
    .required('Email is required')
    .test('Invalid email domain',
        (value) => {
            if (!value) return false;
            const parts = value.split('@');
            if (parts.length < 2) return false;
            return parts[1].includes('.') && parts[1].split('.').filter(Boolean).length > 1;
        }
    ),
    name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(40, 'Name must be at max 40 characters')
    .required('Name is required'),
});

const toastStyles = {
    duration: 5000,
    style: {
        background: "#2563EB",
        color: "#FFFFFF",
        fontSize: "16px",
        padding: "16px",
        borderRadius: "12px",
    },
    iconTheme: {
        primary: "#FFFFFF",
        secondary: "#2563EB",
    },
};

const ReserveForm = ({carId}) => {
    const initialValues = {
        name: '',
        email: '',
        date: null,
        comment: '',
        carId,
    };
    const handleSubmit = (values, { resetForm }) => {
        toast.success(`${values.name}, your rent confirmed! We will contact you soon.`, toastStyles);
        resetForm();
    };
    return (
        <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        >
            <Form className={s.formDiv}>
                <h3 className={s.sectionTitle}>Book your car now</h3>
                <p className={s.formText}>Stay connected! We are always ready to help you.</p>
                <div className={s.form}>
                    <div className={s.requiredDiv}>
                        <Field type="text" placeholder="Name*" name="name" className={s.inputs}/>
                        <ErrorMessage name="name" component="span" className={s.error} />
                    </div>
                    <div className={s.requiredDiv}>
                        <Field type="text" placeholder="Email*" name="email" className={s.inputs}/>
                        <ErrorMessage name="email" component="span" className={s.error} />
                    </div>
                    <CustomDateInput name="date" placeholder="Booking date" customStyle={`${s.inputs} ${s.customCursor}`}/>
                    <Field as="textarea" placeholder="Comment" name="comment" className={`${s.inputs} ${s.textArea}`} />
                </div>
                <button type="submit" className={s.btn}>Send</button>
            </Form>
        </Formik>
    )
}

export default ReserveForm