import React, { useEffect, useState } from 'react';
import WorkflowApprovalForm from './component/WorkflowApprovalForm';
import axios from 'axios';
import './index.css';

const WorkflowApproval = () => {
    const [showModal, setShowModal] = useState(false);
    const [workflowApprovals, setWorkflowApprovals] = useState([]);
    const [needApprovalData, setNeedApproval] = useState([]);
    const [activeTab, setActiveTab] = useState('workflow'); // Menambahkan state untuk tab aktif

    const toggleModal = () => {
        setShowModal(prevShowModal => !prevShowModal);
    };

    const fetchWorkFlowApproval = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/workflow`);
            if (response && response.data) {
                const dataFilter = response.data.filter((el => el.Type !== 'Total Amount >='));                
                const dataFilterAm = response.data.filter((el => el.Type === 'Total Amount >='));

                setWorkflowApprovals(dataFilter);
                setNeedApproval(dataFilterAm);
            }
        } catch (error) {
            console.error('Error fetchWorkFlowApproval info:', error);
            alert('Failed to fetch fetchWorkFlowApproval.');
        }
    };

    const handleSubmit = async (data) => {
        try {
            const body = {
                Modul_id: data.id,
                createdBy: data.Nik,
                Amount: data.Value,
                Nik: data.Nik,
                Name: data.Name,
                Position: data.Position,
                Level: data.Value
            };
            await axios.post('http://localhost:3000/workflow/need-approval', body);
            alert('Success');
        } catch (error) {
            alert('Failed to Submit.');
        }
    };

    useEffect(() => {
        fetchWorkFlowApproval();
    }, []);

    return (
        <div className="workflow-approval-container">
            <h1>OCS</h1>

            {/* Tab Navigation */}
            <div className="tabs">
                <button 
                    onClick={() => setActiveTab('workflow')} 
                    className={activeTab === 'workflow' ? 'active-tab' : ''}
                >
                    Workflow
                </button>
                <button 
                    onClick={() => setActiveTab('approval')} 
                    className={activeTab === 'approval' ? 'active-tab' : ''}
                >
                    Approval
                </button>
            </div>

            {/* Tampilkan tabel berdasarkan tab yang aktif dengan border dan shadow */}
            <div className="tab-container">
                {activeTab === 'workflow' ? (
                    <div className="active-tab-content">
                        <h2>Workflow List</h2>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Modul</th>
                                    <th scope="col" className="px-6 py-3">Type</th>
                                    <th scope="col" className="px-6 py-3">Value/Level</th>
                                    <th scope="col" className="px-6 py-3">Nik</th>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Position</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                    <th>
                                        <button onClick={toggleModal} className="add-button">+</button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {workflowApprovals && workflowApprovals.map((data) => (
                                    <tr key={data.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {data?.Modul}
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="active-tab-content">
                        <h2>Approval List</h2>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Modul</th>
                                    <th scope="col" className="px-6 py-3">Type</th>
                                    <th scope="col" className="px-6 py-3">Value/Level</th>
                                    <th scope="col" className="px-6 py-3">Nik</th>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Position</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {needApprovalData && needApprovalData.map((data) => (
                                    <tr key={data.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {data?.Modul}
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="modal">
                    <WorkflowApprovalForm show={showModal} onClose={() => {
                        setShowModal(false);
                        fetchWorkFlowApproval();
                    }} />
                </div>
            )}
        </div>
    );
};

export default WorkflowApproval;
