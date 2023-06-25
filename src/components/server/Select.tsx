import { useField } from "formik";
const Select = (props: any) => {
    const { label } = props;
    const [field, meta] = useField(props);
    return (
      <div className="mb-3 text-sm flex flex-col md:w-[48%] w-[23%]">
        <label className="text-stone-300 font-bold" htmlFor={props.id || props.name}>{label}</label>
        <select className="mt-1 text-stone-300 h-8 px-2 py-1 rounded-2xl border-2 border-red-700 outline-none focus:border-green-700 bg-stone-900 cursor-pointer" {...field} {...props} />
      </div>
    );
};
export default Select;