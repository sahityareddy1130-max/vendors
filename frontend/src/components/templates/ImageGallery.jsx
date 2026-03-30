function ImageGallery({ vendor }) {
  const image1 = vendor.imageUrl || `https://via.placeholder.com/900x600?text=Gallery+1`;
  const image2 = `https://via.placeholder.com/900x600?text=Gallery+2`;
  const image3 = `https://via.placeholder.com/900x600?text=Gallery+3`;

  return (
    <section className="rounded-3xl bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl bg-slate-950 p-10 text-white shadow-2xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Image Gallery</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight">{vendor.shopName}</h1>
          <p className="mt-4 text-slate-300">{vendor.description}</p>
          <a
            href={`https://wa.me/91${vendor.phone}`}
            className="mt-8 inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-400"
          >
            Message on WhatsApp
          </a>
          <div className="mt-10 space-y-4 rounded-3xl bg-slate-800 p-6 text-slate-300">
            <div>
              <h2 className="font-semibold">Address</h2>
              <p className="mt-2">{vendor.address}</p>
            </div>
            <div>
              <h2 className="font-semibold">Category</h2>
              <p className="mt-2">{vendor.category}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 sm:grid-rows-[200px_200px]">
          <div className="sm:col-span-2 rounded-3xl overflow-hidden shadow-lg shadow-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <img src={image1} alt="Gallery 1" className="h-full w-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-lg shadow-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <img src={image2} alt="Gallery 2" className="h-full w-full object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden shadow-lg shadow-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <img src={image3} alt="Gallery 3" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImageGallery;
