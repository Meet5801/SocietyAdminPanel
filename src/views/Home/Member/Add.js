import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'; // Using faTimes instead of faClose


const AddMemberForm = ({ }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        user_id: id,
        lookup_relation_type_id: '',
        surname: '',
        name: '',
        father_or_husband_name: '',
        gender: '',
        phone_number: '',
        email: '',
        dob: '',
        age: '',
        lookup_village_id: '',
        lookup_state_id: '',
        sakh_name: '',
        address: '',
        lookup_city_id: '',
        lookup_country_id: '',
        lookup_marital_type_id: '',
        lookup_career_id: '',
        lookup_education_sub_type_id: '',
        lookup_education_type_id: '',
        lookup_occupation_id: '',
        designation: '',
        company: '',
        occupation_address: '',
        mama_name: '',
        lookup_blood_group_id: '',
        lookup_pragatimandal_id: '',
        height_foot: '',
        height_inch: '',
        weight: '',
        image: '',
        interested_matrimonial: false,
        interested_blood_donate: false,
        about_me: '',
        is_active: false,
        is_admin_approve: false,
        created_by_id: '',
        you_live_abroad: '',
        mama_address: '',
        mother_name: '',
        hobbies: '',
        piyar: ''
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    // const [SakhData, setSakhData] = useState([]);
    const [Relationdata, setRelationdata] = useState([]);
    const [Villagedata, setVillagedata] = useState([]);
    const [Maritaldata, setMaritaldata] = useState([]);
    // const [Careerdata, setCareerdata] = useState([]);
    const [Educationsubtypedata, setEducationsubtypedata] = useState([]);
    const [Educationtypedata, setEducationtypedata] = useState([]);
    const [Occupationdata, setOccupationdata] = useState([]);
    const [Bloodgroupdata, setBloodgroupdata] = useState([]);
    const [Pragatimandaldata, setPragatimandaldata] = useState([]);

    useEffect(() => {
        // Fetch countries
        axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetCountries')
            .then(response => {
                setCountries(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);

    useEffect(() => {
        // Fetch states based on the selected country
        if (formData.lookup_country_id) {
            axios.get(`https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetState?country_id=${formData.lookup_country_id}`)
                .then(response => {
                    setStates(response.data.data);
                })
                .catch(error => {
                    console.error('Error fetching states:', error);
                });
        }
    }, [formData.lookup_country_id]);

    useEffect(() => {
        // Fetch cities based on the selected state
        if (formData.lookup_state_id) {
            axios.get(`https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetCities?state_id=${formData.lookup_state_id}`)
                .then(response => {
                    setCities(response.data.data);
                })
                .catch(error => {
                    console.error('Error fetching cities:', error);
                });
        }
    }, [formData.lookup_state_id]);

    // useEffect(() => {
    //     // Fetch Sakh data
    //     axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetSakh')
    //         .then(response => {
    //             setSakhData(response.data.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching Sakh data:', error);
    //         });
    // }, []);

    useEffect(() => {
        // Fetch Sakh data
        axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetRelationTypes')
            .then(response => {
                setRelationdata(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Sakh data:', error);
            });

        axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetVillage')
            .then(response => {
                setVillagedata(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Sakh data:', error);
            });

        axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetMaritalTypes')
            .then(response => {
                setMaritaldata(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Sakh data:', error);
            });

        // axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetCareers')
        // .then(response => {
        //     setCareerdata(response.data.data);
        // })
        // .catch(error => {
        //     console.error('Error fetching Sakh data:', error);
        // });

        axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetEducationSubTypes')
            .then(response => {
                setEducationsubtypedata(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Sakh data:', error);
            });

        axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetEducationTypes')
            .then(response => {
                setEducationtypedata(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Sakh data:', error);
            });

        axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetOccupations')
            .then(response => {
                setOccupationdata(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Sakh data:', error);
            });

        axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetPragatimandals')
            .then(response => {
                setPragatimandaldata(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Sakh data:', error);
            });

        axios.get('https://expodersfour-001-site1.ltempurl.com/api/Lookup/GetBloodGroup')
            .then(response => {
                setBloodgroupdata(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Sakh data:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked }); // Use checked to update the checkbox state
        } else if (name === 'lookup_country_id') {
            // If country is changed
            if (value === '') {
                // If country is unselected, clear state and city
                setFormData({ ...formData, [name]: value, lookup_state_id: '', lookup_city_id: '' });
            } else {
                // If country is selected, update the form data with the selected country
                setFormData({ ...formData, [name]: value });
            }
        } else if (name === 'lookup_state_id') {
            // If state is changed
            if (value === '') {
                // If state is unselected, clear city
                setFormData({ ...formData, [name]: value, lookup_city_id: '' });
            } else {
                // If state is selected, update the form data with the selected state
                setFormData({ ...formData, [name]: value });
            }
        } else {
            // Otherwise, update the form data as usual
            setFormData({ ...formData, [name]: value });
        }
    };
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataCopy = new FormData(); // Create a new FormData object
            // Append all other form data fields to the FormData object
            Object.keys(formData).forEach((key) => {
                formDataCopy.append(key, formData[key]);
            });

            if (imageFile instanceof File) { // Check if imageFile is an instance of File
                formDataCopy.append('image', imageFile); // Append the selected image file to the FormData object
            }

            const token = localStorage.getItem('adminToken');
            const response = await axios.post(
                'https://expodersfour-001-site1.ltempurl.com/api/Member/Add',
                formDataCopy,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Member added successfully:', response.data.data);
            setIsSuccess(true);
        } catch (error) {
            console.error('Error adding member:', error);
            setIsError(true);
        }
    };

    const [imageFile, setImageFile] = useState(null);

    // Function to handle image selection
    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };
    useEffect(() => {
        if (isSuccess) {
            // Redirect to user page
            navigate(`/Home/Users`);
        }
    }, [isSuccess, navigate]);

    // set if from title relationship condition
    const relationTitlesToHideMaritalFields = ["Spouse(પતિ-પત્ની)", "Grandfather(દાદા)", "Grandmother(દાદી)", "Father(પિતા)", "Mother(મા)"];
    const selectedRelationType = Relationdata.find(relation => relation.id === formData.lookup_relation_type_id);
    const hideMaritalFields = selectedRelationType && relationTitlesToHideMaritalFields.includes(selectedRelationType.title);

    // for matrominal
    const relationTitlesToHideMatrominal = ["Single (એકલા)", "Widower (વિધુર)", "Widowed (વિધવા)"];
    const selectedMaritalType = Maritaldata.find(marital => marital.id === formData.lookup_marital_type_id);
    const hidematrominal = selectedMaritalType && relationTitlesToHideMatrominal.includes(selectedMaritalType.name);

    // marital status
    const maritalNameToHideFields = ["Single (એકલા)", "Widower (વિધુર)", "Widowed (વિધવા)", "Separated (અલગ થયેલા)"];
    const selectmaritaltype = formData.lookup_marital_type_id ? Maritaldata.find(marital => marital.id === formData.lookup_marital_type_id) : null;
    const hideFields = !formData.lookup_marital_type_id || (selectmaritaltype && maritalNameToHideFields.includes(selectmaritaltype.name));

    // Hide Height Wight status
    const maritalNameToHideHeightWeight = ["Married (પરિણીત)"];
    const selectmaritaltypes = formData.lookup_marital_type_id ? Maritaldata.find(marital => marital.id === formData.lookup_marital_type_id) : null;
    const hideFieldheightWeight = !formData.lookup_marital_type_id || (selectmaritaltypes && maritalNameToHideHeightWeight.includes(selectmaritaltypes.name));


    {
        hideMaritalFields ?
            null :
            <div className="mb-3">
                <label className="form-label">Marital</label>
                <select className="form-control" name="lookup_marital_type_id" value={formData.lookup_marital_type_id} onChange={handleInputChange}>
                    <option value="">Select Marital-Type</option>
                    {Maritaldata.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                </select>
            </div>
    }


    return (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', fontFamily: 'San Francisco, Helvetica, Arial, sans-serif' }}>
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Member</h5>
                        <Link to={`/Home/Users`} className="btn-Close" style={{ marginLeft: '970px' }}>
                            <FontAwesomeIcon icon={faTimes} />
                        </Link>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-3 d-flex justify-content-center align-items-center">
                                    <div className="mb-3" style={{ width: '150px', height: '150px', border: '1px solid white', cursor: 'pointer', position: 'relative' }}>
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
                                </div>
                                <div className="col-md-2">
                                    <div className="mb-3">
                                        <div className="mb-3">
                                            <label className="form-label">Relation-Type</label>
                                            <select className="form-control" name="lookup_relation_type_id" value={formData.lookup_relation_type_id} onChange={handleInputChange}>
                                                <option value="">Select Relation-Type</option>
                                                {Relationdata.map(r => (
                                                    <option key={r.id} value={r.id}>{r.title}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {hideMaritalFields ?
                                            null :
                                            <div className="mb-3">
                                                <label className="form-label">Marital</label>
                                                <select className="form-control" name="lookup_marital_type_id" value={formData.lookup_marital_type_id} onChange={handleInputChange}>
                                                    <option value="">Select Marital-Type</option>
                                                    {Maritaldata.map(r => (
                                                        <option key={r.id} value={r.id}>{r.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        }
                                        <div className="mb-3">
                                            <label className="form-label">Surname</label>
                                            <input type="text" className="form-control" name="surname" value={formData.surname || ''} onChange={handleInputChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input type="text" className="form-control" name="name" value={formData.name || ''} onChange={handleInputChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Father/Husband Name</label>
                                            <input type="text" className="form-control" name="father_or_husband_name" value={formData.father_or_husband_name || ''} onChange={handleInputChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Gender</label>
                                            <select className="form-select" name="gender" value={formData.gender} onChange={handleInputChange}>
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>

                                        </div>
                                        {hideFields || formData.gender === 'male' ?
                                        null :
                                        <div className="mb-3">
                                            <label className="form-label">Piyar</label>
                                            <input type="text" className="form-control" name="piyar" value={formData.piyar || ''} onChange={handleInputChange} />
                                        </div>
                                    }
                                        <div className="mb-3">
                                            <label className="form-label">Phone Number</label>
                                            <input type="text" className="form-control" name="phone_number" value={formData.phone_number || ''} onChange={handleInputChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input type="email" className="form-control" name="email" value={formData.email || ''} onChange={handleInputChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Date of Birth</label>
                                            <input type="date" className="form-control" name="dob" value={formData.dob || ''} onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="mb-3">
                                        <div className="mb-3">
                                            <label className="form-label">Age</label>
                                            <input type="number" className="form-control" name="age" value={formData.age || ''} onChange={handleInputChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Village</label>
                                            <select className="form-control" name="lookup_village_id" value={formData.lookup_village_id} onChange={handleInputChange}>
                                                <option value="">Select Village</option>
                                                {Villagedata.map(r => (
                                                    <option key={r.id} value={r.id}>{r.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Address</label>
                                            <input type="text" className="form-control" name="address" value={formData.address || ''} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Country</label>
                                            <select className="form-control" name="lookup_country_id" value={formData.lookup_country_id} onChange={handleInputChange}>
                                                <option value="">Select Country</option>
                                                {countries.map(country => (
                                                    <option key={country.id} value={country.id}>{country.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">State</label>
                                            <select className="form-control" name="lookup_state_id" value={formData.lookup_state_id} onChange={handleInputChange}>
                                                <option value="">Select State</option>
                                                {states.map(state => (
                                                    <option key={state.id} value={state.id}>{state.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">City</label>
                                            <select className="form-control" name="lookup_city_id" value={formData.lookup_city_id} onChange={handleInputChange}>
                                                <option value="">Select City</option>
                                                {cities.map(city => (
                                                    <option key={city.id} value={city.id}>{city.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Sakh</label>
                                            <input type="text" className="form-control" name="sakh_name" value={formData.sakh_name || ''} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Mama Address</label>
                                            <input type="text" className="form-control" name="mama_address" value={formData.mama_address || ''} onChange={handleInputChange} />
                                        </div>


                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="mb-3">
                                        {/* <div className="mb-3">
                                <label className="form-label">Career</label>
                                <select className="form-control" name="lookup_career_id" value={formData.lookup_career_id} onChange={handleInputChange}>
                                    <option value="">Select Career</option>
                                    {Careerdata.map(r => (
                                        <option key={r.id} value={r.id}>{r.career_name}</option>
                                    ))}
                                </select>
                            </div> */}
                                        <div className="mb-3">
                                            <label className="form-label">Education Sub Type</label>
                                            <select className="form-control" name="lookup_education_sub_type_id" value={formData.lookup_education_sub_type_id} onChange={handleInputChange}>
                                                <option value="">Select Education Sub Type</option>
                                                {Educationsubtypedata.map(r => (
                                                    <option key={r.id} value={r.id}>{r.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Education Type</label>
                                            <select className="form-control" name="lookup_education_type_id" value={formData.lookup_education_type_id} onChange={handleInputChange}>
                                                <option value="">Select Education Type</option>
                                                {Educationtypedata.map(r => (
                                                    <option key={r.id} value={r.id}>{r.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Occupation </label>
                                            <select className="form-control" name="lookup_occupation_id" value={formData.lookup_occupation_id} onChange={handleInputChange}>
                                                <option value="">Select Occupation Type</option>
                                                {Occupationdata.map(r => (
                                                    <option key={r.id} value={r.id}>{r.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Designation</label>
                                            <input type="text" className="form-control" name="designation" value={formData.designation || ''} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Company</label>
                                            <input type="text" className="form-control" name="company" value={formData.company || ''} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Occupation Address</label>
                                            <input type="text" className="form-control" name="occupation_address" value={formData.occupation_address || ''} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Mother Name</label>
                                            <input type="text" className="form-control" name="mother_name" value={formData.mother_name || ''} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Mama Name</label>
                                            <input type="text" className="form-control" name="mama_name" value={formData.mama_name || ''} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Blood Group </label>
                                            <select className="form-control" name="lookup_blood_group_id" value={formData.lookup_blood_group_id} onChange={handleInputChange}>
                                                <option value="">Select Blood-Group</option>
                                                {Bloodgroupdata.map(r => (
                                                    <option key={r.id} value={r.id}>{r.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="mb-3">

                                        <div className="mb-3">
                                            <label className="form-label">Pragatimandal</label>
                                            <select className="form-control" name="lookup_pragatimandal_id" value={formData.lookup_pragatimandal_id} onChange={handleInputChange}>
                                                <option value="">Select Pragatimandal</option>
                                                {Pragatimandaldata.map(r => (
                                                    <option key={r.id} value={r.id}>{r.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {hideFieldheightWeight ?
                                            null :
                                            <>
                                                <div className="mb-3">
                                                    <label className="form-label">Height Foot</label>
                                                    <input type="text" className="form-control" name="height_foot" value={formData.height_foot || ''} onChange={handleInputChange} />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Height Inch</label>
                                                    <input type="text" className="form-control" name="height_inch" onChange={handleInputChange} />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Weight</label>
                                                    <input type="text" className="form-control" name="weight" value={formData.weight || ''} onChange={handleInputChange} />
                                                </div>
                                            </>
                                        }
                                       {hidematrominal && formData.age > 20 ?
                                        <div className="mb-3">
                                            <label className="form-label">Interested Matrimonial</label>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                name="interested_matrimonial"
                                                checked={hidematrominal ? false : formData.interested_matrimonial}
                                                onChange={() => setFormData({ ...formData, interested_matrimonial: !formData.interested_matrimonial })}
                                            />
                                        </div>
                                        : null
                                    }
                                        <div className="mb-3">
                                            <label className="form-label">Interested Blood Donate</label>
                                            <input type="checkbox" className="form-check-input" name="interested_blood_donate" checked={formData.interested_blood_donate} onChange={() => setFormData({ ...formData, interested_blood_donate: !formData.interested_blood_donate })} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">About Me</label>
                                            <textarea className="form-control" name="about_me" value={formData.about_me || ''} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="is_active" name="is_active" checked={formData.is_active} onChange={handleInputChange} />
                                            <label className="form-check-label" htmlFor="is_active">Active</label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="is_admin_approve" name="is_admin_approve" checked={formData.is_admin_approve} onChange={handleInputChange} />
                                            <label className="form-check-label" htmlFor="is_admin_approve">Admin Approval</label>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="you_live_abroad" name="you_live_abroad" checked={formData.you_live_abroad} onChange={handleInputChange} />
                                            <label className="form-check-label" htmlFor="you_live_abroad">You Live Abroad</label>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Hobbies</label>
                                            <input type="text" className="form-control" name="hobbies" value={formData.hobbies || ''} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 d-flex justify-content-end">
                                <button style={{ marginLeft: '270px' }} type="submit" className="btn btn-primary">Add Member</button>
                            </div>
                        </form>
                        {isSuccess && <p>Member added successfully!</p>}
                        {isError && <p>Error adding member. Please try again later.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AddMemberForm;
