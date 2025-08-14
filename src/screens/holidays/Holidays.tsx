import { useEffect } from "react";
import { Layout } from "../layout/Layout";
import Navbar from "../../components/main/navbar/Navbar";
import { useHeading } from "../../contexts/headingContext";
import { GradientHeader } from "../../components/shared/gradientHeader/GradientHedaer";

export const Holidays = () => {
  const { setHeading } = useHeading();

  useEffect(() => {
    setHeading("Holiday");
  }, [setHeading]);
  return (
    <Layout>
      <Navbar />

      <div className="p-6">
        <GradientHeader title="Holidays" />
      </div>
    </Layout>
  );
};
