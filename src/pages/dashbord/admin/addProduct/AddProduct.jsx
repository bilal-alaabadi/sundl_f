// src/pages/dashboard/products/addProduct/AddProduct.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import UploadImage from './UploadImage';
import { useAddProductMutation } from '../../../../redux/features/products/productsApi';
import { useNavigate } from 'react-router-dom';

// ======================= الفئات والأنواع =======================
const CATEGORY_OPTIONS = [
  { label: 'أختر منتج', value: '' },
  { label: 'العناية بالبشرة', value: 'العناية بالبشرة' },
  { label: 'العناية بالشعر', value: 'العناية بالشعر' },
  { label: 'العناية بالشفاه', value: 'العناية بالشفاه' },
  { label: 'العطور والبخور', value: 'العطور والبخور' },
  { label: 'إكسسوارات العناية', value: 'إكسسوارات العناية' },
];

// خريطة الأنواع لكل فئة
const SUBCATEGORIES_MAP = {
  'العناية بالبشرة': ['صوابين', 'مقشرات', 'تونر', 'ماسكات'],
  'العناية بالشعر': ['شامبوهات', 'زيوت', 'أقنعة'],
  'العناية بالشفاه': ['مرطب', 'محدد', 'مقشر'],
  'العطور والبخور': [],
  'إكسسوارات العناية': ['لوفة', 'فرش', 'أدوات'],
};

const AddProduct = () => {
  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState({
    name: '',
    category: '',
    subcategory: '',   // ✅ النوع
    price: '',
    oldPrice: '',
    description: '',
    stock: '',         // ✅ جديد: الكمية
  });

  const [image, setImage] = useState([]);
  const [AddProductReq, { isLoading }] = useAddProductMutation();
  const navigate = useNavigate();

  // الأنواع المتاحة حسب الفئة المختارة
  const availableSubcategories = SUBCATEGORIES_MAP[product.category] || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق من الحقول المطلوبة (نفس السابق، لم نضف stock كحقل إجباري)
    const requiredFields = {
      'أسم المنتج': product.name,
      'صنف المنتج': product.category,
      'السعر': product.price,
      'الوصف': product.description,
      'الصور': image.length > 0,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([field]) => field);

    if (missingFields.length > 0) {
      alert(`الرجاء ملء الحقول التالية: ${missingFields.join('، ')}`);
      return;
    }

    try {
      await AddProductReq({
        ...product,
        stock: product.stock, // ✅ إرسال الكمية للباك
        image,
        author: user?._id,
      }).unwrap();

      alert('تمت إضافة المنتج بنجاح');
      setProduct({
        name: '',
        category: '',
        subcategory: '',
        oldPrice: '',
        price: '',
        description: '',
        stock: '', // ✅ تصفير الكمية بعد الإضافة
      });
      setImage([]);
      navigate('/shop');
    } catch (error) {
      console.log('Failed to submit product', error);
      alert('حدث خطأ أثناء إضافة المنتج');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">إضافة منتج جديد</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="أسم المنتج"
          name="name"
          placeholder="أكتب أسم المنتج"
          value={product.name}
          onChange={handleChange}
        />

        <SelectInput
          label="صنف المنتج"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={CATEGORY_OPTIONS}
        />

        {availableSubcategories.length > 0 && (
          <SelectInput
            label="النوع"
            name="subcategory"
            value={product.subcategory}
            onChange={handleChange}
            options={[
              { label: 'أختر النوع', value: '' },
              ...availableSubcategories.map((sub) => ({
                label: sub,
                value: sub,
              })),
            ]}
          />
        )}

        <TextInput
          label="السعر القديم (اختياري)"
          name="oldPrice"
          type="number"
          placeholder="100"
          value={product.oldPrice}
          onChange={handleChange}
        />

        <TextInput
          label="السعر"
          name="price"
          type="number"
          placeholder="50"
          value={product.price}
          onChange={handleChange}
        />

        {/* ✅ خانة كمية المنتج */}
        <TextInput
          label="الكمية في المخزون"
          name="stock"
          type="number"
          placeholder="مثال: 10"
          value={product.stock}
          onChange={handleChange}
        />

        <UploadImage
          name="image"
          id="image"
          uploaded={image}
          setImage={setImage}
        />
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            وصف المنتج
          </label>
          <textarea
            name="description"
            id="description"
            className="add-product-InputCSS"
            value={product.description}
            placeholder="اكتب وصف المنتج"
            onChange={handleChange}
            rows={4}
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="add-product-btn"
            disabled={isLoading}
          >
            {isLoading ? 'جاري الإضافة...' : 'أضف منتج'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
