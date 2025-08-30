/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import Navbar from "../../../components/main/navbar/Navbar";
import { Layout } from "../../layout/Layout";
import BannerUploadPage from "../../../components/shared/bannerUpload/BannerUpload";
import TitleTabs from "../../../components/writer/articles/TitleTabs";
import WritingTab from "../../../components/writer/articles/WritingTab";
import UtilsTab from "../../../components/writer/articles/UtilsTab";
import SiteLinksTab from "../../../components/writer/articles/SiteLinksTab";
import FurtherReadingModal from "../../../components/writer/articles/FurtherReadingModal";
import { MdCloudUpload } from "react-icons/md";
import { Pencil } from "lucide-react";
import { FaLink, FaSave } from "react-icons/fa";
import { GrTag } from "react-icons/gr";
import { useHeading } from "../../../contexts/headingContext";

const WriterArticles: React.FC = () => {
  const editorRef = useRef<any>(null);
  const [tagIds, setTagIds] = React.useState<string[]>([]);
  // writerId removed in favor of writerName
  const [tweetIds, setTweetIds] = React.useState<string[]>([]);
  const [donors, setDonors] = React.useState<string[]>([]);
  const [sentimentData, setSentimentData] = React.useState<string>("");
  const [writerName, setWriterName] = React.useState<string>("");
  const [countryTags, setCountryTags] = React.useState<{
    usa?: boolean;
    india?: boolean;
  }>({});
  const [furtherReadings, setFurtherReadings] = React.useState<
    Array<{ title: string; url: string }>
  >([]);
  const [isFurtherModalOpen, setIsFurtherModalOpen] = React.useState(false);
  const [editorContent, setEditorContent] = React.useState<string>("");
  const [activeTab, setActiveTab] = React.useState<
    "writing" | "tags" | "site links"
  >("writing");

  const handleSave = () => {
    const content =
      editorRef.current && editorRef.current.getContent
        ? editorRef.current.getContent()
        : editorContent;
    const payload: any = {
      title,
      data: { content },
      tweet_ids: tweetIds,
      sentiment_graph_data: sentimentData ? JSON.parse(sentimentData) : null,
      donors: donors.map((d) => ({ name: d })),
      writer_name: writerName,
      tagIds,
      further_readings: furtherReadings,
      country_tags: countryTags,
    };
    // frontend-only: log entire payload
    console.log("ARTICLE_PAYLOAD", payload);
    alert("Payload logged to console");
  };
  const [title, setTitle] = React.useState("");
  const { setHeading } = useHeading();

  useEffect(() => {
    setHeading("Write Article");
  }, [setHeading]);

  return (
    <Layout>
      <Navbar back={true} />
      <div
        style={{
          maxWidth: "100%",
          margin: "0 auto",
          padding: 24,
          display: "flex",
          gap: 32,
        }}
      >
        <div style={{ flex: 2 }}>
          <TitleTabs
            title={title}
            setTitle={setTitle}
            activeTab={activeTab}
            setActiveTab={(s: string) => setActiveTab(s as any)}
            inputIcon={Pencil}
            tabIcons={[Pencil, GrTag, FaLink]}
          />

          {activeTab === "writing" ? (
            <WritingTab
              editorRef={editorRef}
              content={editorContent}
              setContent={setEditorContent}
            />
          ) : activeTab === "tags" ? (
            <UtilsTab
              tagIds={tagIds}
              setTagIds={setTagIds}
              writerName={writerName}
              setWriterName={setWriterName}
              donors={donors}
              setDonors={setDonors}
              sentimentData={sentimentData}
              setSentimentData={setSentimentData}
              countryTags={countryTags}
              setCountryTags={setCountryTags}
            />
          ) : (
            <SiteLinksTab
              tweetIds={tweetIds}
              setTweetIds={setTweetIds}
              furtherReadings={furtherReadings}
              setFurtherReadings={setFurtherReadings}
              openModal={() => setIsFurtherModalOpen(true)}
            />
          )}
        </div>
        {/* IMAGE BANNER + Save button */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="flex items-center justify-between px-1 gap-2 mt-2 mb-5 ">
            <button
              onClick={handleSave}
              className="px-4 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg w-1/2 flex items-center gap-2 justify-center"
            >
              <FaSave className="text-gray-800 text-lg" />
              Save Draft
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-3 bg-green-600 text-white font-semibold rounded-lg w-1/2 flex items-center gap-2 justify-center"
            >
              <MdCloudUpload className="text-gray-50 text-lg" />
              Publish
            </button>
          </div>
          <BannerUploadPage />
        </div>
      </div>

      {/* Further reading modal (frontend-only) */}
      <FurtherReadingModal
        isOpen={isFurtherModalOpen}
        onClose={() => setIsFurtherModalOpen(false)}
        onAdd={(item) => {
          setFurtherReadings((s) => [...s, item]);
          setIsFurtherModalOpen(false);
        }}
      />
    </Layout>
  );
};

export default WriterArticles;
