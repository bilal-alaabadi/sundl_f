// src/pages/shop/ShopPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';
import imge from "../../assets/تصميم-بنر-للمتجر.png-02.png";

// ✅ خريطة الأنواع (نفسها من إضافة المنتجات)
const SUBCATEGORIES_MAP = {
  'العناية بالبشرة': ['صوابين', 'مقشرات', 'تونر', 'ماسكات'],
  'العناية بالشعر': ['شامبوهات', 'زيوت', 'أقنعة'],
  'العناية بالشفاه': ['مرطب', 'محدد', 'مقشر'],
  'العطور والبخور': [],
  'إكسسوارات العناية': ['لوفة', 'فرش', 'أدوات'],
};

// ✅ قائمة الفئات
const CATEGORIES = ['الكل', ...Object.keys(SUBCATEGORIES_MAP)];

const ShopPage = () => {
  const [filtersState, setFiltersState] = useState({
    category: 'الكل',
    subcategory: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(8);
  const [showFilters, setShowFilters] = useState(false);

  const { category, subcategory } = filtersState;

  useEffect(() => {
    setCurrentPage(1);
  }, [filtersState]);

  // ✅ استدعاء الـ API مع الفلاتر الحالية
  const { data, error, isLoading } = useFetchAllProductsQuery({
    category: category !== 'الكل' ? category : undefined,
    subcategory: (category !== 'الكل' && subcategory) ? subcategory : undefined,
    page: currentPage,
    limit: ProductsPerPage,
  });

  const products = data?.products ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalProducts = data?.totalProducts ?? products.length;

  const clearFilters = () => {
    setFiltersState({ category: 'الكل', subcategory: '' });
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const startProduct = useMemo(
    () => (currentPage - 1) * ProductsPerPage + 1,
    [currentPage, ProductsPerPage]
  );
  const endProduct = useMemo(
    () => Math.min(startProduct + ProductsPerPage - 1, totalProducts),
    [startProduct, totalProducts, ProductsPerPage]
  );

  if (isLoading) return <div className="text-center py-8">جاري تحميل المنتجات...</div>;
  if (error) return <div className="text-center py-8 text-red-500">حدث خطأ أثناء تحميل المنتجات.</div>;

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <img
          src={imge}
          alt="متجر الصندل"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">
            متجرنا
          </h2>
        </div>
      </section>

      {/* Products Section */}
      <section className='section__container py-8'>
<div className="md:hidden mb-4 w-full">
  <button
    onClick={() => setShowFilters((s) => !s)}
    className="w-full px-4 py-2 rounded-md bg-[#894361] text-white text-center"
  >
    {showFilters ? 'إخفاء الفلاتر' : 'عرض الفلاتر'}
  </button>
</div>


        <div className='flex flex-col md:flex-row md:gap-8 gap-6'>
          {/* Sidebar Filters */}
          <aside className={`md:w-1/4 ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <ShopFiltering
                filters={{ categories: CATEGORIES, subMap: SUBCATEGORIES_MAP }}
                filtersState={filtersState}
                setFiltersState={setFiltersState}
                clearFilters={clearFilters}
              />
            </div>
          </aside>

          {/* Products List */}
          <div className='md:w-3/4'>
            <div className='flex justify-between items-center mb-6'>
              {/* <h3 className='text-lg font-medium text-gray-700'>
                {totalProducts > 0
                  ? <>عرض {startProduct}-{endProduct} من {totalProducts} منتج</>
                  : 'لا توجد منتجات متاحة'}
              </h3> */}
            </div>

            {products.length > 0 ? (
              <>
                <ProductCards products={products} />

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className='mt-8 flex flex-col sm:flex-row items-center justify-between gap-4'>
                    <div className="text-sm text-gray-600">
                      الصفحة {currentPage} من {totalPages}
                    </div>
                    <div className='flex gap-2'>
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#9B2D1F] text-white hover:bg-[#7a241a]'}`}
                      >
                        السابق
                      </button>

                      <div className="flex gap-1">
                        {[...Array(totalPages)].map((_, index) => (
                          <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`w-10 h-10 flex items-center justify-center rounded-md ${currentPage === index + 1 ? 'bg-[#9B2D1F] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#9B2D1F] text-white hover:bg-[#7a241a]'}`}
                      >
                        التالي
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-lg text-gray-600">لا توجد منتجات متاحة حسب الفلتر المحدد</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-[#9B2D1F] text-white rounded-md hover:bg-[#7a241a]"
                >
                  عرض جميع المنتجات
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
