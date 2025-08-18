import { useContext, useMemo } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { Link, useNavigate } from 'react-router-dom';

export default function AlexCenter() {
  const { orders, acceptOrder, completeOrder, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const counters = useMemo(() => {
    const pending = orders.filter(o => o.status === 'pending').length;
    const accepted = orders.filter(o => o.status === 'accepted').length;
    const completed = orders.filter(o => o.status === 'completed').length;
    return { pending, accepted, completed };
  }, [orders]);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="py-6 px-4 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent mb-2">
          Alex的接单中心
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
          作为Macy的男朋友，随时准备响应她的需求。这里显示所有待办与进行中的小任务。
        </p>
        {/* 取消返回 Macy 的服务中心入口 */}
      </header>

      <main className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-4 bg-white rounded-xl shadow border border-blue-100 text-center">
            <div className="text-sm text-gray-500">待接单</div>
            <div className="text-2xl font-bold text-blue-600">{counters.pending}</div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow border border-indigo-100 text-center">
            <div className="text-sm text-gray-500">进行中</div>
            <div className="text-2xl font-bold text-indigo-600">{counters.accepted}</div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow border border-green-100 text-center">
            <div className="text-sm text-gray-500">已完成</div>
            <div className="text-2xl font-bold text-green-600">{counters.completed}</div>
          </div>
        </div>

        <div className="space-y-3">
          {orders.length === 0 && (
            <div className="p-6 bg-white rounded-xl text-center text-gray-500 border">暂无订单，问问Macy有没有最新的需求吧</div>
          )}

          {orders.map((o) => (
            <div key={o.id} className="p-4 bg-white rounded-xl shadow border flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-800">{o.title}</div>
                <div className="text-sm text-gray-500">要求：{o.option || '无'}</div>
                <div className="text-xs text-gray-400 mt-1">状态：{o.status}</div>
              </div>
              <div className="flex items-center gap-2">
                {o.status === 'pending' && (
                  <button onClick={() => acceptOrder(o.id)} className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">接单</button>
                )}
                {o.status === 'accepted' && (
                  <button onClick={() => completeOrder(o.id)} className="px-3 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700">完成</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="fixed bottom-4 right-4">
        <button onClick={logout} className="px-4 py-2 bg-gray-800 text-white rounded-xl shadow hover:bg-black">退出登录</button>
      </div>
    </div>
  );
}


