import Link from 'next/link';

export default function Terms() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[--gray-900] mb-8">Terms of Service</h1>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-[--gray-900] mb-4">Acceptance of Terms</h2>
          <p className="text-[--gray-700] mb-4">
            By accessing or using the AnchorPoint platform, you agree to be bound by these Terms of Service 
            and all applicable laws and regulations. If you do not agree with any of these terms, 
            you are prohibited from using or accessing this site.
          </p>
        </div>

        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-[--gray-900] mb-4">Use License</h2>
          <p className="text-[--gray-700] mb-4">
            Permission is granted to temporarily download one copy of materials on AnchorPoint's website 
            for personal, non-commercial transitory viewing only. This is the grant of a license, 
            not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc list-inside text-[--gray-700] mb-4 ml-6 space-y-2">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software</li>
            <li>Remove any copyright or proprietary notations</li>
          </ul>
        </div>

        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-[--gray-900] mb-4">User Responsibilities</h2>
          <ul className="list-disc list-inside text-[--gray-700] mb-4 space-y-2">
            <li>You must provide accurate and complete information when creating an account</li>
            <li>You are responsible for maintaining the confidentiality of your account and password</li>
            <li>You agree to accept responsibility for all activities under your account</li>
            <li>You must not use the platform for any unlawful purpose</li>
            <li>You must respect the rights and privacy of other users</li>
          </ul>
        </div>

        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-[--gray-900] mb-4">Content Guidelines</h2>
          <p className="text-[--gray-700] mb-4">
            You are responsible for the content you post on AnchorPoint. You agree not to post content that:
          </p>
          <ul className="list-disc list-inside text-[--gray-700] mb-4 ml-6 space-y-2">
            <li>Is unlawful, harmful, or fraudulent</li>
            <li>Infringes on any intellectual property rights</li>
            <li>Contains personal information of others without consent</li>
            <li>Is discriminatory or harassing</li>
            <li>Promotes violence or illegal activities</li>
          </ul>
        </div>

        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-[--gray-900] mb-4">Limitations</h2>
          <p className="text-[--gray-700] mb-4">
            In no event shall AnchorPoint or its suppliers be liable for any damages arising out of 
            the use or inability to use the materials on our platform. We do not warrant that the 
            service will be uninterrupted or error-free.
          </p>
        </div>

        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-[--gray-900] mb-4">Changes to Terms</h2>
          <p className="text-[--gray-700] mb-4">
            AnchorPoint reserves the right to modify these terms at any time. We will notify users 
            of any significant changes through the platform or via email. Your continued use of the 
            platform after such modifications constitutes your acceptance of the new terms.
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
