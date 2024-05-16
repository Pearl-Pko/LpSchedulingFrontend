import React, {useEffect, useMemo, useState} from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import {useEmployeeContext} from "../context/EmployeeContext";
import {shifts, days} from "../utils/shiftManager";
import { minEmployeesForShift } from "../utils/shiftManager";

export default function EmployeesForShift({day, shift}) {
    const {timetable} = useEmployeeContext();
    console.log(timetable);
    const [showMoreUIVisibile, setShowMoreUIVisible] = useState(false);
    const [showEmployees, setShowEmployees] = useState(false);

    const employeesInShift = timetable[day][shift];
    const numEmployeesInShiftUI = Math.min(employeesInShift.length, 3);

    return (
        <>
            <Dialog
                open={showEmployees}
                onClose={() => setShowEmployees(false)}
            >
                <DialogTitle className="justify-between">
                    <div>Employees In Shift</div>
                    <div>{employeesInShift.length}</div>
                </DialogTitle>
                <DialogContent>
                    <Typography>{`${days[day]}, ${shifts[shift]}`}</Typography>
                    <ul>
                        {employeesInShift.map((user) => (
                            <li className="p-2 flex gap-2 items-start">
                                <PersonIcon
                                    sx={{
                                        color: user.avatarColor,
                                        width: 16,
                                    }}
                                />
                                <Typography>{`${user.userId} ${user.name}`}</Typography>
                            </li>
                        ))}
                    </ul>
                </DialogContent>
            </Dialog>
            <Button
                onClick={() => {
                    setShowEmployees(true);
                }}
            >
                {Array.from({length: numEmployeesInShiftUI}).map((_, user) => (
                    <PersonIcon
                        sx={{
                            color: employeesInShift[user].avatarColor,
                            width: 16,
                        }}
                    />
                ))}
                {employeesInShift.length > minEmployeesForShift && "+"}
            </Button>
        </>
    );
}
