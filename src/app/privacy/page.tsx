import Link from 'next/link';

export default function Privacy() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[--gray-900] mb-8">Privacy Policy</h1>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-[--gray-900] mb-4">Introduction</h2>
          <p className="text-[--gray-700] mb-4">
            At AnchorPoint, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
          </p>
        </div>

        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-[--gray-900] mb-4">Information We Collect</h2>
          <ul className="list-disc list-inside text-[--gray-700] mb-4 space-y-2">
            <li>Personal identification information (name, email address, phone number)</li>
            <li>Military affiliation information (branch, rank, duty station)</li>
            <li>Profile information you provide (family details, interests)</li>
            <li>Usage data (how you interact with our platform)</li>
          </ul>
        </div>

        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-[--gray-900] mb-4">How We Use Your Information</h2>
          <ul className="list-disc list-inside text-[--gray-700] mb-4 space-y-2">
            <li>To provide and maintain our services</li>
            <li>To personalize your experience on our platform</li>
            <li>To communicate with you about your account and updates</li>
            <li>To improve our services based on user feedback</li>
            <li>To comply with legal obligations</li>
          </ul>
        </div>

        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-[--gray-900] mb-4">Data Security</h2>
          <p className="text-[--gray-700] mb-4">
            We implement robust security measures to protect your personal information from unauthorized access, 
            alteration, disclosure, or destruction. All data is stored securely using industry-standard encryption.
          </p>
        </div>

        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-[--gray-900] mb-4">Your Rights</h2>
          <p className="text-[--gray-700] mb-4">
            You have the right to access, update, or delete your personal information at any time. 
            You may also opt out of certain communications from us.
          </p>
        </div>

        <div className="text-center mt-12">
          <Link href="/" className="btn-primary inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
