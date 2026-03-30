function MobileFirst({ vendor }) {
  const image = vendor.imageUrl || `https://via.placeholder.com/900x900?text=${encodeURIComponent(vendor.shopName)}`;

  return (
    <section className="rounded-3xl bg-white shadow-soft">
      <div className="space-y-6 p-6 sm:p-8">
        <div className="rounded-3xl bg-slate-950 p-6 text-white">
          <h1 className="text-3xl font-semibold">{vendor.shopName}</h1>
          <p className="mt-3 text-slate-300">{vendor.description}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-6">
            <h2 className="font-semibold text-slate-900">Phone</h2>
            <p className="mt-2 text-slate-600">+91 {vendor.phone}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <h2 className="font-semibold text-slate-900">Address</h2>
            <p className="mt-2 text-slate-600">{vendor.address}</p>
          </div>
        </div>
        <img src={image} alt={vendor.shopName} className="w-full rounded-3xl object-cover" />
        <div className="rounded-3xl bg-indigo-600 p-6 text-white">
          <h2 className="text-xl font-semibold">Ready to grow your business?</h2>
          <a
            href={`https://wa.me/91${vendor.phone}`}
            className="mt-4 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-900 transition hover:bg-slate-100"
          >
            Open WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

export default MobileFirst;
