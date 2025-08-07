import { useState, useCallback } from "react";

interface AddPostModalState {
  title: string;
  content: string;
  selectedBoard: string;
  description: string;
  recruitCount: number;
  position: number | null;
  selectedStackIds: number[];
}

interface AddPostModalActions {
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setSelectedBoard: (board: string) => void;
  setDescription: (description: string) => void;
  setRecruitCount: (count: number) => void;
  setPosition: (position: number | null) => void;
  setSelectedStackIds: (stackIds: number[]) => void;
  reset: () => void;
}

export const useAddPostModal = (): AddPostModalState &
  AddPostModalActions & { isRecruitBoard: boolean } => {
  const [state, setState] = useState<AddPostModalState>({
    title: "",
    content: "",
    selectedBoard: "1",
    description: "",
    recruitCount: 1,
    position: null,
    selectedStackIds: [],
  });

  const setTitle = useCallback((title: string) => {
    setState((prev) => ({ ...prev, title }));
  }, []);

  const setContent = useCallback((content: string) => {
    setState((prev) => ({ ...prev, content }));
  }, []);

  const setSelectedBoard = useCallback((selectedBoard: string) => {
    setState((prev) => ({ ...prev, selectedBoard }));
  }, []);

  const setDescription = useCallback((description: string) => {
    setState((prev) => ({ ...prev, description }));
  }, []);

  const setRecruitCount = useCallback((recruitCount: number) => {
    setState((prev) => ({ ...prev, recruitCount }));
  }, []);

  const setPosition = useCallback((position: number | null) => {
    setState((prev) => ({ ...prev, position }));
  }, []);

  const setSelectedStackIds = useCallback((selectedStackIds: number[]) => {
    setState((prev) => ({ ...prev, selectedStackIds }));
  }, []);

  const reset = useCallback(() => {
    setState({
      title: "",
      content: "",
      selectedBoard: "1",
      description: "",
      recruitCount: 1,
      position: null,
      selectedStackIds: [],
    });
  }, []);

  const isRecruitBoard =
    state.selectedBoard === "3" || state.selectedBoard === "4";

  return {
    ...state,
    setTitle,
    setContent,
    setSelectedBoard,
    setDescription,
    setRecruitCount,
    setPosition,
    setSelectedStackIds,
    reset,
    isRecruitBoard,
  };
};
