import React from 'react';
import { Layout } from '../../layout/Layout';
import { Link } from 'react-router-dom';
import { FiCopy } from "react-icons/fi";
import { FiArrowLeft } from 'react-icons/fi';


interface SourceLink {
    id: string;
    description: string;
    link: string;
}

type ImportanceLevel = "high_importance" | "medium_importance" | "low_importance";

interface EventData {
    title: string;
    date: string;
    address: string;
    tag: ImportanceLevel;
    description: string;
    cultural_sensitivities: string[];
    graphics: string;
    source_link: SourceLink[];
}

const event: EventData = {
    title: "Krishna Janmāshtami Dinner",
    date: "October 15−28, 2024",
    address: "1234 East Carrolton Road",
    tag: "high_importance",
    description: "Writer populates an event description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    cultural_sensitivities: [
        "Be sure not to wear a long sleeve shirt, it is considered offensive.",
        "Idk sample cultural sensitivity number 2"
    ],
    graphics: "https://www.gineicomarine.com.au/wp-content/uploads/2020/04/Gineico-Marine-Gianneschi-Water-Pumps-ACB-531-631-Chart.jpg",
    source_link: [
        {
            id: "1",
            description: "This article describes what the holiday means to people. Actually, it can go on for multiple lines and that's fine too.",
            link: "nytimes.com"
        },
        {
            id: "2",
            description: "This article describes what the holiday means to people. It can go on for multiple lines and that's fine too.",
            link: "nytimes.com"
        }
    ]
};

const importance_mapping: Record<ImportanceLevel, string> = {
    high_importance: "High Importance",
    medium_importance: "Medium Importance",
    low_importance: "Low Importance",
};

const getTagStyleBasedOnImportance = (tag: ImportanceLevel): string => {
    switch (tag) {
        case "high_importance":
            return "bg-red-600 text-white";
        case "medium_importance":
            return "bg-blue-600 text-white";
        case "low_importance":
            return "bg-green-600 text-white";
        default:
            return "bg-gray-400 text-white";
    }
};

const copyToClipboard = async (text: string): Promise<void> => {
    try {
        await navigator.clipboard.writeText(text);
        alert('Link copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy link.');
    }
};

export default function EventPage() {
    return (
        <Layout>
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 h-[100vh] space-y-8 bg-white text-base overflow-y-scroll object-fit-cover">
                <div className="mb-6">
                    <Link
                        to="/client/events"
                        className="flex items-center text-gray-600 text-sm md:text-base font-semibold mb-3 hover:underline"
                    >
                        <FiArrowLeft className="text-lg md:text-xl mr-2" />
                        <span className="text-lg md:text-xl font-bold">Events</span>
                    </Link>

                    <hr className="h-[1px] bg-slate-200 border-0" />
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 mb-2 mt-3">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            {event.title}
                        </h1>
                        {event.tag && (
                            <span className={`${getTagStyleBasedOnImportance(event.tag)} text-2xl sm:text-lg md:text-xl font-semibold px-3 py-1 rounded-full tracking-wide inline-block self-start md:self-auto`}>
                                {importance_mapping[event.tag]}
                            </span>
                        )}
                    </div>

                    <p className="text-sm sm:text-base md:text-lg">
                        <span className='font-bold text-gray-500'>{event.date}</span> • <span className='text-gray-700 font-bold'>{event.address}</span>
                    </p>
                </div>

                <div className="bg-[#EDEDED] p-10 sm:p-6 md:p-8 rounded-3xl space-y-6 mt-20">
                    <h2 className="text-2xl sm:text-2xl font-semibold text-gray-700">Event Description</h2>
                    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl">
                        <p className="text-base md:text-lg text-gray-800 leading-relaxed font-semibold">
                            {event.description}
                        </p>
                    </div>

                    <h2 className="text-2xl sm:text-2xl font-semibold text-gray-700 pt-2">Cultural Sensitivities</h2>
                    <div className="bg-white p-4 sm:p-6 rounded-3xl">
                        <ol className="list-decimal list-inside text-base md:text-lg text-gray-700 space-y-2 font-semibold">
                            {event.cultural_sensitivities.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ol>
                    </div>
                </div>

                <div className="bg-[#EDEDED] p-10 sm:p-6 md:p-8 rounded-3xl space-y-4">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">Graphics</h2>
                    <div className="w-full h-auto bg-[#EDEDED] rounded-3xl flex items-center justify-center text-gray-400 text-sm overflow-hidden min-h-[200px] md:min-h-[300px] lg:min-h-[400px]">
                        {event.graphics ? (
                            <img
                                src={event.graphics}
                                alt="Event Graphic"
                                className="w-full h-full object-contain max-h-[500px]"
                            />
                        ) : (
                            <div className="p-10 sm:p-20 text-center">Graphic Placeholder (Image will appear here)</div>
                        )}
                    </div>
                </div>

                {event.source_link.length > 0 && (
                    <div className="bg-[#EDEDED] p-10 rounded-[20px] space-y-4">
                        <h2 className="text-2xl sm: text-gray-700 font-semibold">Links to External Resources</h2>

                        <div className="bg-white p-4 rounded-[20px] overflow-x-auto w-full">
                            <div className="min-w-[600px]">
                                <div className="grid grid-cols-[8fr_8fr_60fr_20fr] text-gray-700 font-semibold border-b border-gray-300 pb-2 mb-2 text-xs md:text-sm">
                                    <span className="text-center text-base md:text-xl">Copy Link</span>
                                    <span className="pl-1 text-base md:text-xl">Index</span>
                                    <span className="pl-1 text-base md:text-xl">Description</span>
                                    <span className="pl-1 text-base md:text-xl">Link</span>
                                </div>

                                {event.source_link.map((source, index) => (
                                    <div
                                        key={source.id}
                                        className="grid grid-cols-[8fr_8fr_60fr_20fr] items-start py-2 border-b border-gray-200 last:border-b-0"
                                    >
                                        <button
                                            onClick={() => copyToClipboard(`https://${source.link}`)}
                                            className="font-semibold flex justify-center items-center h-full text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
                                            title="Copy link to clipboard"
                                        >
                                            <FiCopy className="text-lg" />
                                        </button>
                                        <span className="text-gray-800 pl-1 text-xs md:text-base font-semibold">{index + 1}.</span>
                                        <p className="text-gray-800 pr-2 text-xs md:text-base">
                                            {source.description}
                                        </p>
                                        <a
                                            href={`https://${source.link}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline text-xs md:text-base break-words font-semibold"
                                        >
                                            {source.link}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </Layout>
    );
}