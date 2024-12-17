import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Virtual } from "swiper/modules";
import ImageCard from "../ImageCard";

export default function SwiperCustom({ posts }: { posts: PostType[] }) {
  return (
    <div className="mb-[60px]">
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        navigation={true}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
          type: "fraction",
        }}
        breakpoints={{
          // 화면 너비에 따라 보여지는 슬라이드 수 조정
          768: { slidesPerView: 1 }, // 모바일
          1024: { slidesPerView: 2 }, // 태블릿
          1280: { slidesPerView: 3 }, // 데스크탑
          1536: { slidesPerView: 4 }, // 큰 화면
        }}
        virtual
      >
        {posts.map((post) => (
          <SwiperSlide key={post._id}>
            <div className="w-[250px] m-auto">
              <ImageCard {...post} />
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination-box">
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}
