import React, { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@components/ui/select";
import { Button } from '../../components/ui/button';
import { Input } from "@components/ui/input";

export default function Search(props) {
  const { opt1, opt2, opt3, select1, select2, select3 } = props;
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]); // 모든 게시물을 저장하기 위한 상태
  const [searchType, setSearchType] = useState(opt1);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setPosts(allPosts); // 검색어가 없으면 모든 게시물을 표시
    } else {
      const filteredPosts = allPosts.filter(post => {
        if (searchType === opt1) {
          return post.opt1.includes(searchQuery);
        } else if (searchType === opt2) {
          return post.opt2.includes(searchQuery);
        } else if (searchType === opt3) {
          return post.opt3.includes(searchQuery);
        }
        return false;
      });
      setPosts(filteredPosts);
    }
  };

  return (
    <div className="flex justify-center gap-4">
      <Select value={searchType} onValueChange={setSearchType}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="검색 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={opt1}>{select1}</SelectItem>
            <SelectItem value={opt2}>{select2}</SelectItem>
            <SelectItem value={opt3}>{select3}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button onClick={handleSearch}>검색</Button>
    </div>
  )
}
