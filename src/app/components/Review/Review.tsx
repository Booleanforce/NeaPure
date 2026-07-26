import { ArrowRight, Play, CheckCircle2, Star } from "lucide-react";

interface Review {
  name: string;
  location: string;
  rating: number;
  thumbnail: string;
}

const reviews: Review[] = [
  {
    name: "Name Here",
    location: "Location Here",
    rating: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&h=500&fit=crop",
  },
  {
    name: "Alice Smith",
    location: "New York, NY",
    rating: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&h=500&fit=crop",
  },
  {
    name: "John Doe",
    location: "Los Angeles, CA",
    rating: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&h=500&fit=crop",
  },
  {
    name: "Emily Johnson",
    location: "Chicago, IL",
    rating: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&h=500&fit=crop",
  },
  {
    name: "Michael Brown",
    location: "Houston, TX",
    rating: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&h=500&fit=crop",
  },
];

interface StarRatingProps {
  rating: number;
}

function StarRating({ rating }: StarRatingProps) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const isFilled = i < rating;

        return (
          <Star
            key={i}
            className={`h-4 w-4 ${
              isFilled
                ? "fill-amber-400 text-amber-400"
                : "fill-transparent text-neutral-300"
            }`}
            strokeWidth={isFilled ? 0 : 2}
          />
        );
      })}
    </div>
  );
}

interface ReviewCardProps {
  name: string;
  location: string;
  rating: number;
  thumbnail: string;
}

function ReviewCard({
  name,
  location,
  rating,
  thumbnail,
}: ReviewCardProps) {
  return (
    <div className="flex flex-col rounded-2xl bg-neutral-50 p-3">
      {/* Video thumbnail */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
        <img
          src={thumbnail}
          alt={`Video review from ${name}`}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            aria-label={`Play video review from ${name}`}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-105"
          >
            <Play className="ml-0.5 h-4 w-4 fill-neutral-900 text-neutral-900" />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2 px-1 pt-4">
        <div>
          <p className="text-lg font-semibold text-neutral-900">
            {name}
          </p>

          <p className="text-sm text-neutral-500">
            {location}
          </p>
        </div>

        <StarRating rating={rating} />

        <div className="flex items-center gap-1.5 text-sm font-medium text-neutral-700">
          <CheckCircle2
            className="h-4 w-4 text-blue-500"
            strokeWidth={2}
            fill="none"
          />

          <span>Verified Customer</span>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="bg-white px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-8xl rounded-4xl bg-sky-100/100 p-6 sm:p-10">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-bold tracking-wide text-blue-600">
              WHAT OUR CUSTOMERS SAY
            </p>

            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
              Real People. Real Experiences.
            </h2>

            <p className="mt-2 text-neutral-600">
              Video Review from happy Neapure Customers
            </p>
          </div>

          <button
            type="button"
            className="flex shrink-0 items-center gap-2 rounded-full border border-blue-500 bg-sky-100/100 px-5 py-2.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
          >
            View All Reviews
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {reviews.map((review) => (
            <ReviewCard
              key={review.name}
              name={review.name}
              location={review.location}
              rating={review.rating}
              thumbnail={review.thumbnail}
            />
          ))}
        </div>
      </div>
    </section>
  );
}