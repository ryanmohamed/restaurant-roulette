import { Formik, Form } from "formik";
import * as Yup from 'yup';
import useLocationContext from "@/hooks/useLocationContext";
import TextInput from "../server/TextInput";
import Checkbox from "../server/Checkbox";
import Select from "../server/Select";
import { useRouter } from "next/router";

const yupValidationSchema = Yup.object({
    terms: Yup.string(),
    distance: Yup.number(),
    sort_by: Yup.string(),
    open_now: Yup.boolean(),
    price: Yup.string(),
    hot_n_new: Yup.boolean(),
    deals: Yup.boolean(),
    fast_food: Yup.boolean(),
    salad: Yup.string()
});

const FilterForm = () => {
    const { location, setShowModal } = useLocationContext();
    const router = useRouter();
    return <Formik
        initialValues={{
            terms: '',
            distance: 40000,
            sort_by: 'distance',
            open_now: false,
            price: "$$$$",
            hot_n_new: false,
            deals: false,
            fast_food: false,
            salad: false
        }}
        validationSchema={yupValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
            if (location === null || location === undefined) return;
            const url = createURL(location?.lat, location?.lon, values);
            setSubmitting(false);
            router.push(url + "#content");
            resetForm();
        }}
    >

        <Form className="text-base flex-grow flex flex-col justify-between mt-4 h-full ">
            <div>
                <div className="flex flex-col text-sm">
                    <p className="flex justify-between text-right"><b className="mr-4">Location:</b> <span>{location ? `${location.city}, ${location.regionName}, ${location.zip}` : "Montreal, Quebec, H3H"}</span></p>
                    <div className="self-end w-fit text-red-500 text-sm cursor-pointer" onClick={() => setShowModal && setShowModal(true)}>Change location</div>
                </div>

                <TextInput 
                    label="Looking for something specific?"
                    name="terms"
                    type="text"
                    placeholder="e.g: Breakfast, Deli, Fried Rice"
                />

                <div className="mt-4 pt-4 flex items-center justify-between md:flex-wrap border-t-2 border-stone-800">
                    <Select label="Distance:" name="distance">
                        <option value={8045}>Select a distance</option>
                        <option value={8046}>5 miles</option>
                        <option value={16093}>10 miles</option>
                        <option value={32186}>20 miles</option>
                        <option value={40000}>25 miles</option>
                    </Select>

                    <Select label="Sort By:" name="sort_by">
                        <option value="">Select sort method</option>
                        <option value="distance">Distance</option>
                        <option value="best_match">Best Match</option>
                        <option value="rating">Rating</option>
                        <option value="review_count">Review Count</option>
                    </Select>

                    <Select label="Price Range:" name="price">
                        <option value="">Select price range</option>
                        <option value="$">$</option>
                        <option value="$$">$-$$</option>
                        <option value="$$$">$-$$$</option>
                        <option value="$$$$">$-$$$$</option>
                    </Select>

                    <Select label="Open Now:" name="open_now">
                        <option value="">Select open filter</option>
                        <option value="true">Open Now</option>
                        <option value="false">All</option>
                    </Select>
                </div>


                <div className="mt-4 pt-4 border-t-2 border-stone-800">
                    <p className="text-sm font-bold">Add some categories:</p>
                    <div className="mt-2 flex flex-wrap">
                        <Checkbox name="hot_n_new" extras="border-red-700 text-red-700">Hot N&apos; New 🔥</Checkbox>
                        <Checkbox name="deals" extras="border-green-700 text-green-700">Deals 🤑</Checkbox>
                        <Checkbox name="fast_food" extras="border-orange-700 text-orange-700">Fast Food 🍟</Checkbox> 
                        <Checkbox name="salad" extras="border-emerald-700 text-emerald-700">Salad 🥗</Checkbox>
                    </div>
                </div>

            </div>

            <button className="btn mt-4 rounded-full font-barlow font-bold bg-gradient-to-r from-green-900 to-green-400 transition hover:text-stone-950 hover:shadow-black hover:shadow-md focus:outline-green-500 focus:border-none" type="submit">Submit</button>
        </Form>

    </Formik>
};

/* test function */
function createURL (lat: number, lon: number, values: any) {
    const { terms, distance, sort_by, open_now, price, hot_n_new, deals, fast_food, salad } = values;
    const distanceNumber = Number(distance); 

    const sortByParameter = sort_by !== "" ? `&sort_by=${sort_by}` : "";

    const categories = [];
    fast_food && categories.push("fast%20food%20");
    salad && categories.push("salad%20");
    const categoriesParameters = categories.map(c => `&categories=fast%20food`).join("");

    const prices = [1, 2, 3, 4];
    prices.splice(price.length);
    const pricesParameters = prices.map(p => `&price=${String(p)}`).join("");
    
    const openNowParameter = open_now ? "&open_now=true" : "";

    const attributes = [];
    hot_n_new && attributes.push("hot_and_new");
    deals && attributes.push("deals");
    const attributesParameter = attributes.map(a => `&attributes=${a}`).join("");

    return `/restaurant?latitude=${lat}&longitude=${lon}&term=restaurant%20food%20${terms}&radius=${distanceNumber}${categoriesParameters}${pricesParameters}${openNowParameter}&attributes=restaurants_delivery${attributesParameter}${sortByParameter}&limit=50`;
}

export default FilterForm;