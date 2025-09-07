import { type ChangeEvent } from "react";
import { RiCheckboxCircleFill, RiCloseCircleFill } from "react-icons/ri";

interface EmailInputProps {
    disabled: boolean;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    useValidation?: boolean;
}

interface ValidationItemProps {
    isValid: boolean;
    label: string;
}

const isEmailValid = (email: string): boolean => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
};

const EmailInput = ({
    disabled,
    value,
    onChange,
    useValidation = false,
}: EmailInputProps) => {
    const validations = {
        notEmpty: value.trim().length > 0,
        validFormat: isEmailValid(value),
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
            <label className="block mb-1 font-medium text-gray-800">Email</label>
            <div className="flex items-center focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 border border-gray-300 rounded-md">
                <input
                    disabled={disabled}
                    type="email"
                    name="email"
                    value={value}
                    onChange={onChange}
                    className="w-full px-3 py-2 text-sm rounded-md outline-0 disabled:text-gray-500"
                />
            </div>

            {(value && useValidation && !disabled) && (
                <div className="mt-2 space-y-1">
                    <ValidationItem
                        isValid={validations.notEmpty}
                        label="Email cannot be empty"
                    />
                    <ValidationItem
                        isValid={validations.validFormat}
                        label="Valid email format (e.g. shubham@example.com)"
                    />
                    <ValidationItem
                        isValid={validations.noSpaces}
                        label="No spaces allowed"
                    />
                </div>
            )}
        </div>
    )
}

export default EmailInput