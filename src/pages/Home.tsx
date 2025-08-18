import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { AuthContext } from '@/contexts/authContext';
import { Link, useNavigate } from 'react-router-dom';

// 服务接口定义
interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  icon: string;
  color: string;
  imageUrl: string;
  details: string;
  options?: string[];
}

export default function Home() {
  const { addOrder, isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  // 状态管理
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // 检测是否为移动设备
  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const mobileRegex = /android|ipad|iphone|ipod|iemobile|blackberry|bada/i;
      setIsMobile(mobileRegex.test(userAgent));
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  
  // 服务数据
  const services: Service[] = [
    {
      id: 1,
      title: "专属按摩服务",
      description: "累死了！快来给我揉揉肩~",
      price: "一个亲亲",
      icon: "fa-solid fa-spa",
      color: "bg-pink-100 text-pink-600",
      imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Romantic%20massage%20scene%2C%20warm%20lighting%2C%20cozy%20ambience%2C%20soft%20colors%2C%20illustration%20style&sign=cec1911088164e20007e4daa0d8c80b3",
      details: "哼，本小姐今天腰酸背痛的，还不快来伺候我！按摩要轻重适中，重点是肩颈和腰部，手法不好可是会被嫌弃的哦~",
      options: ["温柔抚摸", "适中力道", "深度放松"]
    },
    {
      id: 2,
      title: "爱心送餐服务",
      description: "肚子饿了啦！还不去做饭？",
      price: "一个抱抱",
      icon: "fa-solid fa-utensils",
      color: "bg-orange-100 text-orange-600",
      imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Romantic%20dinner%20plate%2C%20heart-shaped%20food%2C%20warm%20colors%2C%20cozy%20lighting%2C%20illustration%20style&sign=b4587a7d1f0a403496f04b11ff9c3807",
      details: "本小姐今天想吃点好的，不要太咸也不要太淡，记得不放葱花香菜！对了，摆盘要好看一点，不然本小姐可不吃哦~",
      options: ["家常菜", "甜点", "水果拼盘"]
    },
    {
      id: 3,
      title: "甜言蜜语服务",
      description: "今天也要哄我开心~",
      price: "一个吻",
      icon: "fa-solid fa-heart",
      color: "bg-red-100 text-red-600",
      imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Heart-shaped%20decorations%2C%20romantic%20quotes%2C%20pink%20and%20red%20colors%2C%20cute%20illustration%20style&sign=deb9f7250e20f053863a75a3323e4356",
      details: "哼，快说点好听的给我听！不要那些老掉牙的情话，要有新意一点，不然本小姐才不会开心呢~至少要说满5分钟才行！",
      options: ["情话绵绵", "赞美轰炸", "浪漫故事"]
    },
    {
      id: 4,
      title: "陪伴看电视",
      description: "一个人看剧好无聊...",
      price: "陪我看完一整集",
      icon: "fa-solid fa-tv",
      color: "bg-purple-100 text-purple-600",
      imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Couple%20watching%20TV%20together%2C%20cozy%20sofa%2C%20snacks%20and%20drinks%2C%20warm%20lighting%2C%20illustration%20style&sign=8a3e6d4fba498664bdbda53e73930714",
      details: "本小姐想看那个新出的偶像剧了，你要陪我一起看，还要准备好零食和饮料！看到感人的地方要给我递纸巾，听到好笑的地方要陪我一起笑~",
      options: ["偶像剧", "综艺节目", "电影"]
    },
  ];

  // 更多项目（支持拓展）
  const futureProjects: { id: number; title: string; description: string; icon: string; color: string; status?: string }[] = [
    {
      id: 101,
      title: "更多项目，敬请期待",
      description: "后续将上线更多贴心服务~",
      icon: "fa-solid fa-rocket",
      color: "border-pink-300 text-pink-500",
      status: "coming-soon",
    },
  ];
  
  // 处理服务选择
  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setSelectedOption(service.options?.[0] || "");
    setIsModalOpen(true);
    setIsSubmitted(false);
  };
  
  // 处理服务提交
  const handleSubmit = () => {
    if (!selectedService) return;
    
    setIsSubmitted(true);
    
    // 模拟处理时间
    setTimeout(() => {
      setIsModalOpen(false);
      toast.success(`已成功提交「${selectedService.title}」订单！`, {
        description: `要求: ${selectedOption || '无特殊要求'} | 报酬: ${selectedService.price}`,
      });
      // 写入共享订单，Alex中心可见
      addOrder(selectedService.title, selectedOption);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* 页面标题 */}
       <header className="py-6 px-4 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-red-400 bg-clip-text text-transparent mb-2">
        Macy的服务中心
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
          {user === 'alex' ? '欢迎来给Macy接单噢，完成任务有奖励~' : '哼，还不快来看看本小姐今天需要什么服务~ 选得合我心意的话，有奖励哦！'}
        </p>
        <div className="mt-4 flex items-center justify-center gap-3">
          {!isAuthenticated ? (
            <button onClick={() => navigate('/login')} className="px-4 py-2 rounded-xl bg-pink-500 text-white hover:bg-pink-600">登录</button>
          ) : (
            <>
              <span className="text-sm text-gray-500">当前身份：{user}</span>
              {user === 'alex' ? (
                <Link to="/alex" className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">进入接单中心</Link>
              ) : (
                <Link to="/alex" className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">去找Alex接单</Link>
              )}
              <button onClick={logout} className="px-4 py-2 rounded-xl bg-gray-800 text-white hover:bg-black">退出</button>
            </>
          )}
        </div>
      </header>
      
      {/* 服务卡片网格 */}
      <main className="container mx-auto px-4 pb-16">
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {services.map((service) => (
            <motion.div 
              key={service.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-pink-100"
              onClick={() => handleServiceSelect(service)}
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isMobile ? { duration: 0 } : { duration: 0.3, delay: service.id * 0.1 }}
            >
               <div className="h-36 sm:h-40 overflow-hidden">
                <img 
                  src={`${service.imageUrl}&format=webp`}
                  srcSet={`${service.imageUrl}&format=webp&w=300 300w, ${service.imageUrl}&format=webp&w=600 600w, ${service.imageUrl}&format=webp&w=900 900w`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // 回退到原始格式
                    target.src = service.imageUrl;
                  }}
                />
              </div>
              
              <div className={`absolute top-4 right-4 w-12 h-12 rounded-full ${service.color} flex items-center justify-center shadow-md`}>
                <i className={`${service.icon} text-xl`}></i>
              </div>
              
               <div className="p-4 sm:p-6 relative z-10">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-500 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {service.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${service.color}`}>
                    {service.price}
                  </span>
                  <button className="text-pink-500 hover:text-pink-600 transition-colors">
                    <i className="fa-solid fa-arrow-right ml-1 group-hover:ml-2 transition-all"></i>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 更多项目（支持拓展） */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">更多项目</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {futureProjects.map((p) => (
              <div
                key={p.id}
                className={`group relative bg-white rounded-2xl transition-all border-2 border-dashed ${p.color} p-5 flex items-start gap-3 hover:shadow-md cursor-pointer`}
                onClick={() => toast("敬请期待~")}
              >
                <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center">
                  <i className={`${p.icon} text-xl`}></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{p.title}</div>
                  <div className="text-sm text-gray-500 mt-1">{p.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* 服务详情模态框 */}
      {selectedService && (
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={`${selectedService.imageUrl}&format=webp`}
                srcSet={`${selectedService.imageUrl}&format=webp&w=300 300w, ${selectedService.imageUrl}&format=webp&w=600 600w, ${selectedService.imageUrl}&format=webp&w=900 900w`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt={selectedService.title}
                className="w-full h-48 sm:h-56 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  // 回退到原始格式
                  target.src = selectedService.imageUrl;
                }}
              />
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md text-gray-700 hover:text-pink-500 transition-colors"
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
            
            <div className="p-6">
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${selectedService.color}`}>
                {selectedService.price}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {selectedService.title}
              </h2>
              
              <p className="text-gray-600 mb-6">
                {selectedService.details}
              </p>
              
              {selectedService.options && selectedService.options.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">请选择服务类型:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedService.options.map((option, index) => (
                      <button
                        key={index}
                        className={`p-3 rounded-xl border transition-all ${
                          selectedOption === option
                            ? `border-pink-500 bg-pink-50 text-pink-600 font-medium`
                            : `border-gray-200 hover:border-pink-300`
                        }`}
                        onClick={() => setSelectedOption(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitted}
                className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitted ? (
                  <div className="flex items-center justify-center">
                    <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
                    <span>处理中...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>立即为我服务</span>
                    <i className="fa-solid fa-heart ml-2"></i>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}