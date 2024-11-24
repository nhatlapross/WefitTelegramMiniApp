import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue } from "@nextui-org/react";
import { useSession } from 'next-auth/react';
export default function Leaderboard() {
    const { data: session } = useSession() || {};
    const columns = [
        { name: "NAME", uid: "name" },
        { name: "SCORE", uid: "role" },
        { name: "RANK", uid: "status" },
    ];

    const myRanking = [
        {
            id: 999,
            name: session?.user?.name,
            role: "1909 point",
            team: "500 km",
            status: 100,
            age: "29",
            avatar: session?.user?.image,
            email: session?.user?.email,
        }
    ]

    const users = [
        {
            id: 1,
            name: "Tony Reichert",
            role: "98909 point",
            team: "5600 km",
            status: "#1",
            age: "29",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            email: "tony.reichert@example.com",
        },
        {
            id: 2,
            name: "Zoey Lang",
            role: "87909 point",
            team: "5300 km",
            status: "#2",
            age: "25",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            email: "zoey.lang@example.com",
        },
        {
            id: 3,
            name: "Jane Fisher",
            role: "67909 point",
            team: "4200 km",
            status: "#3",
            age: "22",
            avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            email: "jane.fisher@example.com",
        },
        {
            id: 4,
            name: "William Howard",
            role: "57209 point",
            team: "3200 km",
            status: "#4",
            age: "28",
            avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
            email: "william.howard@example.com",
        },
        {
            id: 5,
            name: "Kristen Copper",
            role: "27909 point",
            team: "1200 km",
            status: "#5",
            age: "24",
            avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
            email: "kristen.cooper@example.com",
        },
    ];

    const renderCell = React.useCallback((user: any, columnKey: any) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.avatar }}
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
                    </User>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={user.status == "#1" ? "success" : user.status == '#2' ? 'danger' : user.status == '#3' ? 'warning' : "default"} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className="w-full max-w-l mx-auto bg-white rounded-lg">
            {users.map((player, index) => (
                <div key={index} className="flex items-center space-x-2 my-8">
                    <div className="flex-shrink-0 w-8 h-8">
                        <div className={`w-full h-full rounded-full flex items-center justify-center ${index < 3 ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-500'
                            }`}>
                            {player.status}
                        </div>
                    </div>
                    <User
                        avatarProps={{ radius: "lg", src: player.avatar }}
                        description={player.email}
                        name={player.name}
                    >
                    </User>
                    <div className="flex-grow min-w-0">
                        <p className="font-medium text-orange-500 truncate mx-4"></p>
                        <p className="text-xs text-orange-300 truncate mx-4"></p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                        <p className="font-bold text-orange-500">{player.role}</p>
                        <p className="text-xs text-orange-300">{player.team} </p>
                    </div>
                </div>
            ))}
            <div className="flex items-center space-x-2 my-8 bg-t-primary">
                <div className="flex-shrink-0 w-8 h-8">
                    <div className={`w-full h-full rounded-full flex items-center justify-center ${myRanking[0].status < 3 ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-500'
                        }`}>
                        {myRanking[0].status}
                    </div>
                </div>
                <User
                    avatarProps={{ radius: "lg", src: myRanking[0].avatar as string }}
                    description={myRanking[0].email}
                    name={myRanking[0].name}
                >
                </User>
                <div className="flex-grow min-w-0">
                    <p className="font-medium text-orange-500 truncate mx-4"></p>
                    <p className="text-xs text-orange-300 truncate mx-4"></p>
                </div>
                <div className="flex-shrink-0 text-right">
                    <p className="font-bold text-orange-500">{myRanking[0].role}</p>
                    <p className="text-xs text-orange-300">{myRanking[0].team} </p>
                </div>
            </div>
        </div>
    );
}