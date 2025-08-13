import { FiCopy } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
interface Donor {
    name: string;
    email: string;
    address: string;
    interests: string;
}

const potentialDonorsData: Donor[] = [
    { name: 'Name Name', email: 'karthikvemun345@gmail.com', address: '12 Briarwood Ave', interests: 'Hotels' },
    { name: 'Name Name', email: 'karthikvemun345@gmail.com', address: '12 Briarwood Ave', interests: 'Hotels' },
    { name: 'Name Name', email: 'karthikvemun345@gmail.com', address: '12 Briarwood Ave', interests: 'Hotels' },
    { name: 'Name Name', email: 'karthikvemun345@gmail.com', address: '12 Briarwood Ave', interests: 'Hotels' },
    { name: 'Name Name', email: 'karthikvemun345@gmail.com', address: '12 Briarwood Ave', interests: 'Hotels' },
    { name: 'Name Name', email: 'karthikvemun345@gmail.com', address: '12 Briarwood Ave', interests: 'Hotels' },
];


export const DonorOutreach = () => {
    
    const generalMessages=[
        {
            type:"Twitter",
            content:"The way in which SEBI has treated Jane Street is unacceptable, and I am fighting to ensure the right of Americans to engage in free commerce.",
        },
        {
            type:"Email",
            content: "As you are likely aware, India has banned Jane Street for leveraging a legal arbitrage opportunity. I'm aware that this is a topic which is interesting to you, and if you have want to discuss further, you can reply to this email or reach me at [email]."
        },
        {
            type:"Facebook",
            content:"Hearing today that India banned an American comapny from their stock exchange. This cannot be allowed. MAGA!!!1!1!!"
        }
    ]

    const targetedMessages=[
        {
            type:"Facebook",
            content:"Hearing today that India banned an American comapny from their stock exchange. This cannot be allowed. MAGA!!!1!1!!",
        },
        {
            type:"Email",
            content: "As you are likely aware, India has banned Jane Street for leveraging a legal arbitrage opportunity. I'm aware that this is a topic which is interesting to you, and if you have want to discuss further, you can reply to this email or reach me at [email]."
        },
        {
            type:"X(Twitter)",
            content:"The way in which SEBI has treated Jane Street is unacceptable, and I am fighting to ensure the right of Americans to engage in free commerce.#Finance"
        }
    ]

    interface DonorTag {
    type: string;
    potentialDonors: number;
}

 const DonorTags: DonorTag[] = [
    { type: 'Finance', potentialDonors: 12 },
    { type: 'Securities', potentialDonors: 3 },
    { type: 'Trade', potentialDonors: 2 },
];

    const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
        .then(() => {

            console.log('Content copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
};

    return (
        <div className="p-4 space-y-8">
            <section>
                <h2 className="font-semibold text-lg mb-4">General Messaging</h2>

                <div className="bg-gray-200 rounded-lg p-6 md:p-8">
                    <h3 className="text-md font-semibold text-gray-800 mb-4">
                        Exalt Recommended Messaging • 21 potential donors
                    </h3>
                    <hr className="border-gray-400 mb-6" />

                    <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
                        {generalMessages.map((message, index) => (
                            <div
                                key={index}
                                className="relative flex-none w-60 p-4 bg-white rounded-lg shadow-md border border-gray-200"
                            >
                                <h4 className="font-bold text-md mb-2 text-gray-800">{message.type}</h4>
                                <hr className="border-gray-200 mb-3" />
                                <p className="text-sm text-gray-700 whitespace-pre-line break-words">
                                    {message.content}
                                </p>


                                    <button
                                        onClick={() => copyToClipboard(message.content)}
                                        className="absolute bottom-4 right-4 text-gray-500 text-lg cursor-pointer hover:text-gray-700"
                                        title="Copy to clipboard"
                                    >
                                        <FiCopy className="text-md" />
                                    </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
           <section>
                <h2 className="font-semibold text-lg mb-4">Targeted Messaging</h2>

                <div className="flex flex-wrap gap-2 pb-5"> 
            {DonorTags.map((tag, index) => (
                <button
                    key={index} 
                    className="
                        inline-flex items-center justify-center
                        rounded-full          
                        px-4 py-2             
                        text-sm font-medium   
                        bg-gray-200           
                        text-gray-800         
                        border border-gray-400 
                        hover:bg-gray-300     
                        transition-colors     
                    "
                >
                    {tag.type} • {tag.potentialDonors} potential donors
                </button>
            ))}
        </div>

                <div className="bg-gray-200 rounded-lg p-6 md:p-8">
                    <h3 className="text-md font-semibold text-gray-800 mb-4">
                        Exalt Finance Messaging • 21 potential donors
                    </h3>
                    <hr className="border-gray-400 mb-6" />

                    <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
                        {targetedMessages.map((message, index) => (
                            <div
                                key={index}
                                className="relative flex-none w-60 p-4 bg-white rounded-lg shadow-md border border-gray-200"
                            >
                                <h4 className="font-bold text-md mb-2 text-gray-800">{message.type}</h4>
                                <hr className="border-gray-200 mb-3" />
                                <p className="text-sm text-gray-700 whitespace-pre-line break-words">
                                    {message.content}
                                </p>


                                    <button
                                        onClick={() => copyToClipboard(message.content)}
                                        className="absolute bottom-4 right-4 text-gray-500 text-lg cursor-pointer hover:text-gray-700"
                                        title="Copy to clipboard"
                                    >
                                        <FiCopy className="text-md" />
                                    </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="overflow-auto rounded-lg border border-gray-200 bg-gray-200 p-5">
                <h2 className='font-semibold text-lg mb-4' >Potential Donors:</h2>
                <table className="table-auto w-full text-xs border-collapse p-10">
                    <thead>
                        <tr className="bg-gray-200 text-black">
                            <th className="px-3 py-2 text-left">Name</th>
                            <th className="px-3 py-2 text-left">Email</th>
                            <th className="px-3 py-2 text-left">Address</th>
                            <th className="px-3 py-2 text-left">Interests</ th>
                            <th className="px-3 py-2 text-left">Send email</ th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {potentialDonorsData.map((donor, idx) => (
                            <tr key={idx} className="border-t border-gray-300">
                                <td className="px-3 py-2">{donor.name}</td>
                                <td className="blur-sm px-3 py-2">random@random.random</td>
                                <td className="px-3 py-2">{donor.address}</td>
                                <td className="px-3 py-2">{donor.interests}</td>
                                <td className="px-3 py-2"><HiOutlineMail size={20} className="text-blue-500" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};