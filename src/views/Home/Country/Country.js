import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommonDataTable from '../Common/DataTable';
import defaultImage from '../../../assets/images/countrydefault.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faInfo, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';

const Country = () => {
  const [CountryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddCountryForm, setShowAddCountryForm] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteCountryId, setDeleteCountryId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchCountryData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetCountries');
      const modifiedData = response.data.data.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        code: item.code
      }));
      setCountryData(modifiedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Country data:', error);
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
    fetchCountryData();
  }, []);

  const refreshCountryList = () => {
    fetchCountryData();
  };

  const handleAddClick = () => {
    setShowAddCountryForm(true);
  };

  const handleEditClick = (CountryItem) => {
    setSelectedCountry(CountryItem);
    setShowEditForm(true);
  };

  const handleDeleteClick = (CountryItemId) => {
    setDeleteCountryId(CountryItemId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await deleteCountry(deleteCountryId);
      setCountryData(CountryData.filter(item => item.id !== deleteCountryId));
      setShowDeleteConfirmation(false);
      setSuccessMessage('Country deleted successfully');
    } catch (error) {
      console.error('Error deleting Country:', error);
    }
  };

  const deleteCountry = async (CountryId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/DeleteCountry?id=${CountryId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error deleting Country:', error);
      throw error;
    }
  };

  const columns = [
    {
      title: 'Name',
      data: 'name',
      render: (item) => {
        const handleImageError = (event) => {
          event.target.onerror = null;
          event.target.src = defaultImage;
        };

        return (
          <>
            <div>
              <img
                src={`https://expodersfour-001-site1.ltempurl.com/GetImage/${item.image}`}
                onError={handleImageError}
                style={{ width: '25px', height: '25px', borderRadius: '50%', marginRight: '5px' }}
              />
              {item.name}
            </div>
          </>
        );
      }
    },
    { title: 'Code', data: 'code' },
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

  const AddForm = ({ onClose, refreshCountryData }) => {
    const [formData, setFormData] = useState({
      name: '',
      image: null,
      code: ''
    });

    const [imageFile, setImageFile] = useState(null);

    const handleImageChange = (e) => {
      setImageFile(e.target.files[0]);
      setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('adminToken');
        const data = new FormData();
        data.append('name', formData.name);
        data.append('image', formData.image);
        data.append('code', formData.code);

        await axios.post('https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/AddCountry', data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        refreshCountryData();
        setSuccessMessage('Country added successfully');
        onClose();
      } catch (error) {
        console.error('Error adding Country:', error);
      }
    };

    return (
      <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', fontFamily: 'San Francisco, Helvetica, Arial, sans-serif' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Country</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3" style={{ width: '100px', height: '100px', border: '1px solid black', cursor: 'pointer', position: 'relative' }}>
                  <label className="form-label" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></label>
                  <input id="imageInput" type="file" className="form-control" name="image" onChange={handleImageChange} style={{ display: 'none' }} />
                  <div className="image-container" style={{ width: '100%', height: '100%', overflow: 'hidden' }} onClick={() => document.getElementById('imageInput').click()}
                    onMouseEnter={(e) => { e.currentTarget.firstChild.style.filter = 'brightness(50%)' }}
                    onMouseLeave={(e) => { e.currentTarget.firstChild.style.filter = 'brightness(100%)' }}>
                    {imageFile ? (
                      <img src={URL.createObjectURL(imageFile)} alt="Selected Image" className="img-fluid" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <FontAwesomeIcon icon={faPlus} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Code</label>
                  <input type="text" className="form-control" name="code" value={formData.code} onChange={handleInputChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const UpdateForm = ({ CountryId, CountryItem, onClose }) => {
    const [oldImage, setOldImage] = useState(null);
    const [formData, setFormData] = useState({
      id: CountryId,
      name: CountryItem.name || '',
      image: null,
      code: CountryItem.code || ''
    });

    useEffect(() => {
      if (CountryItem.image) {
        axios.get(`https://expodersfour-001-site1.ltempurl.com/GetImage/${CountryItem.image}`, { responseType: 'blob' })
          .then((response) => {
            const imageFile = new File([response.data], 'image.jpg', { type: response.data.type });
            setOldImage(URL.createObjectURL(imageFile));
          })
          .catch((error) => {
            console.error('Error fetching the existing image:', error);
          });
      }
    }, [CountryItem.image]);

    const [imageFile, setImageFile] = useState(null);

    const handleImageChange = (e) => {
      setImageFile(e.target.files[0]);
      setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('adminToken');
        const data = new FormData();
        data.append('id', formData.id);
        data.append('name', formData.name);
        data.append('code', formData.code);

        if (imageFile) {
          data.append('image', formData.image);
        }

        await axios.put('https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/UpdateCountry', data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        fetchCountryData();
        onClose();
      } catch (error) {
        console.error('Error updating Country:', error);
      }
    };

    return (
      <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', fontFamily: 'San Francisco, Helvetica, Arial, sans-serif' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Country</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3" style={{ width: '100px', height: '100px', border: '1px solid black', cursor: 'pointer', position: 'relative' }}>
                  <label className="form-label" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></label>
                  <input id="imageInput" type="file" className="form-control" name="image" onChange={handleImageChange} style={{ display: 'none' }} />
                  <div className="image-container" style={{ width: '100%', height: '100%', overflow: 'hidden' }} onClick={() => document.getElementById('imageInput').click()}
                    onMouseEnter={(e) => { e.currentTarget.firstChild.style.filter = 'brightness(50%)' }}
                    onMouseLeave={(e) => { e.currentTarget.firstChild.style.filter = 'brightness(100%)' }}>
                    {imageFile ? (
                      <img src={URL.createObjectURL(imageFile)} alt="Selected Image" className="img-fluid" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      oldImage ? (
                        <img src={oldImage} alt="Existing Image" className="img-fluid" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <FontAwesomeIcon icon={faPlus} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                      )
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Code</label>
                  <input type="text" className="form-control" name="code" value={formData.code} onChange={handleInputChange} required />
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
      <h2>Country</h2>
      <div className="position-relative">
        <button className="btn btn-primary" onClick={handleAddClick} style={{ position: 'absolute', top: '-45px', right: 0, zIndex: 1 }}>Add Country</button>
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
            data={CountryData}
            columns={columns}
            className="table-bordered"
            entitiesPerPageOptions={[5, 10, 25, 50, 100]}
            defaultEntitiesPerPage={10}
            renderRow={dummyRenderRow}
          />
        )}
        {showAddCountryForm && (
          <AddForm
            onClose={() => setShowAddCountryForm(false)}
            refreshCountryData={refreshCountryList}
          />
        )}
        {showEditForm && selectedCountry && (
          <UpdateForm
            CountryId={selectedCountry.id}
            CountryItem={selectedCountry}
            onClose={() => setShowEditForm(false)}
          />
        )}
        {showDeleteConfirmation && deleteCountryId && (
          <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', fontFamily: 'San Francisco, Helvetica, Arial, sans-serif' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Deletion</h5>
                  <button type="button" className="btn-close" onClick={() => setShowDeleteConfirmation(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this {CountryData.find(P => P.id === deleteCountryId).name}?</p>
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

export default Country;
