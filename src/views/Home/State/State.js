import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommonDataTable from '../Common/DataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';

const State = () => {
  const [StateData, setStateData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddStateForm, setShowAddStateForm] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteStateId, setDeleteStateId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchStateData = async () => {
    try {
      setLoading(true);
      const countriesResponse = await axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetCountries');
      const countriesData = countriesResponse.data.data;
      setCountries(countriesResponse.data.data);
      
      
      const statesResponse = await axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetState');
      const stateData = statesResponse.data.data;
      
      const modifiedData = stateData.map(item => ({
          id: item.id,
          name: item.name,
          lookup_country_id: item.lookup_country_id,
          country_name: countriesData.find(country => country.id === item.lookup_country_id)?.name || 'Unknown'
        }));
        
        setStateData(modifiedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching State data:', error);
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
    fetchStateData();
  }, []);

  const refreshStateList = () => {
    fetchStateData();
  };

  const handleAddClick = () => {
    setShowAddStateForm(true);
  };

  const handleEditClick = (StateItem) => {
    setSelectedState(StateItem);
    setShowEditForm(true);
  };

  const handleDeleteClick = (StateItemId) => {
    setDeleteStateId(StateItemId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await deleteState(deleteStateId);
      setStateData(StateData.filter(item => item.id !== deleteStateId));
      setShowDeleteConfirmation(false);
      setSuccessMessage('State deleted successfully');
    } catch (error) {
      console.error('Error deleting State:', error);
    }
  };

  const deleteState = async (StateId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/DeleteState?id=${StateId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error deleting State:', error);
      throw error;
    }
  };

  const columns = [
    { title: 'Name', data: 'name' },
    { title: 'Country', data: 'country_name' },
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

  const AddForm = ({ onClose, refreshStateData }) => {
    const [formData, setFormData] = useState({
      name: '',
      lookup_country_id: ''
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('adminToken');
        await axios.post('https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/AddState', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        refreshStateData();
        setSuccessMessage('State added successfully');
        onClose();
      } catch (error) {
        console.error('Error adding State:', error);
      }
    };

    return (
      <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', fontFamily: 'San Francisco, Helvetica, Arial, sans-serif' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add State</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Country</label>
                  <select className="form-control" name="lookup_country_id" value={formData.lookup_country_id} onChange={handleInputChange} required>
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country.id} value={country.id}>{country.name}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const UpdateForm = ({ StateId, StateItem, onClose }) => {
    const [formData, setFormData] = useState({
      id: StateId,
      name: StateItem.name || '',
      lookup_country_id: StateItem.lookup_country_id || ''
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('adminToken');
        await axios.put(`https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/UpdateState?id=${StateId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        refreshStateList();
        setSuccessMessage('State updated successfully');
        onClose();
      } catch (error) {
        console.error('Error updating State:', error);
      }
    };

    return (
      <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', fontFamily: 'San Francisco, Helvetica, Arial, sans-serif' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update State</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Country</label>
                  <select className="form-control" name="lookup_country_id" value={formData.lookup_country_id} onChange={handleInputChange} required>
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country.id} value={country.id}>{country.name}</option>
                    ))}
                  </select>
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
      <h2>State</h2>
      <div className="position-relative">
        <button className="btn btn-primary" onClick={handleAddClick} style={{ position: 'absolute', top: '-45px', right: 0, zIndex: 1 }}>Add State</button>
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
            data={StateData}
            columns={columns}
            className="table-bordered"
            entitiesPerPageOptions={[5, 10, 25, 50, 100]}
            defaultEntitiesPerPage={10}
            renderRow={dummyRenderRow}
          />
        )}
        {showAddStateForm && (
          <AddForm
            onClose={() => setShowAddStateForm(false)}
            refreshStateData={refreshStateList}
          />
        )}
        {showEditForm && selectedState && (
          <UpdateForm
            StateId={selectedState.id}
            StateItem={selectedState}
            onClose={() => setShowEditForm(false)}
          />
        )}
        {showDeleteConfirmation && deleteStateId && (
          <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', fontFamily: 'San Francisco, Helvetica, Arial, sans-serif' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Deletion</h5>
                  <button type="button" className="btn-close" onClick={() => setShowDeleteConfirmation(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this {StateData.find(P => P.id === deleteStateId).name}?</p>
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

export default State;