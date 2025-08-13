import React, { useState, useEffect } from "react";
import { Layout } from "../../layout/Layout";
import { FiSend } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
interface Donor {
  name: string;
  email: string;
  address: string;
  interests: string;
}

const potentialDonorsData: Donor[] = [
  { name: "John Doe", email: "john.doe@example.com", address: "123 Main St", interests: "Finance" },
  { name: "Jane Smith", email: "jane.smith@example.com", address: "456 Oak Ave", interests: "Education" },
  { name: "Alice Johnson", email: "alice.j@example.com", address: "789 Pine Ln", interests: "Healthcare" },
  { name: "Bob Williams", email: "bob.w@example.com", address: "101 Elm Rd", interests: "Technology" },
  { name: "Carol Davis", email: "carol.d@example.com", address: "202 Birch Blvd", interests: "Environment" },
  { name: "David Lee", email: "david.l@example.com", address: "303 Cedar Ct", interests: "Finance" },
  { name: "Emily Chen", email: "emily.c@example.com", address: "404 Maple Dr", interests: "Education" },
  { name: "Sarah Green", email: "sarah.g@example.com", address: "505 Willow Way", interests: "Arts & Culture" },
  { name: "Michael Blue", email: "michael.b@example.com", address: "606 Poplar Pkwy", interests: "Healthcare" },
  { name: "Olivia Red", email: "olivia.r@example.com", address: "707 Spruce St", interests: "Finance" },
  { name: "William Yellow", email: "william.y@example.com", address: "808 Fir Fld", interests: "Technology" },
  { name: "Sophia Purple", email: "sophia.p@example.com", address: "909 Palm Pl", interests: "Environment" },
  { name: "James Orange", email: "james.o@example.com", address: "111 Sycamore Sq", interests: "Education" },
  { name: "Isabella Brown", email: "isabella.b@example.com", address: "222 Redwood Rte", interests: "Human Rights" },
  { name: "Mia Black", email: "mia.b@example.com", address: "333 Cypress Cr", interests: "Community Dev" },
  { name: "Noah White", email: "noah.w@example.com", address: "444 Ash Ave", interests: "Social Justice" },
  { name: "Charlotte Gray", email: "charlotte.g@example.com", address: "555 Beech Blv", interests: "Research" },
  { name: "Liam Pink", email: "liam.p@example.com", address: "666 Alder Aly", interests: "Child Welfare" },
  { name: "Ava Cyan", email: "ava.c@example.com", address: "777 Elm Ct", interests: "Finance" },
  { name: "Ethan Magenta", email: "ethan.m@example.com", address: "888 Oak Ln", interests: "Healthcare" },
  { name: "Amelia Teal", email: "amelia.t@example.com", address: "999 Pine Rd", interests: "Education" },
  { name: "Mason Gold", email: "mason.g@example.com", address: "1010 Birch St", interests: "Technology" },
  { name: "Harper Silver", email: "harper.s@example.com", address: "1111 Cedar Ave", interests: "Environment" },
  { name: "Evelyn Bronze", email: "evelyn.b@example.com", address: "1212 Maple Dr", interests: "Arts & Culture" },
  { name: "Abigail Copper", email: "abigail.c@example.com", address: "1313 Willow Way", interests: "Finance" },
];

interface Article {
  id: string;
  title: string;
  date: string;
  donorCount: number;
  donors: string[];
}

const articlesData: { [key: string]: Article[] } = {
  JUNE: [
    { id: "j1", title: "XYZ", date: "06/10/25", donorCount: 25, donors: potentialDonorsData.slice(0, 25).map((d) => d.name) },
    { id: "j2", title: "XYZ", date: "06/10/25", donorCount: 100, donors: potentialDonorsData.slice(0, 5).map((d) => d.name) },
    { id: "j3", title: "XYZ", date: "06/05/25", donorCount: 85, donors: potentialDonorsData.slice(5, 10).map((d) => d.name) },
    { id: "j4", title: "XYZ", date: "05/05/25", donorCount: 75, donors: potentialDonorsData.slice(10, 15).map((d) => d.name) },
  ],
  MAY: [
    { id: "m1", title: "XYZ", date: "06/10/25", donorCount: 96, donors: potentialDonorsData.slice(15, 20).map((d) => d.name) },
    { id: "m2", title: "XYZ", date: "06/10/25", donorCount: 75, donors: potentialDonorsData.slice(20, 25).map((d) => d.name) },
    { id: "m3", title: "XYZ", date: "06/05/25", donorCount: 185, donors: potentialDonorsData.slice(0, 5).map((d) => d.name) },
    { id: "m4", title: "XYZ", date: "06/05/25", donorCount: 125, donors: potentialDonorsData.slice(5, 10).map((d) => d.name) },
  ],
};

const popularInterests = [
  { name: "Healthcare", count: 12 },
  { name: "Education", count: 3 },
  { name: "Finance", count: 2 },
  { name: "Transportation", count: 8 },
  { name: "Arts & Culture", count: 5 },
  { name: "Technology", count: 10 },
  { name: "Environment", count: 7 },
  { name: "Human Rights", count: 4 },
  { name: "Community Dev", count: 6 },
  { name: "Social Justice", count: 9 },
  { name: "Research", count: 11 },
  { name: "Child Welfare", count: 1 },
];

function DonorEngagement() {
  const [showDonorsPopup, setShowDonorsPopup] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleDonorsClick = (e: React.MouseEvent, articleId: string) => {
    e.stopPropagation();
    if (showDonorsPopup === articleId) {
      setShowDonorsPopup(null);
    } else {
      setShowDonorsPopup(articleId);
      setPopupPosition({ x: e.clientX, y: e.clientY });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isInsidePopup = target.closest(".donor-list-popup");
      const isInsideTrigger = target.closest(".donor-count-trigger");
      if (showDonorsPopup && !isInsidePopup && !isInsideTrigger) {
        setShowDonorsPopup(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDonorsPopup]);

  return (
    <Layout>
      <div className="p-6 space-y-10">
        <h1 className="text-3xl font-bold text-gray-800 border-b border-gray-300 pb-3">
          Donor Engagement
        </h1>

        {/* Donor By Article */}
        <div className="bg-gray-200 rounded-xl p-6 shadow-lg border border-gray-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Donor By Article</h2>
          <section className="bg-gray-100 rounded-lg p-6 md:p-8 relative">
            {Object.entries(articlesData).map(([month, articles]) => (
              <div key={month} className="mb-8 last:mb-0">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 bg-white px-4 py-2 rounded-md inline-block shadow-sm">
                  {month}
                </h3>
                <div className="space-y-4">
                  {articles.map((article) => (
                    <div
                      key={article.id}
                      className="grid grid-cols-3 items-center bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-2 text-sm text-gray-700">
                        <span>Article {article.title}</span>
                        <span className="text-gray-400">•</span>
                        <span>{article.date}</span>
                      </div>
                      <div className="text-sm text-gray-700">
                        <span
                          className="donor-count-trigger font-medium text-blue-600 cursor-pointer hover:underline"
                          onClick={(e) => handleDonorsClick(e, article.id)}
                        >
                          {article.donorCount} donors
                        </span>
                      </div>
                      <div className="relative flex justify-end">
                        <button className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors shadow-sm">
                          Send Outreach <FiSend size={20} className="text-white" />
                        </button>
                        {showDonorsPopup === article.id && (
                          <div
                            className="donor-list-popup absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg p-3 text-sm max-h-48 overflow-y-auto w-48"
                            style={{
                              top: popupPosition.y + 10,
                              left: popupPosition.x - 120,
                              position: "fixed",
                            }}
                          >
                            <h4 className="font-semibold mb-2">Donors:</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {article.donors.slice(0, 5).map((donor, idx) => (
                                <li key={idx}>{donor}</li>
                              ))}
                              {article.donors.length > 5 && (
                                <li className="text-gray-500">
                                  ...and {article.donors.length - 5} more
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Donor By Interest */}
        <div className="bg-gray-200 rounded-xl p-6 shadow-md border border-gray-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Donor By Interest</h2>
          <section className="bg-gray-100 rounded-lg p-6 md:p-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-5">Donors by Popular Interests</h3>
            <div className="flex flex-wrap gap-3 pb-6 mb-6 border-b border-gray-300">
              {popularInterests.map((interest, index) => (
                <button
                  key={index}
                  className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
                >
                  {interest.name} ({interest.count})
                </button>
              ))}
              <div className="flex gap-2 ml-auto mt-2 sm:mt-0">
                <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
                  Quick Search 
                  {/* <FiSearch size={20} className="text-white" /> */}
                </button>
                <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
                  National
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Donors Search</h3>
              <input
                type="text"
                placeholder="Type here..."
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-sm bg-white"
              />
              <p className="text-xs text-gray-600 mt-2">
                Things that will show up: Article connected to donors, interest, topics not included above, etc.
              </p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default DonorEngagement;
