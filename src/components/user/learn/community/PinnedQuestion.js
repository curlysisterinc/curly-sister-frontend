import React from "react";
import { CommunityQuestionItem } from "./CommunityQuestionItem";

export const PinnedQuestion = ({ pinnedQuestions }) => {
  return pinnedQuestions?.map((item) => {
    return (
      <CommunityQuestionItem
        question={item.question}
        key={item._id}
        isPinned
        owner={item.owner}
      />
    );
  });
};
