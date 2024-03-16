import React, { useEffect, useState } from "react";
import { Menu } from "../../components/Documents/Menu";
import { NoteContent } from "../../components/Notes/NoteContent";
import { useParams } from "react-router-dom";
import { useGetOneNoteMutation } from "../../redux/api";
import { Note } from "../../interfaces/types";
// import { useGetOneNoteQuery } from "../../redux/api";

interface User {
  username: string;
}

interface Blocks {
  id: string;
  type: string;
  props: {
    textColor: string;
    backgroundColor: string;
    textAlignment: string;
  };
  content: Array<{
    type: string;
    text?: string;
    styles?: {};
  }>;
  children: Blocks[];
}

type NoteData = {
  _id: string;
  imageUrl: string;
  name: string;
  title: string;
  smile: string;
  text: string;
  user: User;
  blocks: Blocks[];
};

interface UsernameInterface {
  username: string;
}

export const Documents: React.FC<UsernameInterface> = ({ username }) => {
  const { _id } = useParams();

  const [selectNoteData, setSelectNoteData] = useState<NoteData>();
  const [selectNoteId, setSelectNoteId] = useState<string>();

  const [selectNote, { data: noteData, isSuccess: isSelectNoteSuccess }] =
    useGetOneNoteMutation();

  useEffect(() => {
    if (_id && _id !== selectNoteId) {
      selectNote(_id);
    }
  }, [_id, selectNote, selectNoteId]);

  useEffect(() => {
    if (isSelectNoteSuccess) {
      setSelectNoteData(noteData);
      setSelectNoteId(noteData._id);
    }
  }, [isSelectNoteSuccess, noteData]);

  return (
    <div className="relative flex">
      <div className="bg-secondary-150 h-screen w-56 overflow-hidden">
        <Menu selectNoteId={selectNoteId} username={username} />
      </div>
      <div className="flex-1">
        <NoteContent
          imageUrl={selectNoteData?.imageUrl || ""}
          name={selectNoteData?.name || ""}
          smile={selectNoteData?.smile || ""}
          _id={selectNoteData?._id || ""}
          blocks={selectNoteData?.blocks || []}
          isSelectNoteSuccess={isSelectNoteSuccess}
        />
      </div>
    </div>
  );
};
