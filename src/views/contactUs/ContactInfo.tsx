import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="bg-slate-900 text-white p-8 lg:p-12">
      <h2 className="text-2xl font-bold mb-6">Get in touch</h2>
      <p className="mb-8">
        We&apos;d love to hear from you. Please fill out this form or use our contact
        information below.
      </p>
      <div className="space-y-4">
        <div className="flex items-center">
          <MapPin className="h-6 w-6 mr-4" />
          <span>123 Example Street, City, Country</span>
        </div>
        <div className="flex items-center">
          <Phone className="h-6 w-6 mr-4" />
          <span>+1 (555) 123-4567</span>
        </div>
        <div className="flex items-center">
          <Mail className="h-6 w-6 mr-4" />
          <span>contact@example.com</span>
        </div>
      </div>
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Follow us</h3>
        <div className="flex space-x-4">
          {/* Add your social media icons here */}
          <a href="#" className="hover:text-blue-200 transition-colors">
            Facebook
          </a>
          <a href="#" className="hover:text-blue-200 transition-colors">
            Twitter
          </a>
          <a href="#" className="hover:text-blue-200 transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
