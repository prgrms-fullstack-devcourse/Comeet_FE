import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2 } from "lucide-react";
import { useLocationQuery } from "@/hooks/queries/useLocationQuery";

interface LocationSelectorProps {
  onLocationChange: (location: { lng: number; lat: number }) => void;
  initialLocation?: { lng: number; lat: number } | null;
}

export const LocationSelector = ({
  onLocationChange,
  initialLocation,
}: LocationSelectorProps) => {
  const { location, isLoading, isError, refetchLocation } = useLocationQuery();

  useEffect(() => {
    if (location && !initialLocation) {
      onLocationChange(location);
    }
  }, [location, onLocationChange, initialLocation]);

  const handleGetLocation = async () => {
    try {
      await refetchLocation();
    } catch (error) {
      console.error("위치 가져오기 실패:", error);
    }
  };

  const getStatus = () => {
    if (isLoading) return "loading";
    if (isError) return "error";
    if (location) return "success";
    return "initial";
  };

  const status = getStatus();

  return (
    <div className="space-y-3">
      {status === "initial" && (
        <div className="bg-brand-surface rounded-lg p-4 border-none">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="text-brand-primary" />
            <span className="text-sm font-medium">위치 정보 수집</span>
          </div>
          <p className="text-sm text-brand-text mb-4">
            주변 개발자와의 연결을 위해 위치 정보가 필요합니다. 브라우저에서
            위치 정보 접근을 허용해주세요.
          </p>
          <Button
            onClick={handleGetLocation}
            className="w-full bg-brand-primary hover:bg-brand-primary/90 text-black">
            위치 정보 가져오기
          </Button>
        </div>
      )}

      {status === "loading" && (
        <div className="bg-brand-surface rounded-lg p-4 border-none">
          <div className="flex items-center gap-3 mb-3">
            <Loader2 className="text-brand-primary animate-spin" />
            <span className="text-sm font-medium">위치 정보 수집 중...</span>
          </div>
          <p className="text-sm text-brand-text">
            GPS 신호를 받고 있습니다. 잠시만 기다려주세요.
          </p>
        </div>
      )}

      {status === "success" && location && (
        <div className="bg-brand-surface rounded-lg p-4 border-none">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="text-brand-primary" />
            <span className="text-sm font-medium text-brand-primary">
              위치 정보 수집 완료
            </span>
          </div>
          {location.address ? (
            <div className="space-y-2">
              <p className="text-sm text-white font-medium">
                현재 위치: {location.address}
              </p>
              <p className="text-xs text-brand-text/70">
                * 약간의 오차가 있을 수 있습니다.
              </p>
            </div>
          ) : (
            <p className="text-sm text-brand-text">
              위도: {location.lat.toFixed(6)}, 경도: {location.lng.toFixed(6)}
            </p>
          )}
          <Button
            onClick={handleGetLocation}
            variant="outline"
            size="sm"
            className="w-full mt-2 bg-transparent border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-black">
            위치 다시 가져오기
          </Button>
        </div>
      )}

      {status === "error" && (
        <div className="bg-brand-surface rounded-lg p-4 border border-red-500/20">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="text-red-500" />
            <span className="text-sm font-medium text-red-500">
              위치 정보 오류
            </span>
          </div>
          <p className="text-sm text-brand-text mb-4">
            위치 정보를 가져오는 중 오류가 발생했습니다.
          </p>
          <Button
            onClick={handleGetLocation}
            variant="outline"
            size="sm"
            className="bg-transparent border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
            다시 시도
          </Button>
        </div>
      )}
    </div>
  );
};
