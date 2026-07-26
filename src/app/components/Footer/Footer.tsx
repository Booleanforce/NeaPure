import Image from "next/image";
import { ArrowRight, Send } from "lucide-react";



const FEATURES = [
  {
    title: "24/7 Support",
    text: "Live technicians on call around the clock",
  },
  {
    title: "Certified Techs",
    text: "Trained and background-checked specialists",
    active: true,
  },
  {
    title: "Genuine Parts",
    text: "Only OEM filters and membranes, ever",
  },
  {
    title: "Nationwide Reach",
    text: "Service centers in every major city",
  },
];

const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: ["About", "Careers", "Customers", "Blog", "Brand", "Research"],
  },
  {
    title: "Support",
    links: [
      "Help Center",
      "Contact Us",
      "Installation Guide",
      "Warranty",
      "Shipping",
    ],
  },
  {
    title: "Legal",
    links: ["Terms of Service", "Privacy Policy", "Returns"],
  },
];

/* ---------- Inline social icons (from Figma export) ---------- */
const SocialGalleryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M16.9265 8.02637H13.9816C12.9378 8.02637 12.0894 8.86847 12.0817 9.91229L11.9964 21.4268M10.082 14.0017H14.8847" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SocialCameraIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M17.5078 6.5H17.4988" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SocialXIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M3 21L10.5484 13.4516M13.4516 10.5484L21 21H16L10.5484 13.4516L3 3H8L13.4516 10.5484ZM21 3L13.4516 10.5484" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SocialChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M15.5007 17.75L16.7941 19.5205C16.9155 19.7127 17.1488 19.7985 17.3618 19.7224C18.1656 19.4353 20.1579 18.6572 21.7983 17.4725C21.9262 17.3801 22.0001 17.2261 21.9991 17.0673C21.9991 8.25 19.5007 5.75 19.5007 5.75C19.5007 5.75 17.5007 4.60213 15.3546 4.25602C15.1435 4.22196 14.9367 4.33509 14.8428 4.52891L14.3978 5.44677C14.3978 5.44677 13.2852 5.21397 11.9999 5.21397C10.7146 5.21397 9.60204 5.44677 9.60204 5.44677L9.15705 4.52891C9.06308 4.33509 8.85638 4.22196 8.64523 4.25602C6.50073 4.60187 4.50073 5.75 4.50073 5.75C4.50073 5.75 2.00074 8.25 2.00074 17.0673C1.99974 17.2261 2.07359 17.3801 2.20153 17.4725C3.8419 18.6572 5.83424 19.4353 6.638 19.7224C6.85099 19.7985 7.08431 19.7127 7.20576 19.5205L8.50073 17.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.5007 16.75C17.5007 16.75 15.2056 18.25 12.0007 18.25C8.79581 18.25 6.50073 16.75 6.50073 16.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.2507 12.25C17.2507 13.3546 16.4672 14.25 15.5007 14.25C14.5342 14.25 13.7507 13.3546 13.7507 12.25C13.7507 11.1454 14.5342 10.25 15.5007 10.25C16.4672 10.25 17.2507 11.1454 17.2507 12.25Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.2507 12.25C10.2507 13.3546 9.46723 14.25 8.50073 14.25C7.53424 14.25 6.75073 13.3546 6.75073 12.25C6.75073 11.1454 7.53424 10.25 8.50073 10.25C9.46723 10.25 10.2507 11.1454 10.2507 12.25Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const SOCIALS = [
  { label: "Instagram", Icon: SocialGalleryIcon },
  { label: "Camera", Icon: SocialCameraIcon },
  { label: "X", Icon: SocialXIcon },
  { label: "Chat", Icon: SocialChatIcon },
];

/* ---------- Verified/Certified badge icon (from Figma export) ---------- */
const VerifiedBadgeIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 48 48"
    fill="none"
  >
    <g clipPath="url(#badge-clip)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.6205 1.35763C26.603 0.482936 25.3057 0.00195312 23.9639 0.00195312C22.6221 0.00195313 21.3248 0.482936 20.3073 1.35763C19.6613 1.91099 19.019 2.46872 18.3805 3.03077C17.5473 2.86285 16.713 2.70056 15.8776 2.54392C14.5585 2.29456 13.1937 2.52659 12.0311 3.19786C10.8685 3.86912 9.98518 4.93511 9.54163 6.2022C9.25592 7.01592 8.9782 7.82506 8.70849 8.62963C7.88563 8.90392 7.06163 9.18735 6.23649 9.47992C4.9694 9.92347 3.90341 10.8068 3.23214 11.9694C2.56087 13.132 2.32885 14.4968 2.5782 15.8159C2.7382 16.6616 2.90277 17.5016 3.07192 18.3359C2.50049 18.9851 1.92906 19.6422 1.35763 20.3073C0.482936 21.3248 0.00195312 22.6221 0.00195312 23.9639C0.00195313 25.3057 0.482936 26.603 1.35763 27.6205C1.92906 28.2902 2.50506 28.9508 3.08563 29.6022C2.91192 30.4571 2.74277 31.3176 2.5782 32.1839C2.06392 34.9131 3.61706 37.6011 6.23649 38.5199C7.06163 38.8125 7.88563 39.0959 8.70849 39.3702C8.98049 40.1748 9.2582 40.9839 9.54163 41.7976C9.98454 43.0654 10.8676 44.1321 12.0302 44.8041C13.1929 45.476 14.5581 45.7085 15.8776 45.4593C16.7371 45.2971 17.5919 45.1291 18.4422 44.9553C19.0799 45.5222 19.7256 46.0845 20.3793 46.6422C22.4811 48.4525 25.5908 48.4525 27.6925 46.6422C28.3439 46.0868 28.9862 45.5291 29.6193 44.9691C30.4491 45.1359 31.2833 45.2993 32.1222 45.4593C34.8479 45.9736 37.5393 44.4171 38.4582 41.7976C38.7439 40.9839 39.0216 40.1748 39.2913 39.3702C40.1142 39.0959 40.9382 38.8125 41.7633 38.5199C43.0298 38.0757 44.095 37.1922 44.7656 36.0296C45.4362 34.8671 45.6678 33.5026 45.4182 32.1839C45.2604 31.3428 45.097 30.5028 44.9279 29.6639C45.4993 29.0148 46.0708 28.3576 46.6422 27.6925C47.5169 26.675 47.9979 25.3777 47.9979 24.0359C47.9979 22.6941 47.5169 21.3968 46.6422 20.3793C46.0707 19.7137 45.4947 19.052 44.9142 18.3942C45.0879 17.5393 45.2559 16.6799 45.4182 15.8159C45.6678 14.4972 45.4362 13.1328 44.7656 11.9702C44.095 10.8077 43.0298 9.92411 41.7633 9.47992C40.9413 9.19088 40.1173 8.90745 39.2913 8.62963C39.0193 7.82277 38.7416 7.01363 38.4582 6.2022C38.0146 4.93511 37.1314 3.86912 35.9687 3.19786C34.8061 2.52659 33.4413 2.29456 32.1222 2.54392C31.2651 2.70392 30.4102 2.87077 29.5576 3.04449C28.9157 2.47789 28.27 1.91559 27.6205 1.35763ZM23.0982 4.60449C23.3384 4.39743 23.645 4.28354 23.9622 4.28354C24.2794 4.28354 24.586 4.39743 24.8262 4.60449C25.7359 5.38849 26.6308 6.17249 27.5108 6.95649C28.0182 7.40906 28.7108 7.5942 29.3759 7.45706C30.5416 7.21249 31.7222 6.9782 32.9176 6.7542C33.229 6.69544 33.551 6.75031 33.8254 6.90886C34.0997 7.0674 34.308 7.3191 34.4125 7.6182C34.8102 8.75192 35.1931 9.87763 35.5611 10.9953C35.7736 11.6399 36.2811 12.1473 36.9256 12.3599C38.0593 12.7325 39.1988 13.1211 40.3439 13.5256C40.9611 13.7416 41.3313 14.3759 41.2079 15.0205C40.9816 16.2182 40.7462 17.4033 40.5016 18.5759C40.4341 18.9049 40.4441 19.245 40.531 19.5694C40.6179 19.8937 40.7793 20.1934 41.0022 20.4445C41.8022 21.3359 42.5988 22.2456 43.3919 23.1736C43.599 23.4139 43.7129 23.7205 43.7129 24.0376C43.7129 24.3548 43.599 24.6614 43.3919 24.9016C42.6033 25.8205 41.8113 26.7256 41.0159 27.6171C40.7935 27.8678 40.6325 28.1669 40.5456 28.4906C40.4587 28.8143 40.4484 29.1538 40.5153 29.4822C40.7553 30.6342 40.9862 31.7999 41.2079 32.9793C41.2676 33.2912 41.2131 33.6141 41.0545 33.8892C40.8959 34.1642 40.6437 34.3731 40.3439 34.4776C39.2011 34.8799 38.0616 35.2673 36.9256 35.6399C36.608 35.746 36.3193 35.9245 36.0825 36.1613C35.8457 36.3982 35.6671 36.6868 35.5611 37.0045C35.1908 38.1245 34.8079 39.2502 34.4125 40.3816C34.308 40.6807 34.0997 40.9324 33.8254 41.091C33.551 41.2495 33.229 41.3044 32.9176 41.2456C31.7543 41.0271 30.5931 40.7973 29.4342 40.5565C29.1058 40.4895 28.7663 40.4998 28.4426 40.5867C28.1189 40.6736 27.8198 40.8346 27.5691 41.0571C26.6959 41.8388 25.8068 42.6182 24.9016 43.3953C24.6614 43.6024 24.3548 43.7163 24.0376 43.7163C23.7205 43.7163 23.4139 43.6024 23.1736 43.3953C22.2712 42.62 21.3763 41.836 20.4891 41.0433C20.2383 40.8209 19.9393 40.6599 19.6155 40.573C19.2918 40.4861 18.9523 40.4758 18.6239 40.5428C17.4582 40.7873 16.2776 41.0216 15.0822 41.2456C14.7709 41.3044 14.4488 41.2495 14.1745 41.091C13.9002 40.9324 13.6918 40.6807 13.5873 40.3816C13.1896 39.2502 12.8068 38.1245 12.4388 37.0045C12.3327 36.6868 12.1542 36.3982 11.9174 36.1613C11.6805 35.9245 11.3919 35.746 11.0742 35.6399C9.94049 35.2673 8.80106 34.8788 7.65592 34.4742C7.35681 34.3697 7.10512 34.1614 6.94657 33.8871C6.78802 33.6128 6.73315 33.2907 6.79192 32.9793C7.01592 31.7793 7.25134 30.5931 7.4982 29.4205C7.5652 29.0921 7.55484 28.7526 7.46796 28.4289C7.38108 28.1051 7.22006 27.8061 6.99763 27.5553C6.19763 26.6639 5.40106 25.7542 4.60792 24.8262C4.40086 24.586 4.28697 24.2794 4.28697 23.9622C4.28697 23.645 4.40086 23.3384 4.60792 23.0982C5.39649 22.1793 6.18849 21.2742 6.98392 20.3828C7.20634 20.132 7.36737 19.833 7.45425 19.5093C7.54113 19.1855 7.55148 18.846 7.48449 18.5176C7.24449 17.3656 7.01363 16.1999 6.79192 15.0205C6.73225 14.7086 6.78669 14.3857 6.9453 14.1107C7.10391 13.8356 7.35612 13.6268 7.65592 13.5222C8.80106 13.1222 9.93935 12.7348 11.0708 12.3599C11.3891 12.2543 11.6784 12.076 11.9159 11.8391C12.1533 11.6023 12.3323 11.3134 12.4388 10.9953C12.8045 9.87763 13.1873 8.75192 13.5873 7.6182C13.6918 7.3191 13.9002 7.0674 14.1745 6.90886C14.4488 6.75031 14.7709 6.69544 15.0822 6.7542C16.2525 6.97363 17.4136 7.20334 18.5656 7.44334C18.8935 7.50978 19.2324 7.49915 19.5554 7.41228C19.8785 7.32541 20.177 7.16469 20.4273 6.94277C21.3028 6.16106 22.1908 5.38163 23.0982 4.60449ZM32.5885 19.0456C33.0709 18.5817 33.3534 17.948 33.3761 17.2791C33.3987 16.6103 33.1597 15.9589 32.7097 15.4634C32.2598 14.968 31.6344 14.6675 30.9665 14.6257C30.2985 14.584 29.6406 14.8043 29.1325 15.2399C26.8216 17.3348 25.0525 19.2513 23.5508 21.5896C22.6311 23.0474 21.8352 24.5796 21.1713 26.1702L18.9908 23.9245C18.5107 23.4603 17.8689 23.2011 17.2011 23.2016C16.5333 23.2022 15.8919 23.4625 15.4127 23.9275C14.9334 24.3926 14.6538 25.0258 14.6331 25.6932C14.6124 26.3607 14.8521 27.0101 15.3016 27.5039L20.2868 32.6468C20.5921 32.962 20.973 33.1939 21.3933 33.3203C21.8135 33.4467 22.2591 33.4635 22.6877 33.369C23.1163 33.2744 23.5135 33.0718 23.8416 32.7804C24.1697 32.4889 24.4178 32.1183 24.5622 31.7039C25.7039 28.4228 26.7016 26.2079 27.8811 24.3668C29.0536 22.5359 30.4731 20.9656 32.5885 19.0491"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="badge-clip">
        <rect width="48" height="48" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default function Footer() {
  return (
    <section className="relative z-0 flex w-full flex-col items-start gap-[10px] overflow-hidden bg-[#040f2a] pt-10 pb-16 sm:pt-[60px] sm:pb-[100px]">
      {/* ---------- image background ---------- */}
      <Image
        src="/images/image19.jpg"
        alt=""
        fill
        priority
        className="absolute inset-0 -z-20 object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#040f2a]/55 via-[#0a1f4d]/30 to-[#040f2a]/65" />
      <div className="pointer-events-none absolute -right-32 -top-16 -z-10 h-[300px] w-[300px] rounded-full bg-sky-200/20 blur-3xl sm:h-[500px] sm:w-[500px]" />

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 sm:px-6 lg:gap-14 lg:px-12">
        {/* ---------- hero row ---------- */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-6">
          <div className="relative mx-auto h-[160px] w-full max-w-[220px] shrink-0 sm:h-[220px] sm:max-w-[300px] lg:mx-0">
            <Image
              src="/images/image 15.png"
              alt="NeaPure reverse-osmosis water purifier, exploded view"
              fill
              className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              sizes="(max-width: 640px) 220px, 300px"
            />
          </div>

          <div className="flex flex-1 flex-col gap-6 sm:gap-8">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:text-left">
              <h2 className="text-xl font-semibold leading-tight text-white sm:text-2xl sm:leading-tight md:text-3xl">
                We are always
                <br />
                ready to serve you
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/60 lg:mx-0">
                From installation to routine maintenance, our certified
                technicians are one call away — every filter change, every
                checkup, every time.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8 sm:grid-cols-4">
              {FEATURES.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                      feature.active
                        ? "border-sky-300 bg-sky-400/90 text-white shadow-[0_0_0_5px_rgba(56,189,248,0.15)]"
                        : "border-sky-400/60 bg-transparent text-sky-400"
                    }`}
                  >
                    <VerifiedBadgeIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {feature.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-white/50">
                      {feature.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- CTA Banner ---------- */}
        <div
          className="relative flex w-full flex-col items-stretch overflow-hidden rounded-2xl border border-white/10 sm:flex-row sm:items-center"
          style={{
            background:
              "linear-gradient(90deg,#0B62E9 62.98%,rgba(102,102,102,0) 100%)",
          }}
        >
          <div className="relative z-10 flex w-full flex-col gap-6 px-5 py-6 sm:flex-row sm:items-center sm:gap-8 sm:py-5 sm:pl-8 sm:pr-0 lg:gap-[45px] lg:pl-[110px]">
            <Image
              src="/images/image23.png"
              alt="Technician"
              width={95}
              height={90}
              className="hidden object-contain sm:absolute sm:bottom-0 sm:left-0 sm:block"
            />

            <div className="flex flex-col">
              <h3 className="text-2xl font-semibold leading-tight text-white sm:text-[28px] lg:text-[32px]">
                We are always ready to serve you
              </h3>
              <p className="mt-2 max-w-[340px] text-sm leading-6 text-white/80">
                Schedule a filter change, checkup or repair.
                Our certified technicians are always nearby.
              </p>
            </div>

            <button className="flex w-full shrink-0 items-center justify-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B62E9] transition hover:bg-white/90 sm:w-auto">
              Book Service Now
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0B62E9] text-white">
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </div>

          <div className="absolute inset-y-0 right-0 z-0 hidden w-[98%] overflow-hidden lg:block">
            <Image
              src="/images/image24.png"
              alt="Delivery route map with van and location pin"
              fill
              className="object-cover object-left translate-x-[-80px] scale-120"
              sizes="80vw"
            />

            {/* Blue fade */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0B62E9]" />
          </div>
        </div>

        {/* ---------- footer strip ---------- */}
        <div className="relative flex flex-col gap-10 pt-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            {[420, 320, 220, 120].map((size) => (
              <span
                key={size}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]"
                style={{ width: size, height: size }}
              />
            ))}
            <span className="absolute left-[38%] top-[70%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/70 bg-sky-400" />
          </div>

          <div className="flex max-w-xs flex-col gap-4">
            <div className="flex w-fit items-center gap-2 rounded-lg border border-white/15 px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
              <span className="text-base font-semibold text-white">
                Nea <span className="text-sky-400">Pure</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white">
              Clean water, always on tap — smart purification for every home.
            </p>

            {/* ---------- Social icons: real SVGs, not placeholders ---------- */}
            <div className="flex gap-2.5">
              {SOCIALS.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20 hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:gap-14">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-white">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-white">
                        {i === col.links.length - 1 ? "└" : "├"}
                      </span>
                      <a
                        href="#"
                        className="text-sm text-white transition hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex w-full max-w-xs flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-white">
              Join our newsletter
            </p>
            <form className="flex w-full items-center overflow-hidden rounded-full border border-white/20 bg-white/5 pr-1.5">
              <input
                type="email"
                placeholder="Your email"
                className="w-full min-w-0 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#1454e0] transition hover:bg-white/90"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}