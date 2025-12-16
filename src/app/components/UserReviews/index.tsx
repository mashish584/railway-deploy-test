"use client";

import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Autoplay } from "swiper/modules";
import RatingCard from "../RatingCard";
import styles from "./UserReviews.module.css";
import useIsMobile from "@/hooks/useIsMobile";
// Import Swiper styles - Next.js will optimize and code-split these
import "@/utils/load-swiper-styles";

export interface ReviewData {
	id: number;
	ratings: number;
	review: string;
	userImage: string;
	username: string;
	designation: string;
}

interface UserReviewsProps {
	className?: string;
	reviews?: ReviewData[];
}

const UserReviews: React.FC<UserReviewsProps> = ({ className, reviews: propReviews }) => {
	const isMobileView = useIsMobile();
	const swiperRef = useRef<SwiperClass | null>(null);
	// Sample review data - 2 reviews (used as default)
	const defaultReviews: ReviewData[] = [
		{
			id: 1,
			ratings: 5,
			review:
				"We had sugar ants all over our kitchen bench. Ecovia treated the nest with baits, and within days the ants were gone. They even gave us prevention tips that have worked.",
			userImage: "",
			username: "Anna",
			designation: "",
		},
		{
			id: 2,
			ratings: 5,
			review:
				"After heavy rain, our yard was full of ant mounds. Ecovia identified the species, treated the colonies, and we've had no repeat issues.",
			userImage: "",
			username: "George",
			designation: "",
		},
	];

	// Use prop reviews if provided, otherwise use default reviews
	const reviews = propReviews || defaultReviews;
	const showGradient = (isMobileView && reviews.length > 1) || (!isMobileView && reviews.length > 5);

	// Cleanup Swiper instance on unmount to prevent memory leaks
	useEffect(() => {
		return () => {
			if (swiperRef.current) {
				// Stop autoplay before destroying
				swiperRef.current.autoplay?.stop();
				// Destroy Swiper instance to release all resources
				swiperRef.current.destroy(true, true);
				// Clear the ref
				swiperRef.current = null;
			}
		};
	}, []);

	return (
		<section className={`${styles.userReviewsSection} ${className}`}>
			<div className={styles.container}>
				<div className={styles.carouselWrapper}>
					<Swiper
						key={isMobileView ? "mobile" : "desktop"}
						modules={[Autoplay]}
						spaceBetween={24}
						slidesPerView="auto"
						centeredSlides={isMobileView}
						autoplay={{
							delay: 3000,
							disableOnInteraction: false,
						}}
						loop={true}
						speed={1000}
						onSwiper={(swiper) => (swiperRef.current = swiper)}
						className={styles.swiper}>
						{reviews.map((review) => (
							<SwiperSlide key={review.id} className={styles.slide}>
								<RatingCard
									ratings={review.ratings}
									review={review.review}
									userImage={review.userImage}
									username={review.username}
									designation={review.designation}
								/>
							</SwiperSlide>
						))}
					</Swiper>

					{/* Gradient overlays for smooth edges */}
					{showGradient && (
						<>
							<div className={styles.gradientLeft}></div>
							<div className={styles.gradientRight}></div>
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default UserReviews;
