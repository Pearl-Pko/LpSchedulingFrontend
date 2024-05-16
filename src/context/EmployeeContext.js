import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import {useCreateRandomUsers} from "../generateEmployeeData";
import {Backdrop, CircularProgress} from "@mui/material";
import { generateTimetable} from "../utils/shiftManager";

export const EmployeeContext = createContext();

export const useEmployeeContext = () => useContext(EmployeeContext);

export function EmployeeProvider({children}) {
    const [employeeCount, setEmployeeCount] = useState(9);
    const [reRenders, setReRenders] = useState(0);
    const [timetable, setTimetable] = useState([]);
    const [numRestDays, setNumRestDays] = useState(0);
    const [userShifts, setUserShifts] = useState(new Map());
    const [loading, setLoading] = useState(true);

    const users = useCreateRandomUsers(employeeCount, reRenders);

    console.log("users");

    const fetchAllocation = async () => {
        setLoading(true);
        try {
            const assignment = await generateTimetable(users, numRestDays);
            setTimetable(assignment["timetable"]);
            setUserShifts(assignment["userShifts"]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllocation();
    }, [users, numRestDays]);

    return (
        <EmployeeContext.Provider
            value={{
                users,
                timetable,
                userShifts,
                employeeCount,
                setEmployeeCount,
                reRenders,
                setReRenders,
                numRestDays,
                setNumRestDays,
            }}
        >
            {children}
            <div>
                <Backdrop
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => 9000,
                    }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </EmployeeContext.Provider>
    );
}
