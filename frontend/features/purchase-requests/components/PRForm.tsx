"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

// ✅ schema
const schema = z.object({
    title: z.string().min(1, "Title is required"),
    priority: z.string(),
    department: z.string().min(1, "Select department"),
    items: z.array(
        z.object({
            name: z.string().min(1, "Item name required"),
            qty: z.number().min(1, "Qty must be at least 1"),
            price: z.number().optional(),
        })
    ),
});

type FormData = z.infer<typeof schema>;

const departments = [
    "Cloud Operations",
    "Software Development",
    "DevOps / Platform",
    "Cybersecurity",
    "Data & Analytics",
];

interface Props {
    onSubmit: (data: any) => void;
    onClose: () => void;
}

export default function PRForm({ onSubmit }: Props) {
    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            priority: "Normal",
            department: "",
            items: [{ name: "", qty: 1, price: undefined }],
        },
    });

    const { fields, append } = useFieldArray({
        control,
        name: "items",
    });

    const items = watch("items") || [];

    const total = items.reduce(
        (sum, i) => sum + (i?.qty || 0) * (i?.price || 0),
        0
    );

    const submitHandler = (data: FormData, status: "draft" | "submitted") => {
        onSubmit({
            name: data.title,
            department: data.department,
            requester: "You",
            amount: total,
            status,
        });
    };

    return (
        <div className="space-y-6">

            {/* BASIC */}
            <div>
                <p className="text-sm font-semibold mb-3">
                    Basic Information
                </p>

                <div className="grid md:grid-cols-2 gap-4">

                    <div>
                        <Input
                            label="Purchase Request Title"
                            {...register("title")}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-xs">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* priority */}
                    <div>
                        <label className="text-sm mb-1 block">
                            Priority Level
                        </label>

                        <div className="flex gap-2">
                            {["Normal", "Urgent", "Critical"].map((p) => (
                                <button
                                    type="button"
                                    key={p}
                                    onClick={() => setValue("priority", p)}
                                    className={`px-3 py-2 rounded-md text-sm
                    ${watch("priority") === p
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-100"
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* ✅ Department ครึ่ง (แก้ถูกจริง) */}
            <div>
                <p className="text-sm font-semibold mb-3">
                    Department
                </p>

                {/* 🔥 KEY: ต้องใช้ grid */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <select
                            className="border rounded-lg p-2 w-full"
                            {...register("department")}
                        >
                            <option value="">Select Department</option>
                            {departments.map((d) => (
                                <option key={d}>{d}</option>
                            ))}
                        </select>

                        {errors.department && (
                            <p className="text-red-500 text-xs">
                                {errors.department.message}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* LINE ITEM */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-semibold">
                        Line Item
                    </p>

                    <Button
                        type="button"
                        onClick={() =>
                            append({ name: "", qty: 1, price: undefined })
                        }
                    >
                        + Add Item
                    </Button>
                </div>

                <div className="border rounded-lg overflow-x-auto">
                    <table className="w-full text-sm">

                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-2 text-left">Description</th>
                                <th>Qty</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {fields.map((field, i) => (
                                <tr key={field.id} className="border-t">

                                    <td className="p-2">
                                        <Input
                                            {...register(`items.${i}.name`)}
                                        />
                                    </td>

                                    <td>
                                        <Input
                                            type="number"
                                            {...register(`items.${i}.qty`, {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </td>

                                    <td>
                                        <Input
                                            type="number"
                                            placeholder="Enter price"
                                            {...register(`items.${i}.price`, {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </td>

                                    <td className="px-2">
                                        {((items[i]?.qty || 0) * (items[i]?.price || 0)).toLocaleString()}
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>

            {/* TOTAL */}
            <div className="text-right">
                <p className="text-sm text-gray-500">
                    Request Total
                </p>

                <p className="text-lg font-semibold text-blue-600">
                    {total.toLocaleString()} THB
                </p>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-2">
                <Button
                    type="button"
                    className="bg-gray-200 text-black"
                    onClick={handleSubmit((data) =>
                        submitHandler(data, "draft")
                    )}
                >
                    Save as Draft
                </Button>

                <Button
                    type="button"
                    onClick={handleSubmit((data) =>
                        submitHandler(data, "submitted")
                    )}
                >
                    Create PR
                </Button>
            </div>

        </div>
    );
}