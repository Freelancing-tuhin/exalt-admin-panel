import { useEffect } from "react";
import { Layout } from "../layout/Layout";
import Navbar from "../../components/main/navbar/Navbar";
import { DonorTracker } from "../../components/main/coumunicationTracker/donorTracker/DonorTracker";
import { LocationTrack } from "../../components/main/coumunicationTracker/locationTrack/LocationTrack";
// import { BasicHeader } from "../../components/shared/basicHedaer/BasicHeader";
import { useHeading } from "../../contexts/headingContext";
import { GradientHeader } from "../../components/shared/gradientHeader/GradientHedaer";

export const PreviosOutreach = () => {
  const { setHeading } = useHeading();

  useEffect(() => {
    setHeading("Previous Outreach");
  }, [setHeading]);

  return (
    <Layout>
      <Navbar />
      <div className="px-6 py-4 space-y-6">
        {/* Header with gradient background */}
        <GradientHeader />
        {/* <BasicHeader /> */}

        {/* Content Sections */}
        <DonorTracker />
        <LocationTrack />
      </div>
    </Layout>
  );
};
