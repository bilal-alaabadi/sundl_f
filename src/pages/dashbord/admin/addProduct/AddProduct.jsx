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
  { label: 'المكياج', value: 'المكياج' },
  { label: 'الشنط', value: 'الشنط' },
  { label: 'الحنا', value: 'الحنا' },
  { label: 'الأظافر', value: 'الأظافر' },
  { label: 'عدسات', value: 'عدسات' },
  { label: 'العطور والبخور', value: 'العطور والبخور' },
  { label: 'إكسسوارات العناية', value: 'إكسسوارات العناية' },
];

const SUBCATEGORIES_MAP = {
  'العناية بالبشرة': ['صوابين','مقشرات','تونر','ماسكات','كريمات الوجه','كريمات الجسم','كريمات اليد','سيرومات'],
  'العناية بالشعر': ['شامبوهات','زيوت','أقنعة'],
  'العناية بالشفاه': ['مرطب','محدد','مقشر','لماع'],
  'المكياج': ['برايمر','كريم أساس','بودرة مضغوطة','لوس بودر','جلوز','محدد الشفايف','لماع','كونتور','ظل العيون','بلاشر','هايلايت','قلم الحواجب','كونسيلير'],
  'الشنط': ['ميني','أحجام متوسطة','أحجام كبيرة'],
  'الحنا': ['ستيكرات الحنا تاتو','ستيكرات الحنا عاديه','حنا بهاونا او مزيونه','حنا السريع الاحمر او الماروني'],
  'الأظافر': ['ادوات الاظافر','اظافر اكتنشن','بودره اكريلك','جل بوليش','صبغ اظافر'],
  'عدسات': [],
  'العطور والبخور': [],
  'إكسسوارات العناية': ['لوفة','فرش','أدوات'],
};

const AddProduct = () => {
  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState({
    name: '',
    category: '',
    subcategory: '',
    price: '',
    oldPrice: '',
    description: '',
    stock: '', // ✅ الكمية
  });

  const [image, setImage] = useState([]);
  const [AddProductReq, { isLoading }] = useAddProductMutation();
  const navigate = useNavigate();

  const availableSubcategories = SUBCATEGORIES_MAP[product.category] || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = {
      'أسم المنتج': product.name,
      'صنف المنتج': product.category,
      'السعر': product.price,
      'الوصف': product.description,
      'الكمية': product.stock,
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
        price: Number(product.price),
        oldPrice: product.oldPrice ? Number(product.oldPrice) : undefined,
        stock: Number(product.stock),
        inStock: Number(product.stock) > 0,
        image,
        author: user?._id,
      }).unwrap();

      alert('تمت إضافة المنتج بنجاح');

      setProduct({
        name: '',
        category: '',
        subcategory: '',
        price: '',
        oldPrice: '',
        description: '',
        stock: '',
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
        <TextInput label="أسم المنتج" name="name" value={product.name} onChange={handleChange} />

        <SelectInput label="صنف المنتج" name="category" value={product.category} onChange={handleChange} options={CATEGORY_OPTIONS} />

        {availableSubcategories.length > 0 && (
          <SelectInput
            label="النوع"
            name="subcategory"
            value={product.subcategory}
            onChange={handleChange}
            options={[
              { label: 'أختر النوع', value: '' },
              ...availableSubcategories.map((sub) => ({ label: sub, value: sub })),
            ]}
          />
        )}

        <TextInput label="السعر القديم (اختياري)" name="oldPrice" type="number" value={product.oldPrice} onChange={handleChange} />
        <TextInput label="السعر" name="price" type="number" value={product.price} onChange={handleChange} />

        {/* ✅ حقل الكمية */}
        <TextInput label="الكمية" name="stock" type="number" placeholder="10" value={product.stock} onChange={handleChange} />

        <UploadImage name="image" id="image" uploaded={image} setImage={setImage} />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          rows={4}
          className="add-product-InputCSS"
          placeholder="اكتب وصف المنتج"
        />

        <button type="submit" className="add-product-btn" disabled={isLoading}>
          {isLoading ? 'جاري الإضافة...' : 'أضف منتج'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
