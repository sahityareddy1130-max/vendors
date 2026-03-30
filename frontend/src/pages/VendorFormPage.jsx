import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import categories from '../data/categories';
import templateOptions from '../data/templateOptions';
import ThreeBackground from '../components/ThreeBackground';

const backendUrl = 'https://vendors-backend-x8ev.onrender.com/api/vendors';

function VendorFormPage() {
  const navigate = useNavigate();
  const [shopName, setShopName] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [template, setTemplate] = useState(templateOptions[0].id);
  const [imageUrl, setImageUrl] = useState('');
  const [preview, setPreview] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Load a previously uploaded image from localStorage for preview.
    const savedImage = localStorage.getItem('shopImage');
    if (savedImage) {
      setPreview(savedImage);
      setImageUrl(savedImage);
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log('Image file selected:', file);
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result;
      console.log('Image converted to base64:', imageData?.slice(0, 100));
      setPreview(imageData);
      setImageUrl(imageData);
      localStorage.setItem('shopImage', imageData);
    };
    reader.readAsDataURL(file);
  };

  const readFileAsDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Submitting your vendor website...');

    let finalImageUrl = imageUrl;
    if (!finalImageUrl && selectedFile) {
      setStatus('Loading image before navigation...');
      finalImageUrl = await readFileAsDataUrl(selectedFile);
      console.log('Base64 image loaded before submit:', finalImageUrl?.slice(0, 100));
      localStorage.setItem('shopImage', finalImageUrl);
      setImageUrl(finalImageUrl);
    }

    const body = {
      shopName,
      description,
      phone,
      address,
      category,
      template,
      imageUrl: finalImageUrl || '',
    };

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        let errorText = '';
        try {
          errorText = await response.text();
        } catch {}
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      if (finalImageUrl) {
        localStorage.setItem('shopImage', finalImageUrl);
      }
      navigate(`/vendor/${encodeURIComponent(data.shopSlug)}`);
    } catch (error) {
      setStatus(`Failed to submit: ${error.message}`);
    }
  };

  return (
    <div className="relative overflow-hidden bg-slate-950/95 py-10 text-white">
      <ThreeBackground />
      <div className="relative mx-auto max-w-5xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-soft text-slate-900">
          <h1 className="text-3xl font-semibold text-slate-900">Create Your Vendor Website</h1>
          <p className="mt-3 text-slate-600">Fill the form, choose a template, and launch your local business page instantly.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6 rounded-3xl bg-white p-8 shadow-soft">
            <div>
              <label className="text-sm font-medium text-slate-700">Shop Name</label>
              <input
                value={shopName}
                onChange={(event) => setShopName(event.target.value)}
                placeholder="My Bakery Shop"
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 dark:bg-slate-800 dark:text-white dark:placeholder-slate-300 focus:border-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Description</label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows="4"
                placeholder="Short description about your business."
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 dark:bg-slate-800 dark:text-white dark:placeholder-slate-300 focus:border-indigo-500 focus:outline-none"
                required
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="9123456789"
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 dark:bg-slate-800 dark:text-white dark:placeholder-slate-300 focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Address</label>
                <input
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="123 Main Street, City"
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 dark:bg-slate-800 dark:text-white dark:placeholder-slate-300 focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">Category</label>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 dark:bg-slate-800 dark:text-white dark:placeholder-slate-300 focus:border-indigo-500 focus:outline-none"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Select Template</label>
                <select
                  value={template}
                  onChange={(event) => setTemplate(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-indigo-500 focus:outline-none"
                >
                  {templateOptions.map((item) => (
                    <option key={item.id} value={item.id}>{item.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Upload Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 dark:bg-slate-800 dark:text-white dark:placeholder-slate-300 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-3xl bg-indigo-600 px-6 py-4 text-white transition hover:bg-indigo-500"
            >
              Generate Website
            </button>

            {status && <p className="text-sm text-slate-600">{status}</p>}
          </div>

          <aside className="space-y-6 rounded-3xl bg-white p-8 shadow-soft">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Preview</h2>
              <p className="mt-2 text-slate-600">Your website will use the selected template and display your business details.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-semibold text-slate-900">Shop Name</h3>
              <p className="mt-2 text-slate-600">{shopName || 'Your Shop Name'}</p>
              <h3 className="mt-5 font-semibold text-slate-900">Category</h3>
              <p className="mt-2 text-slate-600">{category}</p>
              <h3 className="mt-5 font-semibold text-slate-900">Selected Template</h3>
              <p className="mt-2 text-slate-600">{templateOptions.find((item) => item.id === template)?.label}</p>
              {preview ? (
                <img src={preview} alt="Preview" className="mt-5 h-48 w-full rounded-3xl object-cover" />
              ) : (
                <div className="mt-5 h-48 rounded-3xl bg-slate-200" />
              )}
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}

export default VendorFormPage;
