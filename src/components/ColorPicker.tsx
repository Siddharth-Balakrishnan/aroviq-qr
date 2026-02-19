import React, { useState, useEffect } from "react";
import classNames from "classnames";

interface ColorPickerProps {
    label: string;
    value: string;
    onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
    label,
    value,
    onChange,
}) => {
    const [hexInput, setHexInput] = useState(value);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Keep local input in sync with external value if valid and not actively typing
        if (/^#[0-9A-Fa-f]{6}$/i.test(value)) {
            setHexInput(value.toUpperCase());
            setError(false);
        }
    }, [value]);

    const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setHexInput(input);

        // Basic validation
        // Allow partial typing, but validate only when it looks complete or on blur
        if (/^#?([0-9A-Fa-f]{3}){1,2}$/.test(input)) {
            let normalized = input.startsWith("#") ? input : `#${input}`;
            if (normalized.length === 4) {
                // Expand short hex (e.g. #ABC -> #AABBCC)
                normalized = `#${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}${normalized[3]}${normalized[3]}`;
            }

            onChange(normalized);
            setError(false);
        } else {
            // Just don't update parent if invalid, let user type
            // Only set error if length is sufficient but content is wrong
            if (input.length >= 7 && !/^#[0-9A-Fa-f]{6}$/i.test(input)) {
                setError(true);
            } else {
                setError(false);
            }
        }
    };

    const handleColorWheelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const color = e.target.value;
        setHexInput(color.toUpperCase());
        onChange(color);
        setError(false);
    };

    const handleBlur = () => {
        // On blur, reset to valid value if invalid
        if (!/^#([0-9A-Fa-f]{3}){1,2}$/.test(hexInput)) {
            setHexInput(value.toUpperCase());
            setError(false);
        } else {
            // Normalize
            let normalized = hexInput.startsWith("#") ? hexInput : `#${hexInput}`;
            if (normalized.length === 4) {
                normalized = `#${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}${normalized[3]}${normalized[3]}`;
            }
            setHexInput(normalized.toUpperCase());
            onChange(normalized);
        }
    }

    return (
        <div>
            {label && (
                <label className="block text-xs font-medium text-gray-500 mb-2">
                    {label}
                </label>
            )}
            <div className="flex items-center gap-3">
                {/* Color Wheel Preview */}
                <div
                    className="w-10 h-10 rounded-lg shadow-sm border border-gray-200 overflow-hidden relative cursor-pointer group flex-shrink-0"
                    style={{ backgroundColor: value }}
                >
                    <input
                        type="color"
                        value={value}
                        onChange={handleColorWheelChange}
                        className="absolute -top-2 -left-2 w-16 h-16 opacity-0 cursor-pointer"
                    />
                </div>

                {/* Hex Input */}
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400 text-sm">#</span>
                    </div>
                    <input
                        type="text"
                        value={hexInput.replace(/^#/, "")} // Strip leading # for display to match user instruction examples
                        onChange={handleHexChange}
                        onBlur={handleBlur}
                        maxLength={7}
                        className={classNames(
                            "w-full pl-7 pr-3 py-2 text-sm font-mono border rounded-lg focus:ring-2 focus:outline-none transition-all uppercase placeholder-gray-300",
                            error
                                ? "border-red-300 focus:ring-red-100 focus:border-red-400 text-red-600"
                                : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-500 text-gray-700"
                        )}
                        placeholder="000000"
                    />
                </div>
            </div>
            {error && <p className="text-[10px] text-red-500 mt-1 pl-1">Invalid HEX code</p>}
        </div>
    );
};
