import React, { useState, ChangeEvent, FormEvent } from "react";
import { Input, Button } from "@nextui-org/react";
import { parseZonedDateTime } from "@internationalized/date";
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { Upload, Loader2 } from 'lucide-react';
import DateRangePicker from "../DateTimePicker";
import LoadingForm from "../LoadingForm";
import useCreateChallenge from "../hooks/useCreateChallenge";

export default function FormHackathon() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        amount: 0,
        description: '',
        challenge_type: 0,
        pool_prize: 0,
        price: 0,
        expected_return: 0,
        distance_goal: 0,
        participants_limit: 0,
        startDate: parseZonedDateTime("2024-04-01T00:45[America/Los_Angeles]"),
        endDate: parseZonedDateTime("2024-04-08T11:15[America/Los_Angeles]"),
    });
    const { Challange } = useCreateChallenge();

    const { data: session } = useSession() || {};

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result;
                if (typeof result === 'string') {
                    setSelectedFile(result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    function getRandomNumberWithDateTime(): number {
        const now = new Date();
        const seed = now.getTime();
        const random = Math.sin(seed) * 10000;
        return random - Math.floor(random);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Submit transaction first


            // Then handle registration


            // Submit form data
            const dataToSubmit = {
                ...formData,
                image: selectedFile,
            };

            await handleSubmitTransaction(dataToSubmit);

            // Simulating API call delay
            // await new Promise(resolve => setTimeout(resolve, 5000));
            // setTimeout(() => {

            // }, 3000);
            // toast.success('Hackathon created successfully!');

            // Reset form
            setFormData({
                name: '',
                amount: 0,
                description: '',
                challenge_type: 0,
                pool_prize: 0,
                price: 0,
                expected_return: 0,
                distance_goal: 0,
                participants_limit: 0,
                startDate: parseZonedDateTime("2024-04-01T00:45[America/Los_Angeles]"),
                endDate: parseZonedDateTime("2024-04-08T11:15[America/Los_Angeles]"),
            });
            setSelectedFile(null);
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('Failed to create hackathon. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    //https://explorer.xrplevm.org/tx/0x526f440cb5574c348e118d425f0931d450a60b33ec96d55c3b2b87343232e003
    const handleSubmitTransaction = async (data: any) => {
        console.log(data);
        let evm_address = localStorage.getItem('evm_wallet');
        try {
            const result = await Challange({
                challengeId: 2,
                amount: data.amount,
                date: data.startDate,
                owner: evm_address as string,
                challenge_type: data.challenge_type,
                pool_prize: data.pool_prize,
                price: data.price,
                expected_return: data.expected_return,
                expire_date: 30,
                distance_goal: data.distance_goal,
                participants_limit: data.participants_limit
            });
            console.log(result);
            setIsSubmitting(false);
        } catch (error) {
            console.error(error);
            setIsSubmitting(false);
        }
    };


    return (
        <form className="flex flex-col gap-4 text-gray-700" onSubmit={handleSubmit}>
            <Input
                isRequired
                isDisabled={isSubmitting}
                label="Name of Hackathon"
                name="name"
                value={formData.name}
                onChange={handleChange}
                color="default"
                variant="bordered"
            />
            <Input
                isRequired
                isDisabled={isSubmitting}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                color="default"
                variant="bordered"
            />
            <div className="flex flex-row gap-4 w-full">
                <Input
                    isRequired
                    isDisabled={isSubmitting}
                    label="Pool prize"
                    name="pool_prize"
                    value={formData.pool_prize.toString()}
                    onChange={handleChange}
                    color="default"
                    variant="bordered"
                />
                <Input
                    isRequired
                    isDisabled={isSubmitting}
                    label="Price"
                    name="price"
                    value={formData.price.toString()}
                    onChange={handleChange}
                    color="default"
                    variant="bordered"
                />

            </div>
            <div className="flex flex-row gap-4 w-full">
                <Input
                    isRequired
                    isDisabled={isSubmitting}
                    label="Amount"
                    name="amount"
                    type="number"
                    value={formData.amount.toString()}
                    onChange={handleChange}
                    color="default"
                    variant="bordered"
                />
                <Input
                    isRequired
                    isDisabled={isSubmitting}
                    label="Expected return"
                    name="expected_return"
                    value={formData.expected_return.toString()}
                    onChange={handleChange}
                    color="default"
                    variant="bordered"
                />
            </div>

            <div className="flex flex-row gap-4 w-full">

                <Input
                    isRequired
                    isDisabled={isSubmitting}
                    label="Distance goal"
                    name="distance_goal"
                    value={formData.distance_goal.toString()}
                    onChange={handleChange}
                    color="default"
                    variant="bordered"
                />
                <Input
                    isRequired
                    isDisabled={isSubmitting}
                    label="Participans limit"
                    name="participants_limit"
                    value={formData.participants_limit.toString()}
                    onChange={handleChange}
                    color="default"
                    variant="bordered"
                />
            </div>

            <div className="w-full max-w-xl flex flex-row gap-4">
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <DateRangePicker />
                </div>
            </div>

            <div className="flex flex-col items-center gap-4">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept="image/*"
                    disabled={isSubmitting}
                />
                <label htmlFor="file-upload">
                    <div className={`flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full transition-colors duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90 cursor-pointer'
                        }`}>
                        <Upload size={18} />
                        <span>Choose file</span>
                    </div>
                </label>

                {selectedFile && (
                    <div className="flex justify-center w-full">
                        <img
                            src={selectedFile}
                            alt="Preview"
                            className="object-cover w-[200px] h-[200px] rounded-lg"
                        />
                    </div>
                )}
            </div>

            <div className="flex gap-2 justify-end">
                <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    className="text-white"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Creating...</span>
                        </div>
                    ) : (
                        'Create'
                    )}
                </Button>
            </div>
            {isSubmitting &&
                <div>
                    <LoadingForm />
                </div>
            }

            <Toaster position="top-right" />
        </form>
    );
}