import React, {useState} from "react";
import "./App.css";
import Schedule from "./Components/Schedule";
import Timetable from "./Components/Timetable";
import clsx from "clsx";
import EmployeeDirectory from "./Components/EmployeeDirectory";
import {Typography} from "@mui/material";
import Logo from "./medical";

const pages = [<EmployeeDirectory />, <Schedule/>, <Timetable />];

export default function App() {
    const [selected, setSelected] = useState(0);

    return (
        <div className="w-screen text-sm">
            <div
                className="flex justify-center items-center gap-2 text-center py-4 text-xl font-bold"
                style={{backgroundColor: "#F2F4F5"}}
            >
                <Logo/>
                <Typography fontSize={24} sx={{fontWeight: "bold"}}>Hospital Shift</Typography>
            </div>

            <div
                className="flex gap-2  pt-2 px-4 justify-around border-2"
                style={{backgroundColor: "#F2F4F5"}}
            >
                {["Employee Directory", "Schedule", "Timetable"].map(
                    (item, index) => (
                        <div
                            key={index}
                            style={{borderColor: "#695EE8"}}
                            className={clsx(
                                "px-1 py-3 font-bold rounded-t-md cursor-pointer",
                                selected === index
                                    ? "text-black border-b-4 "
                                    : "text-black border-bottom hover:"
                            )}
                            onClick={() => setSelected(index)}
                        >
                            <Typography>{item}</Typography>
                        </div>
                    )
                )}
            </div>
            <div className="p-4">{pages[selected]}</div>
        </div>
    );
}
