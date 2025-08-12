import React, { useRef, useState } from 'react';
import './addProduct.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const AddProduct = () => {
  const inputRef = useRef();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchCategory = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/category/getallCategories`)
    // console.log(res.data.data)
    setCategories(res.data.data)
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const handleSubmit = async () => {
    if (!title && !desc && !price && !category && !stock && images.length === 0) {
      toast.error("Please fill all fields and upload image(s)");
      return;
    }

    const form = new FormData();
    form.append('name', title);
    form.append('description', desc);
    form.append('price', price);
    form.append('category', category);
    form.append('stock', stock);

images.forEach((img) => form.append('images', img));

    try {
      setIsLoading(true)
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/products/createProduct`, form, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success(res.data?.successRes?.message || "Product created!");
      // Reset
      setTitle('');
      setDesc('');
      setPrice('');
      setCategory('');
      setStock('');
      setImages([]);
      setPreviewUrls([]);
      setIsLoading(false)
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error creating product");
            setIsLoading(false)
    }
  };

  return (
    <div className="addProduct">
      <h1>Add Your Product</h1>

      <div className="title">
        <div>Title</div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="desc">
        <div>Description</div>
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <div className="price">
        <div>Price</div>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="category">
        <div>Category</div>
        <select value={category} onChange={(e) => {setCategory(e.target.value)
          console.log(e.target.value)
        }}>
          <option value="" disabled>Select a category</option>
          {
            categories.map((cat, i) => {
              return <option key={i} value={cat._id}>{cat.name}</option>
            })
          }
        </select>
      </div>

      <div className="stock">
        <div>Stock Quantity</div>
        <input
          type="number"
          placeholder="Enter stock amount"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />

      {previewUrls.length > 0 && (
        <div className="preview">
          {previewUrls.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt="preview"
              style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "10px", borderRadius: "8px" }}
            />
          ))}
        </div>
      )}

      <div className="btns">
        <button className="uploadImg" onClick={() => inputRef.current.click()}>Upload Image</button>
  {isLoading ? (
    <button className='add'><div className="spinnerBtn"></div></button>
  ) : (
    <button className='add' onClick={handleSubmit}>Add Product</button>
  )}
      </div>
    </div>
  );
};

export default AddProduct;
