import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkflowApprovalForm = ({ show, onClose }) => {
    const [formData, setFormData] = useState({
        modul: 0,
        value: '',
        amount: '',
        createdBy: '',
    });

    const [approver, setApprover] = useState([]);
    const [employee, setEmployee] = useState([
        { name: "Pilih Nama", value: '' },
    ])

    const dataModul = [
        { name: "Pilih Modul", id: 0 },
        { name: 'Keuangan', id: 1 },
        { name: 'Stock', id: 2 },
        { name: 'Barang', id: 3 },
        { name: 'Pendaftaran', id: 4 }
    ];

    const dataSelect = [
        { name: 'Pilih Type', value: '' },
        { name: "Custom", value: "Custom" },
        { name: "HRIS", value: "HRIS" },
        { name: "Total Amount >=", value: "Total Amount >=" },
        { name: "Total Amount >", value: "Total Amount >" },
        { name: "Total Amount <=", value: "Total Amount <=" },
        { name: "Total Amount <", value: "Total Amount <" }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const findModul = dataModul.find(el => el.id == formData.modul);

        const approvalData = {
            Modul: findModul?.name,
            dataApproval: approver.map(a => ({
                Modul_id: formData.modul,
                Value: a.value,
                Amount: a.amount,
                Type: a.type,
                Nik: a.nik,
                Name: a.name,
                Position: a.position,
                Email: a.email
            }))
        };

        try {
            await axios.post('http://localhost:3000/workflow/', approvalData);
            alert('Workflow Approval created successfully!');
            onClose();
        } catch (error) {
            console.error('Error creating Workflow Approval:', error);
            alert('Failed to create Workflow Approval.');
        }
    };

    const fetchApproverInfo = async (index) => {
        const approverData = approver[index];
        if (approverData.nik?.length === 16) {
            try {
                const response = await axios.get(`http://localhost:3000/employess/${approverData.nik}`);
                const { Name, Email, Position } = response.data;

                const updatedApprovers = approver.map((approverData, i) =>
                    i === index ? {
                        ...approverData,
                        name: Name,
                        email: Email,
                        position: Position
                    } : approverData
                );
                setApprover(updatedApprovers);

            } catch (error) {
                console.error('Error fetching approver info:', error);
                alert('Failed to fetch approver info.');
            }
        }
    };

    const fetchEmployee = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/employess/`);
            if (response.data) setEmployee(([
                ...employee,
                ...response.data
            ]))
        } catch (error) {
            console.error('Error fetchEmployee info:', error);
            alert('Failed to fetchEmployeeinfo.');
        }
    }

    useEffect(() => {
        fetchEmployee()
    }, [])

    const handleAddApprover = () => {
        setApprover(prev => [
            ...prev,
            { name: '', email: '', position: '', type: '', nik: '', value: '', amount:'' }
        ]);
    };

    const handleDeleteApprover = (index) => {
        setApprover(prev => prev.filter((_, i) => i !== index));
    };

    const handleApproverChange = (index, field, value) => {
        const updatedApprovers = approver.map((approverData, i) =>
            i === index ? { ...approverData, [field]: value } : approverData
        );
        setApprover(updatedApprovers);
    };

    const renderApproverFields = () => (
        approver.map((approverData, index) => (
            <div key={index} className="mt-4 border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                    <h4 className="text-sm font-semibold">Approver {index + 1}</h4>
                    <button
                        type="button"
                        onClick={() => handleDeleteApprover(index)}
                        className="text-red-500 hover:underline"
                    >
                        Remove
                    </button>
                </div>
                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                        value={approverData.type}
                        onChange={(e) => handleApproverChange(index, 'type', e.target.value)}
                        className="w-full border-gray-300 rounded-lg"
                        required
                    >
                        {dataSelect.map((data) => (
                            <option key={data.value} value={data.value} disabled={data.name === 'Pilih Type'}>
                                {data.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Value/level</label>
                    <input
                        type="text"
                        value={approverData.value}
                        onChange={(e) => handleApproverChange(index, 'value', e.target.value)}
                        onBlur={() => fetchApproverInfo(index)}
                        maxLength={16}
                        className="w-full border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                    <input
                        type="text"
                        value={approverData.amount}
                        onChange={(e) => handleApproverChange(index, 'amount', e.target.value)}
                        onBlur={() => fetchApproverInfo(index)}
                        maxLength={16}
                        className="w-full border-gray-300 rounded-lg"
                        required
                    />
                </div>
                {
                    approverData.type !== 'HRIS' && <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700">NIK</label>
                        <input
                            type="text"
                            value={approverData.nik}
                            onChange={(e) => handleApproverChange(index, 'nik', e.target.value)}
                            onBlur={() => fetchApproverInfo(index)}
                            maxLength={16}
                            className="w-full border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                }
                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Approver Name</label>
                    {
                        approverData.type !== 'HRIS' ? <input
                            type="text"
                            value={approverData.name}
                            onChange={(e) => handleApproverChange(index, 'name', e.target.value)}
                            className="w-full border-gray-300 rounded-lg"
                            required
                        /> :
                            <select
                                value={approverData.name}
                                onChange={(e) => {
                                    // handleApproverChange(index, 'name', e.target.value)
                                    const filter = employee.find(el => el.Name === e.target.value)
                                    if (filter) {
                                        const { Name, Email, Position } = filter
                                        const updatedApprovers = approver.map((approverData, i) =>
                                            i === index ? {
                                                ...approverData,
                                                name: Name,
                                                email: Email,
                                                position: Position
                                            } : approverData
                                        );
                                        setApprover(updatedApprovers);
                                    }

                                }}
                                className="w-full border-gray-300 rounded-lg"
                                required
                            >
                                {employee.map((data) => (
                                    <option key={data.value} value={data.value} disabled={data.value === 'Pilih Nama'}>
                                        {data.Name}
                                    </option>
                                ))}
                            </select>
                    }

                </div>
                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Approver Email</label>
                    <input
                        type="email"
                        value={approverData.email}
                        onChange={(e) => handleApproverChange(index, 'email', e.target.value)}
                        className="w-full border-gray-300 rounded-lg"
                        required
                        disabled={true}
                    />
                </div>
                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Approver Position</label>
                    <input
                        type="text"
                        value={approverData.position}
                        onChange={(e) => handleApproverChange(index, 'position', e.target.value)}
                        className="w-full border-gray-300 rounded-lg"
                        required
                        disabled={true}
                    />
                </div>
            </div>
        ))
    );

    return (
        show && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white rounded-lg shadow-md w-full p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Create Workflow Approval</h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-900"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama Modul</label>
                                <select
                                    name="modul"
                                    value={formData.modul}
                                    onChange={handleInputChange}
                                    className="w-full border-gray-300 rounded-lg"
                                    required
                                >
                                    {dataModul.map((data) => (
                                        <option key={data.id} value={data.id} disabled={data.id === 0}>
                                            {data.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">Approver(s)</label>
                                <button
                                    type="button"
                                    onClick={handleAddApprover}
                                    className="mt-2 text-blue-500 hover:underline"
                                >
                                    + Add Approver
                                </button>
                                <div className="overflow-y-auto h-60 mt-2 space-y-2 border p-4 rounded-lg">
                                    {renderApproverFields()}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                Create Workflow Approval
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default WorkflowApprovalForm;
