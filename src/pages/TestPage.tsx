import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
      <div className="p-8 bg-white rounded-2xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">测试页面</h1>
        <p className="text-gray-600 mb-6">如果能看到这个页面，说明应用基本功能正常。</p>
        <div className="bg-pink-100 rounded-lg p-4 mb-6">
          <p className="text-pink-800">这是一个简单的测试页面，用于验证应用的基本功能。</p>
        </div>
        <button 
          className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          onClick={() => alert('按钮点击正常！')}
        >
          点击测试按钮
        </button>
      </div>
    </div>
  );
};

export default TestPage;