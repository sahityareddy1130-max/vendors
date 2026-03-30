function RestaurantMenu({ vendor }) {
  const image = vendor.imageUrl || `https://via.placeholder.com/1200x700?text=${encodeURIComponent(vendor.shopName)}`;

  return (
    <section className="rounded-3xl bg-slate-50 shadow-soft">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl bg-white p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Restaurant Menu Style</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">{vendor.shopName}</h1>
          <p className="mt-4 text-slate-600">{vendor.description}</p>
          <div className="mt-8 space-y-4">
            <div className="rounded-3xl border border-slate-200 p-6">
              <h2 className="font-semibold text-slate-900">Special Dish</h2>
              <p className="mt-2 text-slate-600">Fresh quality and local flavors every day.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-6">
              <h2 className="font-semibold text-slate-900">Contact</h2>
              <p className="mt-2 text-slate-600">+91 {vendor.phone}</p>
            </div>
          </div>
          <a
            href={`https://wa.me/91${vendor.phone}`}
            className="mt-6 inline-flex rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
          >
            Order via WhatsApp
          </a>
        </div>
        <img src={image} alt={vendor.shopName} className="h-full w-full rounded-3xl object-cover" />
      </div>
    </section>
  );
}

export default RestaurantMenu;
