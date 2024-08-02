import React, { Component } from 'react'
import { 
  DropdownMenu, 
  DropdownMenuCheckboxItem, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu"
import { Button } from "@components/ui/button"

import UpTime from "@components/upTime"
import NowTime from '@components/nowTime'
import { User2Icon } from 'lucide-react'


  const user = localStorage.getItem('userId')
  console.log(user)


const Header = () => {

  return (
      <header className="sticky top-0 z-30 flex bg-slate-100 h-14 items-center justify-end gap-4 border-b-2 px-4 sm:static sm:h-auto sm:bg-transparent sm:px-6">
        <NowTime/>
        <UpTime/>
        {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full top-10"
              >

              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user} 님</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
      </header>
  )
}

export default Header;