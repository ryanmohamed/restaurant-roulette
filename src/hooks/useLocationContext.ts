import { useContext } from "react";
import { LocationContext } from "@/context/LocationContext";

export default function useLocationContext () {
    return useContext(LocationContext);
};