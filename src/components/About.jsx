// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// import perfumeImg from '../assets/Screenshot 2025-08-08 213536.png';

const About = () => {
  return (
    <div dir="rtl" className="bg-white text-[#4E5A3F]">
      <section className="max-w-6xl mx-auto py-28 px-4 md:px-8">
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          {/* الصورة */}
          {/* <div className="md:w-1/2">
            <img
              src={perfumeImg}
              alt="منتجات الصندل الطبيعية"
              className="w-full max-w-md mx-auto rounded-xl shadow-lg transform scale-105"
            />
          </div> */}

          {/* المحتوى النصي */}
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-[#d3ae27] mb-6">
              ✨ الصندل بيوتي ستور ✨
            </h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-2xl italic text-[#9B2D1F]">
                "جمالك يبدأ من الطبيعة"
              </p>

              <p>
                🌿 منتجاتنا مستخلصة من <span className="font-semibold">الصندل التقليدي (جلو)</span>، 
                الذي عُرف منذ القدم بخصائصه الفعّالة في تفتيح البشرة ومنحها الصفاء والنضارة.
              </p>

              <p>
                💫 في الصندل بيوتي ستور، نؤمن أن الجمال الحقيقي يبدأ من الطبيعة. 
                لذلك جمعنا لكِ منتجات طبيعية آمنة، تمنح بشرتك إشراقة متجددة دون أي مواد كيميائية ضارة.
              </p>

              <p>
                كل منتج لدينا هو مزيج من خبرة تقليدية وأصالة عُمانية، 
                ليكون لمسة خاصة تليق ببشرتك وذوقك.
              </p>

              <p className="font-semibold text-[#4E5A3F]">
                ✨ الصندل... سر الجمال الطبيعي والصفاء الدائم.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-2xl text-[#d3ae27] font-semibold">
            الصندل بيوتي ستور: طبيعتك... أجمل لمستك
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
