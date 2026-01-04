import React from "react";
import Thw from "../assets/images__4_-removebg-preview.png";

import {
  SiVisa,
  SiMastercard,
  SiApplepay,
  SiPaypal,
  SiGooglepay,
} from "react-icons/si";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#f5f5f5]">
      {/* ===== شريط علوي FULL-BLEED بعرض الشاشة بالكامل ===== */}
      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
        {/* الخلفية المنحنية */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 36"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M28 0 H100 V36 H28 A28 28 0 0 1 28 0 Z" fill="#894361"/>
        </svg>

        {/* محتوى الشريط */}
        <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">
          {/* ملاحظة: أبقينا الخصائص كما هي (لا تغيّر في مكان الشعار) */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            {/* الشعار (كما هو) */}
            <div className="shrink-0 self-start">
              {/* <img
                src={log}
                alt="شعار الأنثور"
                className="w-28 md:w-40 object-contain select-none pointer-events-none"
              /> */}
            </div>

            {/* وسائل الدفع — تعديل فقط هنا */}
            <div className="text-white w-full md:w-auto md:ml-auto md:self-center">
              {/* غلاف كامل العرض لدفع المحتوى لأقصى اليمين */}
              <div className="w-full flex justify-end">
                {/* صف الأيقونات — أقصى اليمين دائمًا وبحجم متناسق مع الشعار */}
                <div className="flex items-center gap-5 md:gap-6 mb-3 md:mb-4">
                  <SiVisa className="text-3xl md:text-4xl drop-shadow-sm" />
                  <SiMastercard className="text-3xl md:text-4xl drop-shadow-sm" />
                  <SiApplepay className="text-3xl md:text-4xl drop-shadow-sm" />
                  {/* <SiPaypal className="text-3xl md:text-4xl drop-shadow-sm" /> */}
                                    <img
                    src={Thw}
                    className="w-10 invert brightness-0"
                    alt="Thawani"
                  />
                </div>
              </div>

              <p className="text-right text-lg md:text-2xl font-semibold leading-relaxed">
                وسائل دفع متعددة
                <br />
                اختر وسيلة الدفع المناسبة
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ===== نهاية الشريط العلوي ===== */}

      {/* الأقسام السفلية */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-10 text-[#2e3528] md:text-right text-center">
          
          {/* لافين */}
          <div>
            <h4 className="text-xl font-bold mb-3">الصندل بيوتي ستور </h4>
            <p className="text-sm leading-7 text-[#4a4a4a]">
                كل منتج لدينا هو مزيج من خبرة تقليدية وأصالة عُمانية، 
                ليكون لمسة خاصة تليق ببشرتك وذوقك.
            </p>
          </div>

          {/* روابط مهمة */}
          <div>
            <h4 className="text-xl font-bold mb-3">روابط مهمة</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-[#d3ae27] transition">
                  قصتنا
                </Link>
              </li>

              <li>
                <Link to="/shop" className="hover:text-[#d3ae27] transition">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link
                  to="/return-policy"
                  className="hover:text-[#d3ae27] transition"
                >
                  سياسة الاستبدال والاسترجاع
                </Link>
              </li>
            </ul>
          </div>

          {/* تواصل معنا */}
          <div>
            <h4 className="text-xl font-bold mb-3">تواصل معنا</h4>
            <p className="text-sm mb-4">+96896132215</p>
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href="https://www.instagram.com/bait_alsandal/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#d3ae27] transition"
                aria-label="Instagram - Lavin"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=96896132215&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#d3ae27] transition"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* الحقوق */}
        <div className="border-t border-[#2e3528]/20 pt-4 pb-8 text-center text-sm text-[#4a4a4a]">
<<<<<<< HEAD
          جميع الحقوق محفوظة لدى متجر الصندل بيوتي ستور —{" "}
=======
          جميع الحقوق محفوظة لدى الصندل بيوتي ستور  —{" "}
>>>>>>> 00db870 (وصف التغييرات هنا)
          <a
            href="https://www.instagram.com/mobadeere/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#2e3528] transition-colors"
          >
            تصميم مبادر
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;