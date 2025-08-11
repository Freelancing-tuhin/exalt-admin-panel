import { useEffect } from "react";
import { Layout } from "../layout/Layout";
import Navbar from "../../components/main/navbar/Navbar";
import { useHeading } from "../../contexts/headingContext";

export const Holidays = () => {
  const { setHeading } = useHeading();

  useEffect(() => {
    setHeading("Holiday");
  }, [setHeading]);
  return (
    <Layout>
      <Navbar />
    </Layout>
  );
};
