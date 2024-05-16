import React from "react";
import App from "./App";
import {EmployeeProvider} from "./context/EmployeeContext";

export default function AppProvider() {
    return (
        <EmployeeProvider>
            <App/>
        </EmployeeProvider>
    );
}
