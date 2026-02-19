import React, { useRef } from "react";
import classNames from "classnames";

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

    return (
        <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-bold text-gray-700">Logo</h3>

            <div className="flex items-center gap-4">
                {logo && (
                    <div className="w-16 h-16 relative border border-gray-300 rounded overflow-hidden bg-white">
                        <img src={logo} alt="Logo Preview" className="w-full h-full object-contain" />
                        <button
                            onClick={() => onLogoUpload(undefined)}
                            className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs rounded-bl"
                        >
                            ×
                        </button>
                    </div>
                )}

                <input
                    type="file"
                    accept="image/png, image/jpeg, image/svg+xml"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />

                <button
                    className={classNames(
                        "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                        "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={() => fileInputRef.current?.click()}
                >
                    {logo ? "Change Logo" : "Upload Logo"}
                </button>
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
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-deshranNavy"
                />
            </div>
        </div>
    );
};
