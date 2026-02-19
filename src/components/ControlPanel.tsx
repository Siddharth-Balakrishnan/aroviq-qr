import React from "react";
import classNames from "classnames";
import type { QRConfig } from "../types/qrTypes";
import { ThemeSelector } from "./ThemeSelector";
import { LogoUploader } from "./LogoUploader";
import { ColorPicker } from "./ColorPicker";
import aroviqHeaderLogo from "../assets/Aroviq_Logo.png";

interface ControlPanelProps {
    config: QRConfig;
    setConfig: React.Dispatch<React.SetStateAction<QRConfig>>;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ config, setConfig }) => {
    const handleChange = (key: keyof QRConfig, value: any) => {
        setConfig((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="flex flex-col gap-8 p-6 lg:p-8 bg-white/50 backdrop-blur-xl border-r border-gray-100 h-full overflow-y-auto no-scrollbar">
            <div className="flex items-center gap-3 mb-2">
                <img
                    src={aroviqHeaderLogo}
                    alt="Aroviq Logo"
                    className="h-8 w-auto object-contain"
                />
                <div>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">
                        Aroviq
                        <span className="text-indigo-600 ml-1">Studio</span>
                    </h1>
                    <p className="text-xs text-gray-400 font-medium">Professional QR Generator</p>
                </div>
            </div>

            {/* Theme Selector */}
            <section>
                <ThemeSelector
                    currentTheme=""
                    onSelectTheme={(newConfig) => setConfig((prev) => ({ ...prev, ...newConfig }))}
                />
            </section>

            {/* Data Input */}
            <section>
                <label className="block text-sm font-bold text-gray-700 mb-3">Content</label>
                <textarea
                    value={config.data}
                    onChange={(e) => handleChange("data", e.target.value)}
                    className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm min-h-[120px] shadow-sm resize-none"
                    placeholder="Enter website URL or text..."
                />
            </section>

            {/* Styles */}
            <section className="space-y-6">
                <h3 className="uppercase text-xs font-bold text-gray-400 tracking-wider">Appearance</h3>

                {/* Colors */}
                <div className="grid grid-cols-1 gap-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">

                    <ColorPicker
                        label="Foreground Color"
                        value={config.fgColor}
                        onChange={(color) => handleChange("fgColor", color)}
                    />

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-medium text-gray-500">Background Color</label>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={config.bgColor === "transparent"}
                                    onChange={(e) => handleChange("bgColor", e.target.checked ? "transparent" : "#ffffff")}
                                    className="sr-only peer"
                                />
                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                                <span className="ml-2 text-xs font-medium text-gray-600">Transparent</span>
                            </label>
                        </div>

                        {config.bgColor !== "transparent" && (
                            <ColorPicker
                                label=""
                                value={config.bgColor}
                                onChange={(color) => handleChange("bgColor", color)}
                            />
                        )}
                    </div>
                </div>

                {/* Dot Style */}
                <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-500">Dot Style</label>
                    <div className="grid grid-cols-4 gap-2">
                        {["square", "rounded", "extra-rounded", "dots"].map((type) => (
                            <button
                                key={type}
                                onClick={() => handleChange("dotType", type)}
                                className={classNames(
                                    "py-2 px-1 rounded-lg text-[10px] font-medium transition-all border",
                                    config.dotType === type
                                        ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm"
                                        : "bg-white border-gray-100 text-gray-600 hover:border-gray-300"
                                )}
                            >
                                {type.replace("-", " ")}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Corner Style */}
                <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-500">Corners</label>
                    <div className="grid grid-cols-3 gap-2">
                        {["square", "extra-rounded", "dot"].map((type) => (
                            <button
                                key={type}
                                onClick={() => handleChange("cornerSquareType", type)}
                                className={classNames(
                                    "py-2 px-1 rounded-lg text-[10px] font-medium transition-all border",
                                    config.cornerSquareType === type
                                        ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm"
                                        : "bg-white border-gray-100 text-gray-600 hover:border-gray-300"
                                )}
                            >
                                {type.replace("-", " ")}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dimensions */}
            <section className="space-y-4">
                <h3 className="uppercase text-xs font-bold text-gray-400 tracking-wider">Dimensions</h3>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-4">
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-xs font-medium text-gray-600">Size (Preview)</span>
                            <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{config.size}px</span>
                        </div>
                        <input
                            type="range"
                            min="200"
                            max="1000"
                            step="10"
                            value={config.size}
                            onChange={(e) => handleChange("size", Number(e.target.value))}
                            className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-xs font-medium text-gray-600">Quiet Zone</span>
                            <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{config.margin}px</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={config.margin}
                            onChange={(e) => handleChange("margin", Number(e.target.value))}
                            className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500"
                        />
                    </div>
                </div>
            </section>

            {/* Logo */}
            <section>
                <LogoUploader
                    logo={config.logo}
                    onLogoUpload={(logo) => handleChange("logo", logo)}
                    logoSize={config.logoSize}
                    onLogoSizeChange={(size) => handleChange("logoSize", size)}
                />
            </section>

            <div className="h-10 text-center text-xs text-gray-400 mt-auto pt-8">
                © 2026 Aroviq Studio
            </div>

        </div>
    );
};
