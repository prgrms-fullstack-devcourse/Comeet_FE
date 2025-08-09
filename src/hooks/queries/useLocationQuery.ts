import { useQuery } from "@tanstack/react-query";
import { getAddressFromCoordinates } from "@/lib/location";

interface LocationData {
  lng: number;
  lat: number;
}

interface LocationWithAddress extends LocationData {
  address: string;
}

const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("브라우저가 위치 정보를 지원하지 않습니다."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        };
        resolve(coords);
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 300000,
        maximumAge: 300000,
      }
    );
  });
};

const getLocationWithAddress = async (
  location: LocationData
): Promise<LocationWithAddress> => {
  try {
    const address = await getAddressFromCoordinates(location.lat, location.lng);
    return {
      ...location,
      address,
    };
  } catch (error) {
    console.warn("주소 변환 실패:", error);
    return {
      ...location,
      address: "",
    };
  }
};

export const useLocationQuery = () => {
  const locationQuery = useQuery({
    queryKey: ["location"],
    queryFn: async () => {
      const location = await getCurrentLocation();
      return getLocationWithAddress(location);
    },
    enabled: false,
    staleTime: 0,
    gcTime: 0,
    retry: 1,
    retryDelay: 1000,
  });

  const refetchLocation = async () => {
    try {
      await locationQuery.refetch();
    } catch (error) {
      console.error("위치 새로고침 실패:", error);
    }
  };

  return {
    location: locationQuery.data,
    isLoading: locationQuery.isLoading || locationQuery.isFetching,
    isError: locationQuery.isError,
    error: locationQuery.error,
    refetchLocation,
    isUpdating: locationQuery.isFetching,
  };
};
