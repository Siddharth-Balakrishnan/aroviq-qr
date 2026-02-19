import React from "react";
import classNames from "classnames";
import { PRESET_THEMES } from "../themes/presets";
import type { QRConfig } from "../types/qrTypes";

interface ThemeSelectorProps {
    currentTheme: string;
    onSelectTheme: (config: Partial<QRConfig>) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
    currentTheme,
    onSelectTheme,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-bold text-gray-700">Themes</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
                {PRESET_THEMES.map((theme) => (
                    <button
                        key={theme.name}
                        className={classNames(
                            "px-3 py-1.5 rounded-md border text-sm transition-all whitespace-nowrap",
                            currentTheme === theme.name
                                ? "bg-deshranNavy text-white border-deshranNavy"
                                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                        )}
                        onClick={() => onSelectTheme(theme.config)}
                    >
                        {theme.name}
                    </button>
                ))}
            </div>
        </div>
    );
};
