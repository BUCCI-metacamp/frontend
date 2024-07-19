import React, { Component } from 'react'
import { SideNav } from '@components/sideNav'

export function GenerateUser() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
    <SideNav/>
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <h1>GenerateUser Page</h1>
      <p>This is the GenerateUser page.</p>
      </div>
    </div>
  )
}