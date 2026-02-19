import React, { useState } from "react";

interface PasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUnlock: () => void;
}

export const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onUnlock }) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "5145") {
            onUnlock();
            setError(false);
            setPassword("");
            onClose();
        } else {
            setError(true);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 transform transition-all scale-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Restricted Area</h3>
                <p className="text-sm text-gray-500 mb-4">
                    Please enter the authorization PIN to access internal assets.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(false);
                            }}
                            placeholder="Enter PIN"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all ${error
                                    ? "border-red-500 focus:ring-red-200"
                                    : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-500"
                                }`}
                            autoFocus
                        />
                        {error && (
                            <p className="text-xs text-red-500 mt-1 font-medium">Incorrect PIN</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
                        >
                            Unlock Access
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
