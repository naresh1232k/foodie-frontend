import { useState, useEffect } from 'react';
import { AdminSidebar } from './AdminDashboard';
import { menuAPI } from '../../services/api';
import {BASE_URL} from '../../Config';

const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  category: 'Breakfast',
  image: null,
  vegetarian: true
};

const CATEGORIES = ['Breakfast', 'Bowls', 'Salads', 'Soups', 'Desserts', 'Drinks'];

export default function AdminMenu() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editing, setEditing] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState('');

const load = async () => {
  try {
    const res = await menuAPI.getAll();
    console.log("MENU RESPONSE:", res);

    const data = res.data || res;
    setItems(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    load();
  }, []);

  // ✅ CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", form.name || "");
      data.append("description", form.description || "");
    data.append("price", form.price ?? 0);
      data.append("category", form.category || "");
      data.append("vegetarian", form.vegetarian ? "true" : "false");

      if (form.image instanceof File) {
        data.append("image", form.image);
      }

      if (editing) {
        await menuAPI.update(editing, data);
        setMsg("Updated!");
      } else {
        await menuAPI.create(data);
        setMsg("Added!");
      }

      load();
      setShowForm(false);
      setEditing(null);
      setSelectedItem(null);
      setForm(EMPTY_FORM);

    } catch (err) {
      console.error("FULL ERROR:", err);
      setMsg("Something went wrong");
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return;
    await menuAPI.delete(id).then(load).catch(console.error);
  };

const getImageUrl = (img) => {
  if (!img) return "";
  if (img.startsWith("http")) return img;
  return `${BASE_URL}${img}`;
};

  // ✅ EDIT FIXED
  const handleEdit = (item) => {
    console.log("EDIT CLICKED:", item);

    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: null,
      vegetarian: item.vegetarian
    });

    setEditing(item.id);       // ✅ FIXED
    setSelectedItem(item);     // ✅ SAFE IMAGE DISPLAY
    setShowForm(true);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">

        {/* HEADER */}
        <div className="admin-page-header">
          <h1>Menu Items</h1>

          <button
            className="btn-green"
            onClick={() => {
              setForm(EMPTY_FORM);
              setEditing(null);
              setSelectedItem(null);
              setShowForm(true);
            }}
          >
            + Add Item
          </button>
        </div>

        {msg && <div className="admin-msg">{msg}</div>}

        {/* FORM */}
        {showForm && (
          <div className="admin-form-card">
            <h3>{editing ? 'Edit Item' : 'Add New Item'}</h3>

            <form onSubmit={handleSubmit} className="admin-form">

              {/* NAME + PRICE */}
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    value={form.price}
                   onChange={e => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                />
              </div>

              {/* CATEGORY */}
              <div className="form-group">
                <label>Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                >
                  {CATEGORIES.map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* IMAGE */}
              <div className="form-group">
                <label>Upload Image</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={e =>
                    setForm({ ...form, image: e.target.files[0] })
                  }
                />

                {/* EXISTING IMAGE (EDIT MODE) */}
                {selectedItem?.image && (
                  <img
                    src={`${BASE_URL}${selectedItem.image}?t=${Date.now()}`}
                    alt="current"
                    style={{ width: "100px", marginTop: "10px" }}
                  />
                )}

                {/* NEW IMAGE PREVIEW */}
                {form.image && (
                  <img
                    src={URL.createObjectURL(form.image)}
                    alt="preview"
                    style={{ width: "100px", marginTop: "10px" }}
                  />
                )}
              </div>

              {/* VEG */}
              <div className="form-group check-group">
                <input
                  type="checkbox"
                  checked={form.vegetarian}
                  onChange={e =>
                    setForm({ ...form, vegetarian: e.target.checked })
                  }
                />
                <label>Vegetarian</label>
              </div>

              {/* BUTTONS */}
              <div className="form-actions">
                <button type="submit" className="btn-green">
                  {editing ? 'Update' : 'Add'}
                </button>

                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TABLE */}
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Veg</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>
                    <img
                       src={getImageUrl(item.image)}
                      alt={item.name}
                      className="table-thumb"
                    />
                  </td>

                  <td>
                    <strong>{item.name}</strong>
                    <br />
                    <small>{item.description?.slice(0, 50)}...</small>
                  </td>

                  <td>{item.category}</td>

                  <td>₹{Number(item.price).toFixed(2)}</td>

                  <td>{item.vegetarian ? '✅' : '❌'}</td>

                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </main>
    </div>
  );
}