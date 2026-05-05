import { useFieldArray, type Control, type FieldErrors } from "react-hook-form";
import type { ProductsFormValues } from "../../../lib/validators";
import React, { useState } from "react";

interface Props {
    control: Control<ProductsFormValues>;
    errors: FieldErrors;
}

export const FeatureInput = ({ control, errors }: Props) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "features",
    });

    const [newFeatures, setNewFeatures] = useState("");

    const handleAddFeatures = () => {
        if (newFeatures.trim() === "") {
            return;
        }
        append({ value: newFeatures });
        setNewFeatures("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddFeatures();
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-xs font-bold tracking-tight capitalize text-slate-900">
                Caracteristicas:
            </label>

            <ul className="space-y-3 pl-5">
                {fields.map((field, index) => (
                    <li key={index} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <div className="bg-slate-500 h-2 w-2 rounded-full" />

                            <span className="text-sm text-slate-600 font-medium">
                                {field.value}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-sm -text-red-500 font-bold pr-2 hover:scale-110"
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>

            <input
                type="text"
                placeholder="256GB de alamcenamiento"
                className={`border border-gray-300 py-1.5 text-sm rounded-md px-3 font-medium tracking-tighter text-slate-700 outline-none
                focus:outline-none ${errors.features ? "border-red-500" : ""}`}
                autoComplete="off"
                value={newFeatures}
                onChange={(e) => setNewFeatures(e.target.value)}
                onKeyDown={handleKeyDown}
            ></input>

            {errors.features && (
                <p className="text-red-500 text-xs mt-1">
                    {typeof errors.features.message === "string"
                        ? errors.features.message
                        : "Invalid input"}
                </p>
            )}
        </div>
    );
};
