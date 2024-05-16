import React from "react";
import {shifts, days} from "../utils/shiftManager";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import clsx from "clsx";
import {useEmployeeContext} from "../context/EmployeeContext";

export default function Schedule() {
    const {users, userShifts} = useEmployeeContext();
    const colors = ["#FFCFA4", "#E0D2FF", "#FDDAF3", "#C3F0EB"];

    return (
        <TableContainer sx={{minWidth: "100"}}>
            <Table>
                <TableHead>
                    <TableRow style={{backgroundColor: "#EDEFF0"}}>
                        {["Employee Name", ...days].map((item, index) =>
                            index == 0 ? (
                                <TableCell key={index} sx={{minWidth: "160px"}}>
                                    {item}
                                </TableCell>
                            ) : (
                                <TableCell key={index}>{item}</TableCell>
                            )
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from(userShifts.entries()).map(
                        ([key, assignments]) => {
                            return (
                                <TableRow key={key}>
                                    <TableCell sx={{width: "800px"}}>
                                        {users[key].name}
                                    </TableCell>
                                    {days.map((_, day) => {
                                        const assignment = assignments.find(
                                            (item) => parseInt(item.day) === day
                                        );

                                        return (
                                            <TableCell
                                                sx={{padding: "12px 12px", whiteSpace: "nowrap"}}
                                            >
                                                <div
                                                    className="p-2 flex justify-center rounded-md"
                                                    style={{
                                                        backgroundColor: assignment ?
                                                            colors[
                                                                assignment.shift
                                                            ] : colors[colors.length - 1],
                                                    }}
                                                >
                                                    {assignment ? shifts[assignment.shift] : "Rest day"}
                                                </div>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        }
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
