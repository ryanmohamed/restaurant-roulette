import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { LocationContext, LocationProvider } from "../src/context/LocationContext";
import { act } from "react-dom/test-utils";

describe("LocationProvider", () => {
    it('renders', async () => {
        let component;
        await act( async () => {
            component = render(<LocationProvider />);
        })
        expect(component).toBeDefined();
    });
    it('component passes data down', async () => {
        const testData = {city: "Montreal", regionName: "Quebec", zip: "H3H", lat: 45.5075, lon: -73.5887 };
        await act( async () => {
            render(<LocationContext.Provider value={{
                loading: false,
                error: null,
                location: testData,
                setLocation: null,
                showModal: false,
                setShowModal: null
            }}>
                <p data-testid="consumer">{ location ? "has data" : "no data" }</p>
            </LocationContext.Provider>);
        })
        const component = screen.getByTestId('consumer');
        expect(component).toBeInTheDocument();
        expect(component).toHaveTextContent("has data");
    });
})