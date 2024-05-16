import React from "react";
import {useEmployeeContext} from "../context/EmployeeContext";
import {
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import "./button.css";
import {numDays} from "../utils/shiftManager";

export default function EmployeeDirectory() {
    const {
        users,
        employeeCount,
        setEmployeeCount,
        reRenders,
        setReRenders,
        numRestDays,
        setNumRestDays,
    } = useEmployeeContext();

    const handleEmployeeCountChange = (event) => {
        setEmployeeCount(event.target.value);
    };

    const handleRestDaysChange = (event) => {
        setNumRestDays(event.target.value);
    };

    return (
        <div className="text-sm">
            <div className="flex justify-between items-stretch">
                <div className="flex gap-2 lg:gap-5">
                    <Select
                        autoWidth
                        renderValue={(value) => `Count: ${value}`}
                        value={employeeCount}
                        onChange={handleEmployeeCountChange}
                        sx={{
                            "& .MuiSelect-select": {
                                paddingTop: 1,
                                paddingBottom: 1,
                            },
                        }}
                        // onChange={handleEmployeeCountChange}
                    >
                        {Array.from({length: 20}).map((_, index) => {
                            const count = 9 * (index + 1);
                            return <MenuItem value={count}>{count}</MenuItem>;
                        })}
                    </Select>
                    <Select
                        autoWidth
                        renderValue={(value) => `Rest days: ${value}`}
                        value={numRestDays}
                        onChange={handleRestDaysChange}
                        sx={{
                            "& .MuiSelect-select": {
                                paddingTop: 1,
                                paddingBottom: 1,
                            },
                        }}
                        // onChange={handleEmployeeCountChange}
                    >
                        {Array.from({length: numDays}).map((_, index) => {
                            const count = index;
                            return <MenuItem value={count}>{count}</MenuItem>;
                        })}
                    </Select>
                </div>
                {/* <Button variant="contained" sx={{backgroundColor: "#695EE8"}}>Shuffle</Button> */}
                <button
                    className="text-white px-4 py-1 rounded-md btn"
                    style={{backgroundColor: "#695EE8"}}
                    onClick={() => setReRenders(reRenders + 1)}
                >
                    Shuffle
                </button>
            </div>
            {/* <button className="bg-purple-500 text-white px-4 py-1 rounded-md">
                Assign Shifts
            </button> */}
            <TableContainer sx={{minWidth: "100", marginTop: "20px"}}>
                <Table>
                    <TableHead>
                        <TableRow style={{backgroundColor: "#EDEFF0"}}>
                            <TableCell sx={{width: "70%"}}>Full Name</TableCell>
                            <TableCell sx={{width: "30%"}}>id</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((item, index) => (
                            <TableRow>
                                <TableCell sx={{padding: "12px 12px"}}>
                                    <div className="flex gap-2 items-center">
                                        <PersonIcon
                                            sx={{
                                                color: item.avatarColor,
                                                width: 15,
                                            }}
                                        />
                                        <div>{item.name}</div>
                                    </div>
                                </TableCell>
                                <TableCell sx={{padding: "12px 12px"}}>
                                    {item.userId}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
