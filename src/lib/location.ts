export const formatKoreanAddress = (displayName: string): string => {
  const addressParts = displayName.split(", ");

  const koreanParts = addressParts.filter(
    (part: string) =>
      part.includes("시") ||
      part.includes("구") ||
      part.includes("로") ||
      part.includes("길")
  );

  const sortedParts = koreanParts.sort((a, b) => {
    const getPriority = (part: string) => {
      if (part.includes("시")) return 1;
      if (part.includes("구")) return 2;
      if (part.includes("로") || part.includes("길")) return 3;
      return 4;
    };

    return getPriority(a) - getPriority(b);
  });

  return sortedParts.slice(0, 3).join(" ");
};

export const getAddressFromCoordinates = async (
  lat: number,
  lng: number
): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=ko`
    );

    if (!response.ok) {
      throw new Error("주소 변환 실패");
    }

    const data = await response.json();

    if (data.display_name) {
      return formatKoreanAddress(data.display_name);
    } else {
      return "주소를 찾을 수 없습니다";
    }
  } catch (error) {
    console.error("주소 변환 오류:", error);
    return "주소 변환 실패";
  }
};
