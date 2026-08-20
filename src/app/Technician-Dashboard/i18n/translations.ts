export type Language =
  | "English"
  | "Bangla";

export const translations = {
  dashboard: {
    title: {
      English: "Dashboard",
      Bangla: "ড্যাশবোর্ড",
    },

    subtitle: {
      English:
        "Here's your work overview for today.",
      Bangla:
        "আজকের কাজের সারসংক্ষেপ এখানে দেখুন।",
    },

    totalJobs: {
      English: "Total Jobs",
      Bangla: "মোট কাজ",
    },

    completedJobs: {
      English: "Completed Jobs",
      Bangla: "সম্পন্ন কাজ",
    },

    pendingJobs: {
      English: "Pending Jobs",
      Bangla: "অপেক্ষমাণ কাজ",
    },

    todayJobs: {
      English: "Today's Jobs",
      Bangla: "আজকের কাজ",
    },

    recentJobs: {
      English: "Recent Jobs",
      Bangla: "সাম্প্রতিক কাজ",
    },

    schedule: {
      English: "My Schedule",
      Bangla: "আমার সময়সূচি",
    },
  },

  common: {
    save: {
      English: "Save",
      Bangla: "সংরক্ষণ",
    },

    cancel: {
      English: "Cancel",
      Bangla: "বাতিল",
    },

    loading: {
      English: "Loading...",
      Bangla: "লোড হচ্ছে...",
    },

    logout: {
      English: "Logout",
      Bangla: "লগআউট",
    },

    profile: {
      English: "Profile",
      Bangla: "প্রোফাইল",
    },

    settings: {
      English: "Settings",
      Bangla: "সেটিংস",
    },

    notifications: {
      English: "Notifications",
      Bangla: "নোটিফিকেশন",
    },
  },

  sidebar: {
    dashboard: {
      English: "Dashboard",
      Bangla: "ড্যাশবোর্ড",
    },

    todaysJobs: {
      English: "Today's Jobs",
      Bangla: "আজকের কাজ",
    },

    schedule: {
      English: "My Schedule",
      Bangla: "আমার সময়সূচি",
    },

    installations: {
      English: "Installations",
      Bangla: "ইনস্টলেশন",
    },

    serviceRequests: {
      English: "Service Requests",
      Bangla: "সার্ভিস রিকোয়েস্ট",
    },

    qrCode: {
      English: "QR Code Scan",
      Bangla: "QR কোড স্ক্যান",
    },

    customers: {
      English: "Customers",
      Bangla: "গ্রাহক",
    },

    products: {
      English: "Products",
      Bangla: "পণ্য",
    },

    reports: {
      English: "Reports",
      Bangla: "রিপোর্ট",
    },

    earnings: {
      English: "Earnings",
      Bangla: "আয়",
    },

    support: {
      English: "Support",
      Bangla: "সাপোর্ট",
    },

    profile: {
      English: "Profile",
      Bangla: "প্রোফাইল",
    },

    settings: {
      English: "Settings",
      Bangla: "সেটিংস",
    },

    goOffline: {
      English: "Go Offline",
      Bangla: "অফলাইনে যান",
    },
  },

  header: {
    goodMorning: {
      English: "Good Morning",
      Bangla: "শুভ সকাল",
    },

    location: {
      English: "Dhaka, Bangladesh",
      Bangla: "ঢাকা, বাংলাদেশ",
    },
  },

  profile: {
    title: {
      English: "My Profile",
      Bangla: "আমার প্রোফাইল",
    },

    subtitle: {
      English:
        "View and manage your technician profile information.",
      Bangla:
        "আপনার টেকনিশিয়ান প্রোফাইলের তথ্য দেখুন ও পরিচালনা করুন।",
    },

    edit: {
      English: "Edit Profile",
      Bangla: "প্রোফাইল সম্পাদনা",
    },

    fullName: {
      English: "Full Name",
      Bangla: "পূর্ণ নাম",
    },

    email: {
      English: "Email",
      Bangla: "ইমেইল",
    },

    phone: {
      English: "Phone",
      Bangla: "ফোন",
    },

    region: {
      English: "Region",
      Bangla: "অঞ্চল",
    },

    skills: {
      English: "Skills",
      Bangla: "দক্ষতা",
    },

    role: {
      English: "Role",
      Bangla: "ভূমিকা",
    },

    status: {
      English: "Status",
      Bangla: "স্ট্যাটাস",
    },

    changePhoto: {
      English: "Change Photo",
      Bangla: "ছবি পরিবর্তন",
    },

    accountInformation: {
      English: "Account Information",
      Bangla: "অ্যাকাউন্ট তথ্য",
    },

    technicianInformation: {
      English:
        "Technician Information",
      Bangla:
        "টেকনিশিয়ান তথ্য",
    },

    changePassword: {
      English: "Change Password",
      Bangla: "পাসওয়ার্ড পরিবর্তন",
    },

    language: {
      English: "Language",
      Bangla: "ভাষা",
    },
  },
} as const;