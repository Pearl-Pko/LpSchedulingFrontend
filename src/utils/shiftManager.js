export const shifts = ["Morning", "Afternoon", "Evening"];
export const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export const numDays = days.length;
export const numShifts = shifts.length;
export const minEmployeesForShift = 3;

export async function generateTimetable(users, numRestDays) {
    const timetable = new Array(numDays).fill(null).map((_, i) => {
        return new Array(numShifts).fill([]);
    });

    const userShifts = new Map();
    for (let index = 0; index < users.length; index++)
        userShifts.set(index, []);

    console.log(users);

    const res = await fetch("/api/allocate-shifts", {
        method: "POST",
        body: JSON.stringify({num_employees: users.length, num_rest_days: numRestDays}),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
    });
    const response = await res.json();

    const results = response["res"]

    // console.log(results);
    // const results = assignShifts(users);


    const regex = /x_(?<employeeId>\d+)_(?<shift>\d+)_(?<day>\d+)/;

    for (const assignment of results) {
        const match = regex.exec(assignment);

        userShifts.set(parseInt(match.groups.employeeId), [
            ...userShifts.get(parseInt(match.groups.employeeId)),
            {day: match.groups.day, shift: match.groups.shift},
        ]);

        timetable[match.groups.day][match.groups.shift] = [
            ...timetable[match.groups.day][match.groups.shift],
            users[match.groups.employeeId],
        ];
    }

    console.log("user shifts", userShifts);
    return {timetable, userShifts};
}
