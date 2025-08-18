import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';

export default function Login() {
  const { setIsAuthenticated, setUser, rewardRequest, clearRewardRequest } = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState<'alex' | 'macy'>('macy');
  const navigate = useNavigate();

  // 从本地开发地址访问 /login 时，自动跳转到线上域名
  useEffect(() => {
    const isLocalDev = typeof window !== 'undefined' &&
      (window.location.origin === 'http://localhost:5173' || window.location.hostname === 'localhost');
    if (isLocalDev) {
      window.location.replace('https://mymacysapp.vercel.app/login');
    }
  }, []);

  const handleLogin = () => {
    setUser(selectedUser);
    setIsAuthenticated(true);
    if (selectedUser === 'macy' && rewardRequest && rewardRequest.count > 0) {
      toast.success(`Alex 申请领取奖励`, {
        description: `已完成 ${rewardRequest.count} 单，等待本小姐发放奖励~`
      });
      clearRewardRequest();
    }
    navigate(selectedUser === 'alex' ? '/alex' : '/');
  };

  return (
    <div className="min-h-[100dvh] sm:min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center px-4">
      <div className="p-8 bg-white/90 backdrop-blur rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 to-red-400 bg-clip-text text-transparent">
          选择登录身份
        </h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setSelectedUser('macy')}
            className={`p-4 rounded-xl border text-center ${selectedUser === 'macy' ? 'border-pink-500 bg-pink-50 text-pink-600' : 'border-gray-200'}`}
          >
            <div className="text-xl font-semibold">Macy</div>
            <div className="text-sm text-gray-500 mt-1">女友模式</div>
          </button>
          <button
            onClick={() => setSelectedUser('alex')}
            className={`p-4 rounded-xl border text-center ${selectedUser === 'alex' ? 'border-pink-500 bg-pink-50 text-pink-600' : 'border-gray-200'}`}
          >
            <div className="text-xl font-semibold">Alex</div>
            <div className="text-sm text-gray-500 mt-1">男友模式</div>
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg"
        >
          登录
        </button>

        <div className="text-center mt-4 text-sm text-gray-500">
          登录后可在不同中心间切换。
        </div>
      </div>
    </div>
  );
}


