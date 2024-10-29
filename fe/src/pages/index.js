import React, { useEffect, useState } from 'react';
import WorkflowApprovalForm from './component/WorkflowApprovalForm';
import axios from 'axios';
import './index.css';

const WorkflowApproval = () => {
    const [showModal, setShowModal] = useState(false);
    const [workflowApprovals, setWorkflowApprovals] = useState([]);
    const [needApprovalData, setNeedApproval] = useState([])

    const toggleModal = () => {
        setShowModal(prevShowModal => !prevShowModal);
    };

    const fetchWorkFlowApproval = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/workflow`);
            if (response && response.data) {
              
                const dataFilter = response.data.filter((el=> el.Type !== 'Total Amount >='))
                
                const dataFilterAm = response.data.filter((el=> el.Type == 'Total Amount >='))

                setWorkflowApprovals(dataFilter)
                setNeedApproval(dataFilterAm)
            }
        } catch (error) {
            console.error('Error fetchWorkFlowApproval info:', error);
            alert('Failed to fetch fetchWorkFlowApproval.');
        }
    };

    const handleSubmit = async (data) => {
        try {
            const body = {
                Modul_id : data.id,
                createdBy : data.Nik,
                Amount : data.Value,
                Nik: data.Nik,
                Name: data.Name,
                Position: data.Position,
                Level : data.Value
            }
            const response = await axios.post('http://localhost:3000/workflow/need-approval', body)
            alert('Success');
        } catch (error) {
            alert('Failed to Submit.');
        }
    }

    useEffect(() => {
        fetchWorkFlowApproval()
    }, [])

    return (
        <div className="workflow-approval-container">
            <h1>Workflow Approval List</h1>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Modul
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Value/Level
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Nik
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Position
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                            <th>
                                <button onClick={toggleModal} className="add-button">+</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            workflowApprovals && workflowApprovals.length > 0 &&
                            workflowApprovals.map((data) => (
                                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {data?.Modul}
                                    </th>
                                    <td class="px-6 py-4">
                                        {data?.Type}
                                    </td>
                                    <td class="px-6 py-4">
                                        {data?.Value}
                                    </td>
                                    <td class="px-6 py-4">
                                        {data.Nik}
                                    </td>
                                    <td class="px-6 py-4">
                                        {data.Name}
                                    </td>
                                    <td class="px-6 py-4">
                                        {data.Email}
                                    </td>
                                    <td class="px-6 py-4">
                                        {data.Position}
                                    </td>
                                    
                                    <td class="px-6 py-4">
                                        <button onClick={(e)=>{
                                            e.preventDefault()
                                        }} class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>

            <h1>Need Approval List</h1>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Modul
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Value/Level
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Nik
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Position
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            needApprovalData && needApprovalData.length > 0 &&
                            needApprovalData.map((data) => (
                                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {data?.Modul}
                                    </th>
                                    <td class="px-6 py-4">
                                        {data?.Type}
                                    </td>
                                    <td class="px-6 py-4">
                                        {data?.Value}
                                    </td>
                                    <td class="px-6 py-4">
                                        {data.Nik}
                                    </td>
                                    <td class="px-6 py-4">
                                        {data.Name}
                                    </td>
                                    <td class="px-6 py-4">
                                        {data.Email}
                                    </td>
                                    <td class="px-6 py-4">
                                        {data.Position}
                                    </td>

                                    <td class="px-6 py-4">
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            handleSubmit(data)
                                        }} class="font-medium text-red-600 dark:text-red-500 hover:underline">Need Approval</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal">
                    <WorkflowApprovalForm show={showModal} onClose={() => {
                        setShowModal(false)
                        fetchWorkFlowApproval()
                    }} />
                </div>
            )}
        </div>
    );
};

export default WorkflowApproval;
