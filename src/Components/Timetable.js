import React from "react";
import {useEmployeeContext} from "../context/EmployeeContext";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import EmployeesForShift from "./EmployeesInShift";
import { shifts, days } from "../utils/shiftManager";

export default function Timetable() {
    const {timetable} = useEmployeeContext();
    // console.log(timetable);
    return (
        <div className="text-sm">
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow style={{backgroundColor: "#EDEFF0"}}>
                            <TableCell />
                            {shifts.map((item) => {
                                return <TableCell>{item}</TableCell>;
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {days.map((item, day) => (
                            <TableRow
                                key={day}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell sx={{padding: "12px 12px"}}>
                                    {item}
                                </TableCell>
                                {shifts.map((_, shift) => (
                                    <TableCell sx={{padding: "12px 12px"}}>
                                        <EmployeesForShift day={day} shift={shift}/>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
