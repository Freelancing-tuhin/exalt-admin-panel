import { Mail, Send, Database, BarChart3, CheckCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ActionCardProps {
  data?: {
    action_items?: string[];
    [key: string]: unknown;
  };
}

interface Card {
  name: string;
  icon: LucideIcon;
  action: string;
  platform: string;
  endpoint: string;
  description: string;
}

export const ActionCard = ({ data }: ActionCardProps) => {
  // Check if data has action_items and use them, otherwise use default cards
  const getCards = (): Card[] => {
    if (data && data.action_items && Array.isArray(data.action_items)) {
      return data.action_items.map((item: string, index: number) => ({
        name: `Action ${index + 1}`,
        icon: CheckCircle,
        action: `Action ${index + 1}`,
        platform: "custom",
        endpoint: "#",
        description: item,
      }));
    }

    // Default cards
    return [
      {
        name: "Gmail API",
        icon: Mail,
        action: "Send Donor Outreach",
        platform: "email",
        endpoint: "https://gmail.googleapis.com/gmail/v1",
        description: "Automated donor email campaigns",
      },
      {
        name: "Mailchimp",
        icon: Send,
        action: "Create Campaign",
        platform: "email",
        endpoint: "https://us1.api.mailchimp.com/3.0",
        description: "Bulk email marketing campaigns",
      },
      {
        name: "NationBuilder CRM",
        icon: Database,
        action: "Export Targets",
        platform: "crm",
        endpoint: "https://[nation].nationbuilder.com/api/v1",
        description: "Voter and donor database",
      },
      {
        name: "Analytics Dashboard",
        icon: BarChart3,
        action: "Track Engagement",
        platform: "analytics",
        endpoint: "/api/analytics",
        description: "Campaign performance metrics",
      },
    ];
  };

  const cards = getCards();

  return (
    <div className="grid grid-cols-2 gap-2">
      {cards.map((card: Card, i: number) => {
        return (
          <div
            key={i}
            className="group w-full rounded-lg bg-gray-100 border border-gray-200 p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] 
            hover:shadow-[0_-8px_0px_0px_#bfbfbf]"
          >
            {/* <p className="text-black text-md font-semibold">{card.name}</p> */}
            <p className="text-black text-sm font-semibold">{card.action}</p>
            <p className="text-gray-500 text-xs mt-1">{card.description}</p>

            {/* <Icon
              size={36}
              className="group-hover:opacity-100 absolute right-[10%] top-[50%] translate-y-[-50%] opacity-20 transition group-hover:scale-110 duration-300"
            /> */}
          </div>
        );
      })}
    </div>
  );
};
