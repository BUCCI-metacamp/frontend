import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from "react-router-dom"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/src/components/ui/tooltip"
import { CirclePlus, Home, LineChartIcon, LogIn, LogOut, NotebookIcon, Pencil, Settings, TableProperties, User, UserCircle2, } from "lucide-react"
import { DashboardIcon } from '@radix-ui/react-icons';
// import { getUserInfo } from "../auth/auth";



  // 임의의 로그인 상태 확인 함수 (실제 구현에 따라 수정 필요)
  const checkLoginStatus = () => {
    // 여기서는 예시로 로컬 스토리지의 토큰을 확인
    return !!localStorage.getItem('token');
  };

export const SideNav = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로그인 상태 확인
    setIsLoggedIn(checkLoginStatus());
    // console.log(isLoggedIn)
  }, []);

  // 로그아웃 버튼 클릭 시 실행되는 함수
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    // navigate('/')
  }

  return (
    <TooltipProvider>

      {isLoggedIn ? (
  
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className='flex flex-col h-full justify-between'>
        <div className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/dashboard"
                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              >
                <DashboardIcon className="h-5 w-5" />
                <span className="sr-only">대시보드</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">대시보드</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/product"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <LineChartIcon className="h-5 w-5" />
                <span className="sr-only">제품 현황</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">제품 현황</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/board/productionLog"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <NotebookIcon className="h-5 w-5" />
                <span className="sr-only">작업 일지</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">작업 일지</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/generateUser"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <UserCircle2 className="h-5 w-5" />
                <span className="sr-only">유저 관리</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">유저 관리</TooltipContent>
          </Tooltip>
          </div>
          <div className='flex justify-center mb-8'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  onClick={handleLogout}
                  to="/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">로그아웃</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">로그아웃</TooltipContent>
            </Tooltip>
          </div>
          {/* {userInfo && userInfo.groups[0] === 'admin' ? (
            <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/board/table/add-item"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <CirclePlus className="h-5 w-5" />
                  <span className="sr-only">AddItem</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">AddItem</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/board/table/edit-item"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Pencil className="h-5 w-5" />
                  <span className="sr-only">EditItem</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">EditItem</TooltipContent>
            </Tooltip>
            </>
          ) : null}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          {userInfo ? (
            <>
              <p style={{fontSize: '.8rem'}}>{userInfo.username}</p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to=""
                    onClick={(event) => {
                      event.preventDefault();
                      handleLogout();
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">LogOut</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">LogOut</TooltipContent>
              </Tooltip>
            </>
            ) : (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to="/sign/login"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    >
                      <LogIn className="h-5 w-5" />
                      <span className="sr-only">Login</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Login</TooltipContent>
                </Tooltip>
              </>
            )
          } */}
          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/settings"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip> */}
        </nav>
      </aside>
  ) : (<></>)}

    </TooltipProvider>
  )
}