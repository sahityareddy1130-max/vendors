function SidebarNav({ vendor }) {
  const image = vendor.imageUrl || `https://via.placeholder.com/900x900?text=${encodeURIComponent(vendor.shopName)}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
      <aside className="rounded-3xl bg-slate-900 p-8 text-white shadow-soft">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">{vendor.shopName}</h2>
          <p className="text-slate-300">{vendor.category}</p>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-slate-400">Address</h3>
              <p className="mt-2 text-slate-200">{vendor.address}</p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-slate-400">Phone</h3>
              <p className="mt-2 text-slate-200">+91 {vendor.phone}</p>
            </div>
          </div>
          <a
            href={`https://wa.me/91${vendor.phone}`}
            className="inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400"
          >
            WhatsApp Contact
          </a>
        </div>
      </aside>
      <div className="space-y-6 rounded-3xl bg-white p-8 shadow-soft">
        <h2 className="text-2xl font-semibold text-slate-900">Business Overview</h2>
        <p className="text-slate-600">{vendor.description}</p>
        <img src={image} alt={vendor.shopName} className="w-full rounded-3xl object-cover" />
      </div>
    </div>
  );
}

export default SidebarNav;
