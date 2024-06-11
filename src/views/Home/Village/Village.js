import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommonDataTable from '../Common/DataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';

const Village = () => {
    const [VillageData, setVillageData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showAddVillageForm, setShowAddVillageForm] = useState(false);
    const [selectedVillage, setSelectedVillage] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteVillageId, setDeleteVillageId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchVillageData = async () => {
        try {
            setLoading(true);

            const VillagesResponse = await axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetVillage');
            const VillageData = VillagesResponse.data.data;

            const modifiedData = VillageData.map(item => ({
                id: item.id,
                name: item.name,
                description: item.description || '-'
            }));

            setVillageData(modifiedData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Village data:', error);
            setLoading(false);
        }
    };

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        fetchVillageData();
    }, []);

    const refreshVillageList = () => {
        fetchVillageData();
    };

    const handleAddClick = () => {
        setShowAddVillageForm(true);
    };

    const handleEditClick = (VillageItem) => {
        setSelectedVillage(VillageItem);
        setShowEditForm(true);
    };

    const handleDeleteClick = (VillageItemId) => {
        setDeleteVillageId(VillageItemId);
        setShowDeleteConfirmation(true);
    };

    const handleDeleteConfirmation = async () => {
        try {
            await deleteVillage(deleteVillageId);
            setVillageData(VillageData.filter(item => item.id !== deleteVillageId));
            setShowDeleteConfirmation(false);
            setSuccessMessage('Village deleted successfully');
        } catch (error) {
            console.error('Error deleting Village:', error);
        }
    };

    const deleteVillage = async (VillageId) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/DeleteVillage?id=${VillageId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Error deleting Village:', error);
            throw error;
        }
    };

    const columns = [
        { title: 'Name', data: 'name' },
        { title: 'Description', data: 'description' },
        {
            title: 'Actions',
            render: (item) => (
                <div className="d-flex">
                    <button className="btn me-1" style={{ height: '20px', width: '20px', fontSize: '1rem', border: 'none' }} onClick={() => handleEditClick(item)} title="Update">
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="btn me-1" style={{ height: '20px', width: '20px', fontSize: '1rem', border: 'none' }} onClick={() => handleDeleteClick(item.id)} title="Delete">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            )
        }
    ];

    const AddForm = ({ onClose, refreshVillageData }) => {
        const [formData, setFormData] = useState({
            name: '',
            lookup_state_id: ''
        });

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const token = localStorage.getItem('adminToken');
                await axios.post('https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/AddVillage', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                refreshVillageData();
                setSuccessMessage('Village added successfully');
                onClose();
            } catch (error) {
                console.error('Error adding Village:', error);
            }
        };

        return (
            <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', fontFamily: 'San Francisco, Helvetica, Arial, sans-serif' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Village</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <input type="text" className="form-control" name="description" value={formData.description} onChange={handleInputChange} required />
                                </div>

                                <button type="submit" className="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const UpdateForm = ({ VillageId, VillageItem, onClose }) => {
        const [formData, setFormData] = useState({
            id: VillageId,
            name: VillageItem.name || '',
            description: VillageItem.description
        });

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleUpdate = async (e) => {
            e.preventDefault();
            try {
                const token = localStorage.getItem('adminToken');
                await axios.put(`https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/UpdateVillage?id=${VillageId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                refreshVillageList();
                setSuccessMessage('Village updated successfully');
                onClose();
            } catch (error) {
                console.error('Error updating Village:', error);
            }
        };

        return (
            <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', fontFamily: 'San Francisco, Helvetica, Arial, sans-serif' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Update Village</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <input type="text" className="form-control" name="description" value={formData.description} onChange={handleInputChange} required />
                                </div>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const dummyRenderRow = (rowData, rowIndex) => {
        return (
            <tr key={rowIndex}>
                {columns.map((column, columnIndex) => (
                    <td key={columnIndex}>
                        {column.render ? column.render(rowData) : rowData[column.data]}
                    </td>
                ))}
            </tr>
        );
    };

    return (
        <div className="container" style={{ fontFamily: 'San Francisco, Helvetica, Arial, sans-serif' }}>
            <h2>Village</h2>
            <div className="position-relative">
                <button className="btn btn-primary" onClick={handleAddClick} style={{ position: 'absolute', top: '-45px', right: 0, zIndex: 1 }}>Add Village</button>
                {successMessage && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {successMessage}
                        <button type="button" className="btn-close" onClick={() => setSuccessMessage('')}></button>
                    </div>
                )}
                {loading ? (
                    <div style={{
                        position: 'fixed',
                        top: '52%',
                        left: '57%',
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                        textAlign: 'center'
                    }}>
                        <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '2em' }} />
                    </div>
                ) : (
                    <CommonDataTable
                        data={VillageData}
                        columns={columns}
                        className="table-bordered"
                        entitiesPerPageOptions={[5, 10, 25, 50, 100]}
                        defaultEntitiesPerPage={10}
                        renderRow={dummyRenderRow}
                    />
                )}
                {showAddVillageForm && (
                    <AddForm
                        onClose={() => setShowAddVillageForm(false)}
                        refreshVillageData={refreshVillageList}
                    />
                )}
                {showEditForm && selectedVillage && (
                    <UpdateForm
                        VillageId={selectedVillage.id}
                        VillageItem={selectedVillage}
                        onClose={() => setShowEditForm(false)}
                    />
                )}
                {showDeleteConfirmation && deleteVillageId && (
                    <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', fontFamily: 'San Francisco, Helvetica, Arial, sans-serif' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Deletion</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowDeleteConfirmation(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete this {VillageData.find(P => P.id === deleteVillageId).name}?</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteConfirmation}>Delete</button>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Village;
