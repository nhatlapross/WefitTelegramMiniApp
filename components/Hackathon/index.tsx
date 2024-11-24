
'use client'
import { Tabs, Tab, Card, CardBody, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import Leaderboard from "../Leaderboard";
import TimeIcon from "@/asset/icon/TimeIcon";
import { Spacer } from "@nextui-org/react";
import { ChevronIcon } from "@/asset/icon/ChevronIcon";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useSession } from 'next-auth/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './styles.css';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import DollarIcon from "@/asset/icon/DollarIcon";
import ManIcon from "@/asset/icon/ManIcon";
import LoadingForm from "../LoadingForm";
import useMintNFT from "../hooks/useMintNFT";
import useClaimProfit from "../hooks/useClaimProfit";

interface IMyHackathon {
    id: number;
    title: string;
    image: string;
    timeStart: string;
    timeEnd: string;
    status: string;
    rank: number;
}

export default function Hackathon() {
    const [selected, setSelected] = useState("allHackathon");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: session } = useSession() || {};
    const { NFT } = useMintNFT();
    const { Profit } = useClaimProfit();

    const [selectedItem, setSelectedItem] = useState<IMyHackathon>({
        id: 1,
        title: 'Race 1: 5K Fun Run',
        image: "https://th.bing.com/th/id/OIP.HPRn0m__rRe18Rs3j4wkrQHaH_?w=173&h=187&c=7&r=0&o=5&pid=1.7",
        timeStart: '01/01/2024 00:00',
        timeEnd: '12/12/2024 00:00',
        status: 'upcoming',
        rank: 23
    });

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "0px",
        slidesToShow: 3,
        speed: 500,
        dots: true,
        color: "white",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    centerPadding: "0px",
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "100px",
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "50px",
                }
            }
        ]
    };

    function SampleNextArrow(props: any) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, color: "orange" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props: any) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, color: "orange" }}
                onClick={onClick}
            />
        );
    }

    const myHackathon = [
        {
            id: 1,
            title: 'Race 1: 5K Fun Run',
            image: "https://th.bing.com/th/id/OIP.HPRn0m__rRe18Rs3j4wkrQHaH_?w=173&h=187&c=7&r=0&o=5&pid=1.7",
            timeStart: '01/01/2024',
            timeEnd: '12/12/2024',
            status: 'upcoming',
            total:1000,
            rank: 23
        },
        {
            id: 2,
            title: 'Race 2: 10K Challenge',
            image: "https://th.bing.com/th/id/OIP.SUFrYYQSpoEjiUcsg10rRwHaHa?rs=1&pid=ImgDetMain",
            timeStart: '01/01/2024',
            timeEnd: '12/12/2024',
            status: 'ongoing',
            total:1500,
            rank: 24
        },
        {
            id: 3,
            title: 'Race 3: Half Marathon',
            image: "https://th.bing.com/th/id/OIP.9epyABsKLdxw0h4-X68oewHaHa?rs=1&pid=ImgDetMain",
            timeStart: '01/01/2024',
            timeEnd: '12/12/2024',
            status: 'completed',
            total:2000,
            rank: 56
        },
        {
            id: 4,
            title: 'Wefit365 Race',
            image: "https://assets-global.website-files.com/619cef5c40cb8925cd33ece3/621e3c9005658fc23c531509_619cef5c40cb89bb5133f8c6_template-vignette-HACKATHON-1200x900-FR.png",
            timeStart: '01/01/2024',
            timeEnd: '12/12/2024',
            status: 'upcoming',
            total:3000,
            rank: 10
        },
    ]

    const AllHackathon = [
        {
            id: 1,
            title: 'Race 1: 5K Fun Run',
            joining: 100,
            image: "https://th.bing.com/th/id/OIP.HPRn0m__rRe18Rs3j4wkrQHaH_?w=173&h=187&c=7&r=0&o=5&pid=1.7",
            timeStart: '01/01/2024',
            timeEnd: '12/12/2024',
            status: 'upcoming'
        },
        {
            id: 2,
            title: 'Race 2: 10K Challenge',
            joining: 200,
            image: "https://th.bing.com/th/id/OIP.SUFrYYQSpoEjiUcsg10rRwHaHa?rs=1&pid=ImgDetMain",
            timeStart: '01/01/2024',
            timeEnd: '12/12/2024',
            status: 'ongoing'
        },
        {
            id: 3,
            title: 'Race 3: Half Marathon',
            joining: 300,
            image: "https://th.bing.com/th/id/OIP.1uXtoUUGbs72yCVrIL9prQHaH0?w=178&h=187&c=7&r=0&o=5&pid=1.7",
            timeStart: '01/01/2024',
            timeEnd: '12/12/2024',
            status: 'completed'
        },
        {
            id: 4,
            title: 'Race 5: End of Marathon',
            joining: 400,
            image: "https://th.bing.com/th/id/OIP.2id1rOvG2mH1os0sVFUUNgHaHa?w=188&h=187&c=7&r=0&o=5&pid=1.7",
            timeStart: '01/01/2024',
            timeEnd: '12/12/2024',
            status: 'completed'
        },
        {
            id: 1,
            title: 'Race 1: 5K Fun Run',
            joining: 100,
            image: "https://th.bing.com/th/id/OIP.HPRn0m__rRe18Rs3j4wkrQHaH_?w=173&h=187&c=7&r=0&o=5&pid=1.7",
            timeStart: '01/01/2024',
            timeEnd: '12/12/2024',
            status: 'upcoming'
        },
        {
            id: 2,
            title: 'Race 2: 10K Challenge',
            joining: 200,
            image: "https://th.bing.com/th/id/OIP.SUFrYYQSpoEjiUcsg10rRwHaHa?rs=1&pid=ImgDetMain",
            timeStart: '01/01/2024',
            timeEnd: '12/12/2024',
            status: 'ongoing'
        },
        {
            id: 3,
            title: 'Race 3: Half Marathon',
            joining: 300,
            image: "https://th.bing.com/th/id/OIP.1uXtoUUGbs72yCVrIL9prQHaH0?w=178&h=187&c=7&r=0&o=5&pid=1.7",
            timeStart: '01/01/2024',
            timeEnd: '12/12/2024',
            status: 'completed'
        },
        {
            id: 4,
            title: 'Race 5: End of Marathon',
            joining: 400,
            image: "https://th.bing.com/th/id/OIP.2id1rOvG2mH1os0sVFUUNgHaHa?w=188&h=187&c=7&r=0&o=5&pid=1.7",
            timeStart: '01/01/2024',
            timeEnd: '12/12/2024',
            status: 'completed'
        },
    ]

    function formatDateTimeToLocaleString(date: Date): string {
        return date.toLocaleString('en-GB'); // Adjust locale as needed
    }

    const joinHackathon = (data: any) => {
        if(data.status != "completed"){
            setTimeout(() => {
                toast.success('You are join ' + data.title + ' successful! Start time at ' + formatDateTimeToLocaleString(new Date()));
                handleMintNFT(data);
            }, 2000);
        }
        else{
            setSelectedItem(data);
            onOpen();
        }
    }

    function getFirstAndLastFourChars(str: string): string {
        if (str.length <= 8) {
          return str; // If the string is too short, return it as is
        }
        const firstFour = str.slice(0, 4);
        const lastFour = str.slice(-4);
        return `${firstFour}...${lastFour}`;
      }  

    const handleMintNFT = async (data:any) => {
        console.log(data);
        setIsSubmitting(true);
        let xpr_address = localStorage.getItem('xrp_wallet');
        try {
          const result = await NFT({
            email: session?.user?.email as string,
            xrp_wallet: xpr_address as string,
            challengeId: data.id
          });
          console.log(result);
          toast.success('NFT id:\n'+getFirstAndLastFourChars(result?.data?.nfts?.NFTokenID as string), {
            duration: 5000,
          });
          setIsSubmitting(false);
        } catch (error) {
          console.error(error);
          setIsSubmitting(false);
        }
      };

      const handleClaimProfit = async (data:any) => {
        console.log(data);
        let xpr_address = localStorage.getItem('xrp_wallet');
        try {
          const result = await Profit({
            email: session?.user?.email as string,
            xrp_wallet: xpr_address as string,
            amount: data.total
          });
          console.log(result);
          setIsSubmitting(false);
        } catch (error) {
          console.error(error);
          toast.success('Claim successfull!');
          setIsSubmitting(false);
        }
      };

    const viewLeaderboard = (item: any) => {
        if (item.status === 'completed') {
            setIsSubmitting(true);
            handleClaimProfit(item);
            // setTimeout(() => {
            //     toast.success('claim reward successfully!');
            //     setTimeout(() => {
            //         toast.success('Transactions hash is 6FEF8B....36812');
            //         setIsSubmitting(false);
            //     }, 5000);   
                
            // }, 2000);
        }
        else {
            setSelectedItem(item);
            onOpen();
        }
    }

    return (
        <>
            <div className="flex w-full flex-col mt-5">
                <Tabs
                    aria-label="Tabs colors"
                    color="secondary"
                    classNames={{
                        cursor: "bg-primary",
                        tabList: "bg-white text-primary",
                        tabContent: "group-data-[selected=true]:text-white text-orange-500",
                        tab: "border border-primary",
                    }}
                    selectedKey={selected}
                    onSelectionChange={(e: any) => setSelected(e.key)}
                >
                    <Tab key="myHackathon" title="My Champion">
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: false,
                            }}
                            pagination={true}
                            loop={true}
                            modules={[EffectCoverflow, Pagination]}
                            className="mySwiper"
                        >
                            {myHackathon.map((item, index) => (
                                <SwiperSlide>
                                    <Card className={`py-2 bg-white border border-[#521400]/0.1`}>
                                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                            <p className={`${item.status == 'upcoming' ? "text-yellow-500" : item.status == 'ongoing' ? "text-green-500" : "text-red-500"} uppercase font-bold`}>{item.status}</p>
                                            <h4 className="font-bold text-large text-black">{item.title}</h4>
                                            <small className="text-default-500">Your rank: {item.rank}</small>
                                        </CardHeader>
                                        <CardBody className="overflow-visible py-2">
                                            <Image
                                                alt="Card background"
                                                className="object-cover rounded-xl"
                                                src={item.image}
                                                width={270}
                                            />
                                        </CardBody>
                                        <CardFooter className="bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 flex flex-col items-start">
                                            <div className="flex items-center gap-1">
                                                <TimeIcon />
                                                <span className="text-[10px] font-medium text-[#81819C]">{item.timeStart} - {item.timeEnd}</span>
                                            </div>
                                            <div className="flex items-center gap-1 mt-1">
                                                <DollarIcon />
                                                <div>
                                                    <span className="text-[10px] font-medium text-[#81819C]">{item.total}$</span>
                                                </div>
                                            </div>
                                            <div className="w-full flex justify-center mt-2">
                                                <Button className="flex items-center text-tiny" color="primary" radius="full" size="sm" onPress={() => viewLeaderboard(item)}>
                                                    {item.status == 'completed' ? 'Claim' : 'Leaderboard'}
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Tab>
                    <Tab key="allHackathon" title="All Champion">
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: false,
                            }}
                            loop={true}
                            pagination={true}
                            modules={[EffectCoverflow, Pagination]}
                            className="mySwiper"
                        >
                            {AllHackathon.map((item, index) => (
                                <SwiperSlide>
                                    <Card className={`py-2 mb-2 bg-white border border-[#521400]/0.1`}>
                                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                            <p className={`${item.status == 'upcoming' ? "text-yellow-500" : item.status == 'ongoing' ? "text-green-500" : "text-red-500"} uppercase font-bold`}>
                                                {item.status}
                                            </p>
                                            <h4 className="font-bold text-large text-black">{item.title}</h4>
                                        </CardHeader>
                                        <CardBody className="overflow-visible py-2">
                                            <Image
                                                alt="Card background"
                                                className="object-cover rounded-xl"
                                                src={item.image}
                                                width={270}
                                                height={240}
                                            />
                                        </CardBody>
                                        <CardFooter className="bg-gray/30 border-t-1 border-zinc-100/50 z-10 flex flex-col items-start">
                                            <div>
                                                <div className="flex items-center gap-1">
                                                    <TimeIcon />
                                                    <div>
                                                        <span className="text-[10px] font-medium text-[#81819C]">{item.timeStart} - {item.timeEnd}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <ManIcon />
                                                    <small className="text-[10px] font-medium text-[#81819C]">{item.joining}</small>
                                                </div>
                                            </div>
                                            <Button className="w-full flex justify-center mt-2 text-tiny" color="primary" radius="full" size="sm" onPress={() => joinHackathon(item)}>
                                                {item.status != 'completed'? "Join":"Leaderboard"}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Tab>
                </Tabs>
                {isSubmitting &&
                <div>
                    <LoadingForm />
                </div>
                }
                <Modal
                    size="lg"
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 text-primary bg-white">Leaderboard of {selectedItem.title}</ModalHeader>
                                <ModalBody className="text-primary bg-white w-full">
                                    <Leaderboard />
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                <Toaster />
            </div>
            <style jsx global>{`
                .slick-slide > div {
                    margin: 0 20px;
                }
                .slick-list {
                    margin: 10px 0;
                }
            `}</style>
        </>

    )
}