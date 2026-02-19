import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import aroviqLogo from "../assets/sid_logos/Aroviq_Logo.png";
import deshranLogo from "../assets/sid_logos/Deshran_logo.png";
import qivoraLogo from "../assets/sid_logos/QIVORA_Logo.png";
import { PasswordModal } from "./PasswordModal";

interface LogoUploaderProps {
    logo?: string;
    onLogoUpload: (logo: string | undefined) => void;
    logoSize: number;
    onLogoSizeChange: (size: number) => void;
}

export const LogoUploader: React.FC<LogoUploaderProps> = ({
    logo,
    onLogoUpload,
    logoSize,
    onLogoSizeChange,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Internal State
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingLogo, setPendingLogo] = useState<string | null>(null);

    // Check session storage on mount
    useEffect(() => {
        const unlocked = sessionStorage.getItem("sid_logos_unlocked") === "true";
        setIsUnlocked(unlocked);
    }, []);

    const handleUnlock = () => {
        sessionStorage.setItem("sid_logos_unlocked", "true");
        setIsUnlocked(true);
        if (pendingLogo) {
            onLogoUpload(pendingLogo);
            setPendingLogo(null);
        }
    };

    const handleInternalLogoClick = (logoSrc: string) => {
        if (isUnlocked) {
            onLogoUpload(logoSrc);
        } else {
            setPendingLogo(logoSrc);
            setIsModalOpen(true);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    onLogoUpload(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Internal logos config
    const internalLogos = [
        { src: aroviqLogo, alt: "Aroviq" },
        { src: deshranLogo, alt: "DeshRan" },
        { src: qivoraLogo, alt: "Qivora" }
    ];

    return (
        <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 relative">
            <h3 className="font-bold text-gray-700">Logo</h3>

            {/* Password Modal */}
            <PasswordModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setPendingLogo(null); }}
                onUnlock={handleUnlock}
            />

            <div className="flex flex-col gap-4">
                {/* Current Logo Preview & Upload */}
                <div className="flex items-center gap-4">
                    {logo ? (
                        <div className="w-16 h-16 relative border border-gray-300 rounded overflow-hidden bg-white shrink-0">
                            <img src={logo} alt="Logo Preview" className="w-full h-full object-contain p-1" />
                            <button
                                onClick={() => onLogoUpload(undefined)}
                                className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs rounded-bl hover:bg-red-600 transition-colors"
                                title="Remove Logo"
                            >
                                ×
                            </button>
                        </div>
                    ) : null}

                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/svg+xml"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    <button
                        className={classNames(
                            "px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                            "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                        )}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {logo ? "Upload Different File" : "Upload File"}
                    </button>
                </div>

                {/* Internal Logos Section */}
                <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Internal Assets
                        </label>
                        <span className="text-xs" title={isUnlocked ? "Unlocked" : "Locked"}>
                            {isUnlocked ? "🔓" : "🔒"}
                        </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {internalLogos.map((item) => (
                            <button
                                key={item.alt}
                                onClick={() => handleInternalLogoClick(item.src)}
                                className={classNames(
                                    "aspect-square rounded-lg border p-1 bg-white hover:border-indigo-400 transition-all shadow-sm flex items-center justify-center relative overflow-hidden group",
                                    logo === item.src ? "ring-2 ring-indigo-500 border-indigo-500" : "border-gray-200"
                                )}
                                title={isUnlocked ? `Select ${item.alt}` : "Restricted Access"}
                            >
                                <img src={item.src} alt={item.alt} className="w-full h-full object-contain" />

                                {!isUnlocked && (
                                    <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/20 flex items-center justify-center backdrop-blur-[1px] transition-all">
                                        <span className="text-sm shadow-sm">🔒</span>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    Logo Size ({logoSize}%)
                </label>
                <input
                    type="range"
                    min="10"
                    max="50"
                    value={logoSize}
                    onChange={(e) => onLogoSizeChange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
            </div>
        </div>
    );
};
