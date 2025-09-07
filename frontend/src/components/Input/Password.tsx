import { useState, type ChangeEvent } from "react";
import {
    RiCheckboxCircleFill, RiCloseCircleFill,
    RiEyeLine, RiEyeOffLine
} from "react-icons/ri";

interface PasswordInputProps {
    disabled: boolean,
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    useValidation?: boolean;
}

interface ValidationItemProps {
    isValid: boolean;
    label: string;
}

const PasswordInput = ({
    disabled,
    value,
    onChange,
    useValidation = false,
}: PasswordInputProps) => {
    const [hidePassword, setHidePassword] = useState(true);

    const validations = {
        length: value.length >= 6,
        lowercase: /[a-z]/.test(value),
        uppercase: /[A-Z]/.test(value),
        number: /[0-9]/.test(value),
        specialChar: /[#@$%&]/.test(value),
        noSpaces: /^\S*$/.test(value),
    };

    const ValidationItem = ({ isValid, label }: ValidationItemProps) => (
        <div className="flex items-center gap-2 text-xs text-gray-700">
            {isValid ? (
                <RiCheckboxCircleFill className="text-green-500" />
            ) : (
                <RiCloseCircleFill className="text-red-500" />
            )}
            <span>{label}</span>
        </div>
    );

    return (
        <div>
            <label className="block mb-1 font-medium text-gray-800">Password</label>
            <div className="flex items-center focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 border border-gray-300 rounded-md">
                <input
                    disabled={disabled}
                    type={hidePassword ? "password" : "text"}
                    name="password"
                    value={value}
                    onChange={onChange}
                    className="w-full px-3 py-2 text-sm rounded-md outline-0 disabled:text-gray-500"
                />
                <button
                    type="button"
                    className="px-3 py-2 border-l border-gray-300 cursor-pointer"
                    onClick={() => setHidePassword(!hidePassword)}
                >
                    {hidePassword ? <RiEyeLine /> : <RiEyeOffLine />}
                </button>
            </div>

            {(value && useValidation && !disabled) && (
                <div className="mt-2 space-y-1">
                    <ValidationItem
                        isValid={validations.length}
                        label="At least 6 characters"
                    />
                    <ValidationItem
                        isValid={validations.lowercase}
                        label="At least one lowercase letter"
                    />
                    <ValidationItem
                        isValid={validations.uppercase}
                        label="At least one uppercase letter"
                    />
                    <ValidationItem
                        isValid={validations.number}
                        label="At least one number"
                    />
                    <ValidationItem
                        isValid={validations.specialChar}
                        label="At least one special character (# @ $ % &)"
                    />
                    <ValidationItem
                        isValid={validations.noSpaces}
                        label="No spaces"
                    />
                </div>
            )}
        </div>
    )
}

export default PasswordInput