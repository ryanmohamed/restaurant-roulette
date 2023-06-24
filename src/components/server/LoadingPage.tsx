import RestaurantWireframe from "./RestaurantWireframe";

export default function LoadingPage () {
    return (
        <main className={`page w-full flex flex-col p-4 box-border overflow-scroll bg-stone-100 text-black`}>
            <RestaurantWireframe />
        </main>
    );
}