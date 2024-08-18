export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <header className="w-full bg-blue-600 py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <h1 className="text-white text-3xl font-bold">Inventory System</h1>
        </div>
      </header>

      <section className="flex-1 container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Manage Your Inventory Efficiently
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          A simple, powerful solution for all your inventory needs.
        </p>
        <a
          href="#features"
          className="bg-blue-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </section>

      <section id="features" className="w-full bg-white py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-10">
            Key Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg text-center">
              <h4 className="text-xl font-bold text-blue-600 mb-4">
                Easy Tracking
              </h4>
              <p className="text-gray-600">
                Monitor your inventory in real-time with user-friendly
                dashboards.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg text-center">
              <h4 className="text-xl font-bold text-blue-600 mb-4">
                Secure Data
              </h4>
              <p className="text-gray-600">
                Protect your inventory data with top-notch security features.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg text-center">
              <h4 className="text-xl font-bold text-blue-600 mb-4">
                Maintain Clinets and sales
              </h4>
              <p className="text-gray-600">
                Add Clients and maintain their sale records.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
