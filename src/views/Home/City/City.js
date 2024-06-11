import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommonDataTable from '../Common/DataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';

const city = () => {
  const [cityData, setcityData] = useState([]);
  const [state, setstate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddcityForm, setShowAddcityForm] = useState(false);
  const [selectedcity, setSelectedcity] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletecityId, setDeletecityId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchcityData = async () => {
    try {
      setLoading(true);
      const stateResponse = await axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/Getstate');
      const stateData = stateResponse.data.data;
      setstate(stateResponse.data.data);
      
      
      const citysResponse = await axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/Getcities');
      const cityData = citysResponse.data.data;
      
      const modifiedData = cityData.map(item => ({
          id: item.id,
          name: item.name,
          lookup_state_id: item.lookup_state_id,
          state_name: stateData.find(state => state.id === item.lookup_state_id)?.name || 'Unknown'
        }));
        
        setcityData(modifiedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching city data:', error);
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
    fetchcityData();
  }, []);

  const refreshcityList = () => {
    fetchcityData();
  };

  const handleAddClick = () => {
    setShowAddcityForm(true);
  };

  const handleEditClick = (cityItem) => {
    setSelectedcity(cityItem);
    setShowEditForm(true);
  };

  const handleDeleteClick = (cityItemId) => {
    setDeletecityId(cityItemId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await deletecity(deletecityId);
      setcityData(cityData.filter(item => item.id !== deletecityId));
      setShowDeleteConfirmation(false);
      setSuccessMessage('city deleted successfully');
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  const deletecity = async (cityId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/Deletecity?id=${cityId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error deleting city:', error);
      throw error;
    }
  };

  const columns = [
    { title: 'Name', data: 'name' },
    { title: 'state', data: 'state_name' },
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

  const AddForm = ({ onClose, refreshcityData }) => {
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
        await axios.post('https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/Addcity', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        refreshcityData();
        setSuccessMessage('city added successfully');
        onClose();
      } catch (error) {
        console.error('Error adding city:', error);
      }
    };

    return (
      <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', fontFamily: 'San Francisco, Helvetica, Arial, sans-serif' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add city</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">State</label>
                  <select className="form-control" name="lookup_state_id" value={formData.lookup_state_id} onChange={handleInputChange} required>
                    <option value="">Select state</option>
                    {state.map(state => (
                      <option key={state.id} value={state.id}>{state.name}</option>
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

  const UpdateForm = ({ cityId, cityItem, onClose }) => {
    const [formData, setFormData] = useState({
      id: cityId,
      name: cityItem.name || '',
      lookup_state_id: cityItem.lookup_state_id || ''
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('adminToken');
        await axios.put(`https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/Updatecity?id=${cityId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        refreshcityList();
        setSuccessMessage('city updated successfully');
        onClose();
      } catch (error) {
        console.error('Error updating city:', error);
      }
    };

    return (
      <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', fontFamily: 'San Francisco, Helvetica, Arial, sans-serif' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update city</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">State</label>
                  <select className="form-control" name="lookup_state_id" value={formData.lookup_state_id} onChange={handleInputChange} required>
                    <option value="">Select state</option>
                    {state.map(state => (
                      <option key={state.id} value={state.id}>{state.name}</option>
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
      <h2>city</h2>
      <div className="position-relative">
        <button className="btn btn-primary" onClick={handleAddClick} style={{ position: 'absolute', top: '-45px', right: 0, zIndex: 1 }}>Add city</button>
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
            data={cityData}
            columns={columns}
            className="table-bordered"
            entitiesPerPageOptions={[5, 10, 25, 50, 100]}
            defaultEntitiesPerPage={10}
            renderRow={dummyRenderRow}
          />
        )}
        {showAddcityForm && (
          <AddForm
            onClose={() => setShowAddcityForm(false)}
            refreshcityData={refreshcityList}
          />
        )}
        {showEditForm && selectedcity && (
          <UpdateForm
            cityId={selectedcity.id}
            cityItem={selectedcity}
            onClose={() => setShowEditForm(false)}
          />
        )}
        {showDeleteConfirmation && deletecityId && (
          <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', fontFamily: 'San Francisco, Helvetica, Arial, sans-serif' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Deletion</h5>
                  <button type="button" className="btn-close" onClick={() => setShowDeleteConfirmation(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this {cityData.find(P => P.id === deletecityId).name}?</p>
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

export default city;
