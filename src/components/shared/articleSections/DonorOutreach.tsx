import { FiCopy } from "react-icons/fi";
import { FaTwitter, FaFacebook } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

interface Donor {
  name: string;
  email: string;
  address: string;
  interests: string;
}

const potentialDonorsData: Donor[] = [
  {
    name: "Name Name",
    email: "karthikvemun345@gmail.com",
    address: "12 Briarwood Ave",
    interests: "Hotels",
  },
  {
    name: "Name Name",
    email: "karthikvemun345@gmail.com",
    address: "12 Briarwood Ave",
    interests: "Hotels",
  },
  {
    name: "Name Name",
    email: "karthikvemun345@gmail.com",
    address: "12 Briarwood Ave",
    interests: "Hotels",
  },
  {
    name: "Name Name",
    email: "karthikvemun345@gmail.com",
    address: "12 Briarwood Ave",
    interests: "Hotels",
  },
];

export const DonorOutreach = () => {
  const generalMessages = [
    {
      type: "Twitter",
      content:
        "The way in which SEBI has treated Jane Street is unacceptable, and I am fighting to ensure the right of Americans to engage in free commerce.",
    },
    {
      type: "Email",
      content:
        "As you are likely aware, India has banned Jane Street for leveraging a legal arbitrage opportunity. I'm aware that this is a topic which is interesting to you, and if you want to discuss further, you can reply to this email or reach me at [email].",
    },
    {
      type: "Facebook",
      content:
        "Hearing today that India banned an American company from their stock exchange. This cannot be allowed. MAGA!!!",
    },
  ];

  const targetedMessages = [
    {
      type: "Facebook",
      content:
        "Hearing today that India banned an American company from their stock exchange. This cannot be allowed. MAGA!!!",
    },
    {
      type: "Email",
      content:
        "As you are likely aware, India has banned Jane Street for leveraging a legal arbitrage opportunity. I'm aware that this is a topic which is interesting to you, and if you want to discuss further, you can reply to this email or reach me at [email].",
    },
    {
      type: "Twitter",
      content:
        "The way in which SEBI has treated Jane Street is unacceptable, and I am fighting to ensure the right of Americans to engage in free commerce. #Finance",
    },
  ];

  interface DonorTag {
    type: string;
    potentialDonors: number;
  }

  const DonorTags: DonorTag[] = [
    { type: "Finance", potentialDonors: 12 },
    { type: "Securities", potentialDonors: 3 },
    { type: "Trade", potentialDonors: 2 },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => console.log("Content copied to clipboard!"))
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case "Twitter":
        return <FaTwitter className="text-sky-500" />;
      case "Facebook":
        return <FaFacebook className="text-indigo-600" />;
      case "Email":
        return <SiGmail className="text-red-600" />;
      default:
        return null;
    }
  };

  const renderMessageCards = (messages: typeof generalMessages) => (
    <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
      {messages.map((message, index) => (
        <div
          key={index}
          className="relative flex-none w-72 p-5 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <div className="flex items-center gap-2 mb-3">
            {renderIcon(message.type)}
            <h4 className="font-semibold text-gray-800 text-md">{message.type}</h4>
          </div>
          <p className="text-sm text-gray-700 whitespace-pre-line break-words mb-10">
            {message.content}
          </p>

          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button
              onClick={() => copyToClipboard(message.content)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-600 transition"
            >
              <FiCopy className="text-sm" /> Copy
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6 bg-white space-y-10">
      {/* General Messaging */}
      <section>
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <h2 className="font-semibold text-xl text-gray-800">General Messaging</h2>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-sm border border-gray-200">
          <h3 className="text-md font-semibold text-gray-800 mb-4">
            Exalt Recommended Messaging • 21 potential donors
          </h3>
          <hr className="border-gray-200 mb-6" />

          {renderMessageCards(generalMessages)}
        </div>
      </section>

      {/* Targeted Messaging */}
      <section>
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <h2 className="font-semibold text-xl text-gray-800">Targeted Messaging</h2>
        </div>

        <div className="flex flex-wrap gap-2 pb-5">
          {DonorTags.map((tag, index) => (
            <button
              key={index}
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 transition"
            >
              {tag.type} • {tag.potentialDonors} potential donors
            </button>
          ))}
        </div>

        <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-sm border border-gray-200">
          <h3 className="text-md font-semibold text-gray-800 mb-4">
            Exalt Finance Messaging • 21 potential donors
          </h3>
          <hr className="border-gray-200 mb-6" />

          {renderMessageCards(targetedMessages)}
        </div>
      </section>

      {/* Potential Donors */}
      <section>
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <h2 className="font-semibold text-xl text-gray-800">Potential Donors</h2>
        </div>

        <div className="overflow-auto rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <table className="table-auto w-full text-sm border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-gray-800">
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">Address</th>
                <th className="px-3 py-2 text-left">Interests</th>
                <th className="px-3 py-2 text-left">Send email</th>
              </tr>
            </thead>
            <tbody>
              {potentialDonorsData.map((donor, idx) => (
                <tr
                  key={idx}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} border-t border-gray-200 hover:bg-gray-100 transition`}
                >
                  <td className="px-3 py-2">{donor.name}</td>
                  <td className="blur-sm px-3 py-2">random@random.random</td>
                  <td className="blur-sm px-3 py-2">{donor.address}</td>
                  <td className="px-3 py-2">{donor.interests}</td>
                  <td className="px-3 py-2">
                    <SiGmail size={20} className="text-red-600 cursor-pointer hover:text-red-700" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
