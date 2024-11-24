import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { useSession } from 'next-auth/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import ConvertCoin from '../ConvertCoin';
import Link from 'next/link';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowUpIcon from '@/asset/icon/ArrowUpIcon';
import AptosIcon from '@/asset/icon/AptosIcon';
import BitcoinIcon from '@/asset/icon/BitcoinIcon';
import ArrowDownIcon from '@/asset/icon/ArrowDownIcon';
import { XMarkIcon } from '@heroicons/react/16/solid';
import LogoIconSmall from '@/asset/icon/LogoSmall';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './styles.css';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import Header from '../Header';
import XRPIcon from '@/asset/icon/XRPIcon';
import ICPIcon from '@/asset/icon/ICPIcon';

interface Total {
  distance: number;
  hour: number;
  minute: number;
  coin: number;
}


export default function Profile() {
  const { data: session } = useSession() || {};
  const [selectedNFT, setSelectedNFT] = useState({
    id: 1,
    title: 'NFT 1',
    image: 'https://th.bing.com/th/id/OIP.9epyABsKLdxw0h4-X68oewHaHa?rs=1&pid=ImgDetMain',
    owner: 'John Doe',
    description: 'This is certificate for joining the champions',
    price: 100,
  });
  const { isOpen: isNFTOpen, onOpen: onNFTOpen, onClose: onNFTClose } = useDisclosure();
  const [toTal, setTotal] = useState<Total>({ distance: 25.06, hour: 25, minute: 10, coin: 4995 });
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

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    dots: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: "40px",
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

  const ListNFT = [
    {
      tx_hash: '6084919291',
      title: 'NFT 1',
      image: 'https://th.bing.com/th/id/OIP.9epyABsKLdxw0h4-X68oewHaHa?rs=1&pid=ImgDetMain',
      owner: 'John Doe',
      description: 'This is certificate for joining the champions',
      price: 100,
    },
    {
      tx_hash: '6084919274',
      title: 'NFT 2',
      image: 'https://th.bing.com/th/id/OIP.9epyABsKLdxw0h4-X68oewHaHa?rs=1&pid=ImgDetMain',
      owner: 'Jane Doe',
      description: 'This is certificate for joining the champions',
      price: 50,
    },
    {
      tx_hash: '6084919269',
      title: 'NFT 3',
      image: 'https://th.bing.com/th/id/OIP.9epyABsKLdxw0h4-X68oewHaHa?rs=1&pid=ImgDetMain',
      owner: 'Mike Doe',
      description: 'This is certificate for joining the champions',
      price: 150,
    },
    {
      id: 4,
      title: 'Race 3: Half Marathon',
      image: 'https://th.bing.com/th/id/OIP.9epyABsKLdxw0h4-X68oewHaHa?rs=1&pid=ImgDetMain',
      owner: 'Nhat Nguyen',
      description: 'This is certificate for joining Half Marathon champion',
      price: 200,
    }
  ];

  const transactions = [
    { icon: <ICPIcon />, name: "ICP", date: "Internet computing", amount: 1000, increase: true },
    { icon: <BitcoinIcon />, name: "BTC", date: "Bitcoin", amount: 500, increase: false },
  ]

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  }

  const handleNFTOpen = (nft: any) => {
    // setSelectedNFT(nft);
    // onNFTOpen();
    var tx_hash = localStorage.getItem('tx_hash');
    window.open(`https://explorer.xrplevm.org/tx/${tx_hash}`, "_self")
  }

  return (
    <>
      <div className="bg-white text-primary min-h-screen scrollbar-hide overflow-auto">
        <div className="max-w-4xl mx-auto p-4">
          <Header />
          <div className="bg-card rounded-lg p-4 mb-4">
            <div className="card">
              <h1 className="font-bold">Beginner</h1>
              <div className="my-1 flex items-center">
                <LogoIconSmall /><span className="text-[32px] leading-normal font-bold">{toTal.coin}</span>
              </div>
              <div className="flex items-center gap-x-6">
                <div>
                  <h2 className="text-[10px] font-medium">Total distances</h2>
                  <div>
                    <span className="text-xl leading-normal font-bold">{toTal.distance}</span> <span className="text-xs leading-normal">km</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-[10px] font-medium">Total time</h2>
                  <div>
                    <span className="text-xl leading-normal font-bold">{toTal.hour}</span> <span className="text-xs leading-normal">hrs</span>
                    {" "}
                    <span className="text-xl leading-normal font-bold">{toTal.minute}</span> <span className="text-xs leading-normal">min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <hr className="border-primary border-t-2 mb-1" /> */}

          <div className="bg-card rounded-lg p-2 mt-2">
            <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {transactions.map((transaction, index) => (
                  <li key={index} className="p-4 flex items-center justify-between group relative">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{transaction.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold">{transaction.name}</h3>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-bold text-black mb-2">
                        ${transaction.amount.toFixed(2)}
                      </span>
                      <div className="overflow-hidden h-0 group-hover:h-8 transition-all duration-300 ease-in-out">
                        <Button
                          className="text-white bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          color="primary"
                          radius="full"
                          size="sm"
                          onPress={() => handleOpen()}
                        >
                          Convert
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='mt-3'>
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
              {ListNFT.map((item, index) => (
                <SwiperSlide key={index}>
                  <Card className={`py-2 bg-white border border-[#521400]/0.1 group relative`}>
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                      <h4 className="font-bold text-large text-black">{item.title}</h4>
                      <small className="text-default-500">Created by: {item.owner}</small>
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
                      <div>
                        <p className="text-black text-tiny">{item.description}</p>
                        <p className="text-black text-tiny">${item.price}</p>
                      </div>
                      {/* Button div initially hidden, appears on card hover */}
                      <div className="w-full flex justify-center mt-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <Button className="text-tiny" color="primary" radius="full" size="sm" onPress={() => handleNFTOpen(item)}>
                          View NFT
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </div>
      <Modal
        size="full"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent className="bg-white text-black">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-primary">Convert Assets</ModalHeader>
              <ModalBody>
                <ConvertCoin />
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isNFTOpen} onClose={onNFTClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{selectedNFT?.title}</ModalHeader>
              <ModalBody>
                <Image
                  src={selectedNFT?.image}
                  alt={selectedNFT?.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <p className="mt-4"><strong>Owner:</strong> {selectedNFT?.owner}</p>
                <p><strong>Description:</strong> {selectedNFT?.description}</p>
                <p><strong>Price:</strong> ${selectedNFT?.price}</p>
              </ModalBody>
              <ModalFooter>
                {/* <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button> */}
                <Button color="primary" onPress={onClose}>
                  Update NFT
                </Button>
                <Button color="primary" onPress={onClose}>
                  Burn NFT
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>

  );
}