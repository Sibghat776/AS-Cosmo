import { useRef, useState } from 'react';
import './editProfile.scss';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const inputRef = useRef();
  const [preview, setPreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    desc: '',
    mobileNumber: '',
    location: '',
    gender: '',
    profilePicture: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    setIsLoading(true)
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', 'medium_clone');
    form.append('cloud_name', 'dmdsqhaiz');

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dmdsqhaiz/image/upload", {
        method: "POST",
        body: form
      });
      const data = await res.json();
      console.log("Cloudinary URL:", data.secure_url);
      setIsLoading(false)
      return data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
            setIsLoading(false)
      return null;
    }
  };

  const handleSubmit = async (imageUrl) => {
    try {
      const {
        firstName,
        lastName,
        desc,
        mobileNumber,
        location,
        gender
      } = formData;

      const body = {};
      if (firstName) body.firstName = firstName;
      if (lastName) body.lastName = lastName;
      if (desc) body.desc = desc;
      if (mobileNumber) body.mobileNumber = mobileNumber;
      if (location) body.location = location;
      if (gender) body.gender = gender;
      if (imageUrl) body.profilePicture = imageUrl;

      const res = await axios.put('http://localhost:3000/api/v1/auth/update', body, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      // toast.success(res?.data?.successRes?.message || "Updated successfully");

      // Clear form
      setFormData({
        firstName: '',
        lastName: '',
        desc: '',
        mobileNumber: '',
        location: '',
        gender: '',
        profilePicture: ''
      });
      setPreview(null);
      setSelectedImage(null);
      
window.location.reload()

    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  const handleUploadAndSubmit = async () => {

      const { firstName, lastName, desc, mobileNumber, location, gender } = formData;

  const isAllFieldsEmpty =
    !firstName.trim() &&
    !lastName.trim() &&
    !desc.trim() &&
    !mobileNumber.trim() &&
    !location.trim() &&
    !gender.trim() &&
    !selectedImage;

  if (isAllFieldsEmpty) {
    toast.error("Enter something");
    return;
  }

    let imageUrl = formData.profilePicture;

    if (selectedImage) {
      imageUrl = await uploadImageToCloudinary(selectedImage);
      if (!imageUrl) {
        toast.error("Image upload failed");
        return;
      }
    }

    await handleSubmit(imageUrl);
  };

  return (
    <div className="editProfile">
      <h2>Edit Profile</h2>

      <div className="form-group">
        <label>First Name</label>
        <input type="text" name="firstName" value={formData.firstName} placeholder="First Name" onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Last Name</label>
        <input type="text" name="lastName" value={formData.lastName} placeholder="Last Name" onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input type="text" name="desc" value={formData.desc} placeholder="Describe yourself..." onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input type="tel" name="mobileNumber" value={formData.mobileNumber} placeholder="03xx-xxxxxxx" onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>City</label>
        <input type="text" name="location" value={formData.location} placeholder="Karachi, Lahore, etc." onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="" disabled>Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <input
        type="file"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleImageChange}
        accept="image/*"
      />

      <div className="btns" style={{ display: "flex", alignItems: "center", flexDirection: "column"}}>
        <div className="uploadPicBtn">
          <button onClick={() => inputRef.current.click()} style={{backgroundColor: "#78003c"}}>Upload Picture</button>
        </div>
        <div className="saveBtn">
          {
            isLoading ?
            <button>Updating profile...</button> :
            <button onClick={handleUploadAndSubmit}>Update Profile</button>
          }
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
