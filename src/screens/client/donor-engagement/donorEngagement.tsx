import { useState, useEffect } from "react";
import { Layout } from "../../layout/Layout";
import { FiSearch, FiSend } from "react-icons/fi";
import Navbar from "../../../components/main/navbar/Navbar";
import { DonorSearch } from "./donorSearch/DonorSearch";
import { IconTabs } from "../../../components/shared/sectionTabs/SectionTabs";
import { GradientHeader } from "../../../components/shared/gradientHeader/GradientHedaer";
import { DonorOutreach } from "./donorOutreach/DonorOutreach";

// ---- Component ----
function DonorEngagement() {
  const [activeTab, setActiveTab] = useState("Donor Outreach");
  const [showDonorsPopup, setShowDonorsPopup] = useState<string | null>(null);

  const articlesData = [
    { title: "Healthcare Drive", date: "12 Jan 2023", donors: 45, trend: +12 },
    {
      title: "Education Fundraiser",
      date: "05 Feb 2023",
      donors: 30,
      trend: -8,
    },
    {
      title: "Environment Campaign",
      date: "22 Mar 2023",
      donors: 72,
      trend: +20,
    },
  ];
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
      <div className=" ">
        <Navbar />
        <div className="p-6 space-y-10">
          <GradientHeader title="Donor Engagement" />
          <IconTabs
            tabs={[
              { label: "Donor Outreach", icon: FiSend },
              { label: "Donor Search", icon: FiSearch },
            ]}
            current={activeTab}
            onChange={(label: string) => setActiveTab(label)}
          />

          {/* Tab Content */}
          {activeTab === "Donor Search" && <DonorSearch />}

          {activeTab === "Donor Outreach" && (
            <DonorOutreach articlesData={articlesData} />
          )}
        </div>
        {/* Tab System */}
      </div>
    </Layout>
  );
}

export default DonorEngagement;
