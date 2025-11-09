// Hàm tạo roomId duy nhất giữa 2 user
export const makeRoomId = (a: string, b: string) => [a, b].sort().join("_");
