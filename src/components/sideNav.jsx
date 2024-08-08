import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from "react-router-dom"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/src/components/ui/tooltip"
import { CirclePlus, FactoryIcon, Home, LineChartIcon, LogIn, LogOut, NotebookIcon, Pencil, Settings, TableProperties, User, UserCircle2, } from "lucide-react"
import { DashboardIcon } from '@radix-ui/react-icons';
import { useAuth } from '@/src/context/AuthContext'; // AuthContext를 import 합니다.


export const SideNav = () => {
  const { logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로그인 상태 확인
    setIsLoggedIn(checkLoginStatus());
  }, []);

    // 로그인 상태 확인 함수
    const checkLoginStatus = () => {
      // const { isLoggedIn } = useAuth();
      // return isLoggedIn
      return !!localStorage.getItem('token');
    };

  // 로그아웃 버튼 클릭 시 실행되는 함수
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
  }

  return (
    <TooltipProvider>

      {isLoggedIn ? (
  
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col bg-slate-400 shadow-lg border-l border-slate-400 drop-shadow-md sm:flex">
        <nav className='flex flex-col h-full justify-between'>
        <div className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/dashboard"
                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"              
              >
                <FactoryIcon className="h-5 w-5" />
                <span className="sr-only">대시보드</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">대시보드</TooltipContent>
          </Tooltip>
          { localStorage.getItem('userRole') == 'admin' || localStorage.getItem('userRole') == '2' ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/product"
                  className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"              
                  >
                  <LineChartIcon className="h-5 w-5" />
                  <span className="sr-only">제품 현황</span>
                </Link>
              </TooltipTrigger>
            <TooltipContent side="right">제품 현황</TooltipContent>
          </Tooltip>
          ) : (<></>)
          }
          { localStorage.getItem('userRole') == 'admin' || localStorage.getItem('userRole') == '2' ? (          
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/board/productionLog"
                  className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"              
                  >
                  <NotebookIcon className="h-5 w-5" />
                  <span className="sr-only">작업 일지</span>
                </Link>
              </TooltipTrigger>
            <TooltipContent side="right">작업 일지</TooltipContent>
          </Tooltip>) : (<></>)
          }

          { localStorage.getItem('userRole') == 'admin' ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/generateUser"
                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"              
              >
                <UserCircle2 className="h-5 w-5" />
                <span className="sr-only">유저 관리</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">유저 관리</TooltipContent>
          </Tooltip>) : 
          (<></>)
          }

          </div>
          <div className='flex justify-center mb-8'>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  onClick={handleLogout}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  href='/'
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">로그아웃</span>
                </a>
              </TooltipTrigger>
              <TooltipContent side="right">로그아웃</TooltipContent>
            </Tooltip>
          </div>
        </nav>
      </aside>
  ) : (<></>)}

    </TooltipProvider>
  )
}