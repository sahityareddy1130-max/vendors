const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/vendors.json');

const readVendors = () => {
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    return [];
  }
};

const saveVendors = (vendors) => {
  fs.writeFileSync(dataPath, JSON.stringify(vendors, null, 2));
};

const slugify = (value) => {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const multer = require('multer');
const upload = multer();

// POST /api/vendors - Create a new vendor (supports FormData)
router.post('/', upload.none(), (req, res) => {
  const { shopName, description, phone, address, category, template } = req.body;
  if (!shopName || !description || !phone || !address || !category || !template) {
    return res.status(400).json({ message: 'Please fill all required fields.' });
  }
  const shopSlug = slugify(shopName);
  const vendors = readVendors();
  const newVendor = {
    id: Date.now(),
    shopName,
    description,
    phone,
    address,
    category,
    template,
    imageUrl: '',
    shopSlug,
    createdAt: new Date().toISOString(),
  };
  const filtered = vendors.filter((vendor) => vendor.shopSlug !== shopSlug);
  filtered.push(newVendor);
  saveVendors(filtered);
  res.status(201).json(newVendor);
});

// GET /api/vendors - Get all vendors
router.get('/', (req, res) => {
  const vendors = readVendors();
  res.json(vendors);
});

// GET /api/vendors/:shopSlug - Get a vendor by slug
router.get('/:shopSlug', (req, res) => {
  const shopSlug = req.params.shopSlug;
  const vendors = readVendors();
  const vendor = vendors.find((item) => item.shopSlug === shopSlug);

  if (!vendor) {
    return res.status(404).json({ message: 'Vendor not found' });
  }

  res.json(vendor);
});

// POST /api/vendors/pros - Create a new 'pro' vendor
router.post('/pros', (req, res) => {
  try {
    const { shopName, description, phone, address, category, template, imageUrl } = req.body;

    if (!shopName || !description || !phone || !address || !category || !template) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    const shopSlug = slugify(shopName + '-pro');
    const vendors = readVendors();

    const newProVendor = {
      id: Date.now(),
      shopName,
      description,
      phone,
      address,
      category,
      template,
      imageUrl: imageUrl || '',
      shopSlug,
      isPro: true,
      createdAt: new Date().toISOString(),
    };

    const filtered = vendors.filter((vendor) => vendor.shopSlug !== shopSlug);
    filtered.push(newProVendor);
    saveVendors(filtered);

    res.status(201).json(newProVendor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
