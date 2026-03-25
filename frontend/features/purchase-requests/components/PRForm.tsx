"use client";

import { useState } from "react";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

interface Item {
    name: string;
    qty: number;
    price: number;
}

export default function PRForm() {
    const [title, setTitle] = useState("");
    const [costCenter, setCostCenter] = useState("");
    const [items, setItems] = useState<Item[]>([]);

    // 🟢 add item
    const addItem = () => {
        setItems([...items, { name: "", qty: 1, price: 0 }]);
    };

    // 🟢 update item
    const updateItem = (
        index: number,
        field: keyof Item,
        value: string | number
    ) => {
        const newItems = [...items];
        (newItems[index][field] as any) = value;
        setItems(newItems);
    };

    // 🟢 remove item
    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

    return (
        <div className="space-y-6">
            {/* ================= BASIC INFO ================= */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h3 className="font-semibold">Basic Information</h3>

                {/* 📱 responsive grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="PR Title"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <Input
                        label="Cost Center"
                        placeholder="Enter cost center"
                        value={costCenter}
                        onChange={(e) => setCostCenter(e.target.value)}
                    />
                </div>
            </div>

            {/* ================= ITEMS ================= */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Items</h3>

                    <Button onClick={addItem}>+ Add Item</Button>
                </div>

                {/* 📱 table responsive */}
                <div className="border rounded-lg overflow-x-auto">
                    <table className="min-w-[600px] w-full text-sm">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="p-2">Item</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((item, i) => (
                                <tr key={i} className="border-t">
                                    <td className="p-2 min-w-[200px]">
                                        <Input
                                            placeholder="Item name"
                                            value={item.name}
                                            onChange={(e) =>
                                                updateItem(i, "name", e.target.value)
                                            }
                                        />
                                    </td>

                                    <td className="min-w-[100px]">
                                        <Input
                                            type="number"
                                            value={item.qty}
                                            onChange={(e) =>
                                                updateItem(i, "qty", Number(e.target.value))
                                            }
                                        />
                                    </td>

                                    <td className="min-w-[120px]">
                                        <Input
                                            type="number"
                                            value={item.price}
                                            onChange={(e) =>
                                                updateItem(i, "price", Number(e.target.value))
                                            }
                                        />
                                    </td>

                                    <td className="px-2 whitespace-nowrap">
                                        {(item.qty * item.price).toLocaleString()}
                                    </td>

                                    <td className="px-2">
                                        <button
                                            onClick={() => removeItem(i)}
                                            className="text-red-500 text-sm"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ================= SUMMARY ================= */}
            <div className="flex justify-end">
                <div className="bg-gray-50 px-4 py-3 rounded-lg text-right">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-lg font-semibold">
                        {total.toLocaleString()} THB
                    </p>
                </div>
            </div>
        </div>
    );
}