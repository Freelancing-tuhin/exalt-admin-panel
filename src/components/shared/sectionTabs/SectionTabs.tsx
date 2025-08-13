// src/components/shared/IconTabs.tsx
import React, { useRef, useEffect, useState, ElementType } from "react";

interface TabItem {
  label: string;
  icon?: ElementType;
  badge?: number | string;
  disabled?: boolean;
}

type SizeKey = "sm" | "md" | "lg";
type ColorSchemeKey = keyof typeof COLOR_SCHEMES;
type VariantKey = keyof typeof VARIANT_STYLES;

interface IconTabsProps {
  tabs: TabItem[];
  current: string;
  onChange: (label: string) => void;
  variant?: VariantKey;
  size?: SizeKey;
  fullWidth?: boolean;
  colorScheme?: ColorSchemeKey;
}

const SIZE_CLASSES: Record<SizeKey, string> = {
  sm: "px-3 py-2 text-lg gap-1.5",
  md: "px-4 py-2.5 text-lg gap-2",
  lg: "px-6 py-3 text-md gap-2.5",
};

const ICON_SIZES: Record<SizeKey, string> = {
  sm: "w-4 h-4",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

const COLOR_SCHEMES = {
  blue: {
    active: "text-blue-600 bg-blue-200 border-blue-600",
    inactive: "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50",
    underline: "bg-blue-600",
    badge: "bg-blue-100 text-blue-800",
  },
  purple: {
    active: "text-purple-600 bg-purple-50 border-purple-600",
    inactive: "text-gray-600 hover:text-purple-600 hover:bg-purple-50/50",
    underline: "bg-purple-600",
    badge: "bg-purple-100 text-purple-800",
  },
  green: {
    active: "text-green-600 bg-green-50 border-green-600",
    inactive: "text-gray-600 hover:text-green-600 hover:bg-green-50/50",
    underline: "bg-green-600",
    badge: "bg-green-100 text-green-800",
  },
  red: {
    active: "text-red-600 bg-red-50 border-red-600",
    inactive: "text-gray-600 hover:text-red-600 hover:bg-red-50/50",
    underline: "bg-red-600",
    badge: "bg-red-100 text-red-800",
  },
  gray: {
    active: "text-gray-900 bg-gray-100 border-gray-900",
    inactive: "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
    underline: "bg-gray-900",
    badge: "bg-gray-100 text-gray-800",
  },
} as const;

const VARIANT_STYLES = {
  underline: {
    container: "border-b border-gray-200 bg-white",
    indicator: (c: (typeof COLOR_SCHEMES)[ColorSchemeKey]) =>
      `absolute bottom-0 h-0.5 ${c.underline} rounded-full`,
  },
  pills: {
    container: "gap-2 p-1 bg-gray-100 rounded-xl",
    indicator: () => `absolute bg-white shadow-lg rounded-lg`,
  },
  contained: {
    container: "gap-1 bg-white border border-gray-200 rounded-lg p-1",
    indicator: (c: (typeof COLOR_SCHEMES)[ColorSchemeKey]) =>
      `absolute ${c.active
        .split(" ")
        .find((s) => s.startsWith("bg-"))} border-2 ${c.active
        .split(" ")
        .find((s) => s.startsWith("border-"))} rounded-md`,
  },
  minimal: {
    container: "gap-6",
    indicator: (c: (typeof COLOR_SCHEMES)[ColorSchemeKey]) =>
      `absolute bottom-0 h-0.5 ${c.underline} rounded-full`,
  },
} as const;

export const IconTabs: React.FC<IconTabsProps> = ({
  tabs,
  current,
  onChange,
  variant = "underline",
  size = "md",
  fullWidth = false,
  colorScheme = "blue",
}) => {
  const colors = COLOR_SCHEMES[colorScheme];
  const styles = VARIANT_STYLES[variant];

  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const pos = () => {
      const idx = tabs.findIndex((t) => t.label === current);
      const el = tabsRef.current[idx];
      if (el && containerRef.current) {
        const crect = containerRef.current.getBoundingClientRect();
        const trect = el.getBoundingClientRect();
        setActive({ width: trect.width, left: trect.left - crect.left });
      }
    };
    setTimeout(pos, 10);
    window.addEventListener("resize", pos);
    return () => window.removeEventListener("resize", pos);
  }, [current, tabs]);

  return (
    <div className="mb-6">
      <div
        ref={containerRef}
        className={`${fullWidth ? "flex" : "flex flex-wrap"} ${
          styles.container
        } relative`}
      >
        <div
          className={`${styles.indicator(colors)} transition-all duration-300`}
          style={{
            width: active.width,
            transform: `translateX(${active.left}px)`,
          }}
        />
        {tabs.map(({ label, icon: Icon, badge, disabled }, i) => {
          const isActive = current === label;
          return (
            <button
              key={i}
              ref={(el) => (tabsRef.current[i] = el)}
              onClick={() => !disabled && onChange(label)}
              disabled={disabled}
              className={`relative flex items-center ${
                SIZE_CLASSES[size]
              } font-medium ${fullWidth ? "flex-1 justify-center" : ""} ${
                disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              } ${isActive ? colors.active.split(" ")[0] : colors.inactive}`}
            >
              {Icon && (
                <Icon
                  className={`${ICON_SIZES[size]} ${
                    isActive ? "scale-110" : ""
                  } transition-transform`}
                />
              )}
              <span className="relative">
                {label}
                {badge && (
                  <span
                    className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center text-lg font-bold rounded-full ${colors.badge} transform translate-x-1/2 -translate-y-1/2`}
                  >
                    {badge}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
