import React from 'react';
import { useParams } from 'react-router-dom';

const FolderPage = () => {
  const { folderId } = useParams();

  // 폴더 ID를 사용하여 필요한 데이터 가져오기 등의 로직 작성

  return (
    <div>
      <h1>폴더 페이지</h1>
      <p>폴더 ID: {folderId}</p>
      {/* 폴더 페이지 내용 추가 */}
    </div>
  );
};

export default FolderPage;