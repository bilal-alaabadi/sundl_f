// ========================= src/pages/shop/SingleProduct.jsx =========================
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { addToCart } from '../../../redux/features/cart/cartSlice';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchProductByIdQuery(id);
  const { country } = useSelector((state) => state.cart);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cartQty, setCartQty] = useState(1);

  const isAEDCountry = country === 'الإمارات' || country === 'دول الخليج';
  const currency = isAEDCountry ? 'د.إ' : 'ر.ع.';
  const exchangeRate = isAEDCountry ? 9.5 : 1;

  if (isLoading) return <p>جاري التحميل...</p>;
  if (error) return <p>حدث خطأ أثناء تحميل تفاصيل المنتج.</p>;
  if (!data) return null;

  const unitPrice = (data.regularPrice || data.price || 0) * exchangeRate;

  const rawStock = data.stock;
  const hasStock =
    rawStock !== undefined &&
    rawStock !== null &&
    rawStock !== '';
  const stock = hasStock ? Number(rawStock) : 0;
  const isOutOfStock = hasStock ? stock <= 0 : false;

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    const safeQty = hasStock ? Math.min(cartQty, stock) : cartQty;
    if (safeQty <= 0) return;

    dispatch(
      addToCart({
        ...data,
        price: data.price,
        quantity: safeQty,
        currency,
        exchangeRate,
      })
    );

    setCartQty(1);
  };

  const images = Array.isArray(data.image) ? data.image : [];

  const nextImage = () =>
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );

  const prevImage = () =>
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  return (
    <section
      className="section__container bg-gradient-to-r mt-8"
      dir="rtl"
    >
      <div className="flex flex-col items-center md:flex-row gap-8">
        {/* الصور */}
        <div className="md:w-1/2 w-full relative">
          {images.length > 0 ? (
            <>
              <div className="overflow-hidden rounded-md">
                <img
                  src={images[currentImageIndex]}
                  alt={data.name}
                  className="w-full h-auto"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500';
                  }}
                />
              </div>

              {images.length > 1 && (
                <>
                  {/* أزرار التنقل يمين/يسار */}
                  <button
                    onClick={prevImage}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#894361] text-white p-2 rounded-full"
                    type="button"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#894361] text-white p-2 rounded-full"
                    type="button"
                  >
                    ›
                  </button>

                  {/* عرض جميع الصور في الأسفل كـ Thumbnails (مُتمركزة في الجوال) */}
                  <div className="mt-4 flex flex-wrap justify-center gap-3">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentImageIndex(index)}
                        className={`border rounded-md overflow-hidden flex-shrink-0 ${
                          index === currentImageIndex
                            ? 'border-[#894361]'
                            : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${data.name} - ${index + 1}`}
                          className="w-16 h-16 object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/150';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <p>لا توجد صور متاحة.</p>
          )}
        </div>

        {/* التفاصيل */}
<div className="md:w-1/2 w-full flex flex-col items-center md:items-start text-center md:text-right">
  <h3 className="text-2xl font-semibold mb-4">{data.name}</h3>
  <p className="text-gray-600 mb-2">الفئة: {data.category}</p>
  <p className="text-gray-600 mb-4">{data.description}</p>

  {/* عرض الكمية المتوفرة */}
  {/* <div className="mb-3">
    {isOutOfStock ? (
      <span className="inline-block px-3 py-1 rounded-md bg-red-100 text-red-700 text-sm font-medium">
        غير متوفر حالياً
      </span>
    ) : hasStock ? (
      <span className="inline-block px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 text-sm font-medium">
        المتوفر بالمخزون: {stock}
      </span>
    ) : null}
  </div> */}

  <div className="text-xl text-[#894361] mb-6">
    السعر: {unitPrice.toFixed(2)} {currency}
  </div>

  {/* عداد الكمية */}
  <div className="mb-6 flex items-center gap-4 justify-center md:justify-start">
    <button
      type="button"
      onClick={() => setCartQty((q) => (q > 1 ? q - 1 : 1))}
      className="w-10 h-10 flex items-center justify-center bg-[#894361] text-white rounded-md"
      disabled={isOutOfStock}
    >
      -
    </button>
    <div className="min-w-[3rem] text-center font-bold text-lg">
      {cartQty}
    </div>
    <button
      type="button"
      onClick={() =>
        setCartQty((q) => {
          if (isOutOfStock) return q;
          if (!hasStock) return q + 1;
          const next = q + 1;
          return Math.min(next, stock);
        })
      }
      className="w-10 h-10 flex items-center justify-center bg-[#894361] text-white rounded-md"
      disabled={isOutOfStock}
    >
      +
    </button>
  </div>

  <button
    onClick={handleAddToCart}
    className={`px-6 py-3 rounded-md text-white hover:opacity-90 ${
      isOutOfStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#894361]'
    } mx-auto md:mx-0`}
    disabled={isOutOfStock}
  >
    {isOutOfStock ? 'غير متوفر' : 'إضافة إلى السلة'}
  </button>
</div>

      </div>
    </section>
  );
};

export default SingleProduct;
