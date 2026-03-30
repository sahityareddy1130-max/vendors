import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import QRCode from 'qrcode';
import templateMap from '../components/templates/templateMap';

const backendUrl = 'https://vendors-backend-x80v.onrender.com/api/vendors';

function VendorLandingPage() {
  const { shopname } = useParams();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [storedImage, setStoredImage] = useState('');

  useEffect(() => {
    async function fetchVendor() {
      setLoading(true);
      try {
        const response = await fetch(`${backendUrl}/${shopname}`);
        if (!response.ok) {
          throw new Error('Vendor not found');
        }
        const data = await response.json();
        setVendor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVendor();
  }, [shopname]);

  useEffect(() => {
    if (!vendor) return;

    // Retrieve uploaded image from localStorage and log it.
    const savedImage = localStorage.getItem('shopImage');
    console.log('shopImage from localStorage:', savedImage);
    if (savedImage) {
      setStoredImage(savedImage);
    }

    const vendorUrl = `${window.location.origin}/vendor/${vendor.shopSlug}`;
    QRCode.toDataURL(vendorUrl, { width: 220, margin: 2 })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Generate QR Code failed', err));
  }, [vendor]);

  if (loading) {
    return <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 text-center shadow-soft">Loading vendor details...</div>;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 text-center shadow-soft">
        <h2 className="text-2xl font-semibold text-slate-900">{error}</h2>
        <p className="mt-3 text-slate-600">Try again or return to the homepage.</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-500">
          Back to Home
        </Link>
      </div>
    );
  }

  const TemplateComponent = templateMap[vendor.template];
  const shopImage = localStorage.getItem('shopImage');
  console.log('shopImage from localStorage:', shopImage);
  const heroImage = vendor.imageUrl || shopImage || 'https://via.placeholder.com/1200x400';

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `${vendor.shopSlug || 'vendor'}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-10">
      <motion.section
        className="overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(15,23,42,0.12)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '300px',
            borderRadius: '20px',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_42%)]" />
          <motion.div
            className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          >
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">{vendor.category}</p>
            <h1 className="mt-3 text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
              {vendor.shopName}
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-slate-200 sm:text-xl">
              {vendor.description}
            </p>
            <motion.a
              whileHover={{ y: -2, scale: 1.02 }}
              className="mt-8 inline-flex rounded-full bg-emerald-500 px-8 py-4 text-sm font-semibold text-slate-950 shadow-xl shadow-emerald-500/20 transition-colors hover:bg-emerald-400"
              href={`https://wa.me/91${vendor.phone}`}
              target="_blank"
              rel="noreferrer"
            >
              Contact on WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl bg-white p-8 shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">About {vendor.shopName}</h2>
          <p className="mt-4 text-slate-600">{vendor.description}</p>
          <div className="mt-8 space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Address</h3>
              <p className="mt-2 text-slate-700">{vendor.address}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Phone</h3>
              <p className="mt-2 text-slate-700">+91 {vendor.phone}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-3xl bg-white p-8 shadow-soft">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">QR Code</h2>
            <p className="mt-3 text-slate-600">Scan to open this vendor page directly.</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="Vendor QR Code" className="h-48 w-48 rounded-2xl bg-white p-3" />
            ) : (
              <div className="flex h-48 w-48 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                Generating QR...
              </div>
            )}
            <button
              type="button"
              onClick={handleDownloadQr}
              className="rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Download QR Code
            </button>
          </div>
        </div>
      </div>

      {TemplateComponent ? (
        <TemplateComponent vendor={vendor} />
      ) : (
        <div className="rounded-3xl bg-white p-10 shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">Template not available</h2>
          <p className="mt-3 text-slate-600">The selected template is missing. Please choose another design.</p>
        </div>
      )}
    </div>
  );
}

export default VendorLandingPage;
