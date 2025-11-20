// src/pages/shop/ShopFiltering.jsx
import React, { useMemo } from 'react';

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
  const categories = filters?.categories ?? ['الكل'];
  const subMap = filters?.subMap ?? {};
  const { category, subcategory } = filtersState;

  // الأنواع المتاحة بناءً على الفئة
  const availableSubs = useMemo(() => {
    if (!category || category === 'الكل') return [];
    return subMap[category] ?? [];
  }, [category, subMap]);

  const onChangeCategory = (e) => {
    const value = e.target.value;
    setFiltersState({
      ...filtersState,
      category: value,
      // عند تغيير الفئة نفرّغ النوع إذا ما عاد مناسب
      subcategory: (subMap[value] && subMap[value].includes(subcategory)) ? subcategory : ''
    });
  };

  const onChangeSub = (e) => {
    setFiltersState({
      ...filtersState,
      subcategory: e.target.value
    });
  };

  return (
    <div className='space-y-5'>
      <h3 className='text-xl font-semibold'>الفلاتر</h3>

      {/* الفئات */}
      <div className='flex flex-col space-y-2'>
        <h4 className='font-medium text-lg'>الفئة</h4>
        <hr />
        {categories.map((cat) => (
          <label key={cat} className='capitalize cursor-pointer flex items-center gap-2'>
            <input
              type="radio"
              name="category"
              value={cat}
              checked={category === cat}
              onChange={onChangeCategory}
              className='mr-2'
            />
            <span>{cat}</span>
          </label>
        ))}
      </div>

      {/* الأنواع (تظهر فقط عند اختيار فئة محددة ولديها أنواع) */}
      {category !== 'الكل' && availableSubs.length > 0 && (
        <div className='flex flex-col space-y-2'>
          <h4 className='font-medium text-lg'>النوع</h4>
          <hr />
          {/* خيار: الكل ضمن الفئة */}
          <label className='capitalize cursor-pointer flex items-center gap-2'>
            <input
              type="radio"
              name="subcategory"
              value=""
              checked={subcategory === ''}
              onChange={onChangeSub}
              className='mr-2'
            />
            <span>الكل</span>
          </label>
          {availableSubs.map((sub) => (
            <label key={sub} className='capitalize cursor-pointer flex items-center gap-2'>
              <input
                type="radio"
                name="subcategory"
                value={sub}
                checked={subcategory === sub}
                onChange={onChangeSub}
                className='mr-2'
              />
              <span>{sub}</span>
            </label>
          ))}
        </div>
      )}

      {/* مسح الفلاتر */}
      <button
        onClick={clearFilters}
        className='bg-[#894361]  py-2 px-4 text-white rounded w-full'
      >
        مسح كل الفلاتر
      </button>
    </div>
  );
};

export default ShopFiltering;
