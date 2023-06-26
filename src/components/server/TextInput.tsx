import { useField } from "formik";

const TextInput = (props: any) => {
    const { label } = props;
    // [formik.getFieldProps(), formik.getFieldMeta()]
    const [ field, meta ] = useField(props);
    return (
        <div className="mt-4 pt-4 border-t-2 border-zinc-700 text-sm ">
            <label className="text-stone-300 font-bold w-fit" htmlFor={props?.id || props?.name}>{label}</label>
            <input className="my-2 rounded-2xl max-h-[2rem] w-full px-2 py-1 bg-stone-900 text-sm text-stone-300 outline-none border-2 border-red-700 focus:border-green-700" 
                {...field} 
                {...props} 
            />
        </div>
    );
}

export default TextInput;