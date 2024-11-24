import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { XMarkIcon } from "@heroicons/react/16/solid";
import { Image } from "@nextui-org/image";
import { useSession } from 'next-auth/react';
import LogoutIcon from "@/asset/icon/LogoutIcon";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue
} from "@nextui-org/table";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Tabs, Tab } from "@nextui-org/tabs";
import SwapIcon from '@/asset/icon/Swap';
import LoadingForm from '../LoadingForm';




const ConvertCoin = () => {
    const { data: session } = useSession() || {};
    const [selectedTab, setSelectedTab] = useState("swap");

    const minToken = 100;
    const [sellAmount, setSellAmount] = useState(0);
    const [buyAmount, setBuyAmount] = useState(0);
    const [sellCoin, setSellCoin] = useState("ethereum");
    const [buyCoin, setBuyCoin] = useState("bitcoin");
    const [coinPrices, setCoinPrices] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
   
    function formatDateTimeToLocaleString(date: Date): string {
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }); // Adjust locale as needed
    }
    
    const [rows, setRows] = useState( [
        {
            key: "1",
            date: formatDateTimeToLocaleString(new Date("08/09/2024")),
            amountAPT: 1000,
            amountBTC: 0.014191271187083087,
            status: "Success",
        },
        {
            key: "2",
            date: formatDateTimeToLocaleString(new Date("09/09/2024")),
            amountAPT: 2000,
            amountBTC: 0.14191271187083088,
            status: "Success",
        },
        {
            key: "3",
            date: formatDateTimeToLocaleString(new Date("10/09/2024")),
            amountAPT: 3000,
            amountBTC: 0.28382542374166175,
            status: "Fail",
        },
        {
            key: "4",
            date: formatDateTimeToLocaleString(new Date("11/09/2024")),
            amountAPT: 1500,
            amountBTC: 0.021286906780624632,
            status: "Success",
        },
    ]);
    
    const columns = [
        {
            key: "time",
            label: "TIME",
        },
        {
            key: "amountAPT",
            label: "AMOUNT ICP",
        },
        {
            key: "amountBTC",
            label: "AMOUNT BTC",
        },
        {
            key: "status",
            label: "STATUS",
        },
    ];

    useEffect(() => {
     
      }, [sellCoin, buyCoin]);

     const changeFrom = (e:any) => {
        const regex = /^\d*\.?\d*$/;
        if (regex.test(e) && (e <= 5000)) {
            setSellAmount(e);
        }
        let num = 0.5182/71163.66 * sellAmount;
        setBuyAmount(num);
      }

    const swap = () => {
        setIsSubmitting(true);
        const newRow = {
            key: (rows.length + 1).toString(),
            date: formatDateTimeToLocaleString(new Date()),
            amountAPT: sellAmount,
            amountBTC: buyAmount,
            status: "Success",
        };



        setTimeout(() => {
            toast.success('Swap successful!');
            setIsSubmitting(false);
            setRows(prevRows => [...prevRows, newRow]);
        }, 3000);
        
        setSellAmount(0);
        setBuyAmount(0);
    }
    

    return (
        <div>
            {/* <div className="flex justify-between items-start mb-6">
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Image
                            isZoomed
                            width={45}
                            radius="full"
                            alt="NextUI Fruit Image with Zoom"
                            src={session?.user?.image ?? "/path/to/default/image.jpg"
                            }
                        />
                        <span className="font-bold">{session?.user?.name}</span>
                    </div>
                </div>
                <Link href="/" className="text-white hover:text-gray-300">
                    <XMarkIcon className="h-6 w-6" />
                </Link>
            </div> */}
            <Card className="w-full max-w-md mx-auto bg-white text-grey">
                <CardBody className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">From(max: 5000 ICP)</label>
                            <Input
                                type="text"
                                value={sellAmount.toString()}
                                onChange={(e) => changeFrom(e.target.value)}
                                className="w-full bg-gray-100 text-gray-700 rounded-md"
                                max={5000}
                                endContent={
                                    <h4>ICP</h4>
                                }
                            />
                            <p className="text-sm text-gray-500 mt-1">$0.5182</p>
                        </div>

                        <div className="flex justify-center">
                            <Button isIconOnly endContent={<SwapIcon />} variant="light" className="rotate-90">
                                
                            </Button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                            <Input
                                type="text"
                                value={buyAmount.toString()}
                                className="w-full bg-gray-100 text-gray-700 rounded-md"
                                endContent={
                                    <h4>ckBTC</h4>
                                }
                            />
                            <p className="text-sm text-gray-500 mt-1">$71,163.66</p>
                        </div>

                        <Button color="primary" className="w-full mt-3 uppercase text-white"  onClick={()=> swap()}>
                            swap
                        </Button>
                    </div>
                </CardBody>
            </Card>
            <div className='mt-6 w-full overflow-x-auto custom-table bg-white shadow-medium' style={{ borderRadius: 8 }}>
                <Table removeWrapper aria-label="Swap history table"
                    className="w-full min-w-full" style={{ background: "white" }}>
                    <TableHeader columns={columns} className='bg-white text-xs'>
                        {(column) => <TableColumn key={column.key} className='text-center'>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={rows} className='bg-white'>
                        {(item) => (
                            <TableRow>
                                <TableCell className='text-center'>{item.date}</TableCell>
                                <TableCell className='text-center'>{item.amountAPT.toString().substring(0,6)}</TableCell> 
                                <TableCell className='text-center'>{item.amountBTC.toString().substring(0,6)}</TableCell> 
                                <TableCell className='text-center'>{item.status}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <Toaster />
            {isSubmitting &&
                <div>
                    <LoadingForm />
                </div>
            }
        </div>
        
    );

};

export default ConvertCoin;