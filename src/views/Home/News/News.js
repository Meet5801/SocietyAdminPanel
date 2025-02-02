import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import CommonDataTable from '../Common/DataTable'; // Import the CommonDataTable component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faInfo, faNewspaper, faSpinner, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import defaultImage from '../../../assets/images/News.png';

const News = () => {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showAddNewsForm, setShowAddNewsForm] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteNewsId, setDeleteNewsId] = useState(null);
    const [villages, setVillages] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchNewsData = async () => {
        try {
            setLoading(true); // Set loading to true before fetching data
            const response = await axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetNews');
            const modifiedData = response.data.data.map(item => ({
                ...item,
                id: item.id
            }));
            setNewsData(modifiedData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching news data:', error);
        }
    };

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/login');
        }
    }, [navigate])

    useEffect(() => {
        fetchNewsData();
        fetchVillages();
    }, []);

    const fetchVillages = async () => {
        try {
            const response = await axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetVillage');
            const villagesData = response.data.data;
            setVillages(villagesData);
        } catch (error) {
            console.error('Error fetching villages:', error);
        }
    };

    const refreshNewsList = () => {
        fetchNewsData();
    };

    const handleAddClick = () => {
        setShowAddNewsForm(true);
    };

    const handleEditClick = (newsItem) => {
        setSelectedNews(newsItem);
        setShowEditForm(true);
    };

    const handleDeleteClick = (newsItemId) => {
        setDeleteNewsId(newsItemId);
        setShowDeleteConfirmation(true);
    };

    const handleDeleteConfirmation = async () => {
        try {
            await deleteNews(deleteNewsId);
            setNewsData(newsData.filter(item => item.id !== deleteNewsId));
            setShowDeleteConfirmation(false);
            setSuccessMessage('News deleted successfully');
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

    const deleteNews = async (newsId) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/DeleteNews?id=${newsId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Error deleting news:', error);
            throw error;
        }
    };

    const columns = [
        {
                title: 'Title',
                data: 'title',
                render: (item) => {
                    const handleImageError = (event) => {
                        event.target.onerror = null; // Prevent infinite loop in case the default image also fails to load
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
                                {item.title}
                            </div>
                        </>
                    );
                }
        },

        {
            title: 'Description',
            data: 'description',
            render: (rowData) => (
                <div>
                    {rowData.description.length > 50 ? `${rowData.description.substring(0, 50)}...` : rowData.description}
                </div>
            )
        },
        { title: 'Village', data: 'village' },
        {
            title: 'Status',
            data: 'is_active',
            render: (rowData) => (
                <div className="d-flex justify-content-center">
                    <span className={`badge rounded-pill ${rowData.is_active ? 'bg-info' : 'bg-danger'}`}>
                        {rowData.is_active ? 'Active' : 'Inactive'}
                    </span>
                </div>
            )
        },
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
                    <Link to={`/News/Details/${item.id}`} className="btn" style={{ height: '20px', width: '20px', fontSize: '1rem', border: 'none' }} title="Info">
                        <FontAwesomeIcon icon={faInfo} />
                    </Link>
                </div>
            )
        }
    ];

    const AddForm = ({ onClose, refreshNewsData, villages }) => {
        const [formData, setFormData] = useState({
            title: '',
            description: '',
            village: '',
            dateTime: '',
            image: null
        });

        const [imageFile, setImageFile] = useState(null);

        // Function to handle image selection
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
                const formDataCopy = new FormData();
                formDataCopy.append('title', formData.title);
                formDataCopy.append('description', formData.description);
                formDataCopy.append('village', formData.village);
                formDataCopy.append('dateTime', formData.dateTime);
                if (formData.image) {
                    formDataCopy.append('image', formData.image);
                }

                const token = localStorage.getItem('adminToken');
                const response = await axios.post('https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/AddNews', formDataCopy, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('News added successfully:', response.data.data);
                refreshNewsList();
                setSuccessMessage('News added successfully');
                onClose();
            } catch (error) {
                console.error('Error adding news:', error);
            }
        };

        return (
            <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add News</h5>
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
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" name="title" value={formData.title} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <input type="text" className="form-control" name="description" value={formData.description} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Village</label>
                                    <select className="form-control" name="village" value={formData.village} onChange={handleInputChange} required>
                                        <option value="">Select Village</option>
                                        {villages.map((village) => (
                                            <option key={village.id} value={village.name}>{village.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Date & Time</label>
                                    <input type="datetime-local" className="form-control" name="dateTime" value={formData.dateTime} onChange={handleInputChange} required />
                                </div>
                                <button type="submit" className="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const UpdateForm = ({ newsId, newsItem, onClose, villages }) => {
        const [oldImage, setOldImage] = useState(null);
        const formatDate = (date) => {
            // Convert ISO date format to local date-time format (YYYY-MM-DDTHH:MM)
            if (date) {
                const isoDate = new Date(date);
                return isoDate.toISOString().slice(0, 16);
            } else {
                return '';
            }
        };
        // debugger
        const [formData, setFormData] = useState({
            id: newsItem.id || '', // Add this line to ensure id is properly initialized
            title: newsItem.title || '',
            description: newsItem.description || '',
            village: newsItem.village || '',
            dateTime: formatDate(newsItem.dateTime) || '', // Initialize with existing dateTime
            image: newsItem.image || '',
        });

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const formDataCopy = new FormData();
                formDataCopy.append('id', formData.id);
                formDataCopy.append('title', formData.title);
                formDataCopy.append('description', formData.description);
                formDataCopy.append('village', formData.village);
                formDataCopy.append('dateTime', formData.dateTime);
                if (formData.image) {
                    formDataCopy.append('image', formData.image);
                }

                const token = localStorage.getItem('adminToken');
                const response = await axios.put(`https://expodersfour-001-site1.ltempurl.com/api/admin/Lookup/UpdateNews?id=${newsId}`, formDataCopy, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('News updated successfully:', response.data.data);
                setSuccessMessage('News updated successfully');
                fetchNewsData(); // Refresh news data after update
                onClose(); // Close the edit form
            } catch (error) {
                console.error('Error updating news:', error);
            }
        };

        useEffect(() => {
            // Fetch the image
            if (newsItem.image) {
                axios.get(`https://expodersfour-001-site1.ltempurl.com/GetImage/${newsItem.image}`, { responseType: 'arraybuffer' })
                    .then(response => {
                        const blob = new Blob([response.data], { type: 'image/jpeg' }); // Create a Blob from the response data
                        const reader = new FileReader();
                        reader.readAsDataURL(blob); // Convert the blob to a data URL
                        reader.onloadend = () => {
                            setOldImage(reader.result); // Set the data URL as the source for the image
                        };
                    })
                    .catch(error => {
                        console.error('Error fetching image:', error);
                    });
            }
        }, [newsItem.image]);

        const handleImageClick = () => {
            // Trigger click on file input when image is clicked
            const fileInput = document.getElementById('fileInput');
            if (fileInput) {
                fileInput.click();
            }
        };

        const handleFileChange = (e) => {
            const file = e.target.files[0];

            // Display the previously uploaded image temporarily
            setOldImage(newsItem.image);

            // Set the newly selected image
            setFormData({ ...formData, image: file });
            const reader = new FileReader();
            reader.onload = () => {
                setOldImage(reader.result);
            };
            reader.readAsDataURL(file);
        };

        return (
            <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Update News</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3" style={{ width: '100px', height: '100px', border: '1px solid black', cursor: 'pointer' }}>
                                    <label className="form-label" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></label>
                                    <input id="fileInput" type="file" className="form-control" name="image" onChange={handleFileChange} style={{ display: 'none' }} />
                                    <div className="image-container" style={{ width: '100%', height: '100%', overflow: 'hidden' }} onClick={handleImageClick}
                                        onMouseEnter={(e) => { e.currentTarget.firstChild.style.filter = 'brightness(50%)' }}
                                        onMouseLeave={(e) => { e.currentTarget.firstChild.style.filter = 'brightness(100%)' }}>
                                        {oldImage && (
                                            <img src={oldImage} alt="Current Image" className="img-fluid" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        )}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" name="title" value={formData.title} onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <input type="text" className="form-control" name="description" value={formData.description} onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Village</label>
                                    <select className="form-control" name="village" value={formData.village} onChange={handleInputChange} required>
                                        <option value="">Select Village</option>
                                        {villages.map((village) => (
                                            <option key={village.id} value={village.name}>{village.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Date & Time</label>
                                    <input type="datetime-local" className="form-control" name="dateTime" value={formData.dateTime} onChange={handleInputChange} />
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
                        {/* For status field */}
                        {column.data === 'is_active' ? (
                            <div className="d-flex justify-content-center">
                                <span className={`badge rounded-pill ${rowData.is_active ? 'bg-info' : 'bg-danger'}`}>
                                    {rowData.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        ) : (
                            // For other columns
                            column.render ? column.render(rowData) : rowData[column.data]
                        )}
                    </td>
                ))}
            </tr>
        );
    };




    return (
        <div className="container" style={{ fontFamily: 'San Francisco, Helvetica, Arial, sans-serif' }}>
            <h2>News</h2>
            <div className="position-relative">
                <button className="btn btn-primary" onClick={handleAddClick} style={{ position: 'absolute', top: '-45px', right: 0, zIndex: 1 }}>Add News</button>
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
                        data={newsData}
                        columns={columns}
                        className="table-bordered"
                        entitiesPerPageOptions={[5, 10, 25, 50, 100]}
                        defaultEntitiesPerPage={10}
                        renderRow={dummyRenderRow} // Provide the dummy renderRow function
                    />
                )}
                {showAddNewsForm && (
                    <AddForm
                        refreshNewsData={refreshNewsList}
                        onClose={() => setShowAddNewsForm(false)}
                        villages={villages}
                    />
                )}
                {showEditForm && selectedNews && (
                    <UpdateForm
                        newsId={selectedNews.id}
                        newsItem={selectedNews}
                        onClose={() => setShowEditForm(false)}
                        villages={villages}
                    />
                )}
                {showDeleteConfirmation && deleteNewsId && (
                    <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Deletion</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowDeleteConfirmation(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete this  {newsData.find(n => n.id === deleteNewsId).title}?</p>
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

export default News;