"use client";

import { useState } from "react";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

type Item = {
    name: string;
    qty: number;
    price: number;
};

const departments = [
    "Cloud Operations",
    "Software Development",
    "DevOps / Platform",
    "Cybersecurity",
    "Data & Analytics",
];

const budgetCodes = [
    "Software Subscriptions",
    "IT Equipment",
    "Cloud Services",
    "Security Tools",
    "Data Platform",
];

interface Props {
    onSubmit: (data: any) => void;
    onClose: () => void;
}

export default function PRForm({ onSubmit }: Props) {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("Normal");
    const [department, setDepartment] = useState("");
    const [budget, setBudget] = useState("");

    const [items, setItems] = useState<Item[]>([
        { name: "", qty: 1, price: 0 },
    ]);

    const addItem = () => {
        setItems([...items, { name: "", qty: 1, price: 0 }]);
    };

    const updateItem = (
        i: number,
        field: "name" | "qty" | "price",
        value: string | number
    ) => {
        const newItems = [...items];
        (newItems[i] as any)[field] = value;
        setItems(newItems);
    };

    const total = items.reduce(
        (sum, i) => sum + i.qty * i.price,
        0
    );

    const handleCreate = () => {
        onSubmit({
            name: title,
            department,
            requester: "You",
            amount: total,
            status: "submitted",
        });
    };

    const handleDraft = () => {
        onSubmit({
            name: title,
            department,
            requester: "You",
            amount: total,
            status: "draft",
        });
    };

    return (
        <div className="space-y-6">

            {/* 🟢 BASIC */}
            <div>
                <p className="text-sm font-semibold mb-3">
                    Basic Information
                </p>

                <div className="grid md:grid-cols-2 gap-4">

                    <Input
                        label="Purchase Request Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    {/* 🟢 priority */}
                    <div>
                        <label className="text-sm mb-1 block">
                            Priority Level
                        </label>

                        <div className="flex gap-2">
                            {["Normal", "Urgent", "Critical"].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPriority(p)}
                                    className={`px-3 py-2 rounded-md text-sm
                    ${priority === p
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-100"
                                        }
                  `}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* 🟢 BUDGET */}
            <div>
                <p className="text-sm font-semibold mb-3">
                    Budget Assignment
                </p>

                <div className="grid md:grid-cols-2 gap-4">

                    <select
                        className="border rounded-lg p-2"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    >
                        <option>Department</option>
                        {departments.map((d) => (
                            <option key={d}>{d}</option>
                        ))}
                    </select>

                    <select
                        className="border rounded-lg p-2"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    >
                        <option>Budget Code</option>
                        {budgetCodes.map((b) => (
                            <option key={b}>{b}</option>
                        ))}
                    </select>

                </div>
            </div>

            {/* 🟢 LINE ITEM */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-semibold">
                        Line Item
                    </p>

                    <Button onClick={addItem}>
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
                            {items.map((item, i) => (
                                <tr key={i} className="border-t">

                                    <td className="p-2">
                                        <Input
                                            value={item.name}
                                            onChange={(e) =>
                                                updateItem(i, "name", e.target.value)
                                            }
                                        />
                                    </td>

                                    <td>
                                        <Input
                                            type="number"
                                            value={item.qty}
                                            onChange={(e) =>
                                                updateItem(i, "qty", Number(e.target.value))
                                            }
                                        />
                                    </td>

                                    <td>
                                        <Input
                                            type="number"
                                            value={item.price}
                                            onChange={(e) =>
                                                updateItem(i, "price", Number(e.target.value))
                                            }
                                        />
                                    </td>

                                    <td className="px-2">
                                        {(item.qty * item.price).toLocaleString()}
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>

            {/* 🟢 TOTAL */}
            <div className="text-right">
                <p className="text-sm text-gray-500">
                    Request Total
                </p>

                <p className="text-lg font-semibold text-blue-600">
                    {total.toLocaleString()} THB
                </p>
            </div>

            {/* 🟢 FOOTER */}
            <div className="flex justify-end gap-2">
                <Button
                    className="bg-gray-200 text-black"
                    onClick={handleDraft}
                >
                    Save as Draft
                </Button>

                <Button onClick={handleCreate}>
                    Create PR
                </Button>
            </div>

        </div>
    );
}