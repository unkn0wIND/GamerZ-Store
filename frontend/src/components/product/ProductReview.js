import { AiOutlineAliwangwang } from "react-icons/ai";

export default function ProductReview({ reviews }) {
  return (
    <div className="">
      <h3 className="text-white mb-3 text-2xl flex gap-2 sm:mt-8">#Les avis utilisateurs  <AiOutlineAliwangwang/></h3>
      <hr className="bg-white" />
      {reviews &&
        reviews.map((review) => (
          <div key={review._id} className="review-card my-3">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(review.rating / 5) * 100}%` }}
              ></div>
            </div>
            <p className="review_user">@{review.user.name}</p>
            <p className="review_comment text-white mb-3">{review.comment}</p>

            <hr className="bg-white" />
          </div>
        ))}
    </div>
  );
}
