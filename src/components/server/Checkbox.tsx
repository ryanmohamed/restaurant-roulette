import { useField, FieldHookConfig } from "formik";

const Checkbox = ({ children, ...props }: any) => {
    // React treats radios and checkbox inputs differently from other input types: select and textarea.
    // Formik does this too! When you specify `type` to useField(), it will
    // return the correct bag of props for you -- a `checked` prop will be included
    // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
    const [field, meta] = useField({ ...props, type: 'checkbox' } as string | FieldHookConfig<any>);
    return (
        <label className={`${props.extras} font-bold mb-3 mr-2 border-2 p-1 px-2 rounded-2xl centered select-none cursor-pointer text-sm h-8 transition duration-200 shadow-black shadow-md bg-black ${ field.checked ? "opacity-25" : "hover:bg-amber-500 hover:text-black"} hover:scale-105`}>
            <input className="hidden" type="checkbox" {...field} {...props} />
            {children}
        </label>
    );
};

export default Checkbox;