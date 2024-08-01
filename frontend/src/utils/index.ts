export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64Data = reader.result + "";
      if (base64Data) {
        resolve(base64Data);
      } else {
        reject(new Error("Base64 data not found"));
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

export const getImageUrlFromFile = (
  file: File,
  getRes?: (url: string) => void
) => {
  const reader = new FileReader();

  let res = "";

  reader.onload = (function (theFile) {
    return function (e) {
      const result = e.target?.result;
      if (typeof result === "string") {
        res = result;
        getRes && getRes(result);
      }
    };
  })(file);

  reader.readAsDataURL(file);

  return res;
};

export function averagePercentageRate(values: number[]): number {
  if (values.length === 0) return 0;

  const total = values.reduce((sum, value) => sum + value, 0);
  const average = total / values.length;
  const percentageRate = (average / 100) * 100;

  return Math.trunc(percentageRate);
}



