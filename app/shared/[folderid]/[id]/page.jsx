import React from "react";

const SharedFolderPage = ({ params }) => {
  return (
    <>
      <h1>Shared folder Page</h1>
      folder id {params.folderid}
      page id{params.id}
    </>
  );
};

export default SharedFolderPage;
