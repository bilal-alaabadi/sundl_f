// ========================= src/components/admin/updateProduct/UpdateProduct.jsx =========================
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useFetchProductByIdQuery,
  useUpdateProductMutation,
} from '../../../../redux/features/products/productsApi';
import { useSelector } from 'react-redux';
import TextInput from '../addProduct/TextInput';
import SelectInput from '../addProduct/SelectInput';
// ✅ استخدام نفس كمبوننت الصور الخاص بالكود الأول
import UploadImage from '../manageProduct/UploadImag';

// الفئات فقط (النوع يعتمد عليها)
const CATEGORY_OPTIONS = [
  { label: 'أختر منتج', value: '' },
  { label: 'العناية بالبشرة', value: 'العناية بالبشرة' },
  { label: 'العناية بالشعر', value: 'العناية بالشعر' },
  { label: 'العناية بالشفاه', value: 'العناية بالشفاه' },
  { label: 'العطور والبخور', value: 'العطور والبخور' },
  { label: 'إكسسوارات العناية', value: 'إكسسوارات العناية' },
];

// نفس خريطة الأنواع من AddProduct
const SUBCATEGORIES_MAP = {
  'العناية بالبشرة': ['صوابين', 'مقشرات', 'تونر', 'ماسكات'],
  'العناية بالشعر': ['شامبوهات', 'زيوت', 'أقنعة'],
  'العناية بالشفاه': ['مرطب', 'محدد', 'مقشر'],
  'العطور والبخور': [],
  'إكسسوارات العناية': ['لوفة', 'فرش', 'أدوات'],
};

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const {
    data: productData,
    isLoading: isFetching,
    error: fetchError,
  } = useFetchProductByIdQuery(id);

  const [updateProduct, { isLoading: isUpdating }] =
    useUpdateProductMutation();

  const [product, setProduct] = useState({
    name: '',
    category: '',
    subcategory: '',
    price: '',
    oldPrice: '',
    description: '',
    image: [],
    stock: '',
  });

  // ✅ نفس نظام الصور في الكود الأول
  const [newImages, setNewImages] = useState([]);      // ملفات جديدة
  const [keepImages, setKeepImages] = useState([]);    // الصور التي نبقي عليها

  // الأنواع المتاحة بناءً على الفئة
  const availableSubcategories = useMemo(() => {
    return SUBCATEGORIES_MAP[product.category] || [];
  }, [product.category]);

  // تحميل بيانات المنتج في الفورم
  useEffect(() => {
    if (productData) {
      const currentImages = Array.isArray(productData.image)
        ? productData.image
        : productData.image
        ? [productData.image]
        : [];

      setProduct({
        name: productData.name || '',
        category: productData.category || '',
        subcategory: productData.subcategory || '',
        price: productData.price != null ? String(productData.price) : '',
        oldPrice:
          productData.oldPrice != null ? String(productData.oldPrice) : '',
        description: productData.description || '',
        image: currentImages,
        stock:
          productData.stock != null ? String(productData.stock) : '',
      });

      // ✅ حفظ الصور الحالية في keepImages مثل الكود الأول
      setKeepImages(currentImages);
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = {
      'اسم المنتج': product.name,
      'صنف المنتج': product.category,
      'السعر': product.price,
      'الوصف': product.description,
    };

    const missing = Object.entries(requiredFields)
      .filter(([_, v]) => !v)
      .map(([k]) => k);

    if (missing.length) {
      alert(`الرجاء ملء الحقول التالية: ${missing.join('، ')}`);
      return;
    }

    try {
      const formData = new FormData();

      formData.append('name', product.name);
      formData.append('category', product.category);

      // النوع اختياري → نرسله فقط لو اختاره المستخدم من القائمة
      if (availableSubcategories.length > 0 && product.subcategory !== '') {
        formData.append('subcategory', product.subcategory);
      }

      formData.append('price', product.price);
      formData.append('oldPrice', product.oldPrice || '');
      formData.append('description', product.description);
      formData.append('stock', product.stock || '0');
      formData.append('author', user?._id || '');

      // ✅ استخدام keepImages مثل الكود الأول
      formData.append('keepImages', JSON.stringify(keepImages || []));

      // ✅ الصور الجديدة مثل الكود الأول
      if (Array.isArray(newImages) && newImages.length > 0) {
        newImages.forEach((file) => formData.append('image', file));
      }

      await updateProduct({ id, body: formData }).unwrap();

      alert('تم تحديث المنتج بنجاح');
      navigate('/dashboard/manage-products');
    } catch (error) {
      console.error(error);
      alert('حدث خطأ أثناء التحديث');
    }
  };

  if (isFetching) return <div className="text-center py-8">جارٍ التحميل...</div>;
  if (fetchError)
    return (
      <div className="text-center py-8 text-red-500">
        خطأ في تحميل المنتج
      </div>
    );

  return (
    <div className="container mx-auto mt-8 px-4" dir="rtl">
      <h2 className="text-2xl font-bold mb-6">تحديث المنتج</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="اسم المنتج"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />

        <SelectInput
          label="صنف المنتج"
          name="category"
          value={product.category}
          options={CATEGORY_OPTIONS}
          onChange={handleChange}
          required
        />

        {/* النوع من قائمة جاهزة – اختياري */}
        {availableSubcategories.length > 0 && (
          <SelectInput
            label="النوع (اختياري)"
            name="subcategory"
            value={product.subcategory}
            onChange={handleChange}
            options={[
              { label: 'أختر النوع', value: '' },
              ...availableSubcategories.map((s) => ({
                label: s,
                value: s,
              })),
            ]}
          />
        )}

        <TextInput
          label="السعر"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          required
        />

        <TextInput
          label="السعر القديم (اختياري)"
          name="oldPrice"
          type="number"
          value={product.oldPrice}
          onChange={handleChange}
        />

        <TextInput
          label="الكمية بالمخزون"
          name="stock"
          type="number"
          value={product.stock}
          onChange={handleChange}
        />

        {/* ✅ نفس نظام الصور في الكود الأول */}
        <UploadImage
          name="image"
          id="image"
          initialImages={product.image}
          setImages={setNewImages}
          setKeepImages={setKeepImages}
        />

        <div>
          <label className="block mb-1 font-medium">وصف المنتج</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
            rows={4}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="px-6 py-2 bg-blue-600 text-white rounded"
        >
          {isUpdating ? 'جاري التحديث...' : 'حفظ التغييرات'}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
