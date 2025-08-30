import React from "react";
import { Pencil } from "lucide-react";
import { IconTabs } from "../../../components/shared/sectionTabs/SectionTabs";
import { PiArticleNyTimesFill } from "react-icons/pi";
type IconComp = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type Props = {
  title: string;
  setTitle: (t: string) => void;
  activeTab: string;
  setActiveTab: (s: string) => void;
  /** optional icon to render next to the title input */
  inputIcon?: IconComp;
  /** optional icons for tabs in order: [writing, utils, site links] */
  tabIcons?: IconComp[];
};

const TitleTabs: React.FC<Props> = ({
  title,
  setTitle,
  activeTab,
  setActiveTab,
  tabIcons,
}) => {
  const defaultTabs = ["writing", "tags", "site links"];

  const tabs = defaultTabs.map((label, idx) => ({
    label,
    icon: tabIcons && tabIcons[idx] ? tabIcons[idx] : Pencil,
  }));

  return (
    <div className="w-full mb-8">
      <div className="flex items-center gap-2 rounded-2xl border border-gray-300 bg-white shadow-sm px-4 py-3 focus-within:ring-2 focus-within:ring-blue-400">
        <PiArticleNyTimesFill className="w-8 h-8 text-gray-500" />
        <input
          type="text"
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-xl outline-none placeholder-gray-400"
        />
      </div>
      <div className="mb-4"></div>
      <IconTabs
        tabs={tabs}
        current={activeTab}
        onChange={(label: string) => setActiveTab(label)}
      />
    </div>
  );
};

export default TitleTabs;
