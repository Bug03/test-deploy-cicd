"use client"

import { useState, FormEvent } from "react"
import { TodoFormData } from "@/types"
import { Button, Input, Textarea, Select } from "@/components/ui"

interface TodoFormProps {
    onSubmit: (data: TodoFormData) => void
    initialData?: Partial<TodoFormData>
    submitLabel?: string
    onCancel?: () => void
}

const PRIORITY_OPTIONS = [
    { value: "low", label: "🟢 Thấp" },
    { value: "medium", label: "🟡 Trung bình" },
    { value: "high", label: "🔴 Cao" },
]

const CATEGORY_OPTIONS = [
    { value: "work", label: "💼 Công việc" },
    { value: "personal", label: "👤 Cá nhân" },
    { value: "shopping", label: "🛒 Mua sắm" },
    { value: "health", label: "🏥 Sức khỏe" },
    { value: "education", label: "📚 Học tập" },
    { value: "other", label: "🔧 Khác" },
]

export function TodoForm({ onSubmit, initialData, submitLabel = "Thêm Todo", onCancel }: TodoFormProps) {
    const [formData, setFormData] = useState<TodoFormData>({
        title: initialData?.title || "",
        description: initialData?.description || "",
        priority: initialData?.priority || "medium",
        category: initialData?.category || "personal",
        dueDate: initialData?.dueDate || "",
    })

    const [errors, setErrors] = useState<Partial<Record<keyof TodoFormData, string>>>({})

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof TodoFormData, string>> = {}

        if (!formData.title.trim()) {
            newErrors.title = "Tiêu đề không được để trống"
        } else if (formData.title.trim().length < 3) {
            newErrors.title = "Tiêu đề phải có ít nhất 3 ký tự"
        }

        if (formData.dueDate) {
            const dueDate = new Date(formData.dueDate)
            const today = new Date()
            today.setHours(0, 0, 0, 0)

            if (dueDate < today) {
                newErrors.dueDate = "Ngày hết hạn không thể là ngày trong quá khứ"
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            onSubmit({
                ...formData,
                title: formData.title.trim(),
                description: formData.description?.trim(),
                category: formData.category || "personal",
            })

            // Reset form nếu không phải edit mode
            if (!initialData) {
                setFormData({
                    title: "",
                    description: "",
                    priority: "medium",
                    category: "personal",
                    dueDate: "",
                })
            }
        }
    }

    const handleChange =
        (field: keyof TodoFormData) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            setFormData((prev) => ({
                ...prev,
                [field]: e.target.value,
            }))

            // Clear error khi user bắt đầu sửa
            if (errors[field]) {
                setErrors((prev) => ({
                    ...prev,
                    [field]: undefined,
                }))
            }
        }

    return (
        <div className="w-full max-w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <Input
                        label="Tên Nhiệm Vụ"
                        placeholder="Nhập tên nhiệm vụ..."
                        value={formData.title}
                        onChange={handleChange("title")}
                        error={errors.title}
                        variant="cosmic"
                    />

                    <Textarea
                        label="Mô Tả Chi Tiết"
                        placeholder="Mô tả chi tiết nhiệm vụ (tùy chọn)..."
                        value={formData.description}
                        onChange={handleChange("description")}
                        error={errors.description}
                        rows={3}
                        variant="cosmic"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                            label="Độ Ưu Tiên"
                            value={formData.priority}
                            onChange={handleChange("priority")}
                            options={PRIORITY_OPTIONS}
                            error={errors.priority}
                            variant="cosmic"
                        />

                        <Select
                            label="Danh Mục"
                            value={formData.category}
                            onChange={handleChange("category")}
                            options={CATEGORY_OPTIONS}
                            error={errors.category}
                            variant="cosmic"
                        />
                    </div>

                    <Input
                        label="Ngày Hết Hạn"
                        type="date"
                        value={formData.dueDate}
                        onChange={handleChange("dueDate")}
                        error={errors.dueDate}
                        variant="cosmic"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t-2 border-slate-600">
                    <Button type="submit" variant="cosmic" className="flex-1 text-base font-bold" glow={true}>
                        <span className="mr-2">🚀</span>
                        {submitLabel}
                    </Button>
                    {onCancel && (
                        <Button type="button" variant="secondary" onClick={onCancel} className="sm:w-auto">
                            <span className="mr-2">❌</span>
                            Hủy
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}
