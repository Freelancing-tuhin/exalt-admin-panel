import { useEffect } from "react";
import { Layout } from "../layout/Layout";
import Navbar from "../../components/main/navbar/Navbar";
import { DonorTracker } from "../../components/main/coumunicationTracker/donorTracker/DonorTracker";
// import { BasicHeader } from "../../components/shared/basicHedaer/BasicHeader";
import { useHeading } from "../../contexts/headingContext";
import { GradientHeader } from "../../components/shared/gradientHeader/GradientHedaer";
import { OutReachReport } from "../../components/main/coumunicationTracker/report/OutReachReport";
import { LocationTrack } from "../../components/main/coumunicationTracker/locationTrack/LocationTrack";

export const PreviosOutreach = () => {
  const { setHeading } = useHeading();

  useEffect(() => {
    setHeading("Previous Outreach");
  }, [setHeading]);

  return (
    <Layout>
      <Navbar />
      <div className="p-6 space-y-6">
        {/* Header with gradient background */}
        <GradientHeader title="Communication Tracker" />
        {/* <BasicHeader /> */}

        {/* Content Sections */}
        <DonorTracker />
        <LocationTrack />
        <OutReachReport />
      </div>
    </Layout>
  );
};
