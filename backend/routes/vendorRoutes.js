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

// POST /api/vendors - Create a new vendor
router.post('/', (req, res) => {
  console.log('POST /api/vendors called');
  const { shopName, description, phone, address, category, template, imageUrl } = req.body;

  if (!shopName || !description || !phone || !address || !category || !template) {
    console.log('Missing required fields');
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
    imageUrl: imageUrl || '',
    shopSlug,
    createdAt: new Date().toISOString(),
  };

  const filtered = vendors.filter((vendor) => vendor.shopSlug !== shopSlug);
  filtered.push(newVendor);
  saveVendors(filtered);

  console.log('Vendor created:', newVendor);
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
